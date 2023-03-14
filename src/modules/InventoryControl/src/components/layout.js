import React from 'react';
import NavbarApp from '../../../../components/navbarApp';
import SideBar from './sideBar';

const Layout = ({ children }) => {
  return (
    
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
        <SideBar/>
        <div style={{width: '100%', height: '100vh', backgroundColor: 'white'}}>
            <NavbarApp/>
            {children}
        </div>
    </div>
  );
};

export default Layout;