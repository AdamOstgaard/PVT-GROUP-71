import "react-native";
import React from "react";
import  WizardWelcomeScreen  from "../WizardWelcomeScreen";
import renderer from "react-test-renderer";

describe("Wizard WelcomeScreen tests", () => {
    describe("Wizard WelcomeScreen tests", () => {
        it("renders correctly", () => {
        const tree = renderer.create(<WizardWelcomeScreen />).toJSON();
        expect(tree).toMatchSnapshot();
        });
    });
  
    
});