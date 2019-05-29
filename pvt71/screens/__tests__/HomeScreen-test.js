import "react-native";
import React from "react";
import HomeScreen  from "../HomeScreen";
import renderer from "react-test-renderer";

describe("Home screen test", () => {
    describe("Snapshot test", () => {
        it("renders correctly", () => {
        const tree = renderer.create(<HomeScreen />).toJSON();
        expect(tree).toMatchSnapshot();
        });
    });
});