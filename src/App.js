import HomeScreen from "./screens/home";
import StockModule from './modules/InventoryControl/index';
import RedirectScreen from "./screens/redirectScreen";
import {Routes,Route, Navigate} from "react-router-dom";
import { useSelector } from "react-redux";


function App() {
  const state = useSelector(state=> state.user)

  

  const ProtectedRoute = ({children}) => {
    if (!state.isAuthenticated){
      alert('Usuario não authenticado')
      return <Navigate to="/"/>;
    }
    return children;
  };


  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeScreen/>}/>
        <Route path="/personalDepartment" element={
          <ProtectedRoute>
            <StockModule/>
          </ProtectedRoute>
        }/>
        <Route path="/estoque/*" element={
          <ProtectedRoute>
            <StockModule/>
          </ProtectedRoute>
        }/>
        <Route path="/redirect" element={
          <ProtectedRoute>
            <RedirectScreen/>
          </ProtectedRoute>
        }/>
      </Routes>
    </div>
  );
}

export default App;
