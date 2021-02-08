import React, { useEffect } from 'react';
import './navbar.css'
import Table from '../../Table/Table'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux';
import {fetchCustomer, fetchMezzi, fetchPrenotazioni} from './DataSlice'
import { CustomerReducer, MezziReducer, PrenotazioniReducer,} from '../../Table/ProvaSlice'
import {Navbar, Nav, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {fetchCustomerData} from '../../Table/CustomerSlice'

export function AppNavbar({ fetchCustomer, fetchMezzi, fetchPrenotazioni }){
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchCustomerData())
    })
    return(
        <div>
            <Navbar expand="sm" className="navbar">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                   {/*  <Nav.Link><button onClick={() => dispatch(()=>fetchCustomer())}>Customer</button></Nav.Link>
                    <Nav.Link><button onClick={() => dispatch(()=>fetchMezzi())}>Parco auto</button></Nav.Link>
                    <Nav.Link><button onClick={() => dispatch(()=>fetchPrenotazioni())}>Prenotazioni</button></Nav.Link> */}
                     <Nav.Link><button onClick={() =>dispatch(()=>console.log('ok'))}>Customer</button></Nav.Link>
                    <Nav.Link><button onClick={() => dispatch(()=>fetchMezzi())}>Parco auto</button></Nav.Link>
                    <Nav.Link><button onClick={() => dispatch(()=>fetchPrenotazioni())}>Prenotazioni</button></Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Table/>
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