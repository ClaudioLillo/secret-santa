import { createSlice } from '@reduxjs/toolkit';

export const navigationSection = createSlice({
    name: 'navSection',
    initialState: {
        value: ''
    },
    reducers: {
        'set': (state, action)=>{
            state.value = action.payload
        } 
    }
})

export const {set} = navigationSection.actions
export default navigationSection.reducer

