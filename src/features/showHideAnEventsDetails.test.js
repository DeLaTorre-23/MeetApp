import React from "react";
import { mount, shallow } from "enzyme";

import App from "../App";
import Event from "../Event";
import { loadFeature, defineFeature } from "jest-cucumber";
import { mockData } from "../mock-data";
import { extractLocations } from "../api";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");
const localEvents = extractLocations(mockData);
let EventWrapper;
let AppWrapper;

defineFeature(feature, (test) => {
  test("An event element is collapsed by default.", ({ given, when, then }) => {
    given("event detail is collapsed", async () => {
      AppWrapper = mount(<App />);
    });

    when("the user opens the application", () => {
      const AppEventsState = AppWrapper.state("events");
      expect(AppEventsState).toHaveLength(0);
    });

    then("the user can expand the event detail anytime", () => {
      EventWrapper = shallow(<Event event={{ localEvents }} />);
      expect(EventWrapper.find(".expand-btn")).toHaveLength(0);
    });
  });

  test("User can expand an event to see its details.", ({
    given,
    when,
    then,
  }) => {
    given("the event detail is true", () => {
      AppWrapper = mount(<App />);
      EventWrapper.setState({
        showHideDetails: true,
      });
    });

    when("user click the event", () => {
      EventWrapper.find(".expand-btn").simulate("click");
    });

    then("the user should see a detailed information about the event", () => {
      const eventDetails = EventWrapper.find(".event-details");
      expect(eventDetails).toHaveLength(1);
    });
  });

  test("User can collapse an event to hide its details.", ({
    given,
    when,
    then,
  }) => {
    given("the event detail is hidden", () => {
      AppWrapper = mount(<App />);
      EventWrapper.setState({
        showHideDetails: false,
      });
    });

    when("the user clicks the collapse button", () => {
      EventWrapper.find(".expand-btn").simulate("click");
    });

    then(
      "the event element will be collapsed to hide the detail information about that specific event",
      () => {
        const eventDetails = EventWrapper.find(".event-details");
        expect(eventDetails).toHaveLength(0);
      }
    );
  });
});
