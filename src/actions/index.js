import {EDIT_EVENT} from './types';
import {ADD_EVENT} from './types';
import {DELETE_EVENT} from './types';
import {CLEAR_EVENTS} from './types';

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

export function deleteEvent(id) {
    return {
        type: DELETE_EVENT,
        payload: id
    }
}

export function clearEvents() {
    return {
        type: CLEAR_EVENTS,
        payload: []
    }
}