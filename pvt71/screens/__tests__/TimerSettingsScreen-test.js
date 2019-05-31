import "react-native";
import React from "react";
import TimerSettingsScreen  from "../TimerSettingsScreen";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

describe("Timer setting screen", () => {
    describe("Snapshot test", () => {
        it("renders correctly", () => {
        const tree = renderer.create(<TimerSettingsScreen />).toJSON();
        expect(tree).toMatchSnapshot();
        });
    });
});