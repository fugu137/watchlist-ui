import { render, screen } from '@testing-library/react'
import { MemoryRouter, Router } from 'react-router-dom'
import App from './App'
import React from 'react'

describe('App Test', () => {
    it('renders home page', () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        )

        const title = screen.getByText(/movie watchlist/i)
        expect(title).toBeInTheDocument()
    })
})
