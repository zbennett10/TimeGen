import React, {Component} from 'react';
import _ from 'lodash';
import '../index.css';

export default class AddEventForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(e) {
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
                <div className="form-group row">
                    <label htmlFor="event-title" className="col-2 col-form-label">Title</label>
                    <div className="col-10">
                         <input name="title" type="text" ref="titleInput"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="event-date" className="col-2 col-form-label">Date</label>
                    <div className="col-10">
                        <input type="date" name="date" ref="dateInput"/>
                    </div>
                </div>
                
                
                <button action="submit" className="btn btn-md btn-primary">Submit</button>
            </form>
        );
    }
}

