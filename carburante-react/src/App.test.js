import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
// import Adapter from 'enzyme-adapter';
import App from './App';

// configure({ adapter: new Adapter() });
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
    const anchor = screen.getByRole('link', { name: /Tensi.dev/i })
    expect(anchor).toHaveAttribute('href', 'https://www.tensi.dev')


    // expect(screen.getByText('Tensi')).toBeInTheDocument()
})

test('Navbar is responsive', async () => {
    render(<App />)

    await userEvent.click(screen.getByRole('button', { name: /toggle navigation/i }))
    await screen.findByRole('navigation')

    expect(screen.getByRole('navigation')).toBeInTheDocument()
})


describe('Retrive geo posiotion', () => {
    it('retrives coordinates', async () => {
        const navigator = {
            geolocation: true
        }


        const wrapper = shallow(<App />);
        expect(wrapper.geoLocation()).toBe(true)

    })
})


