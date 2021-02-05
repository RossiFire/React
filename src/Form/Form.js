import './form.css'
import React from 'react'
import { useSelector } from 'react-redux'
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function AppForm(props){
    let tipo = useSelector(state => state.DataSlice)
    let form = ""   

    if(tipo.data.head){
      form= <div className="form-body">
        {
            tipo.data.head.map(col=>{
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
                    }
                    if(props.dato){
                            if(col === 'utentePrenotato'){
                                return <input type="text" placeholder={col} value={props.dato[col]['nome']}></input>   
                            }if(col === 'mezzoPrenotato'){
                                return <input type="text" placeholder={col} value={props.dato[col]['casaCostr'] + " " + props.dato[col]['modello']}></input>   
                            }
                            return <input type="text" placeholder={col} value={props.dato[col]}></input>     
                    }else{
                        return <input type="text" placeholder={col}></input>
                    }
                }
            })
        }    
        {
            props.button ?(
                <div>
                    <Button variant="warning">Modifica</Button>
                    <h2>{props.button}</h2>
                </div>
            ) :(
                <div>
                    <Button variant="dark">Aggiungi</Button>
                    <h2>{props.button}</h2>
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