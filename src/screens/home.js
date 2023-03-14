import 'rsuite/dist/rsuite.min.css';
import '../css/index.css';
import NavBar from '../components/navbar';
import {useState} from 'react';
import 'semantic-ui-css/semantic.min.css'
import {Modal,} from 'semantic-ui-react';
import LoginComponent from '../components/loginForm.js';
const HomeScreen = () =>{
    const[open, setOpen] = useState(false)
    const ModalContainer = () =>{
        return(
            <Modal
                open={open}
                style={{minWidth: '300px', maxWidth: '400px'}}
                >
                <Modal.Content>
                    <Modal.Description>
                        <LoginComponent myfunction={setOpen}/>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
    


    return(
        <div className='container_home'>
            <NavBar myfunction={setOpen}/>
            <ModalContainer/>
            <div className='home_primary'>
                <div className='fade-element'>
                    <h1><span>E</span><span style={{color:'black'}}>R</span><span>P</span> para gestão eficiente e integrada.</h1>
                </div>
            </div>
        </div>

    );
}
        

        


    
export default HomeScreen

