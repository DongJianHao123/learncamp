'use client'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..';
import { IClient } from '@/core/types/client';


export interface CurrClientState {
    value: IClient;
}

const initialState: CurrClientState = {
    value: {
        id: 0,
        clientId: '',
        clientName: '',
        type: 0,
        status: 0,
        name: ''
    },
};

export const currClientSlice = createSlice({
    name: 'currClient',
    initialState,
    reducers: {
        setCurrClient: (state, action: { payload: IClient }) => {
            state.value = action.payload
        },
    },
})

export const { setCurrClient } = currClientSlice.actions
export const selectCurrClient = (state: RootState) => state.currClient.value;

export default currClientSlice.reducer
