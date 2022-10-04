import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';


import ResultItem from './ResultItem';








function ResultList({ isDisabled, resultData }) {

    const [maxResult, setMaxResult] = useState(5);

    const handleMaxResult = (e) => {
        setMaxResult(e.target.value);

    }


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
                                    {resultData = null ? resultData.slice(0, maxResult).map((item, index) => {
                                        return <ResultItem key={index} item={item} />
                                    }) : <td colspan="3" className="text-dark text-center">Perfavore, seleziona i criteri
                                        di ricerca 🫠</td>}

                                </tbody>

                            </Table>
                        </Container>
                    </Card.Body>
                </Card>

            </Container>
        </>
    );
}

export default ResultList;