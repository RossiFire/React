import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux';
import {fetchCustomer, fetchMezzi, fetchPrenotazioni, getMes, UserSlice} from './DataSlice'

export function Navbar({ fetchCustomer, data }){
    const dispatch = useDispatch()
/*     useEffect(()=>{
        fetchCustomer()
    },[]) */
    return data.loading ? (
        <p>Loading...</p>
    ) : data.error ? (
        <p>Errore...</p>
    ) : (
        <div>
            {data && data.data && data.data.map(user => <p>{user.nome}</p>)}
            <button onClick={() => dispatch(fetchMezzi())}>prova</button>
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