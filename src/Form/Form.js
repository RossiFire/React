import './form.css'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {addCustomer, modCustomer} from '../Table/CustomerSlice'

function AppForm(props){
    const dispatch = useDispatch()
    let misc = useSelector(state => state.customer)
    let form = ""   

    let tempUtente = { id: undefined, nome :'', cognome:'', tipoutente:{id:0, tipo:''}, password : '', nascita : ''}

    const handleInput =(col, event)=>{
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
    const handleClick =()=>{
        console.log(tempUtente)
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
                    if(props.dato){
                            if(col === 'utentePrenotato'){
                                return <input type="text" placeholder={col} value={props.dato[col]['nome']}></input>   
                            }if(col === 'mezzoPrenotato'){
                                return <input type="text" placeholder={col} value={props.dato[col]['casaCostr'] + " " + props.dato[col]['modello']}></input>   
                            }
                            return <input type="text" placeholder={col} value={props.dato[col]}></input>     
                    }else{
                        return <input type="text" placeholder={col} value={tempUtente.col} onChange={(event)=>handleInput(col,event)}></input>
                    }
                }
            })
        }    
        {
            props.button ?(
                <div>
                    <Button variant="warning" onClick={()=>handleClick()}>Modifica</Button>
                </div>
            ) :(
                <div>
                    <Button variant="dark" onClick={()=>handleClick()}>Aggiungi</Button>
                </div>
            )    
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


export default AppForm;