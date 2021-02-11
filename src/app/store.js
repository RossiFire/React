import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'
import ProvaSlice from '../Table/ProvaSlice'
import CustomerSlice from '../Table/CustomerSlice'
import MezziSlice from '../Table/MezziSlice'
import PrenotazioniSlice from '../Table/PrenotazioniSlice'

export default configureStore({
  reducer: {
    mezzi :MezziSlice,
    customer : CustomerSlice,
    prenotazioni : PrenotazioniSlice
  }
}, 
applyMiddleware(thunk)
);
