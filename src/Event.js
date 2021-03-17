import React, { Component } from "react";
import moment from "moment";

class Event extends Component {
  state = {
    showHideDetails: false,
  };

  // Toggle show/hide event on click
  handleShowHideBtn = () => {
    if (this.state.showHideDetails === true) {
      this.setState({ showHideDetails: false });
    } else {
      this.setState({ showHideDetails: true });
    }
  };

  // Format time for readability
  formatTime = () => {
    const time = this.props.event.start.dateTime;
    const formattedTime = moment(time).format("dddd, MMMM Do YYYY, h:mm a");
    return <span className="start-dateTime">{`${formattedTime}`}</span>;
  };

  render() {
    const { event } = this.props;
    return (
      <div className="event-container">
        <h1 className="summary">{event.summary}</h1>
        <div className="time">{this.formatTime()}</div>
        <div className="location-container">
          <p className="summary-event">@ {event.summary}</p>
          <p className="location-event"> | {event.location}</p>
        </div>
        {this.state.showHideDetails && (
          <div className="event-details">
            <h3>About event:</h3>
            <a
              className="link-google"
              href={event.htmlLink}
              target="_blank"
              rel="noreferrer"
            >
              See details on Google calendar
            </a>
            <p>{event.description}</p>
          </div>
        )}
        <button
          type="button"
          className="expand-btn"
          onClick={() => this.handleShowHideBtn()}
        >
          {!this.state.showHideDetails ? "Show Details" : "Hide details"}
        </button>
      </div>
    );
  }
}
export default Event;
