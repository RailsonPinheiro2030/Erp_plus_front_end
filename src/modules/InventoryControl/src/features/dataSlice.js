import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'data',
    initialState:{
        data: [],
        

    },
    reducers:{
        changeData(state,{payload}){    
        return {...state, data: payload}
        },
        removeData(state){
          return {...state, data: []}
        },
        uploadData(state,{payload}){
          state.data.push(payload)
            //data={state.data ? state.data.map(i => i.name) : []}
        },
        analyticData(state, { payload }) {
            state.data = state.data.map(item => {
              if (item.codigo === payload.codigo) {
                return {
                  ...item,
                  environment: payload.environment,
                  failure_frequency: payload.failure_frequency,
                  lead_time_new: payload.lead_time_new,
                  Highest_criticality_of_assets: payload.Highest_criticality_of_assets,
                  potential_existing_risk: payload.potential_existing_risk,
                  health_security: payload.health_security,
                  volume_production: payload.volume_production,
                  cost_operation: payload.cost_operation
                };
              } else {
                return item;
              }
            });
        }
          
        
        
    }
})



export const{changeData, removeData, uploadData, analyticData} = slice.actions

export const selectData = state => state.data 

export default slice.reducer