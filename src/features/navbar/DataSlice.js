import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
  data : [],
  error : undefined,
  loading : undefined,
  head : [],
  typeData : undefined
}

export const DataSlice = createSlice({
  name: 'DataSlice',
  initialState,
  reducers: {
    DataReducer : (state = initialState, action) =>{
      switch(action.payload.type){
        case 'FETCH_LOADING':
            return{
              ...state, 
              loading : 'Loading',
              data : action.payload
            }
        case 'FETCH_SUCCESS':
          return{
            ...state,
            loading : undefined,
            data : action.payload,
            head : action.head,
            typeData : action.typeData
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
  }
});


// -------------------- ACTIONS --------------------//
//------------------------------------------------//

// User Actions
const FETCH_LOADING = () =>{
  return{
    type : 'FETCH_LOADING',
    payload : [],
    head : []
  }
}
const FETCH_SUCCESS = (data, head, TypeData) =>{
  return{
    type : 'FETCH_SUCCESS',
    payload : data,
    head : head,
    typeData : TypeData
  }
}

const FETCH_FAIL = error =>{
  return{
    type : 'FETCH_ERROR',
    payload : error 
  }
}

// FINE ACTION //


// -------------------- THUNK --------------------//
//------------------------------------------------//
export const fetchCustomer = () =>{
  return (dispatch) =>{
    dispatch(DataReducer(FETCH_LOADING()))
    axios.get(`http://localhost:8050/utenti/customer`)
    .then(response =>{
      dispatch(DataReducer(FETCH_SUCCESS(response.data, ['id','nome','cognome','nascita','password','azioni'], 'utenti')))
    })
    .catch( (error) =>{
      dispatch(DataReducer(FETCH_FAIL(error.message)))
    })
  }
}

export const fetchMezzi = () =>{
  return (dispatch) =>{
    dispatch(DataReducer(FETCH_LOADING()))
    axios.get(`http://localhost:8050/mezzi/catalogo`)
    .then(response =>{
      dispatch(DataReducer(FETCH_SUCCESS(response.data, ['id','casaCostr','tipomezzo','modello','targa','azioni'], 'mezzi')))
    })
    .catch( (error) =>{
      dispatch(DataReducer(FETCH_FAIL(error.message)))
    })
  }
}

export const fetchPrenotazioni = () =>{
  return (dispatch) =>{
    dispatch(DataReducer(FETCH_LOADING()))
    axios.get(`http://localhost:8050/prenotazioni`)
    .then(response =>{
      dispatch(DataReducer(FETCH_SUCCESS(response.data, ['id','approvata','dataInizio','dataFine','utentePrenotato', 'mezzoPrenotato','azioni'], 'prenotazioni')))
    })
    .catch((error) =>{
      dispatch(DataReducer(FETCH_FAIL(error.message)))
    })
  }
}


export const SelById = (state, datoId) =>{ state.DataReducer.data.find(dato => dato['id'] === datoId)}
export const SelectAll = state => state.DataReducer.data


export const { CustomerReducer, CustomerAdded, CustomerUpdated } = DataSlice.actions
export const { DataReducer } = DataSlice.actions
export default DataSlice.reducer;
