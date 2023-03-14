import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import StoreIcon from '@rsuite/icons/Storage';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import PeoplesMapIcon from '@rsuite/icons/PeoplesMap';
import { useState } from 'react';
import { useSelector } from "react-redux";
import {
  useNavigate,
} from "react-router-dom";



const CustomSidenav = ({ appearance, openKeys, expanded, onOpenChange, onExpand, ...navProps }) => {
  const state = useSelector(state=> state.user)
  
  const navigate = useNavigate();


  const RenderModuleMenu = () =>{
      return(
          <>
          {state.modulo01 && (
              <Nav.Menu eventKey="2" title="Departamento pessoal" icon={<PeoplesMapIcon/>}>
                  <Nav.Item eventKey="2-1">Gestão de desempenho</Nav.Item>
                  <Nav.Item eventKey="2-2">Recrutamento</Nav.Item>
              </Nav.Menu>
          )}
          {state.modulo02 && (
              <Nav.Menu eventKey="3" title="Inventário" icon={<StoreIcon/>}>
                  <Nav.Item eventKey="3-1" onClick={()=>navigate("/estoque")}>Stock</Nav.Item>
                  <Nav.Item eventKey="3-2">Armazem</Nav.Item>
                  <Nav.Item eventKey="3-3">Histograma de movimetação</Nav.Item>
                  <Nav.Item eventKey="3-4" onClick={()=>navigate("/estoque/analise")}>Análise Crítica</Nav.Item>
              </Nav.Menu>
          )}
          
      </>

          
      )
    }
    return (
      <div>
        <Sidenav
          appearance="subtle"
          expanded={expanded}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{height: '100vh', backgroundColor: '#113847'}}
        >
          <Sidenav.Body>
            <Nav {...navProps}>
              <Nav.Item eventKey="1" icon={<DashboardIcon />}>
                Dashboard
              </Nav.Item>
              <RenderModuleMenu/>
              <Nav.Menu eventKey="4" title="Configurações" icon={<GearCircleIcon />}>
                    <Nav.Item eventKey="4-1">Aplicações</Nav.Item>
                    <Nav.Item eventKey="4-2">Canais</Nav.Item>
            </Nav.Menu>
              
            </Nav>
          </Sidenav.Body>
          <Sidenav.Toggle onToggle={onExpand} />
        </Sidenav>
      </div>
    );
}

const SideBar =()=>{
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState('0');
  const [openKeys, setOpenKeys] = useState(['0','0', '0']);
  const [expanded, setExpand] = useState(false);

    return (
        <>
        <CustomSidenav
            activeKey={activeKey}
            openKeys={openKeys}
            onOpenChange={setOpenKeys}
            onSelect={setActiveKey}
            expanded={expanded}
            onExpand={setExpand}
        />
        </>
    );
}
export default SideBar