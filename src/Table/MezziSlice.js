import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import * as _ from 'lodash'

const initialState ={
    Dati : [],
    stato : 'zero',
    head : ['id','casaCostr','modello','targa','tipomezzo','azioni']
}


// ASYNC THUNK
export const fetchMezziData = createAsyncThunk('mezzi/fetchMezzi', async () => {
    const response = await axios.get('http://localhost:8050/mezzi/catalogo')
    return response.data
  })

export const addMezzo = createAsyncThunk('mezzo/add', async mezzo =>{
    const response = await axios.post("http://localhost:8050/mezzi/aggiungi", mezzo)
    return response.data
})

export const modMezzo = createAsyncThunk('mezzo/mod', async mezzo =>{
    const response = await axios.post(`http://localhost:8050/mezzi/modifica`, mezzo)
    return response.data
})

export const delMezzo = createAsyncThunk('mezzo/del', async id =>{
    await axios.get(`http://localhost:8050/mezzi/elimina/${id}`)
})


export const MezziSlice = createSlice({
    name : 'mezzi',
    initialState,
    reducers:{},
    extraReducers:{
        [fetchMezziData.pending]: (state,action)=> {
            state.stato = 'loading'
        },
        [fetchMezziData.fulfilled] : (state,action)=>{
            state.stato = 'success'
            state.Dati = action.payload
        },
        [fetchMezziData.rejected] : (state)=>{
            state.stato = 'failed'
        },
        [addMezzo.fulfilled] : (state,action)=>{
            state.Dati.push(action.payload)
        },
        [modMezzo.fulfilled] : (state, action)=>{
            state.Dati = _.reject(state.Dati, {'id' : action.payload['id']})
            state.Dati.push(action.payload)
        },
        [delMezzo.fulfilled] : (state,action)=>{
            state.Dati = _.reject(state.Dati, {'id' : action.meta.arg})
        }
    }
})

export const SelMezzoById = (state, datoId) =>{return  _.find(state.mezzi.Dati, {'id' : parseInt(datoId)})}
export const SelectAllMezzi = state => state.MezziSlice.Dati

export default MezziSlice.reducer