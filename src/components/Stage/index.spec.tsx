import { it, describe, expect, vitest } from "vitest"
import { fireEvent, render, screen, } from '@testing-library/react'
import Stage from './'
import { CardProps } from '../../@types'
import { v4 as uuid } from "uuid"

describe('Stage', () => {
    const stageProps = { id: uuid(), title: 'StageTitle', cards: [] as CardProps[] }
    const mockFn = vitest.fn()

    it('should check if title is on header', () => {
        render(<Stage id={stageProps.id} title={stageProps.title} cards={stageProps.cards} mutate={mockFn} />)

        expect(screen.getByRole('heading')).toHaveTextContent(stageProps.title)
    })

    it('should render a message because there isnt cards yet', () => {
        render(<Stage id={stageProps.id} title={stageProps.title} cards={stageProps.cards} mutate={mockFn}/>)

        expect(screen.getByText('No card to this stage')).toBeInTheDocument()
    })

    it('should show a input when "Criar" button is clicked', () => {
        render(<Stage id={stageProps.id} title={stageProps.title} cards={stageProps.cards} mutate={mockFn} />)

        const addButton = screen.getByRole('button', { name: 'Criar' })

        fireEvent.click(addButton)

        expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('should create a card when "Create" button is clicked inside the', () => {
        render(<Stage id={stageProps.id} title={stageProps.title} cards={stageProps.cards} mutate={mockFn} />)

        const addButton = screen.getByRole('button', { name: 'Criar' })
        fireEvent.click(addButton)

        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: 'New Card Title' } });

        const createButton = screen.getByRole('button', { name: 'Create' })
        fireEvent.click(createButton)

        expect(mockFn).toHaveBeenCalledWith({ title: 'New Card Title', stage_id: stageProps.id })
    })

    it('should render existing cards', () => {
        const stageId = uuid()
        const stageProps = { id: stageId, title: 'StageTitle', cards: [
            { id: uuid(), title: 'Card 1', stage_id: stageId },
            { id: uuid(), title: 'Card 2', stage_id: stageId },
        ] as CardProps[] }

        render(<Stage id={stageProps.id} title={stageProps.title} cards={stageProps.cards} mutate={mockFn} />)

        stageProps.cards.forEach((card) => {
            expect(screen.getByText(card.title)).toBeInTheDocument()
        })
    })

    it('should open the input component and close when press down esc', () => {
        render(<Stage id={stageProps.id} title={stageProps.title} cards={stageProps.cards} mutate={mockFn} />)

        const addButton = screen.getByRole('button', { name: 'Criar' })
        fireEvent.click(addButton)
        const input = screen.getByRole('textbox') as HTMLInputElement;

        expect(input).toBeInTheDocument()

        fireEvent.keyDown(input, {
            key: "Escape"
        })

        expect(input).not.toBeInTheDocument()
    })
})