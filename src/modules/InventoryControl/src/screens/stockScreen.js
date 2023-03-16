
import {useEffect} from 'react';


const StockScreen = (props) =>{
    const { setloading } = props;
    useEffect(()=>{
        setloading()
    },[setloading])
      

    return(
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', height: '100%'}}>
            <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_8uHQ7s.json"  background="transparent"  speed="1"  style={{width: '100%', height: '90%'}}  loop  autoplay></lottie-player>
        </div>
    )
}
export default StockScreen