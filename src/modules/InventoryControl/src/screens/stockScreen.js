
import { useState, useEffect} from 'react';
import { Table, Progress, IconButton,  InputPicker, Pagination} from 'rsuite';
import { Icon, Button,Sidebar} from 'semantic-ui-react';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import SortDownIcon from '@rsuite/icons/SortDown';
import SortUpIcon from '@rsuite/icons/SortUp';
import RemindRoundIcon from '@rsuite/icons/RemindRound';
import "rsuite/dist/rsuite.min.css";
import { useSelector } from 'react-redux';
import * as styles from './inventario.styles';
import FormAddNew from '../components/formInsertNew';


const StockScreen = (props) =>{
    
    useEffect(()=>{
        props.setloading()
    },[])
    
  

    return(
        <div>
            <h1>inventario</h1>
        </div>
    )
}
export default StockScreen