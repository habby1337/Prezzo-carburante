function getPetrolData(jsonDataRequest) {

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
            // handle success
            // console.log(response.data);
            return response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

export default getPetrolData;