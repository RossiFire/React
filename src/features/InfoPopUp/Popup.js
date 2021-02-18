import React,{Component, useState, useEffect} from 'react'
import {SelCustomerById, SelectCustomerHeader, fetchCustomerData} from '../Customer/CustomerSlice'
import {SelMezzoById, SelectMezziHeader, fetchMezziData} from '../Mezzi/MezziSlice'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Modal} from 'react-bootstrap'

function Popup(props){
    let state = useSelector(state=> state)
    let dato
    let head;
    const dispatch = useDispatch()
    let title
  
        useEffect(()=>{
          switch(props.tipo){
            case 'utentePrenotato':
                dato = SelCustomerById(state, props.id)
                console.log(dato)
                head = SelectCustomerHeader(state)
                title = <p>titolo</p>
                break;
            case 'mezzoPrenotato':
                dato = SelMezzoById(state,props.id)
                console.log(dato)
                head = SelectMezziHeader(state)
                title = <p>titolo</p>
                break;
          }
        },[])
        
        
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    let tb = <div className="popup">
        {head && head.map(col => {
            if(col !== 'azioni'){
                if (col === 'tipoutente' || col === 'tipomezzo'){
                    return <p><b>{col}:</b>{dato[col]['tipo']}</p>
                }else{
                  return <p><b>{col}:</b>{dato[col]}</p>
                }
            }
        })}
    </div>

    return(
        <>
        <Button variant="primary" onClick={handleShow}>
            Non va
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>agniim</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {tb}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
}

export default Popup