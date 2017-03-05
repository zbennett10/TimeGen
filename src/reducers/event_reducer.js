import {EDIT_EVENT} from '../actions/types';
import {ADD_EVENT} from '../actions/types';
import {List} from 'immutable';
import _ from 'lodash';

const initialState = [
    {
        title: "DBU",
        key: _.uniqueId(),
        date: new Date().toISOString()
    },
    {
        title: "Mozambique - Trip One",
        key: _.uniqueId(),
        date: new Date().toISOString()
    }
]
initialState[0].id = initialState[0].key;
initialState[1].id = initialState[1].key;

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_EVENT:
            return List(state).push(action.payload).toJS();
        case EDIT_EVENT:
            let oldEventIndex;
            state.forEach((event, index) => {
                if(event.id === action.payload.id) oldEventIndex = index;
            })
            return List(state).delete(oldEventIndex).push(action.payload).toJS();
        default:
            return state;
    }
}