import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {shallow , mount} from 'enzyme';
import AddEventForm from '../src/components/Add_Event_Form';

describe('Form Component', () => {
    it('renders', () => {
        shallow(<AddEventForm/>);
    });
});