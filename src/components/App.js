import React, { Component } from 'react';
import AddEventForm from './Add_Event_Form';
import Event from './Event';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import Timeline from './Timeline';
import Header from './Header';
import Footer from './Footer';
import '../index.css';
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
      <div>
        <Header/>
        <div className="row">
          <div className="col-8">
            <AddEventForm addEvent={this.props.addEvent}/>
            <div className="row">
              <div className="col-8">
                <Timeline events={this.props.events}/>
              </div>
            </div>
          </div>
          <div className="col-4">
            {events}
          </div>
          
        </div>
        <Footer/>
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
