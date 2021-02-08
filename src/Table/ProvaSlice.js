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
export const ThunkListaDati = (categoria)=>{
    switch(categoria){
        case 'CUSTOMER':
            return(dispatch)=>{
                axios.get("http://localhost:8050/utenti/customer")
                .then(response=>{
                    dispatch(ListaDatiReducer(ActionListaDati(response, categoria)))
                })
            }
        case 'MEZZI':
            return(dispatch)=>{
                axios.get("http://localhost:8050/mezzi/catalogo")
                .then(response=>{
                    dispatch(ListaDatiReducer(ActionListaDati(response, categoria)))
                })
            }
        case 'PRENOTAZIONI':
            return(dispatch)=>{
                axios.get("http://localhost:8050/prenotazioni")
                .then(response=>{
                    dispatch(ListaDatiReducer(ActionListaDati(response, categoria)))
                })
            }
        default :
            alert('errore')
    }
}



export const ThunkAggiungiDato = (data,state) =>{
    switch(state.categoria){
        case 'CUSTOMER':
            return(dispatch)=>{
                axios.post("http://localhost:8050/utenti/aggiungi", data)
                dispatch(CustomerReducer(OperazioniAction(data, 'AGGIUNGI')))
            }
        case 'MEZZI':
            return(dispatch)=>{
                axios.post("http://localhost:8050/mezzi/aggiungi", data)
                dispatch(MezziReducer(OperazioniAction(data, 'AGGIUNGI')))
            }
        case 'PRENOTAZIONI':
            return(dispatch)=>{
                axios.post("http://localhost:8050/prenotazioni/aggiungi", data)
                dispatch(PrenotazioniReducer(OperazioniAction(data, 'AGGIUNGI')))
            }
        default :
            alert('errore')
    }   
}


// ACTIONS
  const ActionListaDati = (data, categoria) =>{
      return{
          payload : data,
          categoria : categoria
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



export const {CustomerReducer, MezziReducer, PrenotazioniReducer, ListaDatiReducer} = ProvaSlice.actions
export default ProvaSlice;

