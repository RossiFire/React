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
        mezziData = _.orderBy(stateData, ['id'],['asc']) 
        set(mezziData)
    }
    const OrderDESCById = ()=>{
        mezziData = _.orderBy(stateData, ['id'],['desc']) 
        set(mezziData)
    }


    return(
        <div>
        <Table data={mezziData} url={"parcoauto"}/>
        </div> 
    )
}

export default MezziPage