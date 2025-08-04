import { createSlice } from "@reduxjs/toolkit";


const connectionSlice=createSlice({
    name:'connection',
    initialState:null,
    reducers:{
        addConnections:(state,action)=>{
            return action.payload;
        },
        removeConnections:(state,payload)=>{
            return null;
        }
    }
})
export const {addConnections,removeConnections} =connectionSlice.actions;
export default connectionSlice.reducer;