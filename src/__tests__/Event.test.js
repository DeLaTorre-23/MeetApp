import React from "react";
import { shallow } from "enzyme";

import Event from "../Event";
import { mockData } from "../mock-data";

describe("<Event /> component", () => {
  let EventWrapper, event;

  beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={event} />);
  });

  test("Render with correct event prop", () => {
    expect(EventWrapper.instance().props.event).toEqual(event);
  });

  test("Render event details correctly", () => {
    expect(EventWrapper.find(".event-container")).toHaveLength(1);
  });

  test("Render details button", () => {
    expect(EventWrapper.find(".expand-btn")).toHaveLength(1);
  });

  test("Show event details", () => {
    EventWrapper.setState({ showHideDetails: true });
    EventWrapper.find(".expand-btn").simulate("click");
  });

  test("Hide event details", () => {
    EventWrapper.setState({ showHideDetails: false });
    EventWrapper.find(".expand-btn").simulate("click");
  });
});
