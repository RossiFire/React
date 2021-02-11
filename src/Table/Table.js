import React, { Component, useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {delCustomer, OrderById, fetchCustomerData} from '../Table/CustomerSlice'
import './table.css'
import * as _ from 'lodash'
import {Link} from 'react-router-dom'
import {nanoid} from 'nanoid'

function Table(){

    let TB = ''
    let sliceData;
    const dispatch = useDispatch();
    let dt
    let data = []
    useEffect(()=>{
        dispatch(fetchCustomerData())
    },[])
    data = useSelector(state => state.customer.Dati)
    
    dt = useSelector(state => state.customer)

    if(dt.head){
        if(data.length > 6){
            sliceData = data.slice(0,6)
        }else{
            sliceData = data
        }

        /// FUNZIONE PER ORDINARE DA FARE

    function OrderById(){
        console.log(sliceData)
        sliceData =_.orderBy(sliceData, ['id'],['asc'])
        console.log(sliceData)
    }
    TB =
    <div>
        <Button onClick={()=>OrderById()}>Ordina</Button>
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
                    }
                    if(col === 'azioni'){
                        return <td>
                        <Link to={`/customer/${dato['id']}`}>
                            <Button variant="warning">Modifica</Button>
                        </Link>
                        <Button variant="danger" onClick={()=>dispatch(delCustomer(dato['id']))}>Elimina</Button>
                        </td>
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