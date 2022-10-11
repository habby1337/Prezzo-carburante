import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import Search from './Search';


test('loads and displays search', async () => {
    render(<Search />)

    // expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText('Ricerca')).toBeInTheDocument()
    // expect(screen.getByRole('button', { name: /cerca/i })).toBeInTheDocument()
})

describe('Verify search filter with getopostion not retrived', () => {

    //verifica filtri ricerca siano disabilitati se la posizione non è stata recuperata

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
})

//Verifica filtri ricerca se la posizione è stata recuperata
describe('verify search filter with geo position retrived', () => {
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
})

//Verifica funzonamento controlli su input non selezionati

test('expect to be an error message if select carburante has not been changed', async () => {
    let isInputDisabled = false;
    render(<Search isDisabled={isInputDisabled} />)

    await act(() => {
        userEvent.click(screen.getByTestId('button_search'))
    })

    expect(screen.getByTestId('select_carburante')).toHaveClass('is-invalid')
    expect(screen.getByTestId('select_carburante_message')).toBeInTheDocument()
    expect(screen.getByText('🙏🏻 Perfavore, seleziona un tipo di carburante')).toBeInTheDocument()
})

test('expect to be an error message if select ordine prezzo has not been changed', async () => {
    let isInputDisabled = false;
    render(<Search isDisabled={isInputDisabled} />)

    await act(() => {
        userEvent.click(screen.getByTestId('button_search'))
    })
    expect(screen.getByTestId('select_ordineprezzo')).toHaveClass('is-invalid')
    expect(screen.getByTestId('select_ordineprezzo_message')).toBeInTheDocument()
    expect(screen.getByText('🙏🏻 Perfavore, seleziona l\'ordine di visualizzazione prezzi.')).toBeInTheDocument()
})

test('expect to be an errore message if select distanza di ricerca has not been changed', async () => {
    let isInputDisabled = false;
    render(<Search isDisabled={isInputDisabled} />)

    await act(() => {
        userEvent.click(screen.getByTestId('button_search'))
    })
    expect(screen.getByTestId('select_distanzaricerca')).toHaveClass('is-invalid')
    expect(screen.getByTestId('select_distanzaricerca_message')).toBeInTheDocument()
    expect(screen.getByText('🙏🏻 Perfavore, seleziona la distanza di ricerca.')).toBeInTheDocument()
})

//Check search functionality