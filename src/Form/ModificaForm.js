import './form.css'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {addCustomer, modCustomer, SelCustomerById, SelectAllCustomer} from '../Table/CustomerSlice'
import {Link} from 'react-router-dom'
import * as _ from 'lodash'

function ModificaForm(props){
    // Initial Declaration
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    let tempUtente = SelCustomerById(state,props.match.params.id) 
    let misc = useSelector(state => state.customer)
    let form  
    let [ModelUtente, setDato] = useState(tempUtente)
    
        //controllo utente-mezzi-prenotazioni
        //console.log(props.match.url.split("/")[1])

    const handleInput = (col, e)=>{
        switch(col){
            case 'tipoutente':
                if(parseInt(e.target.value) === 1){
                    ModelUtente[col]['id'] = parseInt(e.target.value)
                    ModelUtente[col]['tipo'] = "ADMIN"
                }else{
                    ModelUtente[col]['id'] = parseInt(e.target.value)
                    ModelUtente[col]['tipo'] = "CUSTOMER"
                }
                break
            case 'id':
                ModelUtente[col] = parseInt(e.target.value)
                break
            default :
                setDato(e.target.value)
                break
        }
    }

    const handleModifica = ()=>{
        console.log(ModelUtente)
        //dispatch(addCustomer(tempUtente));
    }
    if(misc.head){
      form= <div className="form-body">
        {
            misc.head.map(col=>{
                if(col !== 'azioni' || col !== 'id'){
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
                    
                     return <input type="text" placeholder={col} value={ModelUtente[col]} onChange={(event)=>handleInput(col,event)}></input>
                    
                }
            })
        }    
        {
            <div>
               <Link to="/"><Button variant="dark" onClick={()=>handleModifica()}>Modifica</Button></Link>
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