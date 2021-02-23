import React, { Component } from "react";
class Event extends Component {
  state = {
    showHideDetails: false,
  };

  handleShowHideBtn = () => {
    if (this.state.showHideDetails === true) {
      this.setState({ showHideDetails: false });
    } else {
      this.setState({ showHideDetails: true });
    }
  };

  render() {
    const { event } = this.props;
    return (
      <div className="event-container">
        <h1>{event.summary}</h1>
        <p>{event.dateTime}</p>
        <p>@{event.summary}</p>
        <p className="location">{event.location}</p>

        {this.state.showHideDetails && (
          <div className="event-details">
            <h3>About event:</h3>
            <a href={event.htmlLink}>See details on Google calendar</a>
            <p>{event.description}</p>
          </div>
        )}

        <button className="expand-btn" onClick={() => this.handleShowHideBtn()}>
          {!this.state.showHideDetails ? "show Details" : "hide details"}
        </button>
      </div>
    );
  }
}
export default Event;
