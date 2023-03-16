
import { Button, Modal, Dropdown} from 'semantic-ui-react'
import { useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import CharacterAuthorizeIcon from '@rsuite/icons/CharacterAuthorize';
import {changeData} from '../modules/InventoryControl/src/features/dataSlice';
import { useSelector, useDispatch } from "react-redux";
import '../css/redirect.css'

const RedirectScreen = () =>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const state = useSelector(state=> state.user)
    const[open] = useState(true)
    const[loading, setLoading] = useState(false)
    const[value, setValue] = useState()

    const options = [
        { key: 'af', value: '/stock/select', text: 'gestão de estoque' },
        { key: 'ax', value: '/personadepartment/select', text: 'gestão departamento pessoal' },
    ];

    
      


    const handleClick = () =>{
        setLoading(true)
        axios({
            url: `http://railsonpinheiro.pythonanywhere.com${value}`,
            method: 'POST',
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${state.token}`
            },
            data:{
                "company_cnpj": state.company_cnpj
            }
        }).then(function(response){
            if(response.status === 200){
                dispatch(changeData(response.data.data))
                navigate("/estoque")
                setLoading(false)
                
                
            }
        }).catch(function(error){
            alert("error")
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


