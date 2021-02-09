import React, { Component } from 'react'
import AppNavbar from '../features/navbar/Navbar'
import AppTable from '../Table/Table'
import AppForm from '../Form/Form'
import './fullpage.css'
import axios from 'axios'
import {useDispatch, connect} from 'react-redux'

function Fullpage(){
        return(
            <div id="main-page">
                <AppNavbar />
                <AppTable onClick={()=>console.log('ciao')}/>
                <AppForm/>
            </div>
        )
}


export default Fullpage