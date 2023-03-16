import { Button, Input, Checkbox, Icon, Header} from 'semantic-ui-react'
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { changeUser } from "../features/userSlice";
import { changeConfig } from '../features/configSlice';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import '../css/loginForm.css'


const LoginComponent = (props) =>{
    const navigate = useNavigate();
    const[loading, setLoading] = useState(false);
    const[login, setLogin] = useState({
        'username': '',
        'password': '',
        'saved': false
    })
    const dispatch = useDispatch();

    const CloseModal = () =>{
        props.myfunction(false)
    }


    function handleLogin(){
        setLoading(true)
        axios({
            url: `http://railsonpinheiro.pythonanywhere.com/login`,
            method: 'POST',
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            },
            data:{
                "username": login.username,
                "password": login.password
            }
  
        }).then(function(response){
            if(response.status === 200){
                setLoading(false)
                
                dispatch(changeUser(response.data))
                dispatch(changeConfig(response.data))
                navigate("redirect")
                
                
            }
        }).catch(function(response){
            if(response.status === 500){
                alert("Error Usuario ou senha invalido")
            }else{
                alert("Error Usuario ou senha invalido")
            }
            setLoading(false)
        })
    }

    return(
        <div className='container-login-form'>
            <Button icon color="gray" onClick={CloseModal} style={{fontSize:'8px', marginLeft: '-90%'}}><Icon name='x' style={{fontSize: '10px'}}/></Button> 
            <Header style={{fontSize: '25px', color: '#535353'}}>Bem vindo!</Header>
            <div>
                <div style={{width: '100%', margin: '15px'}}>
                    <label>Username</label>
                    <Input icon='user' iconPosition='left' placeholder='username ou email' style={{width: '100%'}} onChange={(e)=>setLogin({...login, username: e.target.value})}/>
                </div>
                
                <div style={{width: '100%', margin: '15px'}}>
                    <label>Senha</label>
                    <Input icon='key' type="password" iconPosition='left' placeholder='senha' style={{width: '100%'}} onChange={(e)=>setLogin({...login, password: e.target.value})}/>
                </div>
                <div style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Checkbox label='salvar meu acesso'/>
                    <span>esqueci minha  <a href="/#">senha</a></span>
                </div>

            
                <Button color='blue' style={{width: '100%', margin: 10}} onClick={()=>handleLogin()} loading={loading}>Login</Button>
            

            </div>
            
        
        </div>
    )
}
export default LoginComponent