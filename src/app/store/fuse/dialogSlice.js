import {createSlice} from '@reduxjs/toolkit';

const dialogSlice = createSlice({
    name: 'dialog',
    initialState: {
        state: false,
        options: {
            children: '',
        },
    },
    reducers: {
        openDialog: (state, action) => {
            state.state = true;
            state.options = action.payload;
        },
        closeDialog: (state, action) => {
            state.options = {children: ''};
            state.state = false;
        },
    },
});

export const {openDialog, closeDialog} = dialogSlice.actions;

export default dialogSlice.reducer;
