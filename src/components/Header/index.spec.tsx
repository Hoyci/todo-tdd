import { it, describe, expect } from "vitest"
import { render, screen } from '@testing-library/react'
import Header from '.'

describe('Header', () => {
    it('should render Header', () => {
        render(<Header />)
        
        expect(screen.getByTestId('header-component')).toBeInTheDocument()
    })
    
    it('should render Header', () => {
        render(<Header />)
        
        expect(screen.getByRole('heading')).toHaveTextContent('Todo - TDD')
    })
})