import React, {Component} from 'react';
import vis from 'vis';
import {connect} from 'react-redux';

let timeline, items;

const options = {
    height: 400,
    width: 1100,
    zoomMin: 1000 * 60 * 60 * 24,
    start: '2012-03-04',
    end: '2020-03-04'
};

export default class Timeline extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
         const events = this.props.events.map(event => {
            console.log(event);
            return {id: event.id, content: event.title, start: convertISO(event.date)}
        });
        items = new vis.DataSet(events);
        createTimeline();
    }

    render() {
        if(items) {
            let counter = 0;
            while(items.length > 0) {
                items.remove(counter);
                counter++;
            }
            this.props.events.forEach(event => items.add(configureEvent(event)));
        }


        return(
            <div className="container text-center">
                <div id="timelineContainer"></div>
            </div>
        );
    }
}

function configureEvent(event) {
    return {id: event.id, content: event.title, start: convertISO(event.date)}
}

function createTimeline() {
    const container = document.getElementById('timelineContainer');
    timeline = new vis.Timeline(container, items, options)
}

function convertISO(dateString) {
    return dateString.match(/[^T]*/)[0];
}