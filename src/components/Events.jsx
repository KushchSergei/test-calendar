import React, { Component } from 'react';
import EventList from './EventList';
import TodayEvents from './TodayEvents';
import moment from 'moment';

export class Events extends Component { //компонент ответственный за вывод событий

    changeStatusEvent = (status, date, time) => {//смена статуса события с помощью кнопок в слайдере
      let e = [...this.props.events];
      const b = e.find(day =>{
        return day.date === date;
      })
      const event = b.events.find(e => e.time === time);

      event.status = status;
      this.props.setEvents(e); 
    }

    render() {
      const {selectedDate, events, mode} = this.props,
            title = moment(selectedDate).format("dddd, D MMMM");
      return (
      <div className = 'events-container'>
          <EventHeader title = {title} /> 
          <TodayEvents day = {events.find((day) => {return day.date === moment(this.props.selectedDate).format("DD-MM-YYYY")})}
                        selectedDate = {selectedDate}
                        setSelectedEvent = {this.props.setSelectedEvent}
                        changeStatusEvent = {this.changeStatusEvent}
                        index = {this.props.curIndex}
                        setIndex = {this.props.setIndex}
                      />
          <EventList  events = {events}
                      mode = {mode}
                      selectedDate = {selectedDate}
                      setSelectedEvent = {this.props.setSelectedEvent}/>
      </div>
      );
    }
    }

    const EventHeader = ({title}) => { // шапка в которой отображается выбранная дата
      return (
        <div className = 'event-header'>
          <div className = 'selected-date'>
              {title}
          </div>
        </div>
      );
    }
export default Events
