import React, {Component, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import './App.css';
import AppNavbar from './features/navbar/Navbar';
import AppTable from './Table/Table'
import AggiungiForm from './Form/AggiungiForm'
import ModificaForm from './Form/ModificaForm'
import {SelCustomerById} from './Table/CustomerSlice'
import {SelMezzoById} from './Table/MezziSlice'
import {SelPrenotazioniById} from './Table/PrenotazioniSlice'
import {useDispatch, connect, useSelector} from 'react-redux'


function App(){
    return (
      <Router>
        <div className="App">
        <AppNavbar />
          <Switch>
            {/* <Route path="/" exact component={AppTable} /> */}
            <Route path="/customer" exact component={AppTable} />
            <Route path="/parcoauto" exact component={AppTable} />
            <Route path="/prenotazioni" exact component={AppTable} />
            <Route path="/customer/:id" exact component={ModificaForm} />
            <Route path="/parcoauto/:id" exact component={ModificaForm} />
            <Route path="/prenotazioni/:id" exact component={ModificaForm} />
            <Route path="/aggiungi/customer" exact component={AggiungiForm}/>
            <Route path="/aggiungi/parcoauto" exact component={AggiungiForm}/>
            <Route path="/aggiungi/prenotazioni" exact component={AggiungiForm}/>
          </Switch>
        </div>
      </Router>
    )
}



export default App;
