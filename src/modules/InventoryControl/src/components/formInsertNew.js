

import { useState, useEffect} from 'react';
import axios from 'axios';
import {
    Button,
    Form,
    Input,
    TextArea,
    Dropdown,
    Icon,
    Message
  } from 'semantic-ui-react'
import IntlCurrencyInput from "react-intl-currency-input" 
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeData, uploadData} from '../features/dataSlice';
import '../css/form.css'

const currencyConfig = {
    locale: "pt-BR",
    formats: {
      number: {
        BRL: {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
    },
};




function FormAddNew(){
    const state = useSelector(state=> state)
    const dispatch = useDispatch()
    const[arrayfilter, setArrayFilter] = useState([])
    const[groups, setGroup] = useState([])
    const[supplier, setSupplier] = useState([])
    const[errorgroup, setErrorGroup] = useState(false)
    const[errorsupplier, setErrorSupplier] = useState(false)
    const[erroramz, setErrorAmz] = useState(false)
    const [inputs, setInputs] = useState({
        "company_cnpj": state.user.company_cnpj
    });
    const[loadingForm, setLoadinForm] = useState({
        'loading': false,
        'success': false,
        'error':false,
        'coderror': false
    });

      
    
    useEffect(()=>{
        RemoveDuplicates(state.data.data ? state.data.data : [])
        setArrayFilter(state.data.data ? state.data.data : [])
        RemoveDuplicatesSupplies(state.data.data ? state.data.data : [])
    },[state.data])

   


    function RemoveDuplicates(value){
        let vls = value.map(i=>i.group_type)
        let uniqueSet = Array.from(new Set(vls));
        setGroup(uniqueSet)
    }

    function RemoveDuplicatesSupplies(value){
        let vls = value.map(i=>i.supplier)
        let uniqueSet = Array.from(new Set(vls));
        setSupplier(uniqueSet)
    }

    function PlotGroup(){
        return [
            groups.map(i=>(
                { key: i, text: i, value: i }
                
            ))
        ]
    }



    function PlotAmz(){
        return[
            state.config.storage[0].map(i=>(
                {key: i.storage, text: i.storage, value: i.storage}
            ))
        ]
    }

    function PlotSupplier(){
        return [
            supplier.map(i=>(
                {key: i, text: i, value: i}
            ))
        ]
    }

    const handleChange = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value.toUpperCase()}))
    }


    const handleCurrencyCost = (event, value) => {
        event.preventDefault();
        setInputs(values=> ({...values, 'cost_price': value}))
    };

    const handleCurrencyExit = (event, value) =>{
        event.preventDefault();
        setInputs(values=> ({...values, 'exit_price': value}))
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoadinForm({...loadingForm, loading: false})
        handleGet()
    }

    function CheackCod(value){
        
        let vls = arrayfilter.filter(item=> item.codigo === value.target.value ? [] : null)
        if(vls != ''){
            setLoadinForm({...loadingForm,coderror: true}) 
        }else{
            setLoadinForm({...loadingForm,coderror: false})
        }
        
        
    }

    function AddItemGrup(value){
        if (value !== ''){
            let valor = value.replace("Add", "")
            setGroup((prev) => [...prev, valor.toUpperCase()])
        }
        
    }

    function AddItemSupplier(value){
        if(value !== ''){
            let valor = value.replace("Add", "")
            setSupplier((prev)=>[...prev, valor.toUpperCase()])
        }
        
    }


    

    const handleGet = () => {
        
        setLoadinForm({...loadingForm, loading: true,})
            axios({
                url: "http://railsonpinheiro.pythonanywhere.com/stock/insert",
                method: 'POST',
                headers:{
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${state.user.token}`
                },
                data: inputs
            }).then(function(response){
                if(response.status === 200){
                    setLoadinForm({...loadingForm, loading: false, success: true})
                    dispatch(changeData(response.data.data))
                    setTimeout(RemoveMessage, 2000)
                    setInputs({"company_cnpj": state.user.company_cnpj})
                    
                }
            }).catch(function(error){
                setLoadinForm({...loadingForm, loading: false, error: true}) 
            })
        
            
            
            
        
        
    }


    function RemoveMessage(){ 
        setLoadinForm({...loadingForm, success: false})
    }


    const HandleDropdownSuplies = (value) => {
        if(value === ''){
            setErrorSupplier(true)
        }else{
            setErrorSupplier(false)
            setInputs(values => ({...values, 'supplier': value.toUpperCase()}))
        }
        
    };

    const HandleDropdownGroup = (value) => {
        if(value === ''){
            setErrorGroup(true)
        }else{
            setErrorGroup(false)
            setInputs(values => ({...values, 'group_type': value.toUpperCase()}))
        }
        
    };

    const HandleDropdownAmz = (value) => {
        if(value === ''){
            setErrorAmz(true)
        }else{
            setErrorAmz(false)
            setInputs(values => ({...values, 'storage': value.toUpperCase()}))
        }
        
    };

    return(
            <Form style={{backgroundColor: 'white', width: '100%', fontSize: '12px', overflow: 'hidden'}} onSubmit={handleSubmit} loading={loadingForm.loading} success={loadingForm.success} error={loadingForm.error}>
                <Form.Field
                    control={Input}
                    label='Codigo'
                    placeholder='deixe em braco para aleatorio'
                    value={inputs.codigo || ""}
                    error={loadingForm.coderror}
                    required
                    name='codigo'
                    onChange={(e)=>{CheackCod(e); handleChange(e)}}
                />
                <Form.Group widths='equal'>
                <Form.Field
                    control={Input}
                    label='Nome'
                    placeholder='Nome'
                    required
                    name='name'
                    value={inputs.name || ""}
                    onChange={handleChange}
                />
                <Form.Field
                    control={Input}
                    label='Quantidade em uso'
                    placeholder='Quantidade em uso'
                    type='number'
                    required
                    value={inputs.quantity_use || ""}
                    name='quantity_use'
                    onChange={handleChange}
                />
                </Form.Group>
                <Form.Group widths='equal'>
                <Form.Field required error={errorgroup}>
                    <label>Grupo</label>
                    <Dropdown
                    options={PlotGroup()[0]}
                    placeholder='Grupo'
                    search
                    selection
                    allowAdditions
                    onAddItem={(e)=>AddItemGrup(e.target.innerText)}
                    onChange={(e)=>HandleDropdownGroup(e.target.innerText)}
                    menuTransition
                    />
                </Form.Field>
                <Form.Field required error={erroramz}>
                    <label>Armazém</label>
                    <Dropdown
                    options={PlotAmz()[0]}
                    placeholder='Armazém'
                    search
                    selection
                    onChange={(e)=>HandleDropdownAmz(e.target.innerText)}
                    />
                </Form.Field>
                </Form.Group>
                
                <Form.Field required error={errorsupplier}>
                    <label>Fornecedor</label>
                    <Dropdown
                    options={PlotSupplier()[0]}
                    placeholder='Fornecedor'
                    search
                    selection
                    allowAdditions
                    onAddItem={(e)=>AddItemSupplier(e.target.innerText)}
                    onChange={(e)=>HandleDropdownSuplies(e.target.innerText)}
                    />
                </Form.Field>
                <Form.Group widths='equal'>
                <Form.Field
                    control={Input}
                    label='Prazo de disponibilidade'
                    placeholder='Disponivel em estoque'
                    required
                    type='number'
                    name='lead_time_new'
                    value={inputs.lead_time_new || ""}
                    onChange={handleChange}
                />
                
                <Form.Field
                    control={Input}
                    label='Quantidade em estoque'
                    placeholder='Quantidade em estoque'
                    type='number'
                    required
                    name='quantity_stock'
                    value={inputs.quantity_stock || ""}
                    onChange={handleChange}
                />

                <Form.Field
                    control={Input}
                    label='Estoque mínimo'
                    placeholder='Quantidade mínima em estoque'
                    type='number'
                    required
                    name='minimum_quantity_stock'
                    value={inputs.minimum_quantity_stock || ""}
                    onChange={handleChange}
                />
                </Form.Group>
                
                <Form.Group widths='equal'>
                
                <Form.Field required>
                    <label>Valor unitario</label>
                    <IntlCurrencyInput currency="BRL" name='cost_price' value={inputs.cost_price} config={currencyConfig}
                    onChange={handleCurrencyCost}/>
                </Form.Field>

                <Form.Field required>
                    <label>Valor de mercado</label>
                    <IntlCurrencyInput currency="BRL" name='exit_price' value={inputs.exit_price} config={currencyConfig}
                    onChange={handleCurrencyExit}/>
                </Form.Field>
                
                
                </Form.Group>

                <Form.Field
                control={TextArea}
                label='Descrição'
                name='description'
                required
                placeholder='Descrição do item'
                value={inputs.description || ""}
                onChange={handleChange}
                style={{height: '50px'}}
                />
                <Message
                success
                header='Item cadastrado'
                content="Novo item cadastrado com sucesso"
                style={{position: 'absolute', width: '100%', zIndex: 100}}
                />
                <Message
                error
                header='Action Forbidden'
                content='Error'
                style={{position: 'absolute', width: '100%', zIndex: 100}}
                />
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: '10px', padding: '10px', zIndex: -1}}>
                
                <Button type="submit" icon labelPosition='right' color='green' style={{width: '100%', margin: '10px'}}>
                    Confirmar
                    <Icon name='right arrow' />
                </Button>
                
                </div>
                
            </Form>
        
    )
}
export default FormAddNew