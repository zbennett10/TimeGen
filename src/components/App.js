import React, { Component } from 'react';
import Form from './Form';
import Event from './Event';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import Timeline from './Timeline';

//connect this component up to redux

class App extends Component {
  render() {
    const events = this.props.events.map(event => {
      return <Event title={event.title} 
                    key={event.key} 
                    id={event.id}
                    date={event.date}
                    editEvent={this.props.editEvent}/>
    });

    return (
      <div className="row">
        <div className="col-8">
          <Form addEvent={this.props.addEvent}/>
        </div>
        <div className="col-4">
          {events}
        </div>
        <Timeline events={this.props.events}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        events: state.events
    }
}

export default connect(mapStateToProps, actions)(App);
