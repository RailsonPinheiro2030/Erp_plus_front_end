import axios from "axios"




const BASE_URL = process.env.REACT_APP_BASE_URL

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const config = (token) =>{
    return{
    headers: {
        Authorization: `Bearer ${token}`
        }   
    }
}



export function postData(path, body) {
    return api.post(path, body).then((response) => response.data);
}

export function getData(path, token){
    
    return api.get(path, config(token)).then(response => response.data);
}

export function postEstoque(path, body, token){
    return api.post(path,body, config(token)).then((response) => response.data);
}

export function patchEstoque(path, body, token){
    
    return api.patch(path, body, config(token)).then(response => response.data);
}

export function getHistory(path, token){
    
    return api.get(path, config(token)).then(response => response.data);
}

export function deleteInventory(path, token){
    return api.delete(path, config(token)).then(response => response.data);
}