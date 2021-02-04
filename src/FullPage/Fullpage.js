import React, { Component } from 'react'
import AppNavbar from '../features/navbar/Navbar'
import AppTable from '../Table/Table'
import AppForm from '../Form/Form'
import './fullpage.css'
import axios from 'axios'
import {useDispatch, connect} from 'react-redux'

class Fullpage extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            operation : '',
            userMod : undefined,
            buttonOp : undefined
        }
    }
/*     SetFormOperation(url, id, op){
            axios.get(`http://localhost:8050/${url}/singolo/${id}`)
            .then(response=>{
                this.setState({
                    ...this.state,
                    operation : url,
                    dataMod : response.data,
                    buttonOp : op
                })
            })
            .catch(error=>{
                console.log(error)
            })
    } */

    render(){
        return(
            <div id="main-page">
                <AppNavbar />
                <AppTable /* onClick={(op, id)=>this.SetFormOperation(op, id)} *//>
                <AppForm operation={this.state.operationop} dato={this.state.dataMod} button={this.state.buttonOp}/>
            </div>
        )
    }
}


export default Fullpage