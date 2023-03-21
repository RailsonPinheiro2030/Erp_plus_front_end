import { createSlice } from '@reduxjs/toolkit'



export const slice = createSlice({
    name: 'config',
    initialState:{
        storage:[],
        riskClass: [],

    },
    reducers:{
        changeConfig(state,{payload}){
            return {...state, storage:[payload.storages.map(i=>({"storage": i.name, "location": i.location}))]}
        },
        changeRisk(state, {payload}){
            return{...state, riskClass:payload}
        }

    }
})

export const{changeConfig, changeRisk} = slice.actions

export const selectUser = state => state.config

export default slice.reducer