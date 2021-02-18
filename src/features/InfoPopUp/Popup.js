import React,{Component, useState, useEffect} from 'react'
import {SelCustomerById, SelectCustomerHeader, fetchCustomerData} from '../Customer/CustomerSlice'
import {SelMezzoById, SelectMezziHeader, fetchMezziData} from '../Mezzi/MezziSlice'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Modal} from 'react-bootstrap'
import {nanoid} from 'nanoid'
import '../InfoPopUp/popup.css'

function Popup(props){
    let state = useSelector(state=> state)
    let dato
    let head;
    let title
    let subtitle

          switch(props.tipo){
            case 'utentePrenotato':
                dato = props.id
                head = SelectCustomerHeader(state)
                title = <p key={nanoid()}>{dato['nome'] + " " + dato['cognome']}</p>
                subtitle = <h6><i>Utente</i></h6>
                break;
            case 'mezzoPrenotato':
                dato = props.id
                head = SelectMezziHeader(state)
                title = <p key={nanoid()}>{dato['casaCostr'] + " " + dato['modello']}</p>
                subtitle = <h6><i>Veicolo</i></h6>
                break;
          }

          

        
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    let tb = <div className="popup">
        {head && head.map(col => {
            if(col !== 'azioni'){
                if (col === 'tipoutente' || col === 'tipomezzo'){
                    return <p key={nanoid()}><b key={nanoid()} >{col}: </b>{dato[col]['tipo']}</p>
                }else{
                  return <p key={nanoid()}><b key={nanoid()}>{col}: </b>{dato[col]}</p>
                }
            }
        })}
    </div>

    return(
        <>
        <Button onClick={handleShow} className="modalBtn">
            {title}
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>{title}
            {subtitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {tb}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
}

export default Popup