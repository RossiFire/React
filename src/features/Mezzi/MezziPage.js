import React, { Component, useEffect, useState } from 'react'
import AppNavbar from '../navbar/Navbar'
import Table from '../../Table/Table'
import { useSelector, useDispatch} from 'react-redux';
import {fetchMezziData, SelMezzoById, modMezzo} from '../../Table/MezziSlice'
import * as _ from 'lodash'

function MezziPage(){
    const dispacth = useDispatch()
    let mezziData
    let [stateData, set] = useState([])
    useEffect(()=>{
        dispacth(fetchMezziData())
        set(mezziData)
    },[])
    mezziData = useSelector(state=> state.mezzi)
        

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
        console.log(stateData)
    }

    return(
        <div>
        <Table data={mezziData} url={"parcoauto"} OrderAsc={OrderASCById} OrderDesc={OrderDESCById}/>
        </div> 
    )
}

export default MezziPage