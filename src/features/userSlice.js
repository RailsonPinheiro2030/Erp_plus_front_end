import { createSlice } from '@reduxjs/toolkit'



export const slice = createSlice({
    name: 'user',
    initialState:{
        name: '',
        lastName: '',
        company: '',
        company_id: '',
        isAdmin: '',
        isAuthenticated: '',
        token: '',

    },
    reducers:{
        changeUser(state,{payload}){
            
            return {...state, isAuthenticated: payload.token !== "" ? true: false, isAdmin: payload.isadmin, company: payload.company, company_id:payload.company_id, name: payload.first_name, lastName: payload.last_name, token: payload.access}
        },
        logout(state){
            return {...state, isAuthenticated: '', name: '', company: '', company_id:'', isAdmin: '', token: '', first_name: ''}
        }
    }
})

export const{changeUser, logout} = slice.actions

export const selectUser = state => state.user 

export default slice.reducer