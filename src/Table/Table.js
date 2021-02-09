import React, { Component, useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {delCustomer, OrderById} from '../Table/CustomerSlice'
import './table.css'
import axios from 'axios'

function Table(props){
    let TB = ''
    let sliceData;
    let tbOperation = useSelector(state => state.customer.Dati)
    const dispatch = useDispatch();
    

    // dt : array di oggetti
    const dt = useSelector(state => state.customer)
    let custoData = useSelector(state => state.customer.Dati)
    if(dt.head){
        if(dt.Dati.length > 6){
            sliceData = dt.Dati.slice(0,6)
        }else{
            sliceData = dt.Dati
        }

        /// FUNZIONE PER ORDINARE DA FARE
    TB =
    <div>
        <Button onClick={()=>dispatch(()=>OrderById(custoData))}>Ordina</Button>
    <table>
        <thead>
        <tr>
            {dt.head.map(col => <th key={col}>{col}</th>)}
        </tr>
        </thead>
        <tbody>
            {sliceData.map((dato) => 
            <tr>
                {dt.head.map(col =>{
                    if(col === 'tipomezzo'){
                        return <td key={Math.random() *100}>{dato[col]['tipo']}</td>
                    }if(col === 'utentePrenotato'){
                        return <td key={Math.random() *100}>{dato[col]['nome']}</td>
                    }
                    if(col === 'mezzoPrenotato'){
                        return <td key={Math.random() *100}>{dato[col]['casaCostr']} {dato[col]['modello']}</td>
                    }if(col === 'approvata'){
                        if(dato[col])
                            return <td key={Math.random() *100}>Si</td>
                        return <td key={Math.random() *100}>No</td>
                    }if(col === 'tipoutente'){
                        return <td key={Math.random() *100}>{dato[col]['tipo']}</td>
                    }
                    if(col === 'azioni'){
                        return <td>
                        {/* <Button variant="warning" onClick={()=>props.onClick(tbOperation,dato['id'], 'modifica')}>Modifica</Button> */}
                        <Button variant="danger" onClick={()=>dispatch(delCustomer(dato['id']))}>Elimina</Button>
                        </td>
                    }
                    return <td key={Math.random() *100}>{dato[col]}</td>
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