import React, { Component, useEffect, useState } from 'react'
import AppNavbar from '../navbar/Navbar'
import Table from '../../Table/Table'
import { useSelector, useDispatch} from 'react-redux';
import {fetchCustomerData} from '../../Table/CustomerSlice'
import * as _ from 'lodash'


function CustomerPage(){
    const dispacth = useDispatch()
    let customerData
    let [stateData, set] = useState([])
    useEffect(()=>{
        dispacth(fetchCustomerData())
        set(customerData)
    },[])
    customerData = useSelector(state=> state.customer)
        

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