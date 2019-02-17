import React, { Component } from 'react';
import moment from 'moment';
import Day from './Day' 

export class CalendarBody extends Component { //тело календаря в котором,собственно, выводится сетка дней / недель

    renderWeek = () => { //отобразить неделю
        const { selectedDate, currentDate } = this.props;
        let startOfWeek;
    
          startOfWeek = moment(selectedDate).startOf('week');
       
        const days = [];
        let day = startOfWeek;
    
          for (let i = 0; i < 7; i++) {
  
            days.push(
              <Day  key = {i} index = {i} day = {day}
                    events = {this.props.events}
                    currentDate = {currentDate}
                    selectedDate = {selectedDate}
                    setSelectedDate = {this.props.setSelectedDate}
                    />
            );
    
          day = day.clone().add(1, 'd');
        }
        return(   
          <div className = "month">
            <div className = "week">
              { days }
            </div>
          </div>      
        ); 
      }
    
      renderMonth = () => { //отобразить месяц
        const { selectedDate, currentDate } = this.props;
        const monthStart = moment(selectedDate).startOf('month'),
              monthEnd = moment(monthStart).endOf('month'),
              startDate = moment(monthStart).startOf('week'),
              rows = [];
              
        let days = [],
            day = startDate;
        
          while (day <= monthEnd) {
            for (let i = 0; i < 7; i++) {
    
              if (!moment(day).isSame(monthStart, 'month')){
                days.push(
                  <div className="space" key = {day}></div>
                );
              } else {
                days.push(
                  <Day  key = {i} index = {i} day = {day}
                        events = {this.props.events}
                        currentDate = {currentDate}
                        selectedDate = {selectedDate}
                        setSelectedDate = {this.props.setSelectedDate}
                        />
                );
              }
              day = moment(day).add(1, 'days');
            }
            rows.push(
              <div className="week" key = {day}>
                {days}
              </div>
            );
            days = [];
          }
        return rows;
      }

  render() {
    const {mode} = this.props;
    return (
      <div className="month">
        { ( mode === 'month' ) ? this.renderMonth() : ( mode === 'week' ) ? this.renderWeek() : '' }
      </div>
    )
  }
}

export default CalendarBody