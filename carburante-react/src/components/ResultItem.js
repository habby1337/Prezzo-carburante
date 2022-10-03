import useState from 'react';
import { SignTurnRightFill } from 'react-bootstrap-icons'


function ResultItem(props) {



    const getPetrolData = (data) => {
        if (props.searchParams != '') {
            const axios = require('axios').default;

            const body_json = JSON.stringify(data);
            const headers = {
                'Content-Type': 'application/json',
                'contentType': 'application/json',

                'mode': 'cors',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT,DELETE',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            };
            axios.post('https://carburanti.mise.gov.it/ospzApi/search/zone', body_json, { headers })
                .then(response => this.setState({ articleId: response.data.id }));
        } else
            return;
    }

    getPetrolData(props.searchParams);

    return (<>
        <tr style={{ textAlign: 'center', verticalAlign: 'middle' }}>
            <td className="text-capitalize text-start">AGIP<span className="text-capitalize fw-light"> Mario Rossi </span></td>
            <td><span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title=" {insertDate}"> 1,59 <sup className="fw-lighter fw-bold" style={{ fontSize: '10px', display: 'inline-block' }}>  9 </sup>€</span></td>
            <td><a target="_blank" href="http://maps.google.com/?q= {url} " type="button" className="btn btn-outline-primary"><SignTurnRightFill /></a></td>
        </tr>
        {props.searchParams.carburante}
    </>
    );
}

export default ResultItem;