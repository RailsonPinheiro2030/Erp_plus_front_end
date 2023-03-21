import { Button, Input, Checkbox, Icon, Header} from 'semantic-ui-react'
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { changeUser } from "../features/userSlice";
import { changeConfig } from '../features/configSlice';
import {useNavigate} from "react-router-dom";
import '../css/loginForm.css'
import { postData } from '../services/api';


const LoginComponent = (props) =>{
    const navigate = useNavigate();
    const[loading, setLoading] = useState(false);
    const[login, setLogin] = useState({
        'username': '',
        'password': '',
    })
    const dispatch = useDispatch();

    const CloseModal = () =>{
        props.myfunction(false)
    }


    function handleLogin(){
        setLoading(true)
        const postDataPromise = postData('/api/auth/',login)
        postDataPromise.then(function(response){
            dispatch(changeUser(response))
            dispatch(changeConfig(response))
            setLoading(false)
            navigate("redirect")
        
        }).catch(function(error){
            setLoading(false)
            alert(`Error ${error.message}`)
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