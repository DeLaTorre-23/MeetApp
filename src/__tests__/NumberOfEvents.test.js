import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test("render text input", () => {
    expect(NumberOfEventsWrapper.find(".number-input")).toHaveLength(1);
  });

  test("render events value by default", () => {
    expect(
      NumberOfEventsWrapper.find(".number-input").at(0).props().value
    ).toEqual(30);
  });

  test("check placeholder to be Enter number of events", () => {
    expect(
      NumberOfEventsWrapper.find(".number-input").at(0).props().placeholder
    ).toEqual("Enter Number of Events");
  });

  test("change state when input changes", () => {
    const numberOfEvents = { target: { value: 10 } };
    NumberOfEventsWrapper.find(".number-input").simulate(
      "change",
      numberOfEvents
    );
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(10);
  });

  test("check if type is equal to number of events", () => {
    expect(
      NumberOfEventsWrapper.find(".number-input").at(0).props().type
    ).toEqual("number");
  });
});
