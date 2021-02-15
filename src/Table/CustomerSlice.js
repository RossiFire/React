import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import * as _ from 'lodash'

const initialState ={
    Dati : [],
    stato : 'zero',
    head : ['id','nome','cognome','nascita','tipoutente','password','azioni']
}


// ASYNC THUNK
export const fetchCustomerData = createAsyncThunk('customer/fetchCustomer', async () => {
    const response = await axios.get('http://localhost:8050/utenti/customer')
    return response.data
  })

export const addCustomer = createAsyncThunk('customer/add', async utente =>{
    const response = await axios.post("http://localhost:8050/utenti/aggiungi", utente)
    return response.data
})

export const modCustomer = createAsyncThunk('customer/mod', async utente =>{
    const response = await axios.post(`http://localhost:8050/utenti/modifica`, utente)
    return response.data
})

export const delCustomer = createAsyncThunk('customer/del', async id =>{
    await axios.get(`http://localhost:8050/utenti/elimina/${id}`)
})


export const CustomerSlice = createSlice({
    name : 'customer',
    initialState,
    reducers:{},
    extraReducers:{
        [fetchCustomerData.pending]: (state,action)=> {
            state.stato = 'loading'
        },
        [fetchCustomerData.fulfilled] : (state,action)=>{
            state.stato = 'success'
            state.Dati = action.payload;
        },
        [fetchCustomerData.rejected] : (state)=>{
            state.stato = 'failed'
        },
        [addCustomer.fulfilled] : (state,action)=>{
            state.Dati.push(action.payload)
        },
        [modCustomer.fulfilled] : (state,action)=>{
            state.Dati = _.reject(state.Dati, {'id' : action.payload['id']})
            console.log(action.payload)
            state.Dati.push(action.payload)
        },
        [delCustomer.fulfilled] : (state,action)=>{
            state.Dati = _.reject(state.Dati, {'id' : action.meta.arg})
        }
    }
})

export const SelCustomerById = (state, datoId) =>{return  _.find(state.customer.Dati, {'id' : parseInt(datoId)})}
export const SelectAllCustomer = state =>{return state.customer.Dati}
export const SelectHeader = (state) => state.head

export default CustomerSlice.reducer