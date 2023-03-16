import { useEffect, useState } from 'react'
import { Button, Progress} from 'rsuite';
import { Tab } from 'semantic-ui-react'
import axios from 'axios';
import styles from '../css/index.stock.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { analyticData } from '../features/dataSlice';





function AnaliseForm(props){ 
  const dispatch = useDispatch()
  const { setloading } = props
  const state = useSelector(state=> state)
  const[matrix, setMatrix] = useState([props.class]);
  const[values, setValues] = useState(props.items)
  const[result, setResult] = useState(0)
  const[resttime, setRestTime] = useState(0)
  useEffect(() => {
    setloading()
    }, [setloading]);


    
  useEffect(() => {
      
      let time = 0
      if ((values.lead_time_new == 0) || (values.lead_time_new == undefined)){
        time = 0
      }else if(values.lead_time_new <= 3){
        time = 1
      }else if((values.lead_time_new >= 5) && (values.lead_time_new < 7)){
        time = 2
      }else if((values.lead_time_new >= 9) && (values.lead_time_new < 11)){
        time = 3
      }else if((values.lead_time_new >= 13) && (values.lead_time_new < 15)){
        time = 4
      }else{
        time = 5
      }
      var mxsum = [values.cost_operation,values.volume_production,values.health_security,values.environment,time]
      var maior = Math.max.apply(null, mxsum);
      const avaliable = matrix[0].filter(item => item.avali === values.failure_frequency[0] && parseInt(item.consequence) === parseInt(maior));

      var result = parseInt(values.cost_operation) + parseInt(values.volume_production) + parseInt(values.health_security) + parseInt(values.environment) + parseInt(time)
      let sum = Math.round((result / 25) * 100)
      
      const updateValues = {
        ...values,
        Highest_criticality_of_assets:sum,
        potential_existing_risk: avaliable.map(i=>i.risk)[0],
      }
      setValues(updateValues)
      setRestTime(time)
      setResult(result)
      
  }, [values.cost_operation,values.volume_production,values.health_security,values.environment, values.lead_time_new, values.potential_existing_risk]);
    
   

    
  const handleUpdate = () => {
    
    
    axios({
        url: `http://railsonpinheiro.pythonanywhere.com/stock/update/analisar`,
        method: 'POST',
        headers:{
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${state.user.token}`
        },
        data:{
          data: values
        }
      }).then(function(response){
        if(response.status === 200){
          dispatch(analyticData(values))
          props.fun()
        }
      })
  }
  
  

  const handleChange = (event) => {
    
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const updateValues = {
      ...values,
      [name]: value
    }
    
    setValues(updateValues)
  }

  const panes = [
    { menuItem: 'Analise critica', render: () => 
    <Tab.Pane>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%'}}>  
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', padding:'6px'}}>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '80%'}}>
              <div style={{width: '60%', margin: '5px'}}>
                <Progress.Circle percent={values ? values.Highest_criticality_of_assets : 0}  strokeWidth={9} strokeColor={'#03a1fc'} />
              </div>
              <span>{values ? values.potential_existing_risk : 'indefinido'}</span>
            </div>
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '5px'}}>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', backgroundColor: 'white'}} className={styles.containerclass}>
                <span>
                  Classe de risco
                  <br></br>
                  <span>{values.failure_frequency}</span>
                </span>
                <span>
                  Inpacto na produção
                  <br/>
                  <span>{Math.round((values.volume_production / result) * 100)}%</span>
                </span>
                <span>
                  Impacto nos custos
                  <br/>
                  <span>{Math.round((values.cost_operation / result) * 100)}%</span>
                </span>
              </div>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%'}} className={styles.containerclass}>
              <span>
                Lead time
                  <br/>
                  <span>{Math.round((resttime / result) * 100)}%</span>
              </span>
              <span>
                Impacto na saude
                  <br/>
                  <span>{Math.round((values.health_security / result) * 100)}%</span>
              </span>
              <span>
                Impacto no meio ambiente
                  <br/>
                  <span>{Math.round((values.environment / result) * 100)}%</span>
              </span>
              </div>
            </div>
          </div>
          </div>   
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', margin: '5px',}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', margin: '10px'}} className={styles.conteineroption}>
              <div style={{width: '100%'}}>
              <label style={{fontFamily: 'Arial', fontSize: '15px', padding: '2px'}}>Frequencia de falha</label>
              <select value={values.failure_frequency} onChange={handleChange} name='failure_frequency' style={{fontSize: '15px', width: '100%', border: '1px solid #c9c6c6', outline: 'none', padding: '5px', borderRadius: '5px'}}>
                <option selected>Selecione</option>
                <option value="A-Quase certo">A-Quase certo</option>
                <option value="B-Provável">B-Provável</option>
                <option value="C-Possível">C-Possível</option>
                <option value="D-Improvável">D-Improvável</option>
                <option value="E-Raro">E-Raro</option>
              </select>
              </div>
              
              <div style={{width: '100%'}}>
              <label style={{fontFamily: 'Arial', fontSize: '15px', padding: '2px'}}>Volume de produção</label>
              <select value={values.volume_production} onChange={handleChange} name='volume_production' style={{fontSize: '15px', width: '100%', border: '1px solid #c9c6c6', outline: 'none', padding: '5px', borderRadius: '5px'}}>
                <option value="5" title="Impacto na Produção">5</option>
                <option value="4" title="Impacto na Produção">4</option>
                <option value="3" title="Impacto na Produção">3</option>
                <option value="2" title="Impacto na Produção">2</option>
                <option value="1" title="Impacto na Produção">1</option>
                <option value="0" selected title="Impacto na Produção">0</option>
              </select>
              </div>
              
              <div style={{width: '100%'}}>
              <label style={{fontFamily: 'Arial', fontSize: '15px', padding: '2px'}}>Custo operacional</label>
              <select value={values.cost_operation} onChange={handleChange} name='cost_operation'  style={{fontSize: '15px', width: '100%', border: '1px solid #c9c6c6', outline: 'none', padding: '5px', borderRadius: '5px'}}>
                <option value="5" title="Impacto no Custo">5</option>
                <option value="4" title="Impacto no Custo">4</option>
                <option value="3" title="Impacto no Custo">3</option>
                <option value="2" title="Impacto no Custo">2</option>
                <option value="1" title="Impacto no Custo">1</option>
                <option value="0" selected title="Impacto no Custo">0</option>
              </select>
              </div>
              
            </div>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', margin: '10px'}}>  
              <div style={{width: '100%'}}>
              <label style={{fontFamily: 'Arial', fontSize: '15px', padding: '2px'}}>Lead Time</label>
              <input placeholder="Lead time" value={values.lead_time_new || ""} onChange={handleChange} name='lead_time_new' type='number' style={{fontSize: '15px', width: '100%', border: '1px solid #c9c6c6', outline: 'none', padding: '5px', borderRadius: '5px'}}/>
              </div>
              
              <div style={{width: '100%'}}>
              <label style={{fontFamily: 'Arial', fontSize: '15px', padding: '2px'}}>Saúde e Segurança</label>
              <select value={values.health_security}  onChange={handleChange} name='health_security' style={{fontSize: '15px', width: '100%', border: '1px solid #c9c6c6', outline: 'none', padding: '5px', borderRadius: '5px'}}>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
                <option value="0" selected>0</option>
              </select>
              </div>
              
              <div style={{width: '100%'}}>
              <label style={{fontFamily: 'Arial', fontSize: '15px', padding: '2px'}}>Medio Ambiente</label>
              <select value={values.environment}  onChange={handleChange} name='environment' style={{fontSize: '15px', width: '100%', border: '1px solid #c9c6c6', outline: 'none', padding: '5px', borderRadius: '5px'}}>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
                <option value="0" selected>0</option>
              </select>
              </div>
              
            </div>

          </div> 
          
          
      </div>
    </Tab.Pane> },
    ,
  ]
    
  return(
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
        <Tab panes={panes} style={{width: '100%'}}/>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', width: '100%'}}>
            <Button appearance="primary" style={{margin: '5px'}} onClick={()=>handleUpdate()}>
                  Confirmar
            </Button>
            <Button  style={{backgroundColor: 'red', color: 'white', margin: '5px'}} onClick={()=>props.fun()}>
                  Sair
            </Button>
        </div>
      </div>
      
  )
}
export default AnaliseForm;




