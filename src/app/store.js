import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import DataSlice from '../features/navbar/DataSlice'
import thunk from 'redux-thunk'
import ProvaSlice from '../Table/ProvaSlice'
import CustomerSlice from '../Table/CustomerSlice'

export default configureStore({
  reducer: {
    DataSlice : DataSlice,
    ProvaSlice :ProvaSlice,
    CustomerSlice : CustomerSlice
  }
}, 
applyMiddleware(thunk)
);
