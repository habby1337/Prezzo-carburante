import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';


// Validation
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ResultList from './ResultList';


// Function
import getCircleFromPoint from '../modules/getCircleFromPoint';
import getArrayOfCircleOfPoints from '../modules/getArrayOfCircleOfPoints';

function Search({ gpsStatus, isDisabled, lat, lng }) {

    const [resultData, setResultData] = useState({});
    const [formData, setFormData] = useState();
    const [isFirstCall, setIsFirstCall] = useState(true);

    // Form validation
    const yupValidation = Yup.object().shape({
        carburante: Yup.mixed().required('🙏🏻 Perfavore, seleziona un tipo di carburante').notOneOf(['null', 'Tipo di Carburante', '0'], '🙏🏻 Perfavore, seleziona un tipo di carburante'),
        ordineprezzo: Yup.mixed().required('🙏🏻 Perfavore, seleziona l\'ordine di visualizzazione prezzi.').oneOf(['asc', 'desc'], '🙏🏻 Perfavore, seleziona l\'ordine di visualizzazione prezzi.'),
        distanzaricerca: Yup.number().required('🙏🏻 Perfavore, seleziona la distanza di ricerca.').notOneOf(['Distanza di Ricerca', '0', 'null', 0], '🙏🏻 Perfavore, seleziona la distanza di ricerca.')
    })
    const formOptions = { resolver: yupResolver(yupValidation) }
    const { register, handleSubmit, formState } = useForm(formOptions) //reset,
    const { errors } = formState

    function onSubmit(data) {

        setIsFirstCall(false)
        // calculate position and points
        let poinList = getCircleFromPoint(lat, lng, data.distanzaricerca);
        let pointArray = getArrayOfCircleOfPoints(poinList); //Converts array with the correct api requested format 

        setFormData(data);
        // Prepare data body
        let body_data = {
            points: pointArray,
            fuelType: data.carburante,
            priceOrder: data.ordineprezzo
        }

        new Promise((resolve, reject) => {
            getPetrolData(body_data, resolve, reject)
        })
    }

    useEffect(() => {
        if (isFirstCall) {
            setResultData([])
        }

    }, [isFirstCall])

    function getPetrolData(jsonDataRequest, resolve, reject) {

        const axios = require('axios').default;
        const body_json = JSON.stringify(jsonDataRequest);
        const headers = {
            'Content-Type': 'application/json',
            'contentType': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT,DELETE',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'

        }
        axios.post('http://localhost:8000/https://carburanti.mise.gov.it/ospzApi/search/zone', body_json, { headers: headers })
            .then(function (response) {

                setResultData(response.data)
                return resolve();
            })
            .catch(function (error) {
                // console.log(error);
                setResultData("proxyOff")
                return resolve(error);
            });

    }






    return (
        <>
            <Container className="mt-3">
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Ricerca
                        </Card.Title>

                        <Card.Subtitle className="mb-2 text-muted fs-6">
                            <p className="fs-6">{gpsStatus}</p>
                            <hr />
                        </Card.Subtitle>
                        <Container>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col>
                                        <Form.Select data-testid='select_carburante' size="sm" disabled={isDisabled} name="carburante" className={`form-control ${errors.carburante ? 'is-invalid' : ''}`}
                                            {...register('carburante')}>
                                            <option defaultValue value="0">Tipo di Carburante</option>
                                            <option value="1-x">Benzina (Tutti)</option>
                                            <option value="1-1">Benzina (Self)</option>
                                            <option value="1-0">Benzina (Servito)</option>
                                            <option disabled value="0"></option>
                                            <option value="2-x">Gasolio (Tutti)</option>
                                            <option value="2-1">Gasolio (Self)</option>
                                            <option value="2-0">Gasolio (Servito)</option>
                                            {/* <option disabled value="0"></option>
                                            <option value="3-x">Metano (Tutti)</option>
                                            <option value="3-1">Metano (Self)</option>
                                            <option value="3-0">Metano (Servito)</option>
                                            <option disabled value="0"></option>
                                            <option value="4-x">GPL (Tutti)</option>
                                            <option value="4-1">GPL (Self)</option>
                                            <option value="4-0">GPL (Servito)</option>
                                            <option disabled value="0"></option>
                                            <option value="323-x">L-GNC (Tutti)</option>
                                            <option value="323-1">L-GNC (Self)</option>
                                            <option value="323-0">L-GNC (Servito)</option>
                                            <option disabled value="0"></option>
                                            <option value="324-x">GNL (Tutti)</option>
                                            <option value="324-1">GNL (Self)</option>
                                            <option value="324-0">GNL (Servito)</option> */}

                                        </Form.Select>
                                        <small data-testid="select_carburante_message" className="invalid-feedback">{errors.carburante?.message}</small>
                                    </Col>
                                    <Col>
                                        <Form.Select data-testid='select_ordineprezzo' size="sm" disabled={isDisabled} name="ordineprezzo" className={`form-control ${errors.ordineprezzo ? 'is-invalid' : ''}`}
                                            {...register('ordineprezzo')}>
                                            <option defaultValue="0">Ordine Prezzi</option>
                                            <option value="asc">📈 Crescente</option>
                                            <option value="desc">📉 Decrescente</option>
                                        </Form.Select>
                                        <small data-testid="select_ordineprezzo_message" className="invalid-feedback">{errors.ordineprezzo?.message}</small>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        <Form.Select data-testid='select_distanzaricerca' size="sm" disabled={isDisabled} name="distanzaricerca" className={`form-control ${errors.distanzaricerca ? 'is-invalid' : ''}`}
                                            {...register('distanzaricerca')}>
                                            <option defaultValue value="0">Distanza di Ricerca</option>
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
                                        <small data-testid="select_distanzaricerca_message" className="invalid-feedback">{errors.distanzaricerca?.message}</small>
                                    </Col>
                                </Row>
                                <div className="mx-auto btn-lg text-center pt-3">
                                    <Button data-testid="button_search" type="submit" variant="outline-primary" disabled={isDisabled} >Ricerca 🔎</Button>
                                </div>
                            </form>
                        </Container>
                    </Card.Body>
                </Card>

            </Container>
            <ResultList resultPetrolData={isFirstCall ? 0 : resultData} fuelType={isFirstCall ? 0 : formData.carburante} />
        </>
    )
}

export default Search