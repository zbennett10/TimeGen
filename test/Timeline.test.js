import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {shallow, mount} from 'enzyme';
import Timeline from '../src/components/Timeline';
import App from '../src/components/App';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from '../src/reducers';
import _ from 'lodash';
import sinon from 'sinon';

describe('Timeline Component', () => {
    let wrapper, events;
    beforeEach(() => {
        events = [
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
        events[0].id = events[0].key;
        events[1].id = events[1].key;

        wrapper = shallow(
            <Timeline events={events}/>
        )
    })
    it('renders', () => {
        expect(wrapper.find('#timelineContainer').node.type).toBe('div')
    });

    it('renders a vis js timeline', () => {
        wrapper.renderer._instance._instance.createTimeline();
        console.log(wrapper.renderer._instance._instance.createTimeline());
        console.log(wrapper.find('#timelineContainer').childNodes);
    });
}); 