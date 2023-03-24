import 'semantic-ui-css/semantic.min.css'
import '../css/index.css';
import NavBar from '../components/navbar';
import {useState, useEffect} from 'react';
import {Modal, Divider, Icon} from 'semantic-ui-react';
import { Panel, PanelGroup, } from 'rsuite';
import LoginComponent from '../components/loginForm.js';


const HomeScreen = () =>{
    const[open, setOpen] = useState(false)
    const[activecard, setActiveCard] = useState(false);
    
    const ModalContainer = () =>{
        return(
            <Modal
                open={open}
                style={{minWidth: '300px', maxWidth: '400px'}}
                >
                <Modal.Content>
                    <Modal.Description>
                        <LoginComponent myfunction={setOpen}/>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
  

    useEffect(() => {
        const container = document.querySelector('.container')
        function scrool() {
          
          if (container.scrollTop > 1){
            setActiveCard(true)
          }else{
            setActiveCard(false)
          }
        }
      
        function watchScroll() {
          container.addEventListener("scroll", scrool);
        }
      
        function cleanup() {
          container.removeEventListener("scroll", scrool);
        }
      
        watchScroll();
        return cleanup;
    }, []);
      
    
    


    return(
        <div className="container">
            <NavBar myfunction={setOpen} class={activecard}/>
            <div className="section section-1">
                <ModalContainer/>
                <div className={'title'}>
                    <div>
                     <sub>SERVICE ENTERPRISE</sub>
                     <h1>Simplifique a gestão do seu negócio e melhore a eficiência da sua equipe</h1>
                    </div>
                    <button>Solicite um teste</button>
                </div>
            </div>
            <div className="section section-2">
                <div className={activecard ? 'container-card active' : 'container-card'}>
                    <div>
                        <div className='card'>
                            <div className="card-image-confiance"></div>
                            <div>
                                <div>
                                <span>certified</span>
                                <span>verified</span>
                                </div>
                                <b>confiança</b>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-image-analitcs"></div>
                            <div>
                                <div>
                                    <span>graph</span><span>report</span>
                                </div>
                                <b>análise</b>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-image-qualidade"></div>
                            <div>
                                <div>
                                    <span>standard</span><span>benchmark</span>
                                </div>
                                <b>qualidade</b>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-image-seguranca"></div>
                            <div>
                                <div>
                                    <span>auth</span><span>audit</span>
                                </div>
                                <b>segurança</b>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
            <div className="section section-3">
            <div>
                <div className='title-3'>
                    <span>Enterprise Resource Planning</span>
                    <h2>Melhorando os processos, em cada departamento</h2>
                </div>
                <div className='text-3'>
                    <div>     
                        <p>
                            A implementação de um sistema de ERP (Enterprise Resource Planning) 
                            pode ser uma das melhores maneiras de melhorar os processos de negócios em cada departamento de uma empresa.
                        </p>
                        <span>
                            O software ERP fornece uma plataforma centralizada para gerenciar e integrar os processos de negócios,
                            desde a produção até a entrega do produto final. Com um sistema ERP, é possível automatizar muitos processos manuais,
                            reduzindo erros e aumentando a eficiência operacional.
                        </span>
                        
                        <p>
                            Um sistema ERP pode ajudar a empresa a tomar decisões estratégicas mais informadas,
                            fornecendo informações em tempo real sobre o desempenho de cada departamento.
                        </p>
                        <span>
                            Isso permite que a empresa tome decisões mais rápidas e precisas sobre a alocação de recursos e investimentos futuros.
                        </span>
                        <Divider/>
                        <PanelGroup accordion defaultActiveKey={1} bordered className='panel'>
                        <Panel header={<span id="panel1">Gestão de Estoque</span>} eventKey={1} id="panel1">
                        <ul className='list'>
                            <li>Controle de inventário</li>
                            <li>Previsão de demanda</li>
                            <li>Análise critíca</li>
                        </ul>
                        </Panel>
                        <Panel header={<span id="panel2">Gestão de Produção</span>} eventKey={2} id="panel2">
                        <ul className='list'>
                            <li>Planejamento de produção</li>
                            <li>Controle de qualidade</li>
                            <li>Gerenciamento de projetos</li>
                        </ul>
                        </Panel>
                        <Panel header={<span id="panel3">Gestão em Recursos Humanos</span>} eventKey={3} id="panel3">
                        <ul className='list'>
                            <li>Administração de pessoa</li>
                            <li>Desenvolvimento e gerenciamento de talentos</li>
                            <li>Gestão de benefícios</li>
                        </ul>
                        </Panel>
                        </PanelGroup> 
                    </div>
                    
                </div>
                   
            </div>
            </div>
            <div className="section section-4">
                <div>
                    <div>
                        <b><b>Company</b><b style={{color:'blue'}}>Name</b></b>
                        <Divider/>
                        <span>Gerencie seu negócio de forma eficiente</span>
                    </div>
                    <div>
                        <div style={{display: 'flex', flexDirection:'column', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <h6>Contato</h6>
                            <a href="#/">email@example.com.br</a>
                            <a href="#/">(00) 000-000</a>
                        </div>
                        <div style={{display: 'flex', flexDirection:'column', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <h6>Agência</h6>
                            <a href="#/">sobre nós</a>
                            <a href="#/">noticias e recursos</a>
                        </div>

                        <div style={{display: 'flex', flexDirection:'column', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <h6>Serviços</h6>
                            <a href="#/">Todos os serviços</a>
                            <a href="#/">Estratégia</a>
                        </div>
                    </div>
                    
                </div>
                <div style={{display: 'flex', flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#212121', width: '100%'}}>
                    <Icon circular color='blue' name='facebook' />
                    <Icon circular color='blue' name='linkedin'/>
                    <Icon circular color='red' name='instagram'/>
                    <Icon circular color='blue' name='twitter square'/>
                </div>
            </div>
        </div>
    );
}
        

        


    
export default HomeScreen

