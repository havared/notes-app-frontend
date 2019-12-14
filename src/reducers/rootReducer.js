import { combineReducers } from 'redux';
import { default as NoteStore } from './noteReducer';

const appReducer = combineReducers({
    NoteStore
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};
export default rootReducer;
