import './form.css'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function AppForm(props){
    let misc = useSelector(state => state.customer)
    let form = ""   

    let [nome, setNome] = useState('')
    let [cognome, setCogome] = useState('')
    let [password, setPassword] = useState('')
    let [tipoutente, setTipoutente] = useState(0)
    let [nascita, setNascita] = useState('')

    let tempUtente = { id: '', nome :'', cognome:'', tipoutente:{id:0, tipo:''}, password : '', nascita : ''}

    const handleInput =(col, event)=>{
        console.log(tempUtente)
        console.log(event.target.value)
        tempUtente[col] = event.target.value 
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
                        return  <div><input type="radio" name="tipoutente" value="1" />
                        <label for="admin">Admin</label><br/>
                        <input type="radio" name="tipoutente" value="2" />
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
                    <Button variant="warning">Modifica</Button>
                </div>
            ) :(
                <div>
                    <Button variant="dark">Aggiungi</Button>
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