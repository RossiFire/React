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
        customerData = _.orderBy(stateData, ['id'],['asc']) 
        set(customerData)
    }
    const OrderDESCById = ()=>{
        customerData = _.orderBy(stateData, ['id'],['desc']) 
        set(customerData)
    }

    return(
        <div>
        <Table data={stateData} url={"customer"} asc={OrderASCById}/>
        </div> 
    )
}


export default CustomerPage