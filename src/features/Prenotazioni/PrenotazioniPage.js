import React, { Component, useEffect, useState } from 'react'
import AppNavbar from '../navbar/Navbar'
import Table from '../../Table/Table'
import { useSelector, useDispatch} from 'react-redux';
import {fetchPrenotazioniData} from '../../Table/PrenotazioniSlice'
import * as _ from 'lodash'

function PrenotazioniPage(){
    const dispacth = useDispatch()
    let prenotazioniData
    let [stateData, set] = useState([])
    prenotazioniData = useSelector(state=> state.prenotazioni)
    useEffect(()=>{
        dispacth(fetchPrenotazioniData())
        set(prenotazioniData)
    },[])
        

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