import { combineReducers, createStore } from 'redux';

import { TaiKhoanReducer } from './TaiKhoanReducer';

const rootReducer = combineReducers({
    TaiKhoanReducer
});

export const store = createStore(rootReducer);