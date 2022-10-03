import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


import './App.css';

// Components
import Search from './components/Search';
import ResultList from './components/ResultList';

function App() {

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [gpsStatus, setGpsStatus] = useState(null);
  const [isInputDisabled, setIsInputDisabled] = useState(true);

  // const [getFormData, setFormDataValues] = useState('');
  const [formDataValues, setFormDataValues] = useState('');



  const getFormData = (data) => {
    setFormDataValues(data);
    // console.log(formDataValues)
  }

  const getLocation = () => {
    if (!navigator.geolocation) {
      setGpsStatus('Geolocation is not supported by your browser');
    } else {
      setGpsStatus('Recuperando...');
      navigator.geolocation.getCurrentPosition((position) => {
        setIsInputDisabled(false)
        setGpsStatus('📍Posizione recuperata!');
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, () => {
        setGpsStatus('Impossibile recuperare la tua posizione');
      }, { maximumAge: 5000, timeout: 50000, enableHighAccuracy: true });
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
              <Nav.Link href="https://www.tensi.dev">Home site</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Add main search components */}
      <Search getFormData={getFormData} isDisabled={isInputDisabled} gpsStatus={gpsStatus} />

      {/* Add result components */}
      <ResultList searchParams={formDataValues} isDisabled={isInputDisabled} />
      {/* Add statistics component */}
    </div>
  );
}

export default App;
