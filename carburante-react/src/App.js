import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


// import './App.css';

// Components
import Search from './components/Search';
import ResultList from './components/ResultList';

function App() {

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [gpsStatus, setGpsStatus] = useState(null);
  const [isInputDisabled, setIsInputDisabled] = useState(true);



  const getLocation = () => {
    if (!navigator.geolocation) {
      setGpsStatus('La geolocalizzazione non è supportata da questo browser, non puoi usare l\'applicazione. 😭');
    } else {

      if (!navigator.permissions) {
        setGpsStatus('Le API di permessi non sono supportate da questo browser, non puoi usare l\'applicazione. 😭');
      }
      else {
        new Promise((resolve, reject) => {
          navigator.permissions.query({ name: 'geolocation' })
            // console.log('navigator.permissions.query({ name: \'geolocation\' })', navigator.permissions.query({ name: 'geolocation' }))
            .then(function (permissionStatus) {

              if (permissionStatus.state === 'granted') {

                setGpsStatus('❓ Recuperando la tua posizione 🛰️...');

                navigator.geolocation.getCurrentPosition((position) => {
                  setIsInputDisabled(false)
                  setGpsStatus('📍Posizione recuperata!');
                  setLat(position.coords.latitude);
                  setLng(position.coords.longitude);

                }, () => {
                  setGpsStatus('Impossibile recuperare la tua posizione');
                }, { maximumAge: 5000, timeout: 80000, enableHighAccuracy: true });

                resolve();
              }
              else if (permissionStatus.state === 'prompt') {
                setGpsStatus('❗Per recuperare la posizione devi consentire la geolocalizzazione');
                // setGpsStatus('❓ Recuperando la tua posizione 🛰️...');

                navigator.geolocation.getCurrentPosition((position) => {
                  setIsInputDisabled(false)
                  setGpsStatus('📍Posizione recuperata!');
                  setLat(position.coords.latitude);
                  setLng(position.coords.longitude);
                  resolve();
                })
              }
              else {
                setGpsStatus('Per usare l\'applicazione devi abilitare la geolocalizzazione');

                reject();
              }
            }, (err) => {
              getLocation()
            });
        })

      }
    }
  }

  // Called upon component mount
  useEffect(() => {
    getLocation();
  }, []);


  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#">⛽Costo Carburante</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">

            </Nav>
            <Nav>
              <Nav.Link href="https://www.tensi.dev">Tensi.dev</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Add main search components */}
      <Search lat={lat} lng={lng} gpsStatus={gpsStatus} isDisabled={isInputDisabled} />

    </div>
  );
}

export default App;
