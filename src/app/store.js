import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'
import ProvaSlice from '../Table/ProvaSlice'
import CustomerSlice from '../Table/CustomerSlice'

export default configureStore({
  reducer: {
    ProvaSlice :ProvaSlice,
    customer : CustomerSlice
  }
}, 
applyMiddleware(thunk)
);
