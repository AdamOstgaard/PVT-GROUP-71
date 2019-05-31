import "react-native";
import React from "react";
import HelpScreen  from "../HelpScreen";
import renderer from "react-test-renderer";

describe("Help Screen tests", () => {
    describe("Snapshot test", () => {
        it("renders correctly", () => {
        const tree = renderer.create(<HelpScreen />).toJSON();
        expect(tree).toMatchSnapshot();
        });
    });
});