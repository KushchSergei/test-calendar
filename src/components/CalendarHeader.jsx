import React, { Component } from 'react';
import SelectMode from './SelectMode';
import moment from 'moment';
import AddEvent from './AddEvent';
import Event from './Event';

export class CalendarHeader extends Component { //шапка календаря, в которой происходит смена режимов, месяцев, недель, добавление / редактирование событий
    constructor(props){
        super(props);
        this.state = {
            displayAddEvent: false,
            showDaysTitle  : true,
            showSelectMode : false,
            addMode: 'add'
        }
    }

  changeStatusEvent = (status) => { //смена статуса события с помощью кнопок в модальном окне
    let e = [...this.props.events];
    if (this.props.selectedEvent) {
      const b = e.find(day =>{
        return day.date === this.props.selectedEvent.date;
      })
        const event = b.events.find(e => e.time === this.props.selectedEvent.event.time);
        event.status = status;
    }
    this.props.setEvents(e); 
    this.props.setSelectedEvent(null);
  }

  deleteEvent = () =>{ //удаление события с помощью кнопки в модальном окне
    let e = [...this.props.events];
    if (this.props.selectedEvent) {
      const b = e.find(day =>{
        return day.date === this.props.selectedEvent.date;
      })
      if (b.events.length > 1) {
        const index = b.events.findIndex(e => e.time === this.props.selectedEvent.event.time)
        b.events.splice(index, 1);
      } else {
        const index = e.findIndex(e => e.date === this.props.selectedEvent.date)
        e.splice(index, 1);
      }
      this.props.setSelectedEvent(null);
    }
    this.completeChange();
    this.props.setEvents(e); 
  }

  changeEvent = () => { //отображение модального окна для редактирования / добавления события, смена режима на редактирование
    this.setState({displayAddEvent: true, addMode: 'change'});
  }

  completeChange = () =>{ //завершение редактирования события, смена режима на добавление
    this.setState({displayAddEvent: false, addMode: 'add'});
  }

  add = () => { //прибавить месяц / неделю в зависимости от режима к текущей выбранной дате
      const {mode, currentContext,selectedDate} = this.props;
      if (mode === 'month'){
        this.props.setCurrentContext(moment(currentContext).add(1, 'months'));
        this.props.setSelectedDate(moment(selectedDate).add(1,'month'));
      } else if (this.props.mode === 'week') {
        this.props.setCurrentContext(moment(currentContext).add(1, 'week'));
        this.props.setSelectedDate(moment(selectedDate).add(1,'week'));
      } 
    }

  sub = () => { //вычесть месяц / неделю в зависимости от режима из текущей выбранной даты
      const {mode, currentContext,selectedDate} = this.props;
      if (mode === 'month'){
        this.props.setCurrentContext(moment(currentContext).subtract(1, 'months'));
        this.props.setSelectedDate(moment(selectedDate).subtract(1,'month'));
      } else if (this.props.mode === 'week') {
        this.props.setCurrentContext(moment(currentContext).subtract(1, 'week'));
        this.props.setSelectedDate(moment(selectedDate).subtract(1,'week'));
      } 
    }

  changeMode = (mode) => { //сменить режим неделя / месяц
      this.props.setMode(mode);
      this.setState({showSelectMode: false, showDaysTitle: true});
      this.refs.monthName.classList.remove("active");
    }    

  selectMode = () =>{ //скрыть / отобразить панель для выбора режима месяц / неделя и подписей кдням недели
      if (this.state.showSelectMode === false){
          this.setState({showSelectMode: true, showDaysTitle: false});
          this.refs.monthName.classList.toggle("active");
      } else {
          this.setState({showSelectMode: false, showDaysTitle: true});
          this.refs.monthName.classList.remove("active");
      }
    }    

