import { useSelector } from 'react-redux';
import { useState, useEffect} from 'react';
import { Table, InputGroup, Pagination, Input} from 'rsuite';
import '../css/history.css';
import { getHistory } from '../../../../services/api';
import moment from 'moment/moment';
import 'moment/locale/pt-br';
import PlusIcon from '@rsuite/icons/Plus';
import MinusIcon from '@rsuite/icons/Minus';
import DragableIcon from '@rsuite/icons/Dragable';
import SearchIcon from '@rsuite/icons/Search';


const HistoryScreen = (props) =>{
    const {setLoading} = props;
    const state = useSelector(state=> state)
    const[rvalues, setRValues] = useState([]);
    const[values, setValues] = useState([]);
    const[limit, setLimit] = useState(20);
    const[page, setPage] = useState(1);
    const data = values.filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
    });

    useEffect(()=>{
        HandleEnter()
    },[])

    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };
    

    const HandleEnter = () =>{
        const Promise = getHistory("api/estoque/history/", state.user.token)
        Promise.then(function(response){
            console.log(response.data)
            setValues(response.data.map(item=>item.history[0]).sort ( (a, b) => {
                return new Date(b.history_date) - new Date(a.history_date);
            }))
            setRValues(response.data.map(item=>item.history[0]))
            setLoading()
        }).catch(function(error){
            alert(`Error ${error.message}`) 
        })
    }

    const HandleFilter = (text) =>{
        if (text.length > 3){
            const dts = values.filter(item=>(item.name.toUpperCase().includes(text.toUpperCase()) || item.codigo.toUpperCase().includes(text.toUpperCase())) ? []: null)
            setValues(dts)
        }else(
            setValues(rvalues)
        )


    }


    const { Column, HeaderCell, Cell } = Table;
    return(
        <div className='container_history'>
        <div>
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
              
          >

              <Column width={100} align="left" fixed fullText>
              <HeaderCell>Codigo</HeaderCell>
              <Cell dataKey="codigo" style={{ fontSize: '12px' }}/>
              </Column>

              <Column width={210} align="left" fixed fullText>
              <HeaderCell>Nome</HeaderCell>
              <Cell dataKey="name" style={{ fontSize: '12px' }}/>
              </Column>
              <Column width={250} align="left" fullText>
              <HeaderCell>Grupo</HeaderCell>
              <Cell dataKey="group_type" style={{ fontSize: '11px' }}/>
              </Column>
              
              
              <Column width={200} align="center" fullText>
              <HeaderCell>Tipo de ação</HeaderCell>
              <Cell  style={{ fontSize: '12px' }}>
              {rowData =>
                  (
                  rowData.history_type === '+' ? (
                    <span style={{color: 'green'}}><PlusIcon/> Incluido</span>
                  ):rowData.history_type === '-'?(
                    <span style={{color: 'red'}}><MinusIcon/> Excluido</span>
                  ):rowData.history_type === '~' ? (
                    <span style={{color: 'blue'}}><DragableIcon/> Atualizado</span>
                  ):(
                    <span>indefinido</span>
                  )
                  )
              }
              </Cell>
              </Column>
              <Column width={230} align="left">
              <HeaderCell>Armazém</HeaderCell>
              <Cell dataKey="storage" style={{ fontSize: '11px' }}/>
              </Column>
              <Column width={100} align="left">
              <HeaderCell>Hora da ação</HeaderCell>
              <Cell  style={{ fontSize: '12px' }}>
              {rowData =>(
                    <span>{moment(rowData.history_date).format('LTS')}</span>
                  )
              }
              </Cell>
              </Column>

              <Column width={130} align="left">
              <HeaderCell>
                  Data da ação
              </HeaderCell>
              <Cell  style={{ fontSize: '12px' }}>
              {rowData =>
                  (
                  <span>{moment(rowData.history_date).format('L')}</span>
                  )
              }
              </Cell>
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
export default HistoryScreen;