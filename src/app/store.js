import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import DataReducer from '../features/navbar/DataSlice'
import thunk from 'redux-thunk'

export default configureStore({
  reducer: {
    counter: counterReducer,
    type : DataReducer
  },
  middleware :{
    thunk : thunk
  }
});
