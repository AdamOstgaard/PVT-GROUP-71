import 'react-native';
import React from 'react';
import { Timer } from '../Timer';
import renderer from 'react-test-renderer'
import { prependOnceListener } from 'cluster';

describe('Timer Test', () => {
    describe('Timer Snapshot', () =>{
        it('Renders correctly', () => {
            const tree = renderer.create(<Timer />).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
    
    describe('Timer start', () => {
        it('timer starts running', () => {
            let timerData = renderer.create(<Timer/>).getInstance();
            timerData.startTimer(10);
            expect(timerData.state.timerRunning).toEqual(true);
            expect(timerData.state.time).toEqual(10);
            timerData.stopTimer();
            expect(timerData.state.timerRunning).toEqual(false);
        });
    });

    describe('Timer pause', () => {
        it('pauses', () => {
            let timerData = renderer.create(<Timer/>).getInstance();
            timerData.startTimer(10);
            timerData.pauseTimer();
            expect(timerData.state.timerRunning).toEqual(false);
            expect(timerData.state.time).toEqual(10);
        });
    });

    describe('Timer Callback', () => {
        it('Calls callback on timer end', () => {
            let success = false;
            let timerData = renderer.create(<Timer callback={() => {
                success = true;}}/>).getInstance();
            timerData.startTimer(10);
            timerData.handleTick(99999);
            timerData.stopTimer();
            expect(success).toEqual(true);
            expect(timerData.state.timerRunning).toEqual(false);
        });
    });


    describe('Timer state', () => {
        it('Sets running state based on timer', () => {
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
            
            mockFn = jest.fn();
            let timerData = renderer.create(<Timer onReset={mockFn}/>).getInstance();
            timerData.startTimer();
            timerData.stopTimer();
            expect(timerData.state.timerRunning).toEqual(false);
            timerData.resetTimer();
            expect(timerData.state.timerRunning).toEqual(true);
            timerData.stopTimer();
            expect(timerData.state.timerRunning).toEqual(false);
        });
    });

    describe('Handle tick', () => {
        it('Stops timer when reached 0', () => {
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
