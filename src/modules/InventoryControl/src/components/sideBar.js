import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/Dashboard';
import AppSelectIcon from '@rsuite/icons/AppSelect';
import StoreIcon from '@rsuite/icons/Storage';
import HistoryIcon from '@rsuite/icons/History';
import LineChartIcon from '@rsuite/icons/LineChart';
import TreemapIcon from '@rsuite/icons/Treemap';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import SingleSourceIcon from '@rsuite/icons/SingleSource';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import {
  useNavigate,
} from "react-router-dom";







const CustomSidenav = ({ appearance, openKeys, expanded, onOpenChange, onExpand, ...navProps }) => {
  const state = useSelector(state=> state.user)
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState('1')

  

  const headerStyles = {
    paddingLeft: 20,
    paddingBottom: 17,
    paddingTop: 17,
    fontSize: 16,
    fontFamily: 'Arial',
    backgroundColor: '#303030',
    color: ' #fff'
  };
    return (
      <div style={{zIndex: 1000}}>
        <Sidenav
          appearance="subtle"
          expanded={true}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{height: '100vh', backgroundColor: '#113847', width: 160}}
        >
          <Sidenav.Header>
            <div style={headerStyles}><AppSelectIcon/><span style={{marginLeft: 20}}>Estoque</span></div>
          </Sidenav.Header>
          <Sidenav.Body>
            <Nav {...navProps} activeKey={activeKey} onSelect={setActiveKey}>
              <Nav.Item eventKey="1"  icon={<DashboardIcon />} onClick={()=>navigate("/estoque")} style={{fontSize: '12px', fontFamily:'Helvetica', backgroundColor: activeKey === "1" ? 'white' : '#113847', color: activeKey === "1" ? 'black' : 'white'}}>
                Dashboard
              </Nav.Item>
              <Nav.Item eventKey="2"  icon={<StoreIcon/>} onClick={()=>navigate("inventario")} style={{fontSize: '12px',fontFamily:'Helvetica', backgroundColor: activeKey === "2" ? 'white' : '#113847', color: activeKey === "2" ? 'black' : 'white'}}>
                Inventário
              </Nav.Item>

              <Nav.Item eventKey="3" icon={<TreemapIcon/>} style={{fontSize: '12px',fontFamily:'Helvetica', backgroundColor: activeKey === "3" ? 'white' : '#113847', color: activeKey === "3" ? 'black' : 'white'}}>
                Armazém
              </Nav.Item>

              <Nav.Item eventKey="4" icon={<HistoryIcon/>} style={{fontSize: '12px',fontFamily:'Helvetica', backgroundColor: activeKey === "4" ? 'white' : '#113847', color: activeKey === "4" ? 'black' : 'white'}}>
                Historico
              </Nav.Item>

              <Nav.Item eventKey="5" icon={<LineChartIcon/>} style={{fontSize: '12px',fontFamily:'Helvetica', backgroundColor: activeKey === "5" ? 'white' : '#113847', color: activeKey === "5" ? 'black' : 'white'}} onClick={()=>navigate("/estoque/analise")}>
                Análise crítica
              </Nav.Item>
              
              
              
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </div>
    );
}

const SideBar =(props)=>{
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