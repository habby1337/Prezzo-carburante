import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
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



describe('Geolocation result text message testing', () => {
    test('Geolocation is not supported', async () => {
        // render(<App />)
        render(<App />)

        expect(screen.getByText('La geolocalizzazione non è supportata da questo browser, non puoi usare l\'applicazione. 😭')).toBeInTheDocument()
        // expect(global.navigator).not.toHaveProperty('geolocation')
    })

    test('geolocation is supported but not allowed', async () => {
        let mockGeolocation = {
            getCurrentPosition: jest.fn().mockReturnValueOnce({ coords: { latitude: 1, longitude: 1 } }),
            // watchPosition: jest.fn()
        };

        const mockPermission = {
            geolocation: {
                state: 'denied',
            }
        }

        global.navigator.geolocation = mockGeolocation;
        global.navigator.permissions = mockPermission;

        // console.log(global.navigator)

        render(<App />)

        expect(screen.getByText('Per usare l\'applicazione devi abilitare la geolocalizzazione')).toBeInTheDocument()
    })

    test('geolocation is supported and allowed and its recovering', async () => {

        let mockPermission = {
            geolocation: {
                state: 'granted',
            }
        }


        global.navigator.permissions = mockPermission;

        render(<App />)
        expect(screen.getByText('❓ Recuperando la tua posizione 🛰️...')).toBeInTheDocument()


        // render(<App />)

        // expect(screen.getByText('❓ Recuperando la tua posizione 🛰️...')).toBeInTheDocument()
        // render(<App />)



    })

    test('geolocation is supported and allowed', async () => {
        let mockGeolocation = {
            getCurrentPosition: jest.fn().mockResolvedValue(Promise.resolve({ coords: { latitude: 1, longitude: 1 } })),
        }

        let mockPermission = {
            geolocation: {
                state: 'granted',
            }
        }

        global.navigator.geolocation = mockGeolocation;

        global.navigator.permissions = mockPermission;

        render(<App />)

        await setTimeout(() => {
            expect(screen.getByText('📍Posizione recuperata!')).toBeInTheDocument()
        }, 82000);

    })
})

