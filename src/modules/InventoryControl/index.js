
import { Routes, Route, useLocation} from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';
import StockScreen from './src/screens/stockScreen';
import AnalysinScreen from './src/screens/analysisScreen';
import Inventario from './src/screens/inventario';
import {useState, useEffect} from 'react';
import Layout from './src/components/layout';
import HistoryScreen from './src/screens/history';

const StockModule = () => {
    const location = useLocation()
    const [loading, setLoading] = useState(true);


    

    const HandleLoading = () =>{
        setTimeout(()=>{
            setLoading(false)
        }, 3000)
    }

    useEffect(()=>{
        setLoading(true)
    },[location.pathname])


    return(
        <div>
        <Dimmer active={loading} inverted>
            <Loader size='large'>Loading...</Loader>
        </Dimmer>
        <Layout>
            <Routes>
                <Route path="/" element={<StockScreen setloading={HandleLoading}/>}/>
                <Route path="/inventario" element={<Inventario setloading={HandleLoading}/>} />
                <Route path="/analise" element={<AnalysinScreen setloading={HandleLoading}/>} />
                <Route path='/historico' element={<HistoryScreen setLoading={HandleLoading}/>}/>
            </Routes>
        </Layout>
        </div>
        
    )
}
export default StockModule