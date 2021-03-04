import React from "react";
import { mount, shallow } from "enzyme";

import App from "../App";
import Event from "../Event";
import { loadFeature, defineFeature } from "jest-cucumber";
import { mockData } from "../mock-data";
import { extractEvents } from "../api";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");
const localEvents = extractEvents(mockData);
let EventsWrappper;
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
      EventsWrappper = shallow(<Event event={{ localEvents }} />);
      expect(EventsWrappper.find(".expand-btn")).toHaveLength(0);
    });
  });

  test("User can expand an event to see its details.", ({
    given,
    when,
    then,
  }) => {
    given("the event detail is true", () => {
      AppWrapper = mount(<App />);
      EventsWrappper.setState({
        showHideDetails: true,
      });
    });

    when("user click the event", () => {
      EventsWrappper.find(".expand-btn").simulate("click");
    });

    then("the user should see a detailed information about the event", () => {
      const eventDetails = EventsWrappper.find(".event-details");
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
      EventsWrappper.setState({
        showHideDetails: false,
      });
    });

    when("the user clicks the collapse button", () => {
      EventsWrappper.find(".expand-btn").simulate("click");
    });

    then(
      "the event element will be collapsed to hide the detail information about that specific event",
      () => {
        const eventDetails = EventsWrappper.find(".event-details");
        expect(eventDetails).toHaveLength(0);
      }
    );
  });
});
