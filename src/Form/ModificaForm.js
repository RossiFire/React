import './form.css'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from 'react-router-dom'
import * as _ from 'lodash'
import {fetchCustomerData, SelCustomerById} from '../Table/CustomerSlice'
import {fetchMezziData, SelMezzoById} from '../Table/MezziSlice'
import {fetchPrenotazioniData, SelPrenotazioniById} from '../Table/PrenotazioniSlice'

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
    let modelDato

        //controllo utente-mezzi-prenotazioni
        switch(props.match.url.split("/")[1]){
            case 'customer':
                misc = state.customer
                tempDato = SelCustomerById(state,props.match.params.id) 
                break
            case 'parcoauto':
                misc = state.mezzi
                tempDato = SelMezzoById(state,props.match.params.id) 
                break
            case 'prenotazioni':
                misc = state.prenotazioni
                tempDato = SelPrenotazioniById(state, props.match.params.id)
                break
            default :
                console.log('non dovrebbe entrare qua')
                break
        } 

    modelDato = _.cloneDeep(tempDato)
    const handleInput = (col, event) =>{
        console.log(event.target.value)
        if(col === 'tipoutente'){
            modelDato[col]['id'] = parseInt(event.target.value)
        }else if(col === 'id'){
            modelDato[col]['id'] = parseInt(event.target.value)
        }else{
            modelDato[col] = event.target.value
            console.log(modelDato)
        }
    }

    
    

    const handleModifica = ()=>{
        //dispatch(addCustomer(tempUtente));
        console.log(modelDato)
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
                        }if(col === 'approvata'){
                            return  <div><input type="radio" name="approvata" value="true"  onClick={(event)=>handleInput(col,event)} />
                            <label for="approvata">Si</label><br/>
                            <input type="radio" name="approvata" value="false"  onClick={(event)=>handleInput(col,event)} />
                            <label for="approvata">No</label><br/></div>
                        }
                         return <input type="text" placeholder={col} value={modelDato.col} onChange={(event)=>handleInput(col,event)}></input>
                    }
                    
                }
            })
        }    
        {
            <div>
               <Button variant="dark" onClick={()=>handleModifica()}>Modifica</Button>
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