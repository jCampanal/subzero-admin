import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    state: null,
    options: {
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        },
        autoHideDuration: 5000,
        message: 'Hi',
        variant: 'success',
    },
};
const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        showMessage: (state, action) => {
            state.state = true;
            state.options = {
                ...initialState.options,
                ...action.payload,
            };
        },
        hideMessage: (state, action) => {
            state.state = null;
        },
    },
});

export const {hideMessage, showMessage} = messageSlice.actions;

export default messageSlice.reducer;
