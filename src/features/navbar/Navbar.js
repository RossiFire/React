import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux';
import {fetchCustomer, fetchMezzi, fetchPrenotazioni} from './DataSlice'

export function Navbar(){
/*     const dispatch = useDispatch()
    const type = useSelector(getType); */

   /*  const Aggiungi =()=>{
        dispatch(addText({value : 'gino'}))
    } */
    return(
       /*  <div>
            <button onClick={()=>dispatch(utenti())}>Utenti</button>
            <button onClick={()=>dispatch(mezzi())}>Mezzi</button>
            <button onClick={()=>dispatch(prenotazioni())}>Prenotazioni</button>
            <button onClick={Aggiungi}>Aggiungi</button>
            <button onClick={()=>dispatch(fetchData())}>tanto non va</button>
            <p>{type}</p>   
            <h1>{data}</h1>
        </div> */
        <div>Ciao</div>
    )
}

export default Navbar;