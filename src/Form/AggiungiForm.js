import './form.css'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {addCustomer, modCustomer, SelCustomerById, SelectAllCustomer} from '../Table/CustomerSlice'
import {Link} from 'react-router-dom'
import * as _ from 'lodash'
import {fetchCustomerData} from '../Table/CustomerSlice'
import {fetchMezziData} from '../Table/MezziSlice'

function AggiungiForm(props){
    // Initial Declaration
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(()=>fetchCustomerData())
        dispatch(()=>fetchMezziData())
    },[])
    const userData = state.customer.Dati
    const mezziData = state.mezzi.Dati
    const state = useSelector(state => state)
    let isAdding = true;
    let tempUtente
    tempUtente = { id: undefined, nome :undefined, cognome:undefined, tipoutente:{id:0, tipo:undefined}, password : undefined, nascita : undefined}
    let misc = useSelector(state => state.customer)
    let form  

    console.log(userData)
    console.log(mezziData)
    
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
        dispatch(addCustomer(tempUtente))
    }
    if(misc.head){
      form= <div className="form-body">
        {
            misc.head.map(col=>{
                if(col !== 'azioni'){
                    if(col !== 'id'){
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
                            return <select>
                            {userData.map(user=>{
                                return <option value={user.id}>{user.nome}</option>
                            })}  
                            </select>
                        }if(col === 'mezzoPrenotato'){
                            return <select>
                            {mezziData.map(m=>{
                                return <option value={m.id}>{m.casaCostr + " " + m.modello}</option>
                            })}  
                            </select>   
                        }
                         return <input type="text" placeholder={col} value={tempUtente[col]} onChange={(event)=>handleInput(col,event)}></input>
                    }
                    
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