import {combineReducers} from '@reduxjs/toolkit';
import fuse from './fuse';
import i18n from './i18nSlice';
import authorization from './auth';
import user from './user';

const createReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        fuse,
        i18n,
        authorization,
        user,
        ...asyncReducers,
    });

    return combinedReducer(state, action);
};

export default createReducer;
