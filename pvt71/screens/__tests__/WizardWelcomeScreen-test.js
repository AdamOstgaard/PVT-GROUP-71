import "react-native";
import React from "react";
import WizardWelcomeScreen from "../WizardWelcomeScreen";
import { shallow } from "enzyme";

describe("Wizard WelcomeScreen tests", () => {
  describe("Wizard WelcomeScreen tests", () => {
    it("renders correctly", () => {
      const tree = shallow(<WizardWelcomeScreen />);
      expect(tree).toMatchSnapshot();
    });
  });

  describe("Test onPress", () => {
    it("should call onPress", () => {
      let mockFn = jest.fn();
      WizardWelcomeScreen.prototype.handlePress = mockFn;
      let wrapper = shallow(<WizardWelcomeScreen />);
      wrapper
        .find("AppSingleButton")
        .props()
        .onPress();
      expect(mockFn).toHaveBeenCalled();
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });
});
