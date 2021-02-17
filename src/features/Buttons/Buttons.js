import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSortAmountDownAlt, faPlus, faPenSquare, faPlusSquare} from '@fortawesome/free-solid-svg-icons'
import {nanoid} from 'nanoid'
import {Link} from 'react-router-dom'
import './buttons.css'

function AddButton(props){
    return(
        <Link to={`/aggiungi/${props.url}`}><button className="AppButton" key={nanoid()}><FontAwesomeIcon icon={faSortAmountDownAlt} /></button></Link>
    )
}

function ModButton(props){
    return(
        <Link to={`${props.url}/${props.id}`}><button className="AppButton" key={nanoid()}><FontAwesomeIcon icon={faPenSquare} /></button></Link>
    )
}

export {AddButton, ModButton}