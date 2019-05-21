import "react-native";
import React from "react";
import TimerSleepButton from "../TimerSleepButton";
import renderer from "react-test-renderer";
import Alert from "react-native";
import { create } from "react-test-renderer";

describe("Timer Test", () => {
  describe("Timer Snapshot", () => {
    it("Renders correctly", () => {
      const tree = renderer.create(<TimerSleepButton />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("test toggle()", () => {
    it("should update state variable enable to true", () => {
      let button = renderer
        .create(
          <TimerSleepButton
            onToggle={enabled => console.log(enabled)}
            onResume={resume => console.log(resume)}
          />
        )
        .getInstance();
      button.toggle();
      expect(button.state.enabled).toEqual(true);
    });
  });

 // describe("test componentDidUpdate()", () => {
  //  it("should not update variable enable to true", () => {
  //    let button = renderer
  //      .create(<TimerSleepButton onToggle={true} onResume={true} />)
  //      .getInstance();
  //    button.componentDidUpdate(button.props.onResume);
  //    expect(button.state.enabled).toEqual(false);
  //  });
 // });
});
