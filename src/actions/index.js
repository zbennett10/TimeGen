import {EDIT_EVENT} from './types';
import {ADD_EVENT} from './types';

export function editEvent(event) {
    return {
        type: EDIT_EVENT,
        payload: event
    }
}

export function addEvent(event) {
    return {
        type: ADD_EVENT,
        payload: event
    }
}