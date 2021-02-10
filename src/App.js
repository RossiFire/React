import {React} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import './App.css';
import AppNavbar from './features/navbar/Navbar';
import AppTable from './Table/Table'
import AppForm from './Form/Form'


function App() {
  return (
    <Router>
      <div className="App">
      <AppNavbar />
        <Switch>
          <Route path="/" exact component={AppTable} />
          <Route path="/customer/:id" exact component={AppForm} />
          <Route path="/aggiungi" exact component={AppForm}/>
        </Switch>
      </div>
    </Router>
  )
}



export default App;
