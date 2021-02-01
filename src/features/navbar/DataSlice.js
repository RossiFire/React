import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
  data : [],
  error : undefined,
  loading : undefined
}

export const UserSlice = createSlice({
  name: 'dataType',
  initialState,
  reducers: {
    DataReducer : (state = initialState, action) =>{
      switch(action.payload.type){
        case 'FETCH_LOADING':
            return{
              ...state, 
              loading : 'Loading'
            }
        case 'FETCH_SUCCESS':
          return{
            ...state,
            loading : 'Loaded',
            data : action.payload,
          }
        case 'FETCH_ERROR':
          return{
            ...state,
            error : action.payload
          }
        default :
          return{
            ...state,
            data : action.payload,
            error : "case error",
            loading : "case loading"
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
 //   dispatch(FETCH_LOADING())
    dispatch(DataReducer(FETCH_LOADING()))
    axios.get(`http://localhost:8050/utenti/customer`)
    .then(response =>{
  //    dispatch(FETCH_SUCCESS(response.data))
      dispatch(DataReducer(FETCH_SUCCESS(response.data)))
    })
    .catch( (error) =>{
     // dispatch(FETCH_FAIL(error.message))
      dispatch(DataReducer(FETCH_FAIL(error.message)))
    })
  }
}

export const fetchMezzi = () =>{
  return (dispatch) =>{
    dispatch(FETCH_LOADING())
    axios.get(`http://localhost:8050/mezzi/catalogo`)
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
    axios.get(`http://localhost:8050/prenotazioni`)
    .then(response =>{
      dispatch(FETCH_SUCCESS(response.data))
    })
    .catch( (error) =>{
      dispatch(FETCH_FAIL(error.message))
    })
  }
}

export const { DataReducer } = UserSlice.actions
export default UserSlice.reducer;