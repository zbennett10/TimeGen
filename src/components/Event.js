import React, {Component} from 'react';
import EditEventModal from './Edit_Event_Modal';

export default class Event extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-block">
                    <h4 className="card-title">{this.props.title}</h4>
                    <h5 className="date-header">{this.props.date}</h5>
                    <button className="btn btn-lg btn-success event-edit-button"
                            onClick={() => this.setState({modalOpen: !this.state.modalOpen})}>Edit</button>
                </div>

                <EditEventModal title={this.props.title} 
                                date={this.props.date}
                                name="Edit Modal"
                                key={this.props.id}
                                id={this.props.id}
                                open={this.state.modalOpen}
                                close={() => this.setState({modalOpen: !this.state.modalOpen})}
                                editEvent={this.props.editEvent}/>
            </div>  
        );
    }
}



