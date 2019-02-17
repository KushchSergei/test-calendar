import React, { Component } from 'react';
import moment from 'moment'; 

export class EventList extends Component { //Список всех/оставшихся событий за месяц/неделю
  renderEvents = () => { //вывод событий в зависимости от выбранной даты / режима отображения
    let events;
    if (this.props.mode === 'month'){
      if (moment(this.props.selectedDate).isSame(this.props.currentDate, 'month')) {
        events = this.props.events.filter((day)=>{
          return moment(day.date,'DD-MM-YYYY').isBetween(this.props.currentDate, moment(this.props.currentDate).endOf('month'));
        });
      } else {
        events = this.props.events.filter((day)=>{
          return moment(day.date,'DD-MM-YYYY').isBetween(moment(this.props.selectedDate).startOf('month').subtract(1,'day'), moment(this.props.selectedDate).endOf('month'));
        });
      }
    } else if (this.props.mode === 'week') {
      if (moment(this.props.selectedDate).isSame(this.props.currentDate, 'week')) {
        events = this.props.events.filter((day)=>{
          return moment(day.date,'DD-MM-YYYY').isBetween(this.props.currentDate, moment(this.props.currentDate).endOf('week'));
        });
      } else {
        events = this.props.events.filter((day)=>{
          return moment(day.date,'DD-MM-YYYY').isBetween(moment(this.props.selectedDate).startOf('week'), moment(this.props.selectedDate).endOf('week'));
        });
      }
    }
      return events.map((day, index) => {
        return (
          <div className = 'event-container' key = {index}>
            <div className = 'event-date'>
              <h2>{moment(day.date,'DD-MM-YYYY').format("ddd, D MMM")}</h2>
            </div>
          <div className = 'events'>
            {day.events
              .sort((a,b) => { return moment(a.time,'h:mm').diff(moment(b.time,'h:mm'),'minutes')})
              .map((event, index) => {
                return (
                  <EventShortcut  event = {event}
                                  key = {index}
                                  index = {index}
                                  day = {day}
                                  setSelectedEvent = {this.props.setSelectedEvent}/>
                )
              })
            }
            </div>
          </div>
        )
    }); 
  }
  render() {
    return (
      <div>
          {this.renderEvents()}
      </div>
    )
  }
}

class EventShortcut extends Component { //компонент отетственный за вывод событий в списке всех / оставшихся событий за месяц/неделю
  render(){
  const {event, day, index} = this.props;
  return(
    <div className = {`event ${(event.status === 'pending')?'event-pending':(event.status === 'completed')?'event-completed':'event-rejected'}`}
    key = {index}  onClick = {() => this.props.setSelectedEvent({date: day.date, event: event})}>
      <div className = "event-row">
          <h5>{event.name}</h5>
          <span className = "event-time">{event.time}</span>
      </div>
      <div className = 'event-description-row'>
        <p className = "event-description">{event.body}</p>
        <span className = {`${(event.status === 'completed')?'completed-marker':(event.status === 'rejected')?'rejected-marker':''}`}></span>
      </div>
    </div>
  )}
}

export default EventList