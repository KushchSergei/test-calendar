import React, { Component } from 'react';
import moment from 'moment';

export class Event extends Component { //компонент реализует модальное окно для просмотра информации о событии, запуска его редактирования или смены статуса
    render() {
        const {selectedEvent} = this.props;
        return (
            <div className = 'modal-container'>
                {selectedEvent ?
                <div className = 'modal modal-event'>
                <div className="add-event-header">
                    <button onClick = {() => this.props.setSelectedEvent(null)}>✕</button>
                    <button className='edit-btn' onClick = {() => this.props.changeEvent(selectedEvent.event)}></button>
                </div>
                <div className = 'event-data-container'>
                    <h5>{selectedEvent.event.name}</h5>
                    <h4>{moment(selectedEvent.date,'DD-MM-YYYY').format("dddd, D MMM")}</h4>
                    <div className = 'time-data-row'>
                        <div className = 'starts'><h6>STARTS:</h6> <p>{selectedEvent.event.time}</p></div>
                    </div>
                    <div className = 'event-btn-container'>
                        <div id = 'first-btn' onClick = {() => this.props.changeStatusEvent('completed')}>complete</div>
                        <div onClick = {() => this.props.changeStatusEvent('rejected')}>reject</div>
                        <div id = 'third-btn' onClick = {this.props.deleteEvent}>delete</div>
                    </div>
                    <p>{selectedEvent.event.body}</p>
                </div>
                </div>
                : ''}
            </div>
        )
    }
}

export default Event
