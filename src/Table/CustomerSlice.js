import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import * as _ from 'lodash'

const initialState ={
    Dati : [],
    stato : 'zero'
}


// ASYNC THUNK
export const fetchCustomerData = createAsyncThunk('customer/fetchCustomer', async () => {
    const response = await axios.get('http://localhost:8050/utenti/customer')
    return response.data
  })

export const addCustomer = createAsyncThunk('customer/add', async utente =>{
    await axios.post("http://localhost:8050/utenti/aggiungi", utente)
    const response = await axios.get(`http://localhost:8050/utenti/singolo/${utente.id}`)
    return response.data
})

export const modCustomer = createAsyncThunk('customer/mod', async utente =>{
    const response = await axios.post(`http://localhost:8050/utenti/modifica`, utente)
    return response.data
})


export const CustomerSlice = createSlice({
    name : 'customer',
    initialState,
    reducers:{
        CustomerReducer(state,action){
            switch(action.TipoOperazione){
                case 'MODIFICA':
                    const customerEsistente = state.CustomerReducer.Dati.find(dato => dato.id === id)
                    const {id, nome,cognome,password} = action.payload
                    if(customerEsistente){
                        customerEsistente['nome'] = nome
                        customerEsistente['cognome'] = cognome
                        customerEsistente['password'] = password
                    } 
                case 'AGGIUNGI':
                    state.Dati.push(action.payload)
                case 'ELIMINA':
                    state.Dati = _.reject(state.Dati, { 'id': action.payload['id']});
            }
        }
    },
    extraReducers:{
        [fetchCustomerData.pending]: (state,action)=> {
            state.stato = 'loading'
        },
        [fetchCustomerData.fulfilled] : (state,action)=>{
            state.stato = 'success'
            state.Dati = state.Dati.concat(action.payload);
        },
        [fetchCustomerData.rejected] : (state)=>{
            state.stato = 'failed'
        },
        [addCustomer.fulfilled] : (state,action)=>{
            state.Dati.push(action.payload)
        },
        [modCustomer.fulfilled] : (state,action)=>{
/*             state.Dati = _.reduce(state.Dati, {'id' : action.payload.id}), */
            state.Dati.push(action.payload)
        }
    }
})


/* export const ThunkModificaCustomer = (state,utente) =>{
    axios.get(`http://localhost:8050/utenti/modifica/${utente.id}`)
    .then(()=>{
        return(dispatch)=>{
            axios.post("http://localhost:8050/utenti/modifica", utente)
            dispatch(CustomerReducer(OperazioniAction(utente, 'AGGIUNGI')))
        }
    })
    .catch(error=>{
        console.log(error)
    })
}

export const ThunkEliminaCustomer = (state,customer) =>{
    axios.get(`http://localhost:8050/customer/elimina/${customer.id}`)
    .then(()=>{
        return(dispatch)=>{
            dispatch(CustomerReducer(OperazioniAction(customer,'ELIMINA')))
        }
    })
    .catch(error=>{
        console.log(error)
    })
}

// ACTIONS
const OperazioniAction = (data, operazione)=>{
    return{
        payload : data,
        TipoOperazione : operazione
    }
} */

export const SelCustomerById = (state, datoId) =>{ state.ProvaSlice.Dati.find(dato => dato['id'] === datoId)}
export const SelectAllCustomer = state => state.CustomerSlice.Dati

export const {CustomerReducer} = CustomerSlice.actions
export default CustomerSlice;