import "react-native";
import React from "react";
import BottomRightButton from "../BottomRightButton";
import renderer from "react-test-renderer";

describe("BottomRightButton Test", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<BottomRightButton title="Next" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});