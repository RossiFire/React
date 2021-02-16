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

function Table(props){
    let TB = ''
    let data = []
    let sliceData
    const dispatch = useDispatch();
    let dt
    let state = useSelector(state => state);

    //  Checking Customer-Mezzi-Prenotazioni
    switch(props.match.url.split("/")[1]){
        case 'customer':
            dt = state.customer
            break;
        case 'parcoauto':
            dt = state.mezzi
            break;
        case 'prenotazioni':
            dt = state.prenotazioni
            break;
        default:
            dt = state.customer
            break;
    }

    data = dt.Dati

    if(dt.head){
        if(data.length > 6){
            sliceData = _.cloneDeep(data.slice(0,6))
        }else{
            sliceData = _.cloneDeep(data)
        }

    /// FUNZIONE PER ORDINARE
    const OrderById = ()=>{
        sliceData = _.orderBy(sliceData, ['id'],['asc'])
    }

    TB =
    <div>
        <Button onClick={()=>OrderById()}>Ordina</Button>
    <table>
        <thead>
        <tr key={nanoid()}>
            {dt.head.map(col => <th key={col}>{col}</th>)}
        </tr>
        </thead>
        <tbody>
            {sliceData.map((dato) => 
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
                        switch(props.match.url.split("/")[1]){
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
                                return <td key={nanoid}>
                                <Link to={`/prenotazioni/${dato['id']}`}>
                                    <Button variant="warning" key={nanoid()}>Modifica</Button>
                                </Link>
                                <Button variant="danger" key={nanoid()} onClick={()=>dispatch(delPrenotazione(dato['id']))}>Elimina</Button>
                                </td>
                                break;
                            default:
                                dt = state.customer
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