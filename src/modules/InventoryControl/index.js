
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';
import StockScreen from './src/screens/stockScreen';
import AnalysinScreen from './src/screens/analysisScreen';
import Inventario from './src/screens/inventario';
import { Placeholder} from 'rsuite';
import { useEffect, useState } from 'react';
import Layout from './src/components/layout';
import {changeData} from './src/features/dataSlice';
import { useDispatch, useSelector } from 'react-redux';

const StockModule = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const state = useSelector(state=> state.user)
    const [loading, setLoading] = useState(true);
    const[loc, setLoc] = useState(null);


    

    const HandleLoading = () =>{
        setLoading(false)
    }


    useEffect(()=>{
        setLoc(location.pathname)
    },[location])

    return(
        <div>
        <Dimmer active={loading} inverted>
            <Loader size='large'>Loading...</Loader>
        </Dimmer>
        <Layout>
            <Routes>
                <Route path="/" element={<StockScreen setloading={HandleLoading} loading={loading}/>}/>
                <Route path="/inventario" element={<Inventario setloading={HandleLoading} loading={loading}/>} />
                <Route path="/analise" element={<AnalysinScreen setloading={HandleLoading} loading={loading}/>} />
            </Routes>
        </Layout>
        </div>
        
    )
}
export default StockModule