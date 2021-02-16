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
    useEffect(()=>{
        dispacth(fetchPrenotazioniData())
        set(prenotazioniData)
    },[])
    prenotazioniData = useSelector(state=> state.prenotazioni)
        

    const OrderASCById = ()=>{
        prenotazioniData = _.orderBy(stateData, ['id'],['asc']) 
        set(prenotazioniData)
    }
    const OrderDESCById = ()=>{
        prenotazioniData = _.orderBy(stateData, ['id'],['desc']) 
        set(prenotazioniData)
    }


    return(
        <div>
        <Table data={prenotazioniData} url={"prenotazioni"}/>
        </div> 
    )
}

export default PrenotazioniPage