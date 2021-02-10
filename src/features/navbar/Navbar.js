import React, { useEffect } from 'react';
import './navbar.css'
import Table from '../../Table/Table'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux';
import { CustomerReducer, MezziReducer, PrenotazioniReducer,} from '../../Table/ProvaSlice'
import {Navbar, Nav, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {fetchCustomerData} from '../../Table/CustomerSlice'
import {Link} from 'react-router-dom'

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
                    <Nav.Link><Link to="/"><button onClick={() =>dispatch(()=>dispatch(fetchCustomerData()))}>Customer</button></Link></Nav.Link>
                    <Nav.Link><Link><button>Parco auto</button></Link></Nav.Link>
                    <Nav.Link><button onClick={() => dispatch(()=>console.log('o'))}>Prenotazioni</button></Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>

            )
}

export default AppNavbar;