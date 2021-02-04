import './form.css'
import React from 'react'
import { useSelector } from 'react-redux'
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function AppForm(props){
    let tipo = useSelector(state => state.type)
    let form = undefined   

    if(tipo.data.head){
      form= <div className="form-body">
        {
            tipo.data.head.map(col=>{
                if(col !== 'azioni'){
                    if(props.user){
                        return <div>
                                <input type="text" placeholder={col} value={props.user[col]}></input>
                                </div>
                    }else{
                        return <input type="text" placeholder={col}></input>
                    }
                }
            })
        }  
           <br/> <Button variant="warning">Modifica</Button>
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