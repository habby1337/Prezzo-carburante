import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';


test('loads and displays navbar', async () => {
    render(<App />)

    // await userEvent.click(screen.getByText('⛽Costo Carburante'))
    // await screen.findByRole('Navbar')

    expect(screen.getByText('⛽Costo Carburante')).toBeInTheDocument()
    // expect(screen.getByRole('nav')).toHaveTextContent('⛽Costo Carburante')
})


test('Anchor to main site works', async () => {
    render(<App />)

    // await userEvent.click(screen.getByText('Home site'))
    const anchor = screen.getByRole('link', { name: /Home site/i })
    expect(anchor).toHaveAttribute('href', 'https://www.tensi.dev')


    // expect(screen.getByText('Tensi')).toBeInTheDocument()
})

test('Navbar is responsive', async () => {
    render(<App />)

    await userEvent.click(screen.getByRole('button', { name: /toggle navigation/i }))
    await screen.findByRole('navigation')

    expect(screen.getByRole('navigation')).toBeInTheDocument()
})

