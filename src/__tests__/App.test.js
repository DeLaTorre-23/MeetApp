import React from "react";
import { shallow, mount } from "enzyme";

import { mockData } from "../mock-data";
import { extractLocations, getEvents } from "../api";
import App from "../App";
import EventList from "../EventList";
import CitySearch from "../CitySearch";
import NumberOfEvents from "../NumberOfEvents";

// ----------   UNIT TESTING  ----------
describe("<App /> component", () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test("Render list of event Component", () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test("Render city search component", () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test("Render number of events Component", () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

// ----------   INTEGRATION TESTING  ----------
describe("<App /> integration", () => {
  test('App passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state("events");
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state("locations");
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(
      AppLocationsState
    );
    AppWrapper.unmount();
  });

  test('App passes "eventCount" state as a prop to NumberOfEvents', () => {
    const AppWrapper = mount(<App />);
    const AppEventCountState = AppWrapper.state("eventCount");
    expect(AppWrapper.find(NumberOfEvents).props().locations).not.toEqual(
      AppEventCountState
    );
    AppWrapper.unmount();
  });

  test("Get list on change number of events by user", async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const locations = extractLocations(mockData);
    AppWrapper.instance().updateEvents = jest.fn();
    AppWrapper.instance().forceUpdate();
    NumberOfEventsWrapper.setState({ events: locations, eventCount: 8 });
    NumberOfEventsWrapper.find(".number-input").simulate("change");
    expect(NumberOfEventsWrapper.state("eventCount")).toEqual("8");
    expect(AppWrapper.instance().updateEvents).toHaveBeenCalledWith("", "8");
    AppWrapper.unmount();
  });

  test("Get list of events matching the city selected by the user", async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state("suggestions");
    const selectedIndex = Math.floor(Math.random() * suggestions.length);
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(
      (event) => event.location === selectedCity
    );
    expect(AppWrapper.state("events")).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test('Get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find(".suggestions li");
    await suggestionItems.at(suggestionItems.length - 1).simulate("click");
    const allEvents = await getEvents();
    expect(AppWrapper.state("events")).toEqual(allEvents);
    AppWrapper.unmount();
  });
});
