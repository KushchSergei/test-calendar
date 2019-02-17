import React, { Component } from 'react';
import './App.css';
import CalendarHeader from './components/CalendarHeader';
import CalendarBody from './components/CalendarBody';
import Events from './components/Events';
import moment from 'moment';

const events = [ // массив событий
  {
    date: '17-02-2019',
    events:[
      {status: 'completed', name:'finish work', body: 'finish the test project', time: '8:00'},
      {status: 'completed', name:'send project', body: 'finally send the project', time: '16:00'},
      {status: 'pending', name:'exam preparing', body: 'preparing for the exam', time: '16:30'}
    ]
  },
  {
    date: '18-02-2019',
    events:[
      {status: 'pending', name:'consultation', body: 'visit the exam consultation', time: '11:30'},
      {status: 'pending', name:'exam preparing', body: 'preparing for the exam', time: '11:30'}
    ]
  },
  {
    date: '19-02-2019',
    events:[
      {status: 'pending', name:'exam', body: 'visit the exam', time: '11:30'},
      {status: 'rejected', name:'preparing', body: 'preparing for the exam', time: '12:00'},
      {status: 'completed', name:'some completed event', body: 'some completed event', time: '23:47'}
    ]
  },
  {
    date: '20-02-2019',
    events:[
      {status: 'pending', name:'exam preparing', body: 'preparing for the exam', time: '10:00'}
    ]
  },
  {
    date: '21-02-2019',
    events:[
      {status: 'pending', name:'consultation', body: 'visit the exam consultation', time: '11:30'},
      {status: 'pending', name:'preparing', body: 'preparing for the exam', time: '12:00'}
    ]
  },
  {
    date: '22-02-2019',
    events:[
      {status: 'pending', name:'exam', body: 'visit the exam', time: '8:30'}
    ]
  },
  {
    date: '01-03-2019',
    events:[
      {status: 'pending', name:'practice', body: 'beginning of study', time: '9:00'}
    ]
  },
];

export class Calendar extends Component { /*  главный компонент календаря, обертка для всех остальных, содержит в своем состоянии
                                              значения обьединяющие компоненты, функции для установки этих значений */
constructor(props){
    super(props);
    this.state = {
      mode: 'month',
      currentContext: moment(), //текущий контекст для вывода недель / месяцев
      selectedDate  : moment(), //выбранный день
      currentDate   : moment(), //текущая дата
      selectedEvent : null,     //выбранное событие
      events        : events,   //массив событий
      curIndex: 0               //текущий индекс для слайдера
    }
  }

  setIndex = (index) => {
    this.setState({
      curIndex: index
    })
  }
  
  setSelectedEvent = (data) =>{
    this.setState({
      selectedEvent: data,
    }); 
  }

  setEvents = (data) => {
    this.setState({
      events: data
    }); 
  }

  setMode = (data) => {
    this.setState(
      {mode: data
    });
  }

  setSelectedDate = day => {
    this.setState({
      selectedDate: day,
      curIndex: 0
    });
  }

  setCurrentContext = (data) => {
    this.setState({
      currentContext: data
    });
  }

  render() {
    const {mode, selectedDate, selectedEvent, events, currentDate, curIndex} = this.state;
    return (
      <div id="calendar">      
        <CalendarHeader selectedDate = {selectedDate}
                        mode = {mode}
                        events = {events}
                        selectedEvent = {selectedEvent}
                        setCurrentContext = {this.setCurrentContext}
                        setSelectedDate = {this.setSelectedDate}
                        setSelectedEvent = {this.setSelectedEvent}
                        setEvents = {this.setEvents}
                        setMode = {this.setMode}
                        />
        <CalendarBody mode = {mode}
                      selectedDate = {selectedDate}
                      currentDate = {currentDate}
                      setSelectedDate = {this.setSelectedDate}
                      events = {events}
                      />
        <Events events={events}
                selectedDate = {selectedDate}
                mode = {mode}
                currentDate = {currentDate}
                setEvents = {this.setEvents}
                setSelectedEvent = {this.setSelectedEvent}
                curIndex = {curIndex}
                setIndex = {this.setIndex}
                />
      </div>
    )
  }
}

export default Calendar