import * as types from '../src/actions/types';
import * as actions from '../src/actions/index';
import eventReducer from '../src/reducers/event_reducer';

describe('Root Reducer', () => {
    let newEvent;
    beforeEach(() => {
        newEvent = {
            title: "NEW",
            key: 3,
            id: 3
        }
    })
    it('returns initial state', () => {
        expect(eventReducer(undefined, [])[0].id).toEqual("1");
    });

    it('returns new state when an event is added', () => {
        expect(eventReducer([], actions.addEvent(newEvent))).toEqual([newEvent])
    });

    it('returns new state when an event is edited', () => {
        const editedEvent = {
            title: "NEWER",
            key: 3,
            id: 3
        };
        expect(eventReducer([newEvent], actions.editEvent(editedEvent))[0].title).toEqual('NEWER');
    });

    it('returns new state when an event is deleted', () => {
        const id = {
            id: 3
        };
        expect(eventReducer([newEvent], actions.deleteEvent(id))).toEqual([]);
    });

    it('returns new state when all events are cleared', () => {
        expect(eventReducer([newEvent], actions.clearEvents())).toEqual([]);
    });
});