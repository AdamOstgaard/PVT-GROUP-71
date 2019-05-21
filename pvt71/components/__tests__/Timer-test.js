import 'react-native';
import React from 'react';
import { Timer } from '../Timer';
import renderer from 'react-test-renderer'

describe('Timer Test', () => {
    describe('Timer Snapshot', () =>{
        it('Renders correctly', () => {
            const tree = renderer.create(<Timer />).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
    
    describe('Timer start', () => {
        it('timer start successful', () => {
            let timerData = renderer.create(<Timer/>).getInstance();
            timerData.startTimer(10);
            expect(timerData.state.timerRunning).toEqual(true);
            expect(timerData.state.time).toEqual(10);
            timerData.stopTimer();
        });
    });

    describe('Timer pause', () => {
        it('Timer stop successful', () => {
            let timerData = renderer.create(<Timer/>).getInstance();
            timerData.startTimer(10);
            timerData.pauseTimer();
            expect(timerData.state.timerRunning).toEqual(false);
            expect(timerData.state.time).toEqual(10);
        });
    });

    describe('Callback works correctly', () => {
        it('Calls callback on timer end', () => {
            let success = false;
            let timerData = renderer.create(<Timer callback={() => {
                console.log('Test');
                success = true;}}/>).getInstance();
            timerData.startTimer(10);
            timerData.handleTick(99999);
            expect(success).toEqual(true);
        });
    });


    describe('Timer state', () => {
        it('state correct', () => {
            let timerData = renderer.create(<Timer/>).getInstance();
            timerData.startTimer(10);
            expect(timerData.state.timerRunning).toEqual(true);
            timerData.pauseTimer();
            expect(timerData.state.timerRunning).toEqual(false);
            timerData.startTimer(10);
            expect(timerData.state.timerRunning).toEqual(true);
            timerData.stopTimer();
            expect(timerData.state.timerRunning).toEqual(false);
        });
    });

    describe('resetTimer', () => {
        it('resetTimer works correctly', () => {
            let timerData = renderer.create(<Timer/>).getInstance();
            timerData.startTimer();
            timerData.stopTimer();
            expect(timerData.state.timerRunning).toEqual(false);
            timerData.resetTimer();
            expect(timerData.state.timerRunning).toEqual(true);
            timerData.stopTimer();
        });
    });

    describe('Handle tick', () => {
        it('Handles tick correctly', () => {
            let timerData = renderer.create(<Timer/>).getInstance();
            timerData.startTimer(1100);
            timerData.handleTick(1000);
            expect(timerData.state.time).toEqual(100);
            timerData.handleTick(100);
            timerData.handleTick(1000);
            expect(timerData.state.timerRunning).toEqual(false);
        });
    });

});