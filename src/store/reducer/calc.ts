'use client'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..';


export interface CounterState {
    value: number;
}

const initialState: CounterState = {
    value: 0,
};

export const counterSlice = createSlice({
    name: 'calculate',
    initialState,
    reducers: {
        increment: (state, action) => {
            const add = action.payload || 1;
            state.value += add
        },
        decrement: state => {
            state.value -= 1
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(incrementAsync.fulfilled, (state, action) => {
                state.value += action.payload;
            })
    }
})

export const incrementAsync = createAsyncThunk(
    'counter/fetchCount',
    async (amount: number) => {
        const response = await fetchCount(amount);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

function fetchCount(amount = 1) {
    return new Promise<{ data: number }>((resolve) =>
        setTimeout(() => resolve({ data: amount }), 500)
    );
}

export const { increment, decrement } = counterSlice.actions
export const selectCount = (state: RootState) => state.calc.value;

export default counterSlice.reducer
