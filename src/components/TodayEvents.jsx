import React, { Component } from 'react';
import moment from 'moment';

export class TodayEvents extends Component { //компонент реализует слайдер ответственный за вывод событий выбранного дня, смены статуса этих событий
  constructor(props) {
    super(props)

    this.state = {
      currentIndex: 0,
      translateValue: 0
    }
  }

  componentWillReceiveProps = (props) =>{ //установка нчального индекса в слайдере
    this.setState({
      currentIndex: props.index,
      translateValue: props.index * -300
    });
  }

  goToPrevSlide = () => {//перелистывание слайдера влево
    if(this.state.currentIndex === 0)
      return;
    
    this.props.setIndex(this.state.currentIndex - 1);
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1,
      translateValue: prevState.translateValue + 300
    }))
  }

  goToNextSlide = () => {//перелистывание слайдера вправо
    if(this.state.currentIndex === this.props.day.events.length - 1) {
      return this.setState({
        currentIndex: 0,
        translateValue: 0
      })
    }
    this.props.setIndex(this.state.currentIndex + 1);
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
      translateValue: prevState.translateValue + -(300)
    }));
  }

  render() {
    return (
      <div>
      {(this.props.day)
      ?
        <div className="slider">
          <div className="slider-wrapper"
            style={{
              transform: `translateX(${this.state.translateValue}px)`,
              transition: 'transform ease-out 0.45s'
            }}>
              {
                this.props.day.events
                .sort((a,b) => { return moment(a.time,'h:mm').diff(moment(b.time,'h:mm'),'minutes')})
                .map((event, i) => (
                  <Slide  key = {i}
                          event = {event}
                          setSelectedEvent = {this.props.setSelectedEvent}
                          day = {this.props.day}
                          changeStatusEvent = {this.props.changeStatusEvent}
                          />
                ))
              }
          </div>

          <LeftArrow
          goToPrevSlide = {this.goToPrevSlide}
          />

          <RightArrow
          goToNextSlide = {this.goToNextSlide}
          />
        </div>
      :
        <div className = 'no-events-today'>There is no events today</div>
        }
      </div>
    );
  }
}

const Slide = ({ event, day, setSelectedEvent, changeStatusEvent }) => { //компонент являет собой один слайд (событие) в слайдере
  return  <div className = "slide">
            <div className = "slide-content">
              <div className = 'content-wrapper' onClick = {() => setSelectedEvent({date: day.date, event: event})}>
                <h5>{event.name}</h5>
                <p className = "event-description">{event.body}</p>
                <div className = 'event-time-row'>
                  <span className = 'time-starts'>{event.time}</span>
                  <span className = 'time-left'>{`starts: ${moment(`${day.date}|${event.time}`, "DD-MM-YYYY|h:mm").fromNow()}`}</span>
                </div>
              </div>
              <div className = 'btn-today-container'>
                <button id = 'first-btn' onClick = {() => changeStatusEvent('completed', day.date, event.time)}>complete</button>
                <button onClick = {() => changeStatusEvent('rejected', day.date, event.time)}>reject</button>
              </div>
            </div>
          </div>
}

const LeftArrow = (props) => { //кнопка для перелистывания слайдера влево
  return (
    <div className="backArrow arrow" onClick = {props.goToPrevSlide}></div>
  );
}

const RightArrow = (props) => {//кнопка для перелистывания слайдера вправо
  return (
    <div className="nextArrow arrow" onClick = {props.goToNextSlide}></div>
  );
}

export default TodayEvents