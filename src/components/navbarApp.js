import {Avatar, IconButton, Badge, Dropdown, Popover, Whisper } from 'rsuite';
import NoticeIcon from '@rsuite/icons/Notice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NavbarApp = () =>{
  const navigate = useNavigate()
    const state = useSelector(state=> state.user)


    const renderMenu = ({ onClose, left, top, className }, ref) => {
  
        const handleSelect = eventKey => {
          onClose();
        };
        return (
          <Popover ref={ref} className={className} style={{ left, top }} full open={false}>
            <Dropdown.Menu onSelect={handleSelect}>
              <Dropdown.Item panel style={{ paddingLeft: 10, width: 160, paddingRight: 10}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                <span>
                  Logado como
                </span>
                <strong>{state.isAdmin === true ? 'adiministrador': 'usuario'}</strong>
                </div>
              
            </Dropdown.Item>
            <Dropdown.Item divider />
            <Dropdown.Item>Seu perfil</Dropdown.Item>
            <Dropdown.Item divider />
            <Dropdown.Item>ajuda</Dropdown.Item>
            <Dropdown.Item>Configurações</Dropdown.Item>
            <Dropdown.Item  onClick={()=>navigate('/redirect')}>Sair</Dropdown.Item>
            </Dropdown.Menu>
          </Popover>
        );
      }; 

    return(
        <div style={{width:'100%',height: 50, display:'flex', flexDirection: 'row', justifyContent:'flex-end', alignItems: 'center', padding: 5}}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '2px', height: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', width: '100%', margin: '2px'}}>
                  <div style={{marginRight: '10px'}}> 
                    <Badge content={false}>
                        <IconButton icon={<NoticeIcon/>} size="sm"/>
                    </Badge>
                  </div>
                  <Whisper placement="bottomEnd" trigger="click" speaker={renderMenu}>
                    <Avatar circle style={{ background: '#868686', cursor: 'pointer' }}>
                      <span style={{fontSize: '15px'}}>
                      {state.name.slice(0,1)}{state.name.slice(1,2)}
                      </span>
                    </Avatar>
                  </Whisper>
                </div>
            </div>
        </div>
    )
}
export default NavbarApp