import React, { Component } from 'react'
import { useSelector} from 'react-redux';
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './table.css'
import AppForm from '../Form/Form'

function Table(){
    let TB = ''
    let sliceData;

    function prova(id){
        console.log(id);
    }

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
                        return <td key={dato[col]}>{dato[col]['tipo']}</td>
                    }if(col === 'utentePrenotato'){
                        return <td key={dato[col]}>{dato[col]['nome']}</td>
                    }
                    if(col === 'mezzoPrenotato'){
                        return <td key={dato[col]}>{dato[col]['casaCostr']} {dato[col]['modello']}</td>
                    }if(col === 'approvata'){
                        if(dato[col])
                            return <td key={dato[col]}>Si</td>
                        return <td key={dato[col]}>No</td>
                    }
                    if(col === 'azioni'){
                        return <td><Button variant="warning" onClick={()=>prova(dato['id'])}>Modifica</Button> <Button variant="danger" onClick={()=>prova(dato['id'])}>Elimina</Button></td>
                    }
                    return <td key={dato[col]}>{dato[col]}</td>
                }
                )}
            </tr>
            )}
        </tbody>
    </table>
    <AppForm />
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