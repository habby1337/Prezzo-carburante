import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';


// Validation
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

function Search(props) {
    // { getFormData, isDisabled, gpsStatus }


    // Form validation
    const yupValidation = Yup.object().shape({
        carburante: Yup.mixed().required('🙏🏻 Perfavore, seleziona un tipo di carburante').notOneOf(['null', 'Tipo di Carburante']),
        ordineprezzo: Yup.mixed().required('🙏🏻 Perfavore, seleziona l\'ordine di visualizzazione prezzi.').notOneOf(['null', 'Ordine Prezzo']),
        distanzaricerca: Yup.number().required('🙏🏻 Perfavore, inserisci la distanza di ricerca.'),
    })
    const formOptions = { resolver: yupResolver(yupValidation) }
    const { register, handleSubmit, reset, formState } = useForm(formOptions)
    const { errors } = formState

    function onSubmit(data) {
        return props.getFormData(data)
        // return setFormDataValues(JSON.stringify(data, null, 4))

    }



    return (
        <Container className="mt-3">
            <Card>
                <Card.Body>
                    <Card.Title>
                        Ricerca
                        {/* <Row >
                            <Col sm={8}>Ricerca</Col>

                        </Row> */}

                    </Card.Title>

                    <Card.Subtitle className="mb-2 text-muted fs-6">
                        <p className="fs-6">{props.gpsStatus}</p>
                        <hr />
                    </Card.Subtitle>
                    <Container>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col>
                                    <Form.Select size="sm" disabled={props.isDisabled} name="carburante" className={`form-control ${errors.carburante ? 'is-invalid' : ''}`}
                                        {...register('carburante')}>
                                        <option defaultValue="none" selected disabled>Tipo di Carburante</option>
                                        <option value="1-x">Benzina (Tutti)</option>
                                        <option value="1-1">Benzina (Self)</option>
                                        <option value="1-0">Benzina (Servito)</option>
                                        <option disabled value="none"></option>
                                        <option value="2-x">Gasolio (Tutti)</option>
                                        <option value="2-1">Gasolio (Self)</option>
                                        <option value="2-0">Gasolio (Servito)</option>
                                        <option disabled value="none"></option>
                                        <option value="3-x">Metano (Tutti)</option>
                                        <option value="3-1">Metano (Self)</option>
                                        <option value="3-0">Metano (Servito)</option>
                                        <option disabled value="none"></option>
                                        <option value="4-x">GPL (Tutti)</option>
                                        <option value="4-1">GPL (Self)</option>
                                        <option value="4-0">GPL (Servito)</option>
                                        <option disabled value="none"></option>
                                        <option value="323-x">L-GNC (Tutti)</option>
                                        <option value="323-1">L-GNC (Self)</option>
                                        <option value="323-0">L-GNC (Servito)</option>
                                        <option disabled value="none"></option>
                                        <option value="324-x">GNL (Tutti)</option>
                                        <option value="324-1">GNL (Self)</option>
                                        <option value="324-0">GNL (Servito)</option>

                                    </Form.Select>
                                    <small className="invalid-feedback">{errors.carburante?.message}</small>
                                    {/* <small className="form-text text-danger visually-hidden">🙏🏻 Perfavore, seleziona un tipo di carburante.</small> */}
                                </Col>
                                <Col>
                                    <Form.Select size="sm" disabled={props.isDisabled} name="ordineprezzo" className={`form-control ${errors.ordineprezzo ? 'is-invalid' : ''}`}
                                        {...register('ordineprezzo')}>
                                        <option defaultValue="none" selected disabled>Ordine Prezzi</option>
                                        <option value="asc">📈 Crescente</option>
                                        <option value="desc">📉 Decrescente</option>
                                    </Form.Select>
                                    <small className="invalid-feedback">{errors.ordineprezzo?.message}</small>
                                    {/* <small className="form-text text-danger visually-hidden">🙏🏻 Perfavore, seleziona l'ordine di visualizzazione prezzi.</small> */}
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col>
                                    <Form.Select size="sm" disabled={props.isDisabled} name="distanzaricerca" className={`form-control ${errors.distanzaricerca ? 'is-invalid' : ''}`}
                                        {...register('distanzaricerca')}>
                                        <option defaultValue="none" selected disabled>Distanza di Ricerca</option>
                                        <option value="1000"> 1Km (🆘)
                                        </option>
                                        <option value="3000"> 3Km (😱)
                                        </option>
                                        <option value="5000"> 5Km (😨)
                                        </option>
                                        <option value="10000"> 10Km (😐)
                                        </option>
                                        <option value="20000"> 20Km (🤷🏻‍♂️)
                                        </option>
                                        <option value="50000"> 50Km (👋🏼)
                                        </option>

                                    </Form.Select>
                                    {/* <small className="form-text text-danger">🙏🏻 Perfavore, seleziona la distanza di ricerca.</small> */}
                                    <small className="invalid-feedback">{errors.distanzaricerca?.message}</small>
                                </Col>
                            </Row>
                            <div className="mx-auto btn-lg text-center pt-3">
                                <Button type="submit" variant="outline-primary" disabled={props.isDisabled} >Ricerca 🔎</Button>
                            </div>
                        </form>
                    </Container>
                </Card.Body>
            </Card>

        </Container>
    )
}

export default Search