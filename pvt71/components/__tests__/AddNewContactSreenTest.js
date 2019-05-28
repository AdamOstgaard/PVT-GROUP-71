import "react-native";
import React from "react";
import SettingsScreen  from "../AddNewContactScreen";
import renderer from "react-test-renderer";

describe("Wizard Verify Add Contact Screen tests", () => {
    describe("Snapshot test", () => {
        it("renders correctly", () => {
        const tree = renderer.create(<AddNewContactScreen />).toJSON();
        expect(tree).toMatchSnapshot();
        });
    });

    describe("Test onPress", () => {
        it("should call onPress", () => {
          let mockFn = jest.fn();
          AddNewContactScreen.prototype.handlePress = mockFn;
          let wrapper = shallow(<AddNewContactScreen />);
          wrapper
            .find("Button")
            .props()
            .onPress();
          expect(mockFn).toHaveBeenCalled();
          expect(mockFn).toHaveBeenCalledTimes(1);
        });
      });
    });

