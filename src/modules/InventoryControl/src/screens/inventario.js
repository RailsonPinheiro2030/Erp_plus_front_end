
import { useState, useEffect} from 'react';
import { Table, Progress, IconButton,  InputPicker, Pagination, AutoComplete} from 'rsuite';
import { Icon, Button,Sidebar} from 'semantic-ui-react';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import SortDownIcon from '@rsuite/icons/SortDown';
import SortUpIcon from '@rsuite/icons/SortUp';
import RemindRoundIcon from '@rsuite/icons/RemindRound';
import "rsuite/dist/rsuite.min.css";
import { useSelector } from 'react-redux';
import * as styles from './inventario.styles';
import FormAddNew from '../components/formInsertNew';





const Inventario = (props) =>{
    const[values, setValues] = useState([]);
    const state = useSelector(state=> state.data)
    const[openform, setOpenForm] = useState(false)
    const[page, setPage] = useState(1);
    const[limit, setLimit] = useState(20);

    useEffect(()=>{
      setValues(state.data ? state.data:[])
    },[state.data])
    useEffect(()=>{
        props.setloading()
    },[])

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


    const MinimumStock = ({ rowData, dataKey, ...props }) => {
        
        return (
          <Cell {...props}>
            {rowData.quantity_stock < rowData.minimum_quantity_stock ? (
                <span><SortDownIcon style={{color: 'red'}}/>{rowData.minimum_quantity_stock}</span>
            ):rowData.quantity_stock > rowData.minimum_quantity_stock ? (
                <span><SortUpIcon style={{color: 'green'}}/>{rowData.minimum_quantity_stock}</span>
            ):rowData.quantity_stock === rowData.minimum_quantity_stock ?(
                <span><RemindRoundIcon style={{color: 'orange'}}/>{rowData.minimum_quantity_stock}</span>
            ):null}
              
          </Cell>
        );
      };
    return(
        <div style={{height: '93vh',borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', width: '100%', padding: 5}}>   
        <Sidebar
                style={{backgroundColor: 'white', width: '40%'}}
                direction='right'
                animation='scale down'
                vertical
                visible={openform}
            >
                
                <nav style={{backgroundColor: '#113847', height: '58px', borderBottom: '1px solid #f0f1f2'}}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems:'center', justifyContent:'flex-start', margin: '5px', padding: '10px'}}>
                    <Button icon color='red' style={{fontSize: '10px'}} onClick={()=>setOpenForm(prev=>!prev)}>
                        <Icon name='close'/>
                    </Button>
                    <span style={{fontSize: '18px', marginLeft: '10px', color: 'white'}}>Inserir novo item</span>
                    </div>
                </nav>
                <div style={{overflow: 'hidden', padding: '5px'}}>
                    <FormAddNew/>
                </div>
                    
                
        </Sidebar>
            
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '9%'}}>
          <IconButton icon={<AddOutlineIcon style={{color: 'green'}}/>} style={{width: '10%'}} onClick={()=>setOpenForm(prev=>!prev)}>Novo</IconButton><AutoComplete size='sm' placeholder="Pesquisar" data={state.data ? state.data.map(i => i.name) : []} style={{fontSize: '11px'}} />
          </div>  
          <div style={{backgroundColor: 'white', width: '100%', height: '100%', padding: '1px'}}>            
          <Table
                height={'100%'}
                style={{borderRadius: '10px', width: '100%', fontFamily: 'Arial'}}
                data={data}
                hover={true}
                loading={data === [] ? true: false}
                headerHeight={30}
                fillHeight={true}
                rowHeight={40}
                onRowClick={rowData => {
                }}
            >

            <Column width={100} align="left" fixed>
                <HeaderCell>Codigo</HeaderCell>
                <Cell dataKey="codigo" style={{ fontSize: '11px'}}/>
            </Column>

            <Column width={210} align="left" fixed>
                <HeaderCell>Nome</HeaderCell>
                <Cell dataKey="name" style={{ fontSize: '11px'}}/>
            </Column>

            <Column width={210} align="left">
                <HeaderCell>Descrição</HeaderCell>
                <Cell dataKey="description" style={{ fontSize: '11px' }}/>
            </Column>




            <Column width={300} align="left">
                <HeaderCell>Grupo</HeaderCell>
                <Cell dataKey="group_type" style={{ fontSize: '11px' }}/>
            </Column>

            <Column width={300} align="left">
                <HeaderCell>Armazém</HeaderCell>
                <Cell dataKey="storage" style={{ fontSize: '11px' }}/>
            </Column>
            
            <Column width={190} align="left">
                <HeaderCell>Fornecedor</HeaderCell>
                <Cell dataKey="supplier" style={{ fontSize: '11px' }}/>
            </Column>
            
            <Column width={190} align="center">
                <HeaderCell>Prazo de disponibilidade do novo item</HeaderCell>
                <Cell dataKey="lead_time_new" style={{ fontSize: '11px' }}>
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
                Quantidade em uso
                </HeaderCell>
                <Cell dataKey="quantity_use" style={{ fontSize: '11px' }}/>
            </Column>
            
            <Column width={150} align="center">
                <HeaderCell>
                Quantidade em estoque
                </HeaderCell>
                <Cell dataKey="quantity_stock" style={{ fontSize: '11px' }}/>
            </Column>  

            <Column width={130} align="left">
                <HeaderCell>
                Valor unitario
                </HeaderCell>
                <Cell dataKey="cost_price" style={{ fontSize: '11px' }}>
                {rowData =>
                (
                    <span>{`R$ ${rowData.cost_price}`}</span>
                )
                }
                </Cell>
            </Column>

            <Column width={130} align="left">
                <HeaderCell>
                Valor de mercado
                </HeaderCell>
                <Cell dataKey="exit_price" style={{ fontSize: '11px' }}>
                {rowData =>
                (
                    <span>{`R$ ${rowData.exit_price}`}</span>
                )
                }
                </Cell>
            </Column>

            

            <Column width={150} align="left">
                <HeaderCell>
                Valor total em estoque
                </HeaderCell>

                <Cell dataKey="cost_price" style={{ fontSize: '11px' }}>
                {rowData =>
                (
                    <span>R$ {rowData.cost_price * rowData.quantity_stock}</span>
                )
                }
                </Cell>
            </Column>

            <Column width={120}>
            <HeaderCell>
                Estoque minimo
            </HeaderCell>
            <MinimumStock dataKey="minimum_quantity_stock" style={{fontSize: '11px'}}/>
            </Column>  
            
          </Table>
          </div> 
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%', height: '5%', padding: '2px', backgroundColor: '#e0dede', borderBottomRightRadius: 5, borderBottomLeftRadius: 5}}>
          
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
export default Inventario;