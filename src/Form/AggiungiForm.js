import './form.css'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {addCustomer, modCustomer, SelCustomerById, SelectAllCustomer} from '../Table/CustomerSlice'
import {Link} from 'react-router-dom'
import * as _ from 'lodash'

function AggiungiForm(props){
    // Initial Declaration
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    let isAdding = true;
    let tempUtente = { id: undefined, nome :'', cognome:'', tipoutente:{id:0, tipo:''}, password : '', nascita : ''}
    let misc = useSelector(state => state.customer)
    let form  
    
    const handleInput = (col, event)=>{
        switch(col){
            case 'tipoutente':
                if(parseInt(event.target.value) === 1){
                    tempUtente[col]['id'] = parseInt(event.target.value)
                    tempUtente[col]['tipo'] = "ADMIN"
                }else{
                    tempUtente[col]['id'] = parseInt(event.target.value)
                    tempUtente[col]['tipo'] = "CUSTOMER"
                }
                break;
            case 'id':
                tempUtente[col] = parseInt(event.target.value)
                break;
            default :
                tempUtente[col] = event.target.value 
                break
        }
    }

    const handleAggiunta =()=>{
        dispatch(addCustomer(tempUtente));
    }
    if(misc.head){
      form= <div className="form-body">
        {
            misc.head.map(col=>{
                if(col !== 'azioni'){
                    if(col === 'tipomezzo'){
                        return   <div><input type="radio" name="tipomezzo" value="1" />
                        <label for="male">Minivan</label><br/>
                        <input type="radio" name="tipomezzo" value="2" />
                        <label for="female">Autoveicolo</label><br/>
                        <input type="radio" name="tipomezzo" value="3" />
                        <label for="other">Furgone</label>
                        <input type="radio" name="tipomezzo" value="4" />
                        <label for="other">SUV</label></div>
                    }if(col === 'tipoutente'){
                        return  <div><input type="radio" name="tipoutente" value="1"  onClick={(event)=>handleInput(col,event)} />
                        <label for="admin">Admin</label><br/>
                        <input type="radio" name="tipoutente" value="2" onClick={(event)=>handleInput(col,event)}/>
                        <label for="customer">Customer</label><br/></div>
                    }
                    if(col === 'utentePrenotato'){
                        return <input type="text" placeholder={col} value={props.dato[col]['nome']}></input>   
                    }if(col === 'mezzoPrenotato'){
                        return <input type="text" placeholder={col} value={props.dato[col]['casaCostr'] + " " + props.dato[col]['modello']}></input>   
                    }
                   /*  return <input type="text" placeholder={col} value={props.dato[col]}></input>      */
                    
                     return <input type="text" placeholder={col} value={tempUtente[col]} onChange={(event)=>handleInput(col,event)}></input>
                    
                }
            })
        }    
        {
                <div>
                   <Link to="/"><Button variant="warning" onClick={()=>handleAggiunta()}>Aggiungi</Button></Link>
                </div> 
        }
        </div>
    }else{
        form = null
    }
    
    return(
        <div className="form">
           {form}
        </div>
    )

}


export default AggiungiForm;