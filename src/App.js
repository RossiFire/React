import {React} from 'react';
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


function App() {
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
          <Route path="/aggiungi" exact component={AggiungiForm}/>
        </Switch>
      </div>
    </Router>
  )
}



export default App;
