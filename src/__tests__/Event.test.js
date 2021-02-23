import React from "react";
import { shallow } from "enzyme";

import Event from "../Event";
import { mockData } from "../mock-data";

describe("<Event /> component", () => {
  let EventWrapper, event;

  beforeAll(() => {
    event = mockData;
    EventWrapper = shallow(<Event event={event} />);
  });

  test("should render with correct event prop", () => {
    expect(EventWrapper.instance().props.event).toEqual(event);
  });

  test("render event details correctly", () => {
    expect(EventWrapper.find(".event-container")).toHaveLength(1);
  });

  test("should render details button", () => {
    expect(EventWrapper.find(".expand-btn")).toHaveLength(1);
  });

  test("show event details", () => {
    EventWrapper.setState({ showHideDetails: true });
    EventWrapper.find(".expand-btn").simulate("click");
  });

  test("hide event details", () => {
    EventWrapper.setState({ showHideDetails: false });
    EventWrapper.find(".expand-btn").simulate("click");
  });
});
