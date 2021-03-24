import React, { Component } from "react";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations } from "./api";
import { OffLineAlert } from "./Alert";

import "./App.css";

class App extends Component {
  state = {
    events: [],
    locations: [],
    eventCount: "",
    offLineText: "",
  };

  updateEvents = (location, eventCount) => {
    let locationEvents;
    getEvents().then((events) => {
      locationEvents = events;
      if (location === "all" && eventCount === 0) {
        locationEvents = events;
      } else if (location !== "all" && eventCount === 0) {
        locationEvents = events.filter((event) => event.location === location);
        console.log(eventCount);
      } else if (location === "" && eventCount > 0) {
        locationEvents = events.slice(0, eventCount);
      }
      this.setState({
        events: locationEvents,
        eventCount,
      });
    });
  };

  componentDidMount() {
    this.mounted = true;

    // If the App is OffLine show an Alert
    if (!navigator.onLIne) {
      this.setState({
        offLineText: "You are currently offline. Data may not be up-to-date.",
      });
    } else {
      this.setState({
        offLineText: "",
      });
    }

    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, this.state.eventCount),
          locations: extractLocations(events),
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
        <div className="main-wrap">
          <OffLineAlert text={this.state.offLineText} />
          <h1>Meet App</h1>
          <CitySearch
            locations={this.state.locations}
            eventCount={this.state.eventCount}
            updateEvents={this.updateEvents}
          />
          <NumberOfEvents
            locations={this.state.locations}
            eventCount={this.state.eventCount}
            updateEvents={this.updateEvents}
          />
          <EventList events={this.state.events} />
        </div>
      </div>
    );
  }
}

export default App;
