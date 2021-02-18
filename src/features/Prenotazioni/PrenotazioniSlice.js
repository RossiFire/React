import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import * as _ from 'lodash'

const initialState ={
    Dati : [],
    stato : 'zero',
    head : ['id','utentePrenotato','mezzoPrenotato','dataInizio','dataFine','approvata','azioni']
}


// ASYNC THUNK
export const fetchPrenotazioniData = createAsyncThunk('prenotazioni/fetchPrenotazioni', async () => {
    const response = await axios.get('http://localhost:8050/prenotazioni')
    return response.data
})

export const addPrenotazione = createAsyncThunk('prenotazione/add', async mezzo =>{
    const response = await axios.post("http://localhost:8050/prenotazioni/aggiungi", mezzo)
    return response.data
})

export const modPrenotazione = createAsyncThunk('prenotazione/mod', async mezzo =>{
    const response = await axios.post(`http://localhost:8050/prenotazioni/modifica`, mezzo)
    return response.data
})

export const delPrenotazione = createAsyncThunk('prenotazione/del', async id =>{
    await axios.get(`http://localhost:8050/prenotazioni/elimina/${id}`)
})

export const PrenotazioniSlice = createSlice({
    name : 'prenotazioni',
    initialState,
    reducers:{},
    extraReducers:{
        [fetchPrenotazioniData.pending] : (state,action)=>{
            state.stato = 'loading'
        },
        [fetchPrenotazioniData.fulfilled] : (state,action)=>{
            state.stato = 'success'
            state.Dati = action.payload;
        },
        [addPrenotazione.fulfilled] : (state,action)=>{
            state.Dati.push(action.payload)
        },
        [modPrenotazione.fulfilled] : (state,action)=>{
            state.Dati = _.reject(state.Dati, {'id' : action.payload['id']})
            state.Dati.push(action.payload)
        },
        [delPrenotazione.fulfilled] : (state,action)=>{
            state.Dati = _.reject(state.Dati, {'id' : action.meta.arg})
        }
    }
})


export const SelPrenotazioniById = (state, datoId) =>{return _.find(state.prenotazioni.Dati, {'id' : parseInt(datoId)})}
export const SelectAllPrenotazioni = state =>{return state.prenotazioni.Dati}
export const SelectPrenotazioniHeader = (state) =>{return state.prenotazioni.head}


export default PrenotazioniSlice.reducer