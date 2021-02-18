import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'
import CustomerSlice from '../features/Customer/CustomerSlice'
import MezziSlice from '../features/Mezzi/MezziSlice'
import PrenotazioniSlice from '../features/Prenotazioni/PrenotazioniSlice'

export default configureStore({
  reducer: {
    mezzi :MezziSlice,
    customer : CustomerSlice,
    prenotazioni : PrenotazioniSlice
  }
}, 
applyMiddleware(thunk)
);
