import React, { Component } from 'react';
import moment from 'moment';

export class Day extends Component { // компонент который выводит день в неделе / месяце

  showEventMarker = () => { //вывод маркеров наличия событий в дне
    const e = this.props.events.find((day) => {
      return day.date === this.props.day.format("DD-MM-YYYY");
    });
    let row = [];
    if (e) {
      for (let i = 0; i < e.events.length; i++){
        row.push(
          <span key = {i} className = {`${(e.events[i].status === 'pending')?'event-pending':(e.events[i].status === 'completed')?'event-completed':'event-rejected'}`}></span>
        )
      }
    } else {
      row.push(
        <div key=''></div>
      )
    }
    return <div className = 'event-marker'>{row}</div>
  }

  render() {
    const {currentDate, selectedDate, day, index} = this.props,
          formattedDate = moment(day).format("D");
    return (
      <div className = {`day 
        ${ (index === 0) ? "weekend" : (index === 6) ? "weekend" : "" }
        ${ moment(day).isSame(currentDate, 'day') ? "current" : 'ordinary' }
        ${ moment(day).isSame(selectedDate, 'day') ? "selected" : 'ordinary'}` }
        key = {index}
        onClick={() => this.props.setSelectedDate(moment(day, "DD-MM-YYYY"))}
      >
      <p>{formattedDate}</p>
      {this.showEventMarker()}
      </div>
    )
  }
}

export default Day
