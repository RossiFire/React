import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import * as _ from 'lodash'

const initialState ={
    Dati : [],
    stato : 'zero'
}


// ASYNC THUNK
export const fetchMezziData = createAsyncThunk('mezzi/fetchMezzi', async () => {
    const response = await axios.get('http://localhost:8050/mezzi/catalogo')
    return response.data
  })


export const MezziSlice = createSlice({
    name : 'mezzi',
    initialState,
    reducers:{
        MezziReducer(state,action){
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
        [fetchMezziData.pending]: (state,action)=> {
            state.stato = 'loading'
        },
        [fetchMezziData.fulfilled] : (state,action)=>{
            state.stato = 'success'
            state.Dati = state.Dati.concat(action.payload);
        },
        [fetchMezziData.rejected] : (state)=>{
            state.stato = 'failed'
        }
    }
})



//THUNK
export const ThunkAggiungiMezzo =(state,mezzo) =>{
    return(dispatch)=>{
        axios.post("http://localhost:8050/mezzi/aggiungi", mezzo)
        dispatch(CustomerReducer(OperazioniAction(mezzo, 'AGGIUNGI')))
    }
}

export const ThunkModificaMezzo = (state,mezzo) =>{
    axios.get(`http://localhost:8050/mezzi/modifica/${mezzo.id}`)
    .then(()=>{
        return(dispatch)=>{
            axios.post("http://localhost:8050/mezzi/modifica", mezzo)
            dispatch(CustomerReducer(OperazioniAction(mezzo, 'AGGIUNGI')))
        }
    })
    .catch(error=>{
        console.log(error)
    })
}

export const ThunkEliminaMezzo = (state,mezzo) =>{
    axios.get(`http://localhost:8050/mezzi/elimina/${mezzo.id}`)
    .then(()=>{
        return(dispatch)=>{
            dispatch(MezziReducer(OperazioniAction(mezzo,'ELIMINA')))
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
}

export const SelMezzoById = (state, datoId) =>{ state.ProvaSlice.Dati.find(dato => dato['id'] === datoId)}
export const SelectAllMezzi = state => state.MezziSlice.Dati

export const {MezziReducer} = MezziSlice.actions
export default MezziSlice