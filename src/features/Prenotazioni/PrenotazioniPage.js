import React, { Component, useEffect, useState } from 'react'
import AppNavbar from '../navbar/Navbar'
import Table from '../../Table/Table'
import { useSelector, useDispatch} from 'react-redux';
import {fetchPrenotazioniData} from './PrenotazioniSlice'
import {fetchCustomerData} from '../Customer/CustomerSlice'
import {fetchMezziData} from '../Mezzi/MezziSlice'
import * as _ from 'lodash'

function PrenotazioniPage(){
    const dispatch = useDispatch()
    let prenotazioniData
    let [stateData, set] = useState([])
    prenotazioniData = useSelector(state=> state.prenotazioni)
    useEffect(()=>{
        dispatch(fetchPrenotazioniData())
        dispatch(fetchMezziData())
        dispatch(fetchCustomerData())
        set(prenotazioniData)
    },[])
        
    useEffect(()=>{
        set(prenotazioniData)
    },[prenotazioniData])

    const OrderASCById = ()=>{
        set(()=>({
            ...stateData,
            ['Dati'] :  _.orderBy(stateData.Dati, ['id'],['asc']),
        }))
    }

    const OrderDESCById = ()=>{
            set(()=>({
                ...stateData,
                ['Dati'] :  _.orderBy(stateData.Dati, ['id'],['desc']),
            }))
        }

    return(
        <div>
        <Table data={stateData} url={"prenotazioni"} OrderAsc={OrderASCById} OrderDesc={OrderDESCById}/>
        </div> 
    )
}

export default PrenotazioniPage