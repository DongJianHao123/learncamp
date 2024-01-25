import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '..'

export interface LoginModalOpenState {
    value: boolean;
}

const initialState: LoginModalOpenState = {
    value: false
};

export const loginModalOpenSlice = createSlice({
    name: 'currClient',
    initialState,
    reducers: {
        setLoginModalOpen: (state, action: { payload: boolean }) => {
            state.value = action.payload
        },
    },
})

export const { setLoginModalOpen } = loginModalOpenSlice.actions
export const selectLoginModalOpen = (state: RootState) => state.loginModalOpen.value;

export default loginModalOpenSlice.reducer
