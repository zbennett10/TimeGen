import {combineReducers} from 'redux';
import eventReducer from './event_reducer';

const rootReducer = combineReducers({
    events: eventReducer
});

export default rootReducer;