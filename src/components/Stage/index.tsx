import { useEffect, useState } from 'react';
import { CardProps } from '../../@types'
import Card from '../Card';
import Input from '../Input';

interface StageComponentProps {
    id: string;
    title: string;
    cards: CardProps[];
    mutate: ({ title, stage_id }: {
        title: string;
        stage_id: string;
    }) => void;
}

export default function Stage({ id, title, cards, mutate }: StageComponentProps) {
    const [isAddingNewCard, setIsAddingNewCard] = useState(false)
    
    const handleChangeAddingNewCard = () => {
        setIsAddingNewCard((prevState) => !prevState)
    }

    const handleCreateCard = ({ title }: { title: string}) => {
        if (title) {
            mutate({ title, stage_id: id })
        }

        setIsAddingNewCard((prevState) => !prevState)
    }

    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {
            if (isAddingNewCard && event.key === 'Escape') {
                event.preventDefault();

                setIsAddingNewCard(false)
            }
        }

        document.addEventListener('keydown', keyDownHandler)

        return () => {
            document.removeEventListener('keydown', keyDownHandler)
        }
    }, [isAddingNewCard])

    return (
        <div data-testid="stage-component" className='bg-slate-100 rounded-lg h-full max-w-64 w-full'>
            <header className='bg-red-400 flex justify-around rounded-t-lg'>
                <h1>{title}</h1>
                <button onClick={handleChangeAddingNewCard}>Criar</button>
            </header>

            {isAddingNewCard && <Input onClick={handleCreateCard} />}

            {cards.length === 0 && 
                <div className='flex flex-col items-center justify-center'>
                    <p className='px-2'>No card to this stage</p>
                </div>
            }

            {cards.length > 0 && 
                <div className='px-2 py-1 flex flex-col items-center justify-center'>
                    { cards.map((data) => <Card key={data.id} data={data} />)}
                </div>
            }
        </div>
    )
}