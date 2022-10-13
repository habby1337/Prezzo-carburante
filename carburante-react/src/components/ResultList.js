import { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';


import RowLine from './RowLine';
// import Statistics from './Statistics';






function ResultList({ isDisabled, resultPetrolData, fuelType }) {

    const [maxResult, setMaxResult] = useState(5);
    const [listItems, setListItems] = useState([]);

    const handleMaxResult = (e) => {
        setMaxResult(e.target.value);

    }


    useEffect(() => {

        // console.log('resultPetrolData', resultPetrolData);
        // console.log("resultPetrolData hasOwnProperty results", resultPetrolData.lenght > 0);
        // console.log("resultPetrolData diverso da  proxyOff", resultPetrolData !== "proxyOff");

        if (resultPetrolData.hasOwnProperty('results') && resultPetrolData !== "proxyOff") {
            let fuel_combo_selection = fuelType.split('-')
            let is_fuelpump_selfservice, fuel_type_selected;

            // Convert fuel type to correct name
            switch (fuel_combo_selection[0]) {
                case '1':
                    fuel_type_selected = 'Benzina'
                    break;
                case '2':
                    fuel_type_selected = 'Gasolio'
                    break;
                case '3':
                    fuel_type_selected = 'Metano'
                    break;
                case '4':
                    fuel_type_selected = 'GPL'
                    break;
                case '323':
                    fuel_type_selected = 'L-GNC'
                    break;
                case '324':
                    fuel_type_selected = 'GNL'
                    break;
                default:
                    fuel_type_selected = 'Benzina'
                    break;
            }

            //Convert fuel dispenser type to correct value
            switch (fuel_combo_selection[1]) {
                case '1':
                    is_fuelpump_selfservice = true;
                    break;
                case '0':
                    is_fuelpump_selfservice = false;
                    break;
                case 'x':
                    is_fuelpump_selfservice = undefined;
                    break;
                default:
                    is_fuelpump_selfservice = undefined;
                    break;
            }




            const validResults = resultPetrolData
                .results
                .filter(result => result
                    .fuels
                    .some(fuel => fuel.name === fuel_type_selected));


            // const validNResults = validResults.slice(0, maxResult);


            const finalList = validResults
                .map((row, index) => {

                    const fuelToUse = row
                        .fuels
                        .find(fuel =>
                            fuel.name === fuel_type_selected
                        );
                    const fuel_price = fuelToUse.price.toString();

                    if (fuelToUse.isSelf === is_fuelpump_selfservice) {
                        return (<RowLine key={index} index={index} row={row} isSelf={true} fuelToUse={fuelToUse} fuel_price={fuel_price} />)
                    } else if (is_fuelpump_selfservice === undefined) {
                        return (<RowLine key={index} index={index} row={row} isSelf={false} fuelToUse={fuelToUse} fuel_price={fuel_price} />)
                    }


                    // else {
                    //     return (<RowLine key={index} index={index} row={row} isSelf={false} fuelToUse={fuelToUse} fuel_price={fuel_price} />)
                    // }
                })
                .filter(function (e) { return e })



            if (finalList.length > 0) {
                <tr><td colSpan="3">Nessun risultato</td></tr>
            }

            setListItems(finalList.slice(0, maxResult))

        }
        else if (resultPetrolData === "proxyOff" || resultPetrolData.length === 0) {
            setListItems([<tr key="1"><td colSpan="3" className="text-dark text-warning text-center">In questo momento il server backend non sta rispondendo 🥹</td></tr>])
        }
        else {
            setListItems([<tr key="1"><td colSpan="3" className="text-dark text-center">Perfavore, seleziona i criteri
                di ricerca 🫠</td></tr>])
        }
    }, [resultPetrolData, maxResult, fuelType])

    return (
        <>
            <Container className="mt-3">
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <Row>
                                <Col md={8}>
                                    ⛽ Risultati
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="maxresult">Numero risultati</Form.Label>
                                    <Form.Select size="sm" disabled={isDisabled} name="maxresult" onChange={handleMaxResult}>
                                        {/* <option selected disabled value="none">N. Risultati</option> */}
                                        <option defaultValue value="5">5 (🗿)</option>
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value=" 50">50</option>
                                        <option value="100">100 (🥸)</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                            <hr />
                        </Card.Title>
                        <Container>
                            <Table striped hover responsive size="sm">
                                <thead>
                                    <tr>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Prezzo</th>
                                        <th scope="col">📌</th>
                                    </tr>
                                </thead >
                                <tbody>
                                    {listItems}
                                </tbody>
                                <caption>
                                    {/* <Statistics /> */}
                                </caption>
                            </Table>
                        </Container>
                    </Card.Body>
                </Card>

            </Container>
        </>
    );
}

export default ResultList;