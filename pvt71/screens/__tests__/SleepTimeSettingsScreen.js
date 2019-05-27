import "react-native";
import React from "react";
import SleepTimeSettingsScreen from "../SleepTimeSettingsScreen";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

describe("Wizard Setting Screen tests", () => {
  describe("Snapshot test", () => {
    it("renders correctly", () => {
      const tree = renderer.create(<SleepTimeSettingsScreen />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("handleSave() test", () => {
    it("should be called", () => {
      const navigation = {
        navigate: jest.fn()
      };
      const spy = jest.spyOn(navigation, "navigate");
      const wrapper = shallow(
        <SleepTimeSettingsScreen navigation={navigation} />
      );
      const instance = wrapper.instance();
      instance.handleSave();
      expect(spy).toHaveBeenCalledWith("Home");
      spy.mockClear()
    });
  });
  describe("Timepicker change", () => {
    it("onPickedValues() should be called", () => {
     
      const wrapper = shallow(<SleepTimeSettingsScreen />);
      expect(
        wrapper
          .find("TimePicker")
          .first()
          .prop("onChange")
      ).toBe(wrapper.instance().onPickedValues);
    });
  });
  describe("onPickedValues() test", () => {
    it("should call proto.setState func", () => {
        const spy = jest.spyOn(SleepTimeSettingsScreen.prototype, "setState");
        const wrapper = shallow(<SleepTimeSettingsScreen />);
        wrapper.instance().onPickedValues();
        expect(spy).toHaveBeenCalled();
        spy.mockClear()
    });
  });
});
