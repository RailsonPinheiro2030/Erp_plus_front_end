import { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { Table, Pagination, Popover, Whisper, Dropdown, Progress,  IconButton, Modal,  InputGroup, Input } from 'rsuite';
import MoreIcon from '@rsuite/icons/legacy/More';
import { Label } from 'semantic-ui-react';
import "rsuite/dist/rsuite.min.css";
import { Header, Divider } from 'semantic-ui-react'
import styles from '../css/index.stock.module.css'
import { useSelector } from 'react-redux';
import AnaliseForm from '../components/analise'
import RemindRoundIcon from '@rsuite/icons/RemindRound';
import '../css/analysis.css';
import SearchIcon from '@rsuite/icons/Search';


const AnalysinScreen = (props) =>{
    const {setloading} = props;
    const idRef = useRef();
    const[limit, setLimit] = useState(20);
    const[page, setPage] = useState(1);
    const[values, setValues] = useState([]);
    const[rvalues, setRValues] = useState([]);
    const[analisar, setAnalisar] = useState();
    const[open, setOpen] = useState(false);
    const[matrix, setMatrix] = useState([]);
    const state = useSelector(state=> state)

    useEffect(()=>{
      setloading()
      setValues(state.data.data)
      setRValues(state.data.data)
      setMatrix(state.config.riskClass)
    },[state.data, setloading])
  
    const { Column, HeaderCell, Cell } = Table;
    
    const handleChangeLimit = dataKey => {
      setPage(1);
      setLimit(dataKey);
    };
  
    const data = values.filter((v, i) => {
      const start = limit * (page - 1);
      const end = start + limit;
      return i >= start && i < end;
    });
  
    

    const NameCell = ({ rowData, dataKey, ...props }) => {
      const speaker = (
        <Popover title="Status" style={{fontSize: '10px'}}>
          <p>
            <b>Estrategia quando a falha:</b>{rowData.strategy_when_fails === 'UNDEFINED'? 'NENHUMA': rowData.strategy_when_fails}
          </p>
          <p>
            <b>Efeito ou consequencia da falha:</b> {rowData.Effect_Consequence_of_failure === 0 ? "Desconhecido": rowData.Effect_Consequence_of_failure}
          </p>
        </Popover>
        );
        return (
          <Cell {...props}>
            <Whisper placement="top" speaker={speaker}>
              {/* ///TODO */}
              <a>{rowData.failure_frequency === 'UNDEFINED'?(
                <a>{rowData.failure_frequency}  <RemindRoundIcon style={{color: 'red', marginTop: '-5px'}}/></a>
              ):rowData.failure_frequency}</a>
            </Whisper>
          </Cell>
        );
    }


    const DeskCell = ({ rowData, dataKey, ...props }) => {
      const speaker = (
        <Popover title="Descrição" style={{width: '200px'}}>
          {rowData.description}
        </Popover>
        );
        return (
          <Cell {...props}>
            <Whisper placement="top" speaker={speaker}>
              <a>{rowData[dataKey]}</a>
            </Whisper>
          </Cell>
      );
    } 
    
    const RiscCell = ({ rowData, dataKey, ...props }) => {
      let vls = parseInt(rowData.health_security) + parseInt(rowData.environment) + parseInt(rowData.cost_operation) + parseInt(rowData.volume_production) + parseInt(rowData.lead_time_new)
      const speaker = (
        <Popover title='' style={{width: '200px'}}>
          <div style={{padding: '2px', fontFamily: 'Arial'}} className={styles.RiscCell}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            
            <h5>{rowData.potential_existing_risk}</h5>
            </div>
            <p>
              <b>Inpacto a saude e seguranca:</b>{`  ${Math.round((rowData.health_security / vls) * 100)}%`}
            </p>
            <p>
              <b>Impacto ao meio ambiente:</b> {`  ${Math.round((rowData.environment / vls) * 100)}%`}
            </p>
            <p>
              <b>Impacto no custo de operação:</b>{`  ${Math.round((rowData.cost_operation / vls) * 100)}%`}
            </p>
            <p>
              <b>Impacto na producao:</b>{`  ${Math.round((rowData.volume_production / vls) * 100)}%`}
            </p>
            <p>
              <b>Lead Time:</b>{`  ${Math.round((rowData.lead_time_new / vls) * 100)}%`}
            </p>
          </div>
          
          
        </Popover>
        );
        return (
          <Cell {...props}>
            <Whisper placement="auto" speaker={speaker}>
            <a>{rowData.potential_existing_risk === 'UNDEFINED'?(
                <a>{rowData.potential_existing_risk}  <RemindRoundIcon style={{color: 'red', marginTop: '-5px'}}/></a>
              ):rowData.potential_existing_risk}</a>
            </Whisper>
          </Cell>
      );
    } 
    
    const renderMenu = ({ onClose, left, top, className, rowData }, ref) => {
      const handleSelect = eventKey => {
        onClose();
      };
      return (
        <Popover ref={ref} className={className} style={{ left, top }} full >
          <Dropdown.Menu onSelect={handleSelect}>
            <Dropdown.Item eventKey={1} onClick={()=>setOpen(true)}>Definir criticidade</Dropdown.Item>
          </Dropdown.Menu>
        </Popover>
      );
    };
    
    const ActionCell = ({ rowData, dataKey, ...props }) => {
      return (
        <Cell {...props} className="link-group">
          <Whisper placement="bottomEnd" trigger="click" speaker={renderMenu} ref={idRef}>
            <IconButton icon={<MoreIcon/>} style={{backgroundColor: '#ffffff00'}}/>
          </Whisper>
        </Cell>
      );
    };
    


   

    const styleCircle = {
      width: 40,
      display: 'inline-block',
      marginTop: -5,
      padding: '3px',
    };



    function FilterData(value){
      if(value != null){
        let vls = values.filter(item=>item.name.toUpperCase().trim() === value ? []: null)
        setValues(vls)
      }else{
        setValues(state.data)
      }
      
      
      
      
    }
    
    function CloseModal(){
      setOpen(false)
    }
    


    
    
    
    const HeaderStoque = ({ title, summary }) => (
      <div>
        
      <label>{title}</label>
      <div
        style={{
          fontSize: 15,
          color: '#2eabdf'
        }}
      >
        {data.reduce((acc, current) => acc + Number.parseInt(current.Quantidade_estoque), 0)}
      </div>
    </div>
    );

    const HeaderUso = ({ title, summary }) => (
      <div>
        
      <label>{title}</label>
      <div
        style={{
          fontSize: 15,
          color: '#2eabdf'
        }}
      >
        {data.reduce((acc, current) => acc + Number.parseInt(current.Quantidade_instalada), 0)}
      </div>
    </div>
    );


    let estoque = 0;
    let total = 0;
    data.forEach(item => {
      total += item.cost_price;
      estoque+=item.quantity_stock;
    });


    const HandleFilter = (text) =>{
      if (text.length > 3){
          const dts = values.filter(item=>(item.name.toUpperCase().includes(text.toUpperCase()) || item.codigo.toUpperCase().includes(text.toUpperCase()) || item.group_type.toUpperCase().includes(text.toUpperCase())) ? []: null)
          setValues(dts)
      }else(
          setValues(rvalues)
      )


  }


    return(
        <div className='container-analysis'>        
          
          <div>   
            <InputGroup inside style={{width: '15%'}}>
              <Input size='sm' onChange={(text)=>HandleFilter(text)}/>
              <InputGroup.Addon>
                <SearchIcon />
            </InputGroup.Addon>
            </InputGroup>
            <Modal open={open} size="md" onClose={()=>CloseModal()} overflow={false} style={{marginTop: '10px', padding: 0, fontFamily: 'Arial'}}>
            <Modal.Header style={{marginTop: -5}}>
                <Modal.Title style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', width: '100%', padding: '2px'}}>
                
                    <div>
                    <Header sub style={{fontSize: '12px'}}>Codigo</Header>
                    <span style={{color: '#8f8e8e', fontSize: '12px'}}>{analisar != undefined ? analisar['codigo']: ''}</span>
                    </div>
                    <div>
                    <Header sub style={{fontSize: '12px'}}>Nome</Header>
                    <span style={{color: '#8f8e8e', fontSize: '12px'}}>{analisar != undefined ? analisar['name']: ''}</span>
                    </div>
                    
                    <div>
                    <Header sub style={{fontSize: '12px'}}>Quantidade em uso</Header>
                    <span style={{color: '#8f8e8e', fontSize: '12px'}}>{analisar != undefined ? analisar['quantity_use']: ''}</span>
                    </div>
                    <div>
                    <Header sub style={{fontSize: '12px'}}>Valor unitario</Header>
                    <span style={{color: '#8f8e8e', fontSize: '12px'}}>{`R$ ${analisar != undefined ? analisar['cost_price']: ''}`}</span>
                    </div>
                </div>
                </Modal.Title>
            </Modal.Header>
                <Modal.Body style={{height: '80vh'}}>
                <AnaliseForm items={analisar} fun={CloseModal} loading={props.setloading} class={matrix}/>
                </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
            </Modal>
          </div>
            
          <div>            
          <Table
              height={'100%'}
              style={{borderRadius: '10px', width: '100%', fontFamily: 'Arial', color :'#2b2a2a'}}
              data={data}
              hover={true}
              loading={data === [] ? true: false}
              headerHeight={30}
              fillHeight={true}
              rowHeight={40}
              onRowClick={rowData => {
                  setAnalisar(rowData);
              }}
          >

              <Column width={100} align="left" fixed fullText>
              <HeaderCell>Codigo</HeaderCell>
              <Cell dataKey="codigo" style={{ fontSize: '12px' }}/>
              </Column>

              <Column width={210} align="left" fixed fullText>
              <HeaderCell>Nome</HeaderCell>
              <DeskCell dataKey="name" style={{ fontSize: '12px' }}/>
              </Column>
              <Column width={300} align="left" fullText>
              <HeaderCell>Grupo</HeaderCell>
              <Cell dataKey="group_type" style={{ fontSize: '11px' }}/>
              </Column>
              
              
              <Column width={110} align="center">
              <HeaderCell>Leade-Time Nv</HeaderCell>
              <Cell dataKey="lead_time_new" style={{ fontSize: '12px' }}>
              {rowData =>
                  (
                  rowData.lead_time_new > 1 ? (
                      <span>{`${rowData.lead_time_new} dias`}</span>
                  ):(
                      <span>{`${rowData.lead_time_new} dia`}</span>
                  )
                  )
              }
              </Cell>
              </Column>
              
              <Column width={150} align="center">
              <HeaderCell>
                  <HeaderUso title='Quantidade em uso'/>
              </HeaderCell>
              <Cell dataKey="quantity_use" style={{ fontSize: '12px' }}/>
              </Column>
              
              <Column width={150} align="center">
              <HeaderCell>
                  <HeaderStoque title="Quantidade em estoque" summary={estoque}/>
              </HeaderCell>
              <Cell dataKey="quantity_stock" style={{ fontSize: '12px' }}/>
              </Column>  

              <Column width={130} align="left">
              <HeaderCell>
                  Valor unitario
              </HeaderCell>
              <Cell dataKey="cost_price" style={{ fontSize: '12px' }}>
              {rowData =>
                  (
                  <span>{`R$ ${rowData.cost_price}`}</span>
                  )
              }
              </Cell>
              </Column>

              
              
          
              <Column width={160}>
              <HeaderCell>Frequencia da falha</HeaderCell>
              <NameCell dataKey="failure_frequency" style={{ fontSize: '12px' }}/>
              </Column>
              
              <Column width={130} align="center">
              <HeaderCell>
                  Nivel de risco
              </HeaderCell>
              <RiscCell dataKey="potential_existing_risk" style={{ fontSize: '12px', color: 'green'}}/>
              </Column>

              <Column width={200} align="center">
              <HeaderCell>Maior criticidade dos ativos</HeaderCell>
              <Cell style={{ padding: '5px 0' }}>
                  { rowData =>
                  <div style={styleCircle}>
                  <Progress.Circle percent={rowData.Highest_criticality_of_assets} strokeColor={rowData.potential_existing_risk === 'Alto'? 'orange': rowData.potential_existing_risk === 'Crítico' ? 'red': rowData.potential_existing_risk === 'Baixo'? 'green': rowData.potential_existing_risk === 'Moderado'? 'yellow': 'blue'} showInfo={true}/>
                  </div>
                  }
              </Cell>
              </Column>

              <Column width={120}>
              <HeaderCell>
                  <MoreIcon/>
              </HeaderCell>
              <ActionCell style={{marginTop: '-10px'}} dataKey="codigo"/>
              </Column>
          </Table>
          </div> 
          <div>
          
          <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              maxButtons={5}
              size="xs"
              layout={['total', '-', 'limit', '|', 'pager', 'skip']}
              total={values.length}
              limitOptions={[10, 30, 50]}
              limit={limit}
              activePage={page}
              onChangePage={setPage}
              onChangeLimit={handleChangeLimit}
          />
          </div>
        </div>
    )
}
export default AnalysinScreen;