import { createSlice } from '@reduxjs/toolkit'



export const slice = createSlice({
    name: 'user',
    initialState:{
        name: '',
        company: '',
        company_cnpj: '',
        company_id: '',
        isAdmin: '',
        isAuthenticated: '',
        token: '',

    },
    reducers:{
        changeUser(state,{payload}){
            return {...state, isAuthenticated: payload.token !== "" ? true: false, isAdmin: payload.isAdmin, company: payload.company, company_cnpj: payload.company_cnpj, name: payload.full_name, token: payload.token, company_id: payload.company_id}
        },
        logout(state){
            return {...state, isAuthenticated: '', name: '', company: '', isAdmin: '', company_cnpj: '', token: '', company_id: ''}
        }
    }
})

export const{changeUser, logout} = slice.actions

export const selectUser = state => state.user 

export default slice.reducer