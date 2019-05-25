import "react-native";
import React from "react";
import AppSingleButton from "../AppSingleButton";
import {shallow} from 'enzyme';
import renderer from "react-test-renderer";

describe("AppSingleButton Test", () => {
  describe("AppSingleButton Snapshot", () => {
    it("renders correctly", () => {
      const tree = renderer.create(<AppSingleButton title="Next" />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("Test onPress", () => {
    it("should call onPress", () => {
      const onPressEvent = jest.fn();
      const component = shallow(
        <AppSingleButton title="Next" onPress={onPressEvent} />
      );
      const instance = component.instance();
      instance.props.onPress(); 
      expect(onPressEvent).toHaveBeenCalled();
      expect(onPressEvent).toHaveBeenCalledTimes(1);
    });
  });
});
