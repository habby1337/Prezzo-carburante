import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Search from './Search';


test('loads and displays search', async () => {
    render(<Search />)

    // expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText('Ricerca')).toBeInTheDocument()
    // expect(screen.getByRole('button', { name: /cerca/i })).toBeInTheDocument()
})


test('Select search filter carburante type is disabled if position is not retrived', async () => {
    let isInputDisabled = true;
    render(<Search isDisabled={isInputDisabled} />)



    expect(screen.getByTestId('select_carburante')).toBeDisabled()

})

test('Select search filter ordine prezzo is disabled if position is not retrived', async () => {
    let isInputDisabled = true;
    render(<Search isDisabled={isInputDisabled} />)
    expect(screen.getByTestId('select_ordineprezzo')).toBeDisabled()
})


test('Select search filter distanza di ricerca is disabled if position is not retrived', async () => {
    let isInputDisabled = true;
    render(<Search isDisabled={isInputDisabled} />)
    expect(screen.getByTestId('select_distanzaricerca')).toBeDisabled()
})

test('Search button is disabled if position is not retriver', async () => {
    let isInputDisabled = true;
    render(<Search isDisabled={isInputDisabled} />)
    expect(screen.getByTestId('button_search')).toBeDisabled()
})



test('Select search filter carburante type is enabled if position is retrived', async () => {
    let isInputDisabled = false;
    render(<Search isDisabled={isInputDisabled} />)

    expect(screen.getByTestId('select_carburante')).not.toBeDisabled()
})

test('Select search filter ordine prezzo is enabled if position is retrived', async () => {
    let isInputDisabled = false;
    render(<Search isDisabled={isInputDisabled} />)
    expect(screen.getByTestId('select_ordineprezzo')).not.toBeDisabled()
})


test('Select search filter distanza di ricerca is enabled if position is retrived', async () => {
    let isInputDisabled = false;
    render(<Search isDisabled={isInputDisabled} />)
    expect(screen.getByTestId('select_distanzaricerca')).not.toBeDisabled()
})

test('Search button is enabled if position is retrived', async () => {
    let isInputDisabled = false;
    render(<Search isDisabled={isInputDisabled} />)
    expect(screen.getByTestId('button_search')).not.toBeDisabled()
})