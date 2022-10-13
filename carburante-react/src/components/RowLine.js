import { SignTurnRightFill } from 'react-bootstrap-icons'

function RowLine({ index, row, isSelf, fuelToUse, fuel_price }) {
    String.prototype.limit = function (length) {
        return this.length > length ? (this.substring(0, length) + '...') : this;
    }

    let name = (row.name).limit(7);

    if (!isSelf) {
        //ture
        return (
            <tr key={index} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <td className="text-capitalize text-start">[{row.brand}]<span className="text-capitalize fw-light"> {name} ({((fuelToUse.isSelf) ? (<span className="text-info text-opacity-75">Self</span>) : (<span className="text-secondary text-opacity-75">Servito</span>))})</span></td>
                <td><span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="  petrolstation.insertDate  ">  {fuel_price.slice(0, 4)} <sup className="fw-lighter fw-bold" style={{ fontSize: '10px', display: 'inline-block' }} >   {fuel_price.slice(4, 5)} </sup>€</span></td>
                <td><a target="_blank" href={"http://maps.google.com/?q=" + row.address} type="button" className="btn btn-outline-primary"><SignTurnRightFill /></a></td>
            </tr>
        )
    } else {
        //false
        return (
            <tr key={index} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <td className="text-capitalize text-start">[{row.brand}]<span className="text-capitalize fw-light"> {name}</span></td>
                <td><span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title={row.insertDate}>{fuel_price.slice(0, 4)}<sup className="fw-lighter fw-bold" style={{ fontSize: '10px', display: 'inline-block' }}>  {fuel_price.slice(4, 5)} </sup>€</span></td>
                <td><a target="_blank" href={"http://maps.google.com/?q=" + row.address} type="button" className="btn btn-outline-primary"><SignTurnRightFill /></a></td>
            </tr>
        )

    }

}

export default RowLine;