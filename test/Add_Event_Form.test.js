import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {shallow , mount} from 'enzyme';
import AddEventForm from '../src/components/Add_Event_Form';
import * as actions from '../src/actions/index';
import * as types from '../src/actions/types';

describe('Form Component', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<AddEventForm/>);
    });
    it('renders', () => {
        expect(wrapper).toExist;
    });
});