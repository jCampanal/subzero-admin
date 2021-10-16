import {createSlice} from '@reduxjs/toolkit';

const authorizationSlice = createSlice({
    name: 'authorization',
    initialState: {
        token: '',
        refreshToken: '',
    },

    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
        },
        logout: (state) => {
            state.token = '';
            state.refreshToken = '';
        },
    },
});

export const {login, logout} = authorizationSlice.actions;
export default authorizationSlice.reducer;
