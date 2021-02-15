import React, { useEffect } from 'react';
import './navbar.css'
import { useDispatch } from 'react-redux';
import {Navbar, Nav, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {fetchCustomerData} from '../../Table/CustomerSlice'
import {fetchMezziData} from '../../Table/MezziSlice'
import {fetchPrenotazioniData} from '../../Table/PrenotazioniSlice'
import {Link} from 'react-router-dom'

export function AppNavbar(){
    const dispatch = useDispatch()
    return(
        <div>
            <Navbar expand="sm" className="navbar">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link><Link to="/customer"><button onClick={() =>dispatch(()=>dispatch(fetchCustomerData()))}>Customer</button></Link></Nav.Link>
                    <Nav.Link><Link to="/parcoauto"><button onClick={() =>dispatch(()=>dispatch(fetchMezziData()))}>Parco auto</button></Link></Nav.Link>
                    <Nav.Link><Link to="/prenotazioni"><button onClick={() =>dispatch(()=>dispatch(fetchPrenotazioniData()))}>Prenotazioni</button></Link></Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>

            )
}

export default AppNavbar;