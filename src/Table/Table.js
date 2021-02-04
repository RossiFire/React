import React, { Component, useEffect } from 'react'
import { useSelector} from 'react-redux';
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './table.css'

function Table(props){
    let TB = ''
    let sliceData;
    let tbOperation = useSelector(state => state.type.data.typeData)

    const dt = useSelector(state => state.type)
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
                        return <td key={Math.random() *(200 - 1)+ 1}>{dato[col]['tipo']}</td>
                    }if(col === 'utentePrenotato'){
                        return <td key={Math.random() *(200 - 1)+ 1}>{dato[col]['nome']}</td>
                    }
                    if(col === 'mezzoPrenotato'){
                        return <td key={Math.random() *(200 - 1)+ 1}>{dato[col]['casaCostr']} {dato[col]['modello']}</td>
                    }if(col === 'approvata'){
                        if(dato[col])
                            return <td key={Math.random() *(200 - 1)+ 1}>Si</td>
                        return <td key={Math.random() *(200 - 1)+ 1}>No</td>
                    }
                    if(col === 'azioni'){
                        return <td>
                        <Button variant="warning" onClick={()=>props.onClick(tbOperation,dato['id'], 'modifica')}>Modifica</Button>
                        <Button variant="danger" onClick={()=>props.onClick('Elimina',dato['id'])}>Elimina</Button>
                        </td>
                    }
                    return <td key={Math.random() *(200 - 1)+ 1}>{dato[col]}</td>
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