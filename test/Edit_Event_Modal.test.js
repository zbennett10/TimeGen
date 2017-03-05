import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {shallow , mount} from 'enzyme';
import Event from '../src/components/Event';
import EditEventModal from '../src/components/Edit_Event_Modal';
import 'jest-enzyme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from '../src/reducers';
import {editEvent} from '../src/actions/index';

describe('Edit Event Modal', () => {
    let wrapper, props;
    const globalEvent = {
        preventDefault: function() {
            console.log('preventing default fake...');
        }
    }
    beforeEach(() => {
        props = {
            title: 'TITLE',
            date: new Date().toISOString()
        };
        wrapper = mount(
                <Event title={props.title} date={props.date} editEvent={editEvent}/>
        )
    })

    it('renders by itself', () => {
        shallow(<EditEventModal/>);
    });

    it('renders as a child to an Event component', () => {
        expect(wrapper.find(EditEventModal).length).toBe(1);
    });

    it('has a title that is passed down from Event component', () => {
        expect(wrapper.find('.card-title').text()).toBe('TITLE');
        expect(wrapper.find(EditEventModal).node.props.title).toBe('TITLE');
    })

    it('has a date that is passed down from Event component', () => {
        const eventDate = wrapper.find('.date-header').text();
        expect(wrapper.find(EditEventModal).node.props.date).toBe(eventDate);
    });

    it('closes when the close button is clicked', () => {
        expect(wrapper.find(EditEventModal).node.props.open).toBe(false);
        wrapper.find('.event-edit-button').simulate('click');
        expect(wrapper.find(EditEventModal).node.props.open).toBe(true);
        wrapper.find(EditEventModal).node.props.close();
        expect(wrapper.find(EditEventModal).node.props.open).toBe(false);
    });

    it('contains a form', () => {
        const modalWrapper = shallow(<EditEventModal/>);
        expect(modalWrapper.find('form').length).toBe(1);
    })

    it('closes when the form is submitted with no errors', () => {
        wrapper.find('.event-edit-button').simulate('click');
        expect(wrapper.find(EditEventModal).node.props.open).toBe(true);
        wrapper.find(EditEventModal).node.refs.dateInput.value = new Date().toISOString(); //fake a ref having a date value input
        wrapper.find(EditEventModal).node.onFormSubmit(globalEvent); //submit form with fake global event variable
        expect(wrapper.find(EditEventModal).node.props.open).toBe(false); 
    });
});