import React from "react";
import { shallow } from "enzyme";

import NumberOfEvents from "../NumberOfEvents";
import { loadFeature, defineFeature } from "jest-cucumber";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

let NumberOfEventsWrapper;

defineFeature(feature, (test) => {
  test("User can change the number of events they want to see.", ({
    given,
    when,
    then,
  }) => {
    given("can change number of lists to view", () => {
      NumberOfEventsWrapper = shallow(
        <NumberOfEvents updateEvents={() => {}} />
      );
    });

    when("the user opens the event page", () => {
      const eventCount = { target: { value: 10 } };
      NumberOfEventsWrapper.find(".number-input").simulate(
        "change",
        eventCount
      );
    });
    then(
      "the user can change or type on the input box any number of list of events to view",
      () => {
        expect(NumberOfEventsWrapper.state("eventCount")).toBe(10);
      }
    );
  });
});
