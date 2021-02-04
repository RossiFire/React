import React, { Component } from 'react'
import AppNavbar from '../features/navbar/Navbar'
import AppTable from '../Table/Table'
import AppForm from '../Form/Form'
import './fullpage.css'
import axios from 'axios'

class Fullpage extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            operation : '',
            userMod : undefined
        }
    }

    SetFormOperation(op, id){
        axios.get(`http://localhost:8050/utenti/singolo/${id}`)
        .then(response=>{
            this.setState({
                operation : op,
                userMod : response
            })
        })
        .catch(error=>{
            console.log(error)
        })
    }

    render(){
        return(
            <div id="main-page">
                <AppNavbar />
                <AppTable onClick={(op, id)=>this.SetFormOperation(op, id)}/>
                <AppForm operation={this.state.operationop} user={this.state.userMod}/>
            </div>
        )
    }
}

export default Fullpage