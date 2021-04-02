import React, { Component } from "react";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import EventGenre from "./EventGenre";
import { getEvents, extractLocations } from "./api";
import { OffLineAlert } from "./Alert";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./App.css";

class App extends Component {
  state = {
    events: [],
    locations: [],
    eventCount: "",
    offLineText: "",
    currentLocation: "all",
  };

  // Filters events based on location and number given in user input.
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

  // Count how many events has each city.
  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location)
        .length;
      const city = location.split(" ").shift();
      return { city, number };
    });
    return data;
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { eventCount, events, locations } = this.state;
    return (
      <div className="App">
        <div className="main-wrap">
          <h1>Meet App</h1>
          <CitySearch locations={locations} updateEvents={this.updateEvents} />
          <NumberOfEvents
            locations={locations}
            eventCount={eventCount}
            updateEvents={this.updateEvents}
          />
          <OffLineAlert text={this.state.offLineText} />

          <div className="data-chart">
            <h4>Events in each city</h4>
            <div className="chart-wrap">
              <EventGenre events={events} />
              <ResponsiveContainer
                className="chart-scatterChart"
                width={400}
                height={400}
              >
                <ScatterChart
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid />
                  <XAxis type="category" dataKey="city" name="city" />
                  <YAxis
                    type="number"
                    dataKey="number"
                    name="number of events"
                    allowDecimals={false}
                  />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter data={this.getData()} fill="#a1ef8b" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          <EventList events={events} />
        </div>
      </div>
    );
  }
}

export default App;
