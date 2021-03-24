import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  state = {
    eventCount: this.props.eventCount,
  };

  handleNumberEventChanged = (event) => {
    const eventCount = event.target.value;
    if (eventCount < 1) {
      return this.setState({
        eventCount: "",
        errorText: `Select number between 1 and 32. Please try another number.`,
      });
    } else if (eventCount > 32) {
      return this.setState({
        eventCount: "",
        errorText: `Select number between 1 and 32. Please try another number.`,
      });
    } else {
      this.setState({
        eventCount,
        errorText: "",
      });
      this.props.updateEvents("", eventCount);
    }
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <div>
          <label htmlFor="number-events">Number of Events:</label>
        </div>
        <input
          type="number"
          name="number-events"
          className="number-input"
          value={this.state.eventCount}
          onChange={this.handleNumberEventChanged}
        />
        <ErrorAlert text={this.state.errorText} />
      </div>
    );
  }
}

export default NumberOfEvents;
