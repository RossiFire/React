import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import DataReducer from '../features/navbar/DataSlice'
import thunk from 'redux-thunk'

export default configureStore({
  reducer: {
    type : DataReducer
  }
}, 
applyMiddleware(thunk)
);
