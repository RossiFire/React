import './form.css'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from 'react-router-dom'
import * as _ from 'lodash'
import {fetchCustomerData, SelCustomerById, modCustomer} from '../Table/CustomerSlice'
import {fetchMezziData, SelMezzoById, modMezzo} from '../Table/MezziSlice'
import {fetchPrenotazioniData, SelPrenotazioniById, modPrenotazione} from '../Table/PrenotazioniSlice'

function ModificaForm(props){
    // Initial Declaration
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    let form  
    const userData = state.customer.Dati
    const mezziData = state.mezzi.Dati
    dispatch(()=>fetchMezziData())
    dispatch(()=>fetchCustomerData())
    let misc
    let tempDato
    let backUrl
        //controllo utente-mezzi-prenotazioni
        switch(props.match.url.split("/")[1]){
            case 'customer':
                misc = state.customer
                tempDato = SelCustomerById(state,props.match.params.id) 
                backUrl = "/customer"
                break
            case 'parcoauto':
                misc = state.mezzi
                tempDato = SelMezzoById(state,props.match.params.id) 
                backUrl = "/parcoauto"
                break
            case 'prenotazioni':
                misc = state.prenotazioni
                tempDato = SelPrenotazioniById(state, props.match.params.id)
                backUrl = "/prenotazioni"
                break
            default :
                console.log('non dovrebbe entrare qua')
                break
        } 
    let [modelDato, setDato] = useState(tempDato)


    
    // input changing
    const handleInput = (event, col) =>{
        var select
        var selValue
        switch(col){
            case 'tipoutente':
                select = document.getElementById("tipoutente");
                selValue = select.value; 
                setDato(()=>({
                      ...modelDato,
                      ['tipoutente'] : {id : parseInt(selValue), tipo : ''}
                    }))
                    break;
            case 'tipomezzo':
                select = document.getElementById("tipomezzo");
                selValue = select.value; 
                setDato(()=>({
                  ...modelDato,
                  ['tipomezzo'] : {id : parseInt(selValue), tipo : ''}
                }))
                break;
            case 'utentePrenotato':
                select = document.getElementById("utentePrenotato");
                selValue = select.value; 
                setDato(()=>({
                  ...modelDato,
                  ['utentePrenotato'] : {id : parseInt(selValue)}
                }))
                break;
            case 'mezzoPrenotato':
                select = document.getElementById("mezzoPrenotato");
                selValue = select.value; 
                setDato(()=>({
                  ...modelDato,
                  ['mezzoPrenotato'] : {id : parseInt(selValue)}
                }))
                break;
            case 'mezzoPrenotato':
                select = document.getElementById("approvata");
                selValue = select.value; 
                setDato(()=>({
                  ...modelDato,
                  ['approvata'] : {id : selValue}
                }))
                break;
            default : 
                setDato(()=>({
                    ...modelDato,
                    [col] : event.target.value,
                }))
                break;
            }
    }

    // ON submit
    const handleModifica = ()=>{
        var select;
        var selValue
        misc.head.map(col=>{
            switch(col){
                case 'tipoutente':
                    select = document.getElementById("tipoutente");
                    selValue = select.value; 
                    let tipo
                    if(selValue === 1){
                        tipo = "CUSTOMER"
                    }else{
                        tipo = "ADMIN"
                    }
                    setDato(()=>({
                        ...modelDato,
                        ['tipoutente'] : {id : parseInt(selValue), tipo : tipo}
                    }))
                  break;
                case 'tipomezzo':
                    select = document.getElementById("tipomezzo");
                    selValue = select.value; 
                    setDato(()=>({
                      ...modelDato,
                      ['tipomezzo'] : {id : parseInt(selValue), tipo : ''}
                    }))
                    break;
                case 'utentePrenotato':
                    select = document.getElementById("utentePrenotato");
                    selValue = select.value; 
                    setDato(()=>({
                      ...modelDato,
                      ['utentePrenotato'] : {id : parseInt(selValue)}
                    }))
                    break;
                case 'mezzoPrenotato':
                    select = document.getElementById("mezzoPrenotato");
                    selValue = select.value; 
                    setDato(()=>({
                      ...modelDato,
                      ['mezzoPrenotato'] : {id : parseInt(selValue)}
                    }))
                    break;
                default : 
                    setDato(()=>({
                        ...modelDato,
                        [col] : document.getElementsByName(col).value
                    }))
                    break;
            }
        })
        console.log(modelDato)
        switch(props.match.url.split("/")[1]){
            case 'customer':
                dispatch(modCustomer(modelDato))
                break;
            case 'parcoauto':
                    dispatch(modMezzo(modelDato))
                break
            case 'prenotazioni':
                    dispatch(modPrenotazione(modelDato))
                break
            default :
                console.log('non dovrebbe entrare qua')
                break;
        } 
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
                         return <input type="text" placeholder={col} name={col} value={modelDato[col]} onChange={(event)=>handleInput(event,col)}></input>
                    }
                    
                }
            })
        }    
        {
            <div>
               <Link to={backUrl}><Button variant="dark" onClick={()=>handleModifica()}>Modifica</Button></Link>
               <Link to="/aggiungi"><Button variang="white">Resetta</Button></Link>
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


export default ModificaForm;