
import { Button, Modal, Dropdown} from 'semantic-ui-react'
import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import CharacterAuthorizeIcon from '@rsuite/icons/CharacterAuthorize';
import {changeData} from '../modules/InventoryControl/src/features/dataSlice';
import { changeRisk } from '../features/configSlice';
import { useSelector, useDispatch } from "react-redux";
import '../css/redirect.css'
import { getData } from '../services/api';

const RedirectScreen = () =>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const state = useSelector(state=> state.user)
    const[open] = useState(true)
    const[loading, setLoading] = useState(false)
    const[value, setValue] = useState()

    const options = [
        { key: 'af', value: 'api/estoque/', text: 'gestão de estoque' },
        { key: 'ax', value: '/', text: 'gestão departamento pessoal' },
    ];

    
      


    const handleClick = () =>{
        setLoading(true)
        const Promise = getData(value, state.token)
        Promise.then(function(response){
            dispatch(changeData(response.data))
            dispatch(changeRisk(response.classe_de_risco))
            navigate("/estoque")
            setLoading(false)
        }).catch(function(error){
            alert(`Error ${error.message}`)
            setLoading(false)
        })
        
    }

    const handleChange = (e, { value }) => {
        setValue(value)
        
    }

    const ModuleRouter = () =>{
        return(
            <div className='container_route'>
                <CharacterAuthorizeIcon/>
                <div>
                    <span>{state.company}</span><span>{state.name}</span>
                </div>
                <Dropdown
                    placeholder='Selecione o modulo'
                    fluid
                    selection
                    options={options}
                    style={{margin: 10}}
                    onChange={handleChange}
                    value={value}
                />
                <Button color='blue' loading={loading} onClick={()=>handleClick()}>
                    Acessar
                </Button>
                
            </div>
        )
    }


    return(
        <>
        <Modal
        open={open}
        style={{minWidth: '300px', maxWidth: '500px', height: '500px'}}
        >
        <Modal.Header style={{backgroundColor: '#113847', color: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
            Bem vindo 
        </Modal.Header>
        <Modal.Content>
            <Modal.Description>
            <ModuleRouter/>
            </Modal.Description>
        </Modal.Content>
        </Modal>

        </>
    )
}
export default RedirectScreen;


