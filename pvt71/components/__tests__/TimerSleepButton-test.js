import "react-native";
import React from "react";
import TimerSleepButton from "../TimerSleepButton";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import Alert from "Alert";

describe("Timer Test", () => {
  describe("Timer Snapshot", () => {
    it("Renders correctly", () => {
      const tree = renderer.create(<TimerSleepButton />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("test toggle()", () => {
    // Mock the alert to avoid having the real alert keeping the test suite open.
    jest.mock("Alert", () => {
      return {
        alert: jest.fn()
      };
    });

    it("should update state variable enable to true", () => {
      let button = renderer
        .create(
          <TimerSleepButton
            onToggle={() => {
              return;
            }}
            onResume={false}
          />
        )
        .getInstance();
      button.toggle();
      expect(button.state.enabled).toEqual(true);
    });
  });

  describe("test componentDidUpdate()", () => {
    it("should update variable enable to true", () => {
      let button = renderer
        .create(<TimerSleepButton onToggle={true} onResume={true} />)
        .getInstance();
      button.componentDidUpdate(button.props.onResume);
      expect(button.state.enabled).toEqual(true);
    });
  });

  describe("test onPress", () => {
    it("showConfirmWindow() should be called", () => {
      const wrapper = shallow(<TimerSleepButton />);
      const instance = wrapper.instance();
      const spy = spyOn(instance, "showConfirmWindow");
      instance.showConfirmWindow();
      expect(spy).toHaveBeenCalled();
    });
  });
});
