import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import * as _ from 'lodash'

const initialState ={
    Dati : [],
    categoria : ''
}


export const ProvaSlice = createSlice({
    name : 'prova',
    initialState,
    reducers:{
        ListaDatiReducer(state,action){
            return{
                ...state,
                Dati: action.payload,
                categoria : action.categoria
            }
        },
        CustomerReducer(state,action){
            switch(action.TipoOperazione){
                case 'MODIFICA':
                    const customerEsistente = state.DataReducer.Dati.find(dato => dato.id === id)
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
        },
        MezziReducer(state,action){
            switch(action.TipoOperazione){
                case 'MODIFICA':
                    const {id, casaCostr, modello, targa, tipomezzo} = action.payload
                    const mezzoEsistente = state.DataReducer.Dati.find(dato => dato.id === id)
                    if(mezzoEsistente){
                        mezzoEsistente['casaCostr'] = casaCostr
                        mezzoEsistente['modello'] = modello
                        mezzoEsistente['targa'] = targa
                        mezzoEsistente['tipomezzo']['id'] = tipomezzo
                    }
                case 'AGGIUNGI':
                    state.Dati.push(action.payload)
                case 'ELIMINA':
                    state.Dati = _.reject(state.Dati, { 'id': action.payload['id']});
            }
        },
        PrenotazioniReducer(state,action){
            switch(action.TipoOperazione){
                case 'MODIFICA':
                    const {id, casaCostr, modello, targa, tipomezzo} = action.payload
                    const mezzoEsistente = state.DataReducer.Dati.find(dato => dato.id === id)
                    if(mezzoEsistente){
                        mezzoEsistente['casaCostr'] = casaCostr
                        mezzoEsistente['modello'] = modello
                        mezzoEsistente['targa'] = targa
                        mezzoEsistente['tipomezzo']['id'] = tipomezzo
                    }
                case 'AGGIUNGI':
                    state.Dati.push(action.payload)
                case 'ELIMINA':
                    state.Dati = _.reject(state.Dati, { 'id': action.payload['id']});
            }
        }
    }
})




// ---------------------------------------------- THUNK
export const ThunkAggiungiCustomer = (data) =>{
    return(dispatch)=>{
        axios.post("http://localhost:8050/utenti/aggiungi", data)
        dispatch(CustomerReducer(OperazioniAction(data, 'AGGIUNGI')))
    }
}
export const ThunkModificaCustomer = (data,operazione) =>{
    return(dispatch)=>{
        axios.post("http://localhost:8050/utenti/modifica", data)
        dispatch(CustomerReducer(OperazioniAction(data, 'MODIFICA')))
    }
}
export const ThunkEliminaCustomer = (data,operazione) =>{
    return(dispatch)=>{
        axios.post("http://localhost:8050/utenti/elimina", data)
        dispatch(CustomerReducer(OperazioniAction(data, 'ELIMINA')))
    }
}



// ACTIONS
  const FetchLista = data =>{
      return{
          payload : data,
          categoria : 'customer'
      }
  }

  const OperazioniAction = (data, operazione)=>{
      return{
          payload : data,
          TipoOperazione : operazione
      }
  }

export const SelById = (state, datoId) =>{ state.ProvaSlice.Dati.find(dato => dato['id'] === datoId)}
export const SelectAll = state => state.ProvaSlice.Dati



export const {CustomerReducer, MezziReducer, PrenotazioniReducer} = ProvaSlice.actions
export default ProvaSlice;

