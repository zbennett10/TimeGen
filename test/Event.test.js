import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {shallow , mount} from 'enzyme';
import Event from '../src/components/Event';
import EditEventModal from '../src/components/Edit_Event_Modal';

describe('Event Component', () => {
    let wrapper;
    beforeEach(() => {
        const props = {
            title: 'TITLE',
            date: new Date().toISOString()
        };
        wrapper = mount(
            <Event title={props.title} date={props.date}/>
        )  
    });

    it('renders', () => {
        shallow(<Event/>);
    });

    it('is styled as a bootstrap card', () => {
        expect(wrapper.find('.card').length).toBe(1);
    });

    it('contains a title', () => {
       expect(wrapper.find('.card-title').text()).toBe('TITLE');
    });

    it('contains a date', () => {
        expect(wrapper.find('.date-header').text().includes('2017')).toBe(true);
    });

    it('contains an edit button', () => {
        expect(wrapper.find('.event-edit-button').text()).toBe('Edit');
    })

    it('opens an edit modal when edit button is clicked', () => {
       expect(wrapper.find(EditEventModal).node.props.open).toBe(false);
        wrapper.find('.event-edit-button').simulate('click');
       expect(wrapper.find(EditEventModal).node.props.open).toBe(true);
    });
});