import * as actions from '../src/actions/index';
import * as types from '../src/actions/types';

describe('actions', () => {
    it('creates an action to edit an event', () => {
        const newEvent = {
            title: 'TITLE'
        };
        const expectedAction = {
            type: types.EDIT_EVENT,
            payload: newEvent
        };
        expect(actions.editEvent(newEvent)).toEqual(expectedAction);
    });

    it('creates an action to add an event', () => {
        const newEvent = {
            title: 'TITLE',
        };
        const expectedAction = {
            type: types.ADD_EVENT,
            payload: newEvent
        };
        expect(actions.addEvent(newEvent)).toEqual(expectedAction);
    });

    it('creates an action that deletes an event', () => {
        const id = {
            id: 1
        };
        const expectedAction = {
            type: types.DELETE_EVENT,
            payload: id
        };
        expect(actions.deleteEvent(id)).toEqual(expectedAction);
    });

    it('creates an action that clears an event', () => {
        const expectedAction = {
            type: types.CLEAR_EVENTS,
            payload: []
        };
        expect(actions.clearEvents()).toEqual(expectedAction);
    });
});