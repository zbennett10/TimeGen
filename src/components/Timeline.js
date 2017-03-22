import React, {Component} from 'react';
import vis from 'vis';
import {connect} from 'react-redux';
import '../index.css';
import * as actions from '../actions/index';

let timeline, items;
const timelineOptions = {
    height: 400,
    width: 750,
    zoomMin: 1000 * 60 * 60 * 24,
    start: '2012-03-04',
    end: '2020-03-04'
};

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.createTimeline = this.createTimeline.bind(this);
        this.configureEvent = this.configureEvent.bind(this);
        this.runTimeline = this.runTimeline.bind(this);
        this.addTimelineListeners = this.addTimelineListeners.bind(this);
    }

    createTimeline() {
        const container = document.getElementById('timelineContainer');
        timeline = new vis.Timeline(container, items, timelineOptions);
    }

    configureEvent(event) {
        return {id: event.id, content: event.title, start: convertISO(event.date)}
    }

    runTimeline(timeline) {
        if(items.length === 1) timeline.focus(Object.keys(items._data)[0]);
        if(timeline && items.length > 0) {6
            const arr = Object.keys(items._data).map(key => items._data[key]);
            arr.sort((a,b) => {
                a = new Date(a.start);
                b = new Date(b.start);
                return a-b;
            });
             const firstEvent = arr[0];
             const finalEvent = arr[arr.length-1];
             timeline.focus(firstEvent.id);
             setTimeout(() => timeline.focus([finalEvent.id], {animation: {duration: 3500, easingFunction: 'linear'}}), 1000);
        }
    }

    addTimelineListeners(timeline, props) {
        configureDblClick(timeline);
        configureCurrentTick(timeline);
        configureItemSelect(timeline, props.events, props);
    }

    componentDidMount() {
         const events = this.props.events.map(event => {
            return {id: event.id, content: event.title, start: convertISO(event.date)}
        });
        items = new vis.DataSet(events);
        this.createTimeline();
        this.addTimelineListeners(timeline, this.props);
        
    }

    componentWillReceiveProps(nextProps) {
        this.addTimelineListeners(timeline, nextProps); //send new props to event listeners
    }

    render() {
        if(items) {
            let counter = 0;
            while(items.length > 0) {
                items.remove(counter);
                counter++;
            }
            this.props.events.forEach(event => items.add(this.configureEvent(event)));
        }

        if(timeline) {
            timeline.fit();
        }

        return(
                <div>
                    <div id="timelineContainer"></div>
                    <button className="btn btn-lg btn-primary"
                            onClick={() => this.runTimeline(timeline)}>Run</button>
                </div>
        );
    }
}



//helpers

function configureDblClick(timeline) {
    timeline.on('doubleClick', () => timeline.zoomIn(0.2));
}

function configureItemSelect(timeline, eventArr, props) {
    timeline.on('select', (event) => {
        const eventProps = fetchEvent(eventArr, event.items[0]);
        if(eventProps.hasTimeBar) {
            timeline.removeCustomTime(eventProps.id);
            timeline.off('select');
            props.editEvent(createNewEvent(eventProps, 'hasTimeBar', false));
        } else {
            timeline.addCustomTime(convertISO(eventProps.date), eventProps.id);
            timeline.off('select');
            props.editEvent(createNewEvent(eventProps, 'hasTimeBar', true));
        }
    });
}

function createNewEvent(oldEvent, newProp, value) {
    const newEvent = Object.assign({}, oldEvent);
    newEvent[newProp] = value;
    return newEvent;
}

function fetchEvent(events, id) {
    return events.find(event => event.id === id);
}

function configureCurrentTick(timeline) {
    timeline.on('currentTimeTick', () => {
    
    });
}

function convertISO(dateString) {
    const dateArr = dateString.match(/[^T]*/)[0].split('-');
    const newDate = `${dateArr[1]}-${dateArr[2]}-${dateArr[0]}`;
    return new Date(newDate);
}


export default connect(null, actions)(Timeline);