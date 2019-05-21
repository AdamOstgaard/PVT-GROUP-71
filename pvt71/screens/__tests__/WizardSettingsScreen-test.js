import "react-native";
import React from "react";
import  WizardSettingsScreen  from "../WizardSettingsScreen";
import renderer from "react-test-renderer";

describe("Wizard Setting Screen tests", () => {
    describe("Snapshot test", () => {
        it("renders correctly", () => {
        const tree = renderer.create(<WizardSettingsScreen />).toJSON();
        expect(tree).toMatchSnapshot();
        });
    });
});