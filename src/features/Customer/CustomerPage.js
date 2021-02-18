import React, { Component, useEffect, useState } from 'react'
import AppNavbar from '../navbar/Navbar'
import Table from '../../Table/Table'
import { useSelector, useDispatch} from 'react-redux';
import {fetchCustomerData} from './CustomerSlice'
import * as _ from 'lodash'
import Popup from '../InfoPopUp/Popup'
import { propTypes } from 'react-bootstrap/esm/Image';


function CustomerPage(){
    const dispacth = useDispatch()
    let customerData
    let [stateData, set] = useState([])
    customerData = useSelector(state=> state.customer)
    
    useEffect(()=>{
        dispacth(fetchCustomerData())
        set(customerData)
    },[])

    useEffect(()=>{
        set(customerData)
    },[customerData])
        

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
        <Table data={stateData} url={"customer"} OrderAsc={OrderASCById} OrderDesc={OrderDESCById}/>
        </div> 
    )
}


export default CustomerPage