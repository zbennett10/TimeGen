import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {shallow , mount} from 'enzyme';
import Form from '../src/components/Form';

describe('Form Component', () => {
    it('renders', () => {
        shallow(<Form/>);
    });
});