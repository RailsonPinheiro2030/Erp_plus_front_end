
import { Navbar, Nav} from 'rsuite';
import UserIcon from '@rsuite/icons/legacy/User';  
import { useState,} from 'react';
import '../css/index.css';
const NavBar = (props) =>{
    const [activeKey, setActiveKey] = useState(null);
    


   

    const handleClick = () =>{
        props.myfunction(true)
    }

    const CustomNavbar = ({ onSelect, activeKey, ...props }) => {
        return (
          <Navbar {...props}>
            <div style={{width: '100%'}}>
                <Nav onSelect={onSelect} activeKey={activeKey}>
                <Nav.Item eventKey="2" style={{color: 'white'}}>Informações</Nav.Item>
                <Nav.Item eventKey="3" style={{backgroundColor: activeKey === "3" ? 'white' : '', color: activeKey === "3" ? 'black' : 'white'}}>Produtos</Nav.Item>
                <Nav.Menu title="Sobre" style={{color: 'white'}}>
                    <Nav.Item eventKey="4">Companhia</Nav.Item>
                    <Nav.Item eventKey="5">Contato</Nav.Item>
                </Nav.Menu>
                </Nav>  
            </div>
            
            <Nav pullRight>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Nav.Item  icon={<UserIcon style={{color: 'white'}}/>} style={{color: 'white'}} onClick={handleClick}>Login</Nav.Item>
                </div>
            </Nav>
          </Navbar>
        );
    }

    

    return(
        <>
        <CustomNavbar  activeKey={activeKey} onSelect={setActiveKey} className={props.class ? 'navbar active' : 'navbar'}/>
        </>
        

        
        
        
    )
}
export default NavBar