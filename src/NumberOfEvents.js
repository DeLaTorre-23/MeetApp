import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    eventCount: this.props.eventCount,
  };

  handleNumberEventChanged = (event) => {
    const eventCount = event.target.value;
    this.setState({
      eventCount,
    });
  };

  render() {
    return (
      <div className="event-number-container">
        <label htmlFor="number-events">Number of Events:</label>
        <input
          type="number"
          name="number-events"
          className="number-input"
          placeholder="Enter Number of Events"
          value={this.state.eventCount}
          onChange={this.handleNumberEventChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
