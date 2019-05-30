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

  describe("navgation test", () => {
    it("should navigate to contactwizard", () => {
      const navigation = {
        navigate: jest.fn()
      };

      const spy = jest.spyOn(navigation, "navigate");
      const wrapper = shallow(<WizardWelcomeScreen navigation={navigation} />);
      const appButton = wrapper.find("AppSingleButton");
      appButton.props().onPress();

      expect(spy).toBeCalledWith("WizardVerifyContactScreen");
      spy.mockRestore();
    });
  });
});
