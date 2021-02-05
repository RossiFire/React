import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState ={
    Dati : [],
    categoria : ''
}


export const ProvaSlice = createSlice({
    name : 'prova',
    initialState,
    reducers:{
        CategoriaReducer(state,action){
            return{
                ...state,
                categoria : action.payload 
            }
        },
        ListaCustomerReducer(state,action){
            return{
                ...state,
                Dati: action.payload,
                categoria : action.categoria
            }
        },
            CustomerAggiornato(state, action){
              const {id, nome,cognome,password} = action.payload
              const customerEsistente = state.DataReducer.Dati.find(dato => dato.id === id)
              if(customerEsistente){
                customerEsistente['nome'] = nome
                customerEsistente['cognome'] = cognome
                customerEsistente['password'] = password
              }
            },
            CustomerAggiunto(state,action){
              state.Dati.push(action.payload)
            },
            MezzoAggiornato(state,action){
                const {id, casaCostr, modello, targa, tipomezzo} = action.payload
                const mezzoEsistente = state.DataReducer.Dati.find(dato => dato.id === id)
                if(mezzoEsistente){
                    mezzoEsistente['casaCostr'] = casaCostr
                    mezzoEsistente['modello'] = modello
                    mezzoEsistente['targa'] = targa
                    mezzoEsistente['tipomezzo']['id'] = tipomezzo
                }
            },
            MezzoAggiunto(state,action){
                state.Dati.push(action.payload)
            }
    }
})




//------------------------- CONNETTORI PER OPERAZIONI
export const AggiungiDato = (state,data) => {
    switch(state.categoria){
      case 'utenti':
        ThunkAggiungiCustomer(data)
        break
      case 'mezzi':
        ThunkAggiungiMezzo(data)
      case 'prenotazioni':
        ThunkAggiungiPrenotazioni(data);
      default:
        console.log('errore')
    }
  }


// ---------------------------------------------- THUNK
export const ThunkListaCustomer =()=>{
    return(dispatch)=>{
        axios.get('http://localhost:8050/utenti/customer')
        .then(response=>{
            dispatch(ListaCustomerReducer(AggiungiCustomerData(response)))
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

  export const ThunkAggiungiCustomer = data =>{
    return (dispatch)=>{
      axios.post(`http://localhost:8050/utenti/aggiungi`, data)
      .then(response=>{
        dispatch(CustomerAggiunto(data))
        console.log(response)
      })
      .catch(error=>{
        console.log(error)
      })
    }
  } 

  export const ThunkAggiungiMezzo = data =>{
    return (dispatch)=>{
      axios.post(`http://localhost:8050/mezzi/aggiungi`, data)
      .then(response=>{
        dispatch(CustomerAggiunto(data))
        console.log(response)
      })
      .catch(error=>{
        console.log(error)
      })
    }
  }
  
  export const ThunkAggiungiPrenotazioni = data =>{
    return (dispatch)=>{
      axios.post(`http://localhost:8050/prenotazioni/aggiungi`, data)
      .then(response=>{
        dispatch(CustomerAggiunto(data))
        console.log(response)
      })
      .catch(error=>{
        console.log(error)
      })
    }
  }

// ACTIONS
  const AggiungiCustomerData = data =>{
      return{
          payload : data,
          categoria : 'customer'
      }
  }

export const SelById = (state, datoId) =>{ state.ProvaSlice.Dati.find(dato => dato['id'] === datoId)}
export const SelectAll = state => state.ProvaSlice.Dati



export const { CustomerReducer, CustomerAggiunto, CustomerAggiornato, CategoriaReducer,ListaCustomerReducer} = ProvaSlice.actions
export default ProvaSlice;

