import "react-native";
import React from "react";
import  AppSingleButton  from "../AppSingleButton";

import renderer from "react-test-renderer";

describe("AppSingleButton Test", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<AppSingleButton title='Next'/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});