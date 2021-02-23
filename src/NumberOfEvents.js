import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 30,
  };

  handleNumberEventChanged = (event) => {
    const numberOfEvents = event.target.value;
    this.setState({
      numberOfEvents,
    });
  };

  render() {
    return (
      <div className="event-number-container">
        <label htmlFor="number-events" />
        <input
          type="number"
          name="number-events"
          className="number-input"
          placeholder="Enter Number of Events"
          value={this.state.numberOfEvents}
          onChange={this.handleNumberEventChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