  addEvent = ({...event}) => { //добавить или редактировать событие, в зависимости от режима
    let e = [...this.props.events];
    if (this.state.addMode === 'add'){
        let before = e.find(day =>{
            return day.date === this.props.selectedDate.format("DD-MM-YYYY");
        });
        let newEvent;
        if (!before) {
          newEvent = {
            date: this.props.selectedDate.format("DD-MM-YYYY"),
            events: [event]
          };
          e.push(newEvent);
        } else {
          before.events.push(event);
        }
      } else if (this.state.addMode === 'change') {
        let b = e.find(day =>{
          return day.date === this.props.selectedEvent.date;
        })
        const index = b.events.findIndex(e => e.time === this.props.selectedEvent.event.time);
        b.events.splice(index, 1, event);
        this.props.setSelectedEvent({date: this.props.selectedEvent.date, event: event});
        this.completeChange();
        }
      this.props.setEvents(e); 
    } 

  showAddEvent = () =>{ //отобразить модальное окно добавления / редактирования событий
      this.setState({displayAddEvent: true});
  }

  hideAddEvent = () =>{ //скрыть модальное окно добавления / редактирования событий
      this.setState({displayAddEvent: false});
  }

  renderTitle = () =>{ //отображение заголовка с текущим годом и месяцем / месяцем и датой в зависимости от режима отображения
      const { selectedDate, mode } = this.props;   

      if (mode === 'month'){
          const monthYear = moment(selectedDate).format("YYYY MMMM");  
          return monthYear;
      } else if (mode === 'week') {
          const startOfWeek = moment(selectedDate).startOf('week').format('MMM D');
          let endFormat;

          if (moment(moment(selectedDate).endOf('week')).isSame(moment(selectedDate).startOf('week'), 'month')){
              endFormat = 'D';
          } else {
              endFormat = 'MMM D';
          }
          const endOfWeek = moment(selectedDate).endOf('week').format(endFormat);

          return `${startOfWeek} - ${endOfWeek}`;
      }
  }

    render() {  
        const { selectedDate, mode} = this.props,
              prevMonth = moment(moment(selectedDate).subtract(1, 'months')).format("MMM"),
              nextMonth = moment(moment(selectedDate).add(1, 'months')).format("MMM");
    return (
    <div className="calendar-header">
        <AddEvent addEvent = {this.addEvent}
                  addMode = {this.state.addMode}
                  hideAddEvent = {this.hideAddEvent}
                  displayAddEvent = {this.state.displayAddEvent}
                  changeEvent = {this.changeEvent}
                  selectedEvent = {this.props.selectedEvent}
                  completeChange = {this.completeChange}
                  />
        <Event  selectedEvent = {this.props.selectedEvent}
                setSelectedEvent = {this.props.setSelectedEvent}
                changeEvent = {this.changeEvent}
                deleteEvent = {this.deleteEvent}
                changeStatusEvent = {this.changeStatusEvent}
                />
        <AddEventPanel showAddEvent = {this.showAddEvent}/>
        <div className="calendar-navigation">
          <button className = "nav-btn prev-btn" onClick = {this.sub}>{(mode === 'month') ? prevMonth : 'prev'}</button>
          <span onClick = { this.selectMode } className="current-month" ref="monthName">{this.renderTitle()}</span>
          <button className = "nav-btn next-btn" onClick = {this.add }>{(mode === 'month') ? nextMonth : 'next'}</button>
        </div>
        <DaysTitle showDaysTitle = {this.state.showDaysTitle} />
        <SelectMode changeMode = {this.changeMode}
                    showSelectMode = {this.state.showSelectMode}
                    />
    </div>
    )
  }
}

const AddEventPanel = ({showAddEvent}) => { //компонент который открывает модальное окно добавления события
  return (
    <div className="add-event-panel">
      <button onClick = {showAddEvent}>+</button>
    </div>
  )}

const DaysTitle = ({showDaysTitle}) => { // компонент который выводит подписи к дням недели
  return (
      (showDaysTitle)?
        <div className="days-of-week">
            <span className="day-of-week">S</span>
            <span className="day-of-week">M</span>
            <span className="day-of-week">T</span>
            <span className="day-of-week">W</span>
            <span className="day-of-week">T</span>
            <span className="day-of-week">F</span>
            <span className="day-of-week">S</span>
        </div>
        :'')
  }

export default CalendarHeader