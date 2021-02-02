import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux';
import {fetchCustomer, fetchMezzi, fetchPrenotazioni, DataReducer} from './DataSlice'
import { Tapable } from 'tapable';

export function Navbar({ fetchCustomer, fetchMezzi, fetchPrenotazioni, data }){
    const dispatch = useDispatch()
    return data.loading ?(
        <p>Loading...</p>
    ) : data.error ? (
        <p>Errore</p>
    ) : (
        <div>
            <div>
            {data.data && data.data.payload && data.data.payload.map(user => <p key={user.id}>{user.nome}</p>)}
            </div>
            <button onClick={() => dispatch(()=>fetchCustomer())}>Customer</button>
            <button onClick={() => dispatch(()=>fetchMezzi())}>Mezzi</button>
            <button onClick={() => dispatch(()=>fetchPrenotazioni())}>Prenotazioni</button>
        </div>
            )
}

export function Table({ fetchCustomer, data}){
    let dt = undefined;

    return dt ? (
        <p>Waiting</p>
    ) : (
        <table>

        </table>
    )
}

const MapMsgToProps = state =>{
    return{
        data : state.type
    }
}

const MapDispatchProps = dispatch =>{
    return{
        fetchCustomer : ()=> dispatch(fetchCustomer()),
        fetchMezzi : ()=> dispatch(fetchMezzi()),
        fetchPrenotazioni : ()=> dispatch(fetchPrenotazioni())
    }
}
export default connect(MapMsgToProps, MapDispatchProps)(Navbar);