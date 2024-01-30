import { useMutation, useQuery } from "@tanstack/react-query"
import { CardProps } from "../../@types";
import { queryClient } from "../../App";
import Stage from "../Stage";
import { v4 as uuid } from 'uuid'

interface StageResponseProps {
  id: string;
  title: string;
  cards: CardProps[]
}

export default function Board() {
  const { data: stages, error, isPending, } = useQuery<StageResponseProps[], Error>({
      queryKey: ['cardData'],
      queryFn: () => fetch('http://localhost:3001/api/v1/stages').then((res) => res.json())
  })
  
  const createCardMutation = useMutation({
    mutationFn: (newCardData: CardProps) => fetch('http://localhost:3001/api/v1/cards',
        { 
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(newCardData) 
        }
    ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cardData'] }),
  })

  const mutate = ({ title, stage_id }: { title: string, stage_id: string }) => {
    createCardMutation.mutate({ id: uuid(), title, stage_id })
  }
    
  if (isPending) return <h1>Loading...</h1>
  
  if (error) return <h1>Error...</h1>

  return (
      <main className="flex justify-center gap-2">
        { stages.map((stage) => <Stage key={stage.id} id={stage.id} title={stage.title} cards={stage.cards} mutate={mutate} />)}
      </main>
  )
}