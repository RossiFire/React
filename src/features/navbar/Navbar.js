import React, { useState, useEffect } from 'react';
import './navbar.css'
import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux';
import {fetchCustomer, fetchMezzi, fetchPrenotazioni, DataReducer} from './DataSlice'
import {Navbar, ToggleButton, NavbarBrand, Collapse, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


export function AppNavbar({ fetchCustomer, fetchMezzi, fetchPrenotazioni, data }){
    const dispatch = useDispatch()
    return(
        <div>
            <Navbar expand="sm" className="navbar">
                <Navbar.Brand href="#home">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link><button onClick={() => dispatch(()=>fetchCustomer())}>Customer</button></Nav.Link>
                    <Nav.Link><button onClick={() => dispatch(()=>fetchMezzi())}>Parco auto</button></Nav.Link>
                    <Nav.Link><button onClick={() => dispatch(()=>fetchPrenotazioni())}>Prenotazioni</button></Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>


            <Table data={data}/>
        </div>

            )
}

export function Table(){
    const dt = useSelector(state => state.type)
    let TB = ''
    if(dt.data.head){
    TB =
    <table>
        <thead>
        <tr>
            {dt.data.head.map(col => <th key={col}>{col}</th>)}
        </tr>
        </thead>
        <tbody>
            {dt.data.payload.map(col => 
            <tr>{dt.data.head.map(dato => 
                <td key={dato[col]}>{dato[col]}</td>)}
            </tr>)}
        </tbody>
    </table>
    }

    return(
        <div className="AppTable">
            {  dt.loading ? <p>Loading...</p>
             : dt.error ? <p>Errore</p>
             : TB
            }
        </div>
    )
}



const MapStateToProps = state =>{
    return{
        data : state.type
    }
}
const MapDispatchProps = dispatch =>{
    return{
        fetchCustomer : ()=> dispatch(fetchCustomer()),
        fetchMezzi : ()=> dispatch(fetchMezzi()),
        fetchPrenotazioni : ()=> dispatch(fetchPrenotazioni())
    }
}
export default connect(MapStateToProps, MapDispatchProps)(AppNavbar);