import { it, describe, expect, beforeAll, beforeEach, afterAll } from "vitest"
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { http, HttpResponse } from 'msw'

import { stages } from '../../mocks/db'
import { server } from '../../mocks/server'

import Board from "."

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from "../../App"

beforeAll(() => server.listen())
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Stage', () => {
    it('should render loading', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Board />
            </QueryClientProvider>
        )
        
        await waitFor(() => {
            expect(screen.getByRole('heading')).toHaveTextContent('Loading...')
        })
    })

    it('should be able to call api and render stages', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Board />
            </QueryClientProvider>
        )

        await waitFor(() => {
            const stagesComponents = screen.getAllByTestId("stage-component")
            expect(stagesComponents).toHaveLength(stages.length)
            stages.forEach((stage, index) => {
                expect(stagesComponents[index]).toHaveTextContent(stage.title)
            })
        })
    })

    it('should be able to show a error message when API returns a error', async () => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false
                }
            }
        })

        server.use(
            http.get('http://localhost:3001/api/v1/stages', () => {
                return HttpResponse.error()
            })
        )

        render(
            <QueryClientProvider client={queryClient}>
                <Board />
            </QueryClientProvider>
        )
        
        await waitFor(() => {
            expect(screen.getByRole('heading')).toHaveTextContent('Error...')
        })
    })

    it('should be able to add a card to a stage', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Board />
            </QueryClientProvider>
        )

        const addButton = screen.getAllByRole('button', { name: 'Criar' })
        fireEvent.click(addButton[0])

        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: 'New Card Title' } });

        const createButton = screen.getByRole('button', { name: 'Create' })
        fireEvent.click(createButton)

        await waitFor(() => {
            expect(screen.getByText('New Card Title')).toBeInTheDocument()
        })
    })
})