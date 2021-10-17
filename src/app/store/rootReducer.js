import {combineReducers} from '@reduxjs/toolkit';
import fuse from './fuse';
import i18n from './i18nSlice';
import authorization from './auth';

const createReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        fuse,
        i18n,
        authorization,
        ...asyncReducers,
    });

    return combinedReducer(state, action);
};

export default createReducer;
