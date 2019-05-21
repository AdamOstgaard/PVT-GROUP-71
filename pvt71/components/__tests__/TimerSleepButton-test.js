import "react-native";
import React from "react";
import TimerSleepButton from "../TimerSleepButton";
import renderer from "react-test-renderer";

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
    it("should not update variable enable to true", () => {
      let button = renderer
        .create(<TimerSleepButton onToggle={true} onResume={true} />)
        .getInstance();
      button.componentDidUpdate(button.props.onResume);
      expect(button.state.enabled).toEqual(false);
    });
  });
});
