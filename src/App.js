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
    currentLocation: "all",
  };

  // Filters events based on location and number given in user input
  updateEvents = (location, eventCount) => {
    const { currentLocation, numberOfEvents } = this.state;
    if (location) {
      getEvents().then((events) => {
        const locationEvents =
          location === "all"
            ? events
            : events.filter((event) => event.location === location);
        let counter = eventCount ? eventCount : this.state.numberOfEvents;
        const filteredEvents = locationEvents.slice(0, numberOfEvents);
        this.setState({
          events: filteredEvents,
          numberOfEvents: counter,
          currentLocation: location,
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents =
          currentLocation === "all"
            ? events
            : events.filter((event) => event.location === currentLocation);
        const filteredEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: filteredEvents,
          numberOfEvents: eventCount,
        });
      });
    }
  };

  componentDidMount() {
    this.mounted = true;
    if (!navigator.onLine) {
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
          events: events,
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
          <h1>Meet App</h1>
          <CitySearch
            locations={this.state.locations}
            updateEvents={this.updateEvents}
          />
          <NumberOfEvents
            locations={this.state.locations}
            eventCount={this.state.eventCount}
            updateEvents={this.updateEvents}
          />
          <OffLineAlert text={this.state.offLineText} />
          <EventList events={this.state.events} />
        </div>
      </div>
    );
  }
}

export default App;
