import "react-native";
import React from "react";
import BottomLeftButton from "../BottomLeftButton";
import renderer from "react-test-renderer";

describe("BottomLeftButton Test", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<BottomLeftButton title="Next" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
