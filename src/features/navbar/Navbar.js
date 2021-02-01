import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux';
import {fetchCustomer, fetchMezzi, fetchPrenotazioni, getMes, UserSlice} from './DataSlice'

export function Navbar({ fetchCustomer, data }){
/*     const dispatch = useDispatch()
    const type = useSelector(getType); */

   /*  const Aggiungi =()=>{
        dispatch(addText({value : 'gino'}))
    } */
    const dispatch = useDispatch()
/*     useEffect(()=>{
        fetchCustomer()
    },[]) */
    return data.loading ?(
       /*  <div>
            <button onClick={()=>dispatch(utenti())}>Utenti</button>
            <button onClick={()=>dispatch(mezzi())}>Mezzi</button>
            <button onClick={()=>dispatch(prenotazioni())}>Prenotazioni</button>
            <button onClick={Aggiungi}>Aggiungi</button>
            <button onClick={()=>dispatch(fetchData())}>tanto non va</button>
            <p>{type}</p>   
            <h1>{data}</h1>
        </div> */
        
/*         <div>
            <button onClick={()=>dispatch(fetchCustomer())}>Clicca</button>
            <p>messaggio :{msg}</p>
            <p>errore : {error}</p>
        </div> */
        <p>Loading...</p>
    ) : data.error ?(
            <p>Errore...</p>
    ) : (
        <div>
            {
                data && data.data && data.data.map(user=> <p>{user.nome}</p>)
            }
            <button onClick={()=>dispatch(fetchMezzi())}>prova</button>
        </div>
    )
}


const MapMsgToProps = state =>{
    return{
        data : state
    }
}

const MapDispatchProps = dispatch =>{
    return{
        fetchCustomer : ()=> dispatch(fetchCustomer())
    }
}
export default connect(MapMsgToProps, MapDispatchProps)(Navbar);