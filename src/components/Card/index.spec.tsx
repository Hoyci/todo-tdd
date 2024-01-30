import { it, describe, expect } from "vitest"
import { render, screen, } from '@testing-library/react'
import Card from "./"

describe('Card', () => {
    const cardData = { title: 'oi' }

    it('should render a card component', () => {
        render(<Card data={cardData}/>)
        expect(screen.getByTestId('card-component')).toBeInTheDocument()
    })

    it('should render card title when data is provided', () => {
        render(<Card data={cardData} />)

        expect(screen.getByRole('heading')).toBeInTheDocument()
        expect(screen.getByRole('heading')).toHaveTextContent('oi')
    })
})