import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import * as _ from 'lodash'

const initialState ={
    Dati : [],
    stato : 'zero'
}


export const fetchCustomerData = createAsyncThunk('customer/fetchCustomer', async () => {
    const response = await axios.get('http://localhost:8050/utenti/customer')
    return response.data
  })

export const AddCustomer = createAsyncThunk('customer/addCustomer', async (dati) => {
    const response = await axios.post('http://localhost:8050/utenti/aggiungi', dati)
    return response.data
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
            state.Dati = state.Dati.concat(action.payload);
        },
        [fetchCustomerData.rejected] : (state, action)=>{
            state.stato = 'failed'
        }
    }
})



export const SelById = (state, datoId) =>{ state.ProvaSlice.Dati.find(dato => dato['id'] === datoId)}
export const SelectAll = state => state.ProvaSlice.Dati

export default CustomerSlice