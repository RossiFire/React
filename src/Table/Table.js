import React, { Component, useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {delCustomer} from '../Table/CustomerSlice'
import {delMezzo} from '../Table/MezziSlice'
import {delPrenotazione} from '../Table/PrenotazioniSlice'
import './table.css'
import * as _ from 'lodash'
import {Link} from 'react-router-dom'
import {nanoid} from 'nanoid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSortAmountDownAlt, faSortAmountUp, faSortAlphaUp, faSortAlphaDown} from '@fortawesome/free-solid-svg-icons'

function Table(props){
    let TB = ''
    const dispatch = useDispatch()
    let dt = props.data
    if(dt.head){    
        const handleOrderASC =()=>{
            props.OrderAsc()
        }
        const handleOrderDESC =()=>{
            props.OrderDesc()
        }

        TB =
        <div>
            <div className="buttons">
            <button onClick={()=>handleOrderASC()}><FontAwesomeIcon icon={faSortAmountDownAlt} /></button>
            <button onClick={()=>handleOrderDESC()}><FontAwesomeIcon icon={faSortAmountUp} /></button>
        </div>
        <table>
            <thead>
            <tr key={nanoid()}>
                {dt.head.map(col => <th key={col}>{col}</th>)}
            </tr>
            </thead>
            <tbody>
                {dt.Dati.map((dato) => 
                <tr key={nanoid()}>
                    {dt.head.map(col =>{
                        if(col === 'tipomezzo'){
                            return <td key={nanoid()}>{dato[col]['tipo']}</td>
                        }if(col === 'utentePrenotato'){
                            return <td key={nanoid()}>{dato[col]['nome']}</td>
                        }
                        if(col === 'mezzoPrenotato'){
                            return <td key={nanoid()}>{dato[col]['casaCostr']} {dato[col]['modello']}</td>
                        }if(col === 'approvata'){
                            if(dato[col])
                                return <td key={nanoid()}>Si</td>
                            return <td key={nanoid()}>No</td>
                        }if(col === 'tipoutente'){
                            return <td key={nanoid()}>{dato[col]['tipo']}</td>
                        }if(col === 'dataInizio' || col === 'dataFine'){
                            return <td key={nanoid()}>{dato[col].split('T')[0]}</td>
                        }
                        if(col === 'azioni'){
                            switch(props.url){
                                case 'customer':
                                    return <td key={nanoid()}>
                                    <Link to={`/customer/${dato['id']}`}>
                                        <Button variant="warning" key={nanoid()}>Modifica</Button>
                                    </Link>
                                    <Button variant="danger" key={nanoid()} onClick={()=>dispatch(delCustomer(dato['id']))}>Elimina</Button>
                                    </td>
                                case 'parcoauto':
                                    return <td key={nanoid()}>
                                    <Link to={`/parcoauto/${dato['id']}`}>
                                        <Button variant="warning" key={nanoid()}>Modifica</Button>
                                    </Link>
                                    <Button variant="danger" key={nanoid()} onClick={()=>dispatch(delMezzo(dato['id']))}>Elimina</Button>
                                    </td>
                                case 'prenotazioni':
                                    return <td key={nanoid()}>
                                    <Link to={`/prenotazioni/${dato['id']}`}>
                                        <Button variant="warning" key={nanoid()}>Modifica</Button>
                                    </Link>
                                    <Button variant="danger" key={nanoid()} onClick={()=>dispatch(delPrenotazione(dato['id']))}>Elimina</Button>
                                    </td>
                                    break;
                                default:
                                    break;
                            }
                        }
                        return <td key={nanoid()}>{dato[col]}</td>
                    }
                    )}
                </tr>
                )}
            </tbody>
        </table>
        </div>
    }
    
    return(
        <div className="AppTable">
            {  dt.loading ? <p>Loading...</p>
             : dt.error ? <p>Errore</p>
             : TB
            }
        </div>
        
    )
}




export default Table;