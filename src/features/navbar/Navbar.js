import React from 'react';
import './navbar.css'
import { useDispatch } from 'react-redux';
import {Navbar, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {fetchCustomerData} from '../../Table/CustomerSlice'
import {fetchMezziData} from '../../Table/MezziSlice'
import {fetchPrenotazioniData} from '../../Table/PrenotazioniSlice'
import {Link} from 'react-router-dom'
import CustomerPage from '../Customer/CustomerPage'

export function AppNavbar(){
    const dispatch = useDispatch()
    return(
        <div>
            <Navbar expand="sm" className="navbar">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link to="/customer"><button>Customer</button></Link>
                    <Link to="/parcoauto"><button>Parco auto</button></Link>
                    <Link to="/prenotazioni"><button>Prenotazioni</button></Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>

            )
}

export default AppNavbar;