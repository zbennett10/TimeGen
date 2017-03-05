import React, {Component} from 'react';
import _ from 'lodash';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(e) {
        console.log(e);
        e.preventDefault();
        const newEvent = {
            title: this.refs.titleInput.value,
            date: new Date(this.refs.dateInput.value).toISOString(),
            key: _.uniqueId()
        };
        newEvent.id = newEvent.key;
        this.props.addEvent(newEvent);
        return false;
    }

    render() {
        return(
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <input name="title" type="text" ref="titleInput"/>
                <textarea name="description" 
                        placeholder="Event description"
                        ref="descriptionInput"/>
                <input type="date" name="date" ref="dateInput"/>
                <button action="submit">Submit</button>
            </form>
        );
    }
}

