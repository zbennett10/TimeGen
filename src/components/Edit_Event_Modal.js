import Modal from 'react-modal';
import React, {Component} from 'react';



const modalStyle = {
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    textAlign: 'center',
    position: 'absolute',
    top: '40px',
    left: '300px',
    bottom: '40px',
    right: '300px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px'
  }
}

export default class EditEventModal extends Component {
    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(e) {
        e.preventDefault();
        const newEvent = {
            title: this.refs.titleInput.value,
            date: new Date(this.refs.dateInput.value).toISOString() || this.props.date,
            key: this.props.id,
            id: this.props.id
        }
        this.props.editEvent(newEvent);
        this.props.close();
        return false;
    }

    render() {
        return (
            <Modal  isOpen={this.props.open}
                    contentLabel="EventEditModal"
                    style={modalStyle}>
                    <div className="row text-center">
                        <h1 className="modal-title col-12">{this.props.title}</h1>
                    </div>

                    <form onSubmit={(event) => this.onFormSubmit(event)}>
                        <div className="form-group row">
                            <label htmlFor="event-title" className="col-2 col-form-label">Title</label>
                            <div className="col-10">
                                <input ref="titleInput" className="form-control"
                                        type="text" maxLength="40"/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="event-date" className="col-2 col-form-label">Date</label>
                            <div className="col-10">
                                <input ref="dateInput" className="form-control"
                                        type="date" />
                            </div>
                        </div>

                        <button action="submit">Submit</button>
                    </form>
                                    
                    <footer>
                        <button className="btn btn-lg bt-danger"
                                onClick={this.props.close}>
                            Close
                        </button>
                    </footer>
            </Modal>
        );
    }
}


