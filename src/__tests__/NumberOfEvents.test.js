import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test("Render text input", () => {
    expect(NumberOfEventsWrapper.find(".number-input")).toHaveLength(1);
  });

  test("Render events value by default", () => {
    expect(
      NumberOfEventsWrapper.find(".number-input").at(0).props().value
    ).toEqual(30);
  });

  test("Check placeholder to be Enter number of events", () => {
    expect(
      NumberOfEventsWrapper.find(".number-input").at(0).props().placeholder
    ).toEqual("Enter Number of Events");
  });

  test("Change state when input changes", () => {
    const numberOfEvents = { target: { value: 10 } };
    NumberOfEventsWrapper.find(".number-input").simulate(
      "change",
      numberOfEvents
    );
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(10);
  });

  test("Check if type is equal to number of events", () => {
    expect(
      NumberOfEventsWrapper.find(".number-input").at(0).props().type
    ).toEqual("number");
  });
});
