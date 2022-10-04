import { useEffect, useState } from 'react';
import { SignTurnRightFill } from 'react-bootstrap-icons'



function ResultItem(props) {

    return (
        <tr>
            <td>.name</td>
            <td>.address</td>
            <td>.price</td>

        </tr>
    )
}


//     // <tr style={{ textAlign: 'center', verticalAlign: 'middle' }}>
//     //     <td className="text-capitalize text-start">AGIP<span className="text-capitalize fw-light"> Mario Rossi </span></td>
//     //     <td><span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title=" {insertDate}"> 1,59 <sup className="fw-lighter fw-bold" style={{ fontSize: '10px', display: 'inline-block' }}>  9 </sup>€</span></td>
//     //     <td><a target="_blank" href="http://maps.google.com/?q= {url} " type="button" className="btn btn-outline-primary"><SignTurnRightFill /></a></td>
//     // </tr>
//     // {props.searchParams.carburante}









export default ResultItem;