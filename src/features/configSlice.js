import { createSlice } from '@reduxjs/toolkit'



export const slice = createSlice({
    name: 'config',
    initialState:{
        storage:[],


    },
    reducers:{
        changeConfig(state,{payload}){
            return {...state, storage:[payload.storage.map(i=>({"storage": i.storages, "location": i.location}))]}
        },
    }
})

export const{changeConfig} = slice.actions

export const selectUser = state => state.config

export default slice.reducer