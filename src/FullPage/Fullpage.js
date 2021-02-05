import React, { Component } from 'react'
import AppNavbar from '../features/navbar/Navbar'
import AppTable from '../Table/Table'
import AppForm from '../Form/Form'
import './fullpage.css'
import axios from 'axios'
import {useDispatch, connect} from 'react-redux'
import {DelById, fetchCustomer, fetchMezzi, fetchPrenotazioni} from '../features/navbar/DataSlice'

class Fullpage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            operationop : '',
            dataMod : '',
            buttonOp : ''
        }
    }
/*     dispatch = useDispatch();
    SetFormOperation =(url, op, id)=>{
        if(op === 'elimina'){
            DelById(url,id);
            switch(url){
                case 'utenti':
                    dispatch(fetchCustomer())
                    break;
                case 'mezzi':
                    dispatch(fetchMezzi())
                    break;
                case 'prenotazioni':
                    dispatch(fetchPrenotazioni());
                    break;
                default:
                    console.log("non dovrebbe andare qua")
            }
        }
    }  */
    render(){
        return(
            <div id="main-page">
                <AppNavbar />
                <AppTable onClick={()=>console.log('ciao')}/>
                <AppForm operation={this.state.operationop} dato={this.state.dataMod} button={this.state.buttonOp}/>
            </div>
        )
    }
}


export default Fullpage