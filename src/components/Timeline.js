import React, {Component} from 'react';
import vis from 'vis';
import {connect} from 'react-redux';

let items;
const timelineOptions = {
    height: 400,
    width: 1100,
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
    }

    createTimeline() {
        const container = document.getElementById('timelineContainer');
        //help jest testing
        if(!container) {
            (function testCreateTimeline() {
                const testContainer = document.createElement('div');
                document.body.appendChild(testContainer);
                const timeline = new vis.Timeline(testContainer, items, timelineOptions);
            })();
        }
        const timeline = new vis.Timeline(container, items, timelineOptions)
    }

    configureEvent(event) {
        return {id: event.id, content: event.title, start: this.convertISO(event.date)}
    }

    convertISO(dateString) {
        return dateString.match(/[^T]*/)[0];
    }


    componentDidMount() {
         const events = this.props.events.map(event => {
            console.log(event);
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

        return(
            <div className="container text-center">
                <div id="timelineContainer"></div>
            </div>
        );
    }
}



