import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
  data : [],
  error : 'errore default',
  loading : 'loading defult'
}

export const UserSlice = createSlice({
  name: 'dataType',
  initialState,
  reducers: {
    DataReducer : (state = initialState, action) =>{
      switch(action.type){
        case 'FETCH_LOADING':
            return{
              ...state,
              data :[],
              loading : 'loading'
            }
        case 'FETCH_SUCCESS':
          return{
            ...state,
            data : action.payload,
          }
        case 'FETCH_ERROR':
          return{
            ...state,
            data : [],
            error : action.payload
          }
        default :
          return{
            ...state,
            data : state.data,
            error : state.error
          }
      }
    }
  },
});


// -------------------- ACTIONS --------------------//
//------------------------------------------------//

// User Actions
const FETCH_LOADING = () =>{
  return{
    type : 'FETCH_LOADING',

  }
}
const FETCH_SUCCESS = data =>{
  return{
    type : 'FETCH_SUCCESS',
    payload : data
  }
}

const FETCH_FAIL = error =>{
  return{
    type : 'FETCH_ERROR',
    payload : error 
  }
}



// -------------------- THUNK --------------------//
//------------------------------------------------//
export const fetchCustomer = () =>{
  return (dispatch) =>{
    dispatch(FETCH_LOADING())
    axios.get(`http://localhost:8050/utenti/customer`)
    .then(response =>{
      dispatch(FETCH_SUCCESS(response.data))
    })
    .catch( (error) =>{
      dispatch(FETCH_FAIL(error.message))
    })
  }
}

export const fetchMezzi = () =>{
  return (dispatch) =>{
    dispatch(FETCH_LOADING())
    axios.get(`http://localhost:8050/utenti/customer`)
    .then(response =>{
      dispatch(FETCH_SUCCESS(response.data))
    })
    .catch( (error) =>{
      dispatch(FETCH_FAIL(error.message))
    })
  }
}

export const fetchPrenotazioni = () =>{
  return (dispatch) =>{
    dispatch(FETCH_LOADING())
    axios.get(`http://localhost:8050/utenti/customer`)
    .then(response =>{
      dispatch(FETCH_SUCCESS(response.data))
    })
    .catch( (error) =>{
      dispatch(FETCH_FAIL(error.message))
    })
  }
}

export const getMes =(state)=>{ return state.a};
export default UserSlice.reducer;