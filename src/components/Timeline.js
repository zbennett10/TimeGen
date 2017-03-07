import React, {Component} from 'react';
import vis from 'vis';
import {connect} from 'react-redux';
import '../index.css';

let timeline, items;
const timelineOptions = {
    height: 400,
    width: 750,
    zoomMin: 1000 * 60 * 60 * 24,
    start: '2012-03-04',
    end: '2020-03-04'
};

export default class Timeline extends Component {
    constructor(props) {
        super(props);
        this.createTimeline = this.createTimeline.bind(this);
        this.configureEvent = this.configureEvent.bind(this);
        this.convertISO = this.convertISO.bind(this);
        this.runTimeline = this.runTimeline.bind(this);
    }

    createTimeline() {
        const container = document.getElementById('timelineContainer');
        timeline = new vis.Timeline(container, items, timelineOptions);
    }

    configureEvent(event) {
        return {id: event.id, content: event.title, start: this.convertISO(event.date)}
    }

    convertISO(dateString) {
        return dateString.match(/[^T]*/)[0];
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


    componentDidMount() {
         const events = this.props.events.map(event => {
            return {id: event.id, content: event.title, start: this.convertISO(event.date)}
        });
        items = new vis.DataSet(events);
        this.createTimeline();
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



