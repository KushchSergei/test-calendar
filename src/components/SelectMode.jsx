import React, { Component } from 'react'

export class SelectMode extends Component { //компонент предназначеный для выбора режима месяц / неделя

  render() {
    return (
      (this.props.showSelectMode) ? 
      <div className="selectmode">
        <button onClick = {() => this.props.changeMode('month')} className="selectmode"> 
            Month
        </button>
        <button onClick = {() => this.props.changeMode('week')} className="selectmode">
            Week
        </button>
      </div>:''
    )
  }
}

export default SelectMode
