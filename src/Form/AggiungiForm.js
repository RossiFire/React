import './form.css'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {addCustomer, modCustomer, SelCustomerById, SelectAllCustomer} from '../Table/CustomerSlice'
import {Link} from 'react-router-dom'
import * as _ from 'lodash'
import {fetchCustomerData} from '../Table/CustomerSlice'
import {fetchMezziData, addMezzo} from '../Table/MezziSlice'
import { addPrenotazione } from '../Table/PrenotazioniSlice'

function AggiungiForm(props){
    // Initial Declaration
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    dispatch(()=>fetchCustomerData())
    dispatch(()=>fetchMezziData())
    const userData = state.customer.Dati
    const mezziData = state.mezzi.Dati
    let [tempDato, setDato] = useState()
    let misc
    let form  
    let backUrl
    let addFunction

    switch(props.match.url.split("/")[2]){
        case 'customer':
            misc = state.customer
            backUrl = "/customer"
            addFunction = addCustomer(tempDato)
            break
        case 'parcoauto':
            misc = state.mezzi
            backUrl = "/parcoauto"
            addFunction = addMezzo(tempDato)
            break
        case 'prenotazioni':
            misc = state.prenotazioni
            backUrl = "/prenotazioni"
            addFunction = addPrenotazione(tempDato)
            break
        default :
            console.log('non dovrebbe entrare qua')
            break
    } 
    
    
    const handleInput = (event, col)=>{
       // console.log(event.target.value)
       let selectVal = document.getElementById(col)
       if(selectVal.hasChildNodes()){
           if(col === 'approvata'){
            setDato(({
                ...tempDato,
                [col] : selectVal.value
            }))
           }else{
               setDato(({
                   ...tempDato,
                   [col] : {id : parseInt(selectVal.value)}
               }))
           }
       }else{
        setDato(({
            ...tempDato,
            [col] : event.target.value
        }))
       }
    }

    const handleAggiunta =()=>{
        console.log(tempDato)
        dispatch(addFunction)
    }
    if(misc.head){
      form= <div className="form-body">
        {
            misc.head.map(col=>{
                if(col !== 'azioni'){
                    if(col !== 'id'){
                        if(col === 'tipomezzo'){
                            return <div><h4>Tipo mezzo</h4><select id={col} onChange={(event)=>handleInput(event,col)}>
                                <option value="1">Minivan</option>
                                <option value="2">Autoveicolo</option>
                                <option value="3">Furgone</option>
                                <option value="4">Suv</option>
                            </select></div>
                        }if(col === 'tipoutente'){
                            return <div><h4>Tipo utente</h4><select id={col} onChange={(event)=>handleInput(event,col)}>
                                <option value="1" >Admin</option>
                                <option value="2" >Customer</option>
                            </select></div>
                        }
                        if(col === 'utentePrenotato'){
                            return <div><h4>Utente</h4><select id={col} onChange={(event)=>handleInput(event,col)}>
                            {userData.map(user=>{
                                return <option value={user.id}>{user.nome}</option>
                            })}  
                            </select></div>
                        }if(col === 'mezzoPrenotato'){
                            return <div><h4>Mezzo</h4><select id={col} onChange={(event)=>handleInput(event,col)}>
                            {mezziData.map(m=>{
                                return <option value={m.id}>{m.casaCostr + " " + m.modello}</option>
                            })}  
                            </select></div>
                        }if(col === 'approvata'){
                            return <div><p>Approvata</p><select id={col} onChange={(event)=>handleInput(event,col)}>
                            <option value="true" >Si</option>
                            <option value="false" >No</option>
                        </select></div>
                        }
                         return <input type="text" id={col} placeholder={col} onChange={(event)=>handleInput(event,col)}></input>
                    }
                    
                }
            })
        }    
        {
                <div>
                   <Link to={backUrl}><Button variant="warning" onClick={()=>handleAggiunta()}>Aggiungi</Button></Link>
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