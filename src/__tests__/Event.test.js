import React from "react";
import { shallow } from "enzyme";

import Event from "../Event";
import { mockData } from "../mock-data";

describe("<Event /> component", () => {
  let EventWrapper;

  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData} />);
  });

  test("render event details correctly", () => {
    expect(EventWrapper.find(".event-container")).toHaveLength(1);
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
