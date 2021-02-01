import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux';
import {fetchCustomer, fetchMezzi, fetchPrenotazioni, DataReducer} from './DataSlice'

export function Navbar({ fetchCustomer, data }){
    const dispatch = useDispatch()
/*     useEffect(()=>{
        fetchCustomer()
    },[]) */
    return data.loading ?(
        <p>Loading...</p>
    ) : data.error ? null (
        <p>Errore...</p>
    ) : (
        <div>
            {data.data && data.data.payload && data.data.payload.map(user => <p>{user.nome}</p>)}
            <button onClick={() => dispatch(fetchCustomer())}>prova</button>
        </div>
            )
}


const MapMsgToProps = state =>{
    return{
        data : state.type
    }
}

const MapDispatchProps = dispatch =>{
    return{
        fetchCustomer : ()=> dispatch(fetchCustomer())
    }
}
export default connect(MapMsgToProps, MapDispatchProps)(Navbar);