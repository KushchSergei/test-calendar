import React, { Component } from 'react'

export class AddEvent extends Component { //компонент предназначеный для добавления новых / редактирования существующих событий
  constructor(props){
    super(props);
    this.state = {
      name: '',
      body: '',
      time: '',
      status: 'pending'
    }
  }
  componentWillReceiveProps = (nextProps) => { //заполнение состояния в зависимости от режима добавление / редактирование
    if (nextProps.addMode === 'change'){
      this.setState(
        this.props.selectedEvent.event
      );
    } else {
      this.setState(this.getDefaultState());
    }
  }

  getDefaultState = () => { //значения для состояния по умолчанию
    return {
      name: '',
      body: '',
      time: '',
      status: 'pending'
    };
  }

  eventAdd = (e) => { //вызов добавления / редактирования событий
    e.preventDefault();
      this.props.addEvent({
        ...this.state
      });
    this.setState(this.getDefaultState());
    this.props.hideAddEvent();
  }

  cancel = () => { //отмена добавления / редактирования события
    if (this.props.addMode === 'change'){
      this.props.completeChange();
    }
    this.setState(this.getDefaultState());
    this.props.hideAddEvent();
  }

  onNameHandler = (event) => { //обработка ввода названия события
    this.setState({
      name: event.target.value
    });
  };

  onBodyHandler = (event) => {//обработка ввода описания события
    this.setState({
      body: event.target.value
    });
  };

  onTimeHandler = (event) => {//обработка ввода времени старта события
    this.setState({
      time: event.target.value
    });
  };


  render() {
    return (
      <div className = 'modal-container'>
        {this.props.displayAddEvent ? 
        <div className = 'modal modal-add'>
          <div className="add-event-header">
              <button onClick={this.cancel}>✕</button>
              <h5>New event</h5>
              <button form = 'event-form' type="submit">✓</button>
          </div>
          <form id="event-form" className = 'add-event-form' onSubmit = {this.eventAdd}>
            <div className = 'add-event-input-block'>
              <h5>event name</h5>
              <input type = "text" name = "name" placeholder = 'input here' value = {this.state.name} onChange = {this.onNameHandler} required autoComplete="off"/>
            </div>
            <div className = 'add-event-input-block'>
              <h5>event description</h5>
              <textarea type = "text" name = "body" placeholder = 'input here' value = {this.state.body} onChange = {this.onBodyHandler} required autoComplete="off"/>
            </div>
            <div className = 'add-event-input-block'>
              <h5>starts</h5>
              <input id = 'timepicker' type = "time" name = "time" value = {this.state.time} onChange = {this.onTimeHandler} required/>
            </div>
          </form>
        </div>
        : ''}
      </div>
    )
  }
}

export default AddEvent
