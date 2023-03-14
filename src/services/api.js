import axios from "axios"


const Api = axios.create({
    baseURL: 'railsonpinheiro.pythonanywhere.com'
})
export default Api