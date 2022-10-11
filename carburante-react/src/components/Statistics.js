import axios from 'axios';
import DOMParser from 'react-native-html-parser';

function Statistics() {

    const getStatistics = () => {
        new Promise((resolve, reject) => {
            const axios = require('axios').default;
            const headers = {
                'Content-Type': 'application/json',
                'contentType': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT,DELETE',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'

            }

            axios.get('http://localhost:8000/https://dgsaie.mise.gov.it/prezzi-settimanali-carburanti', { headers: headers })
                .then(function (response) {
                    // console.log(response.data);
                    // const html = response.data;
                    // const parser = new DOMParser.DOMParser();
                    // const parsed = parser.parseFromString(html, 'text/html');
                    // let test = html.getElementsByAttribute('class', 'table');

                    // console.log(test);

                    // let benzina = stats[1].outerText;
                    // let benzina_variazione = stats[1].dataset.title;

                    // let gasolio = stats[3].outerText;
                    // let gasolio_variazione = stats[3].dataset.title;

                    // let gpl = stats[5].outerText;
                    // let gpl_variazione = stats[5].dataset.title;

                    resolve()

                    return (<></>
                        // <>
                        //     <span className="fw-bold">🔄️ Variazione Prezzi Settimanali</span><span className="fw-light">(€/1.000 L)</span> :
                        //     <span className="fw-semibold"> Benzina:</span> <span className="fw-light text-secondary"> {benzina} </span> <span className="fw-lighter text-muted">({benzina_variazione})</span>
                        //     | <span className="fw-semibold">Gasolio:</span> <span className="fw-light text-secondary">{gasolio}</span> <span className="fw-lighter text-muted">({gasolio_variazione})</span>
                        //     | <span className="fw-semibold">GPL</span>: <span className="fw-light text-secondary">{gpl}</span> <span className="fw-lighter text-muted">({gpl_variazione})</span>
                        // </>
                    )
                })
                .catch(function (error) {
                    return reject(error);
                });
        })
    }

    return (
        <span id='loader' className="fw-bold text-info">
            <div className="d-grid gap-2 col-6 mx-auto">
                <a type="button" id='updateStats'
                    className="btn btn-outline-dark" onClick={getStatistics}>👀 Visualizza le
                    statistiche
                    settimanali.</a>
            </div>

        </span>

    )





}
export default Statistics;