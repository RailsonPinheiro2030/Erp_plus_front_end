
import { useState, useEffect} from 'react';
import { Table, IconButton, Pagination, Input, InputGroup} from 'rsuite';
import { Icon, Button,Sidebar} from 'semantic-ui-react';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import SortDownIcon from '@rsuite/icons/SortDown';
import SortUpIcon from '@rsuite/icons/SortUp';
import RemindRoundIcon from '@rsuite/icons/RemindRound';
import { useSelector } from 'react-redux';
import FormAddNew from '../components/formInsertNew';
import '../css/inventory.css';
import SearchIcon from '@rsuite/icons/Search';



const Inventario = (props) =>{
    const { setloading } = props;
    const[values, setValues] = useState([]);
    const[rvalues, setRValues] = useState([]);
    const state = useSelector(state=> state)
    const[openform, setOpenForm] = useState(false)
    const[page, setPage] = useState(1);
    const[limit, setLimit] = useState(20);

    useEffect(()=>{
        setloading()
        setValues(state.data.data ? state.data.data:[].sort ( (a, b) => {
            return new Date(b.datatime) - new Date(a.datatime);
        }))
        setRValues(state.data ? state.data:[])
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



   

    const HandleFilter = (text) =>{
        if (text.length > 3){
            const dts = values.filter(item=>(item.name.toUpperCase().includes(text.toUpperCase()) || item.codigo.toUpperCase().includes(text.toUpperCase()) || item.group_type.toUpperCase().includes(text.toUpperCase())) ? []: null)
            setValues(dts)
        }else(
            setValues(rvalues)
        )

    }



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
        <div className='container-inventory'>   
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
            
            <div>
            <IconButton icon={<AddOutlineIcon style={{color: 'green'}}/>} style={{width: '10%'}} onClick={()=>setOpenForm(prev=>!prev)}>Novo</IconButton>
            <InputGroup inside style={{width: '15%'}}>
            <Input size='sm' onChange={(text)=>HandleFilter(text)}/>
            <InputGroup.Addon>
                <SearchIcon />
            </InputGroup.Addon>
            </InputGroup>
            </div>  
            <div>            
            <Table
                height={'100%'}
                data={data}
                hover={true}
                loading={data === [] ? true: false}
                headerHeight={30}
                fillHeight={true}
                rowHeight={40}
                onRowClick={rowData => {
                }}
            >

            <Column width={100} align="left" fixed fullText>
                <HeaderCell>Codigo</HeaderCell>
                <Cell dataKey="codigo" style={{ fontSize: '11px'}}/>
            </Column>

            <Column width={210} align="left" fixed fullText>
                <HeaderCell>Nome</HeaderCell>
                <Cell dataKey="name" style={{ fontSize: '11px'}}/>
            </Column>

            <Column width={210} align="left" fullText>
                <HeaderCell>Descrição</HeaderCell>
                <Cell dataKey="description" style={{ fontSize: '11px' }}/>
            </Column>

            <Column width={300} align="left" fullText>
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
export default Inventario;