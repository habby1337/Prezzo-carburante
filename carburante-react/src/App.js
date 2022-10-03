import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import './App.css';

// Components
import Search from './components/Search';

function App() {


  // const [getFormData, setFormDataValues] = useState('');
  const [formDataValues, setFormDataValues] = useState('');

  const getFormData = (data) => {
    setFormDataValues(data);
    console.log(formDataValues)
  }

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
      <Search getFormData={getFormData} />

      {/* Add result components */}
      {/* Add statistics component */}
    </div>
  );
}

export default App;
