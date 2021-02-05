import React, { Component, useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './table.css'
import axios from 'axios'
import {fetchCustomer, fetchMezzi, fetchPrenotazioni} from '../features/navbar/DataSlice'

function Table(props){
    let TB = ''
    let sliceData;
    let tbOperation = useSelector(state => state.DataSlice.data.typeData)
    const dispatch = useDispatch();
    
    //eliminazione di un dato in base all'id
    const DeleteById=(id)=>{
        axios.get(`http://localhost:8050/${tbOperation}/elimina/${id}`)
        .then(()=>{
            switch(tbOperation){
                case 'utenti':
                    dispatch(fetchCustomer())
                    console.log("utenti")
                    break;
                case 'mezzi':
                    dispatch(fetchMezzi())
                    console.log("mezzi")
                    break;
                case 'prenotazioni':
                    dispatch(fetchPrenotazioni())
                    console.log("prenot")
                    break;
                default:
                    console.log("def")
                    alert("Errore")
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }

    // dt : array di oggetti
    const dt = useSelector(state => state.DataSlice)
    if(dt.data.head){
    sliceData = dt.data.payload.slice(0,6)
    TB =
    <div>
    <table>
        <thead>
        <tr>
            {dt.data.head.map(col => <th key={col}>{col}</th>)}
        </tr>
        </thead>
        <tbody>
            {sliceData.map((dato) => 
            <tr>
                {dt.data.head.map(col =>{
                    if(col === 'tipomezzo'){
                        return <td key={dato['id']+dato[col]}>{dato[col]['tipo']}</td>
                    }if(col === 'utentePrenotato'){
                        return <td key={dato['id']+dato[col]}>{dato[col]['nome']}</td>
                    }
                    if(col === 'mezzoPrenotato'){
                        return <td key={dato['id']+dato[col]}>{dato[col]['casaCostr']} {dato[col]['modello']}</td>
                    }if(col === 'approvata'){
                        if(dato[col])
                            return <td key={dato['id']+dato[col]}>Si</td>
                        return <td key={dato['id']+dato[col]}>No</td>
                    }
                    if(col === 'azioni'){
                        return <td>
                        <Button variant="warning" onClick={()=>props.onClick(tbOperation,dato['id'], 'modifica')}>Modifica</Button>
                        <Button variant="danger" onClick={()=>DeleteById(dato['id'])}>Elimina</Button>
                        </td>
                    }
                    return <td key={dato['id']+dato[col]}>{dato[col]}</td>
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