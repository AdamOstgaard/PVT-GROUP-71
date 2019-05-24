import "react-native";
import React from "react";
import  WizardVerifyContactScreen  from "../WizardVerifyContactScreen";
import renderer from "react-test-renderer";

describe("Wizard Verify Contact Screen tests", () => {
    describe("Snapshot test", () => {
        it("renders correctly", () => {
        const tree = renderer.create(<WizardVerifyContactScreen />).toJSON();
        expect(tree).toMatchSnapshot();
        });
    });
});