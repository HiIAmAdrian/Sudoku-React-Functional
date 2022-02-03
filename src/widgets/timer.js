import React, {useState, useEffect} from 'react';
import { secondsToTime } from './helper';

function Timer(props) {
    let { gameState, timeIsFinished, timeLimit } = props;
    let [seconds, setSeconds] = useState(300);

    useEffect(() => {
        let timer;

        if (gameState === "RUN"){
            timer = setInterval(() => {
                setSeconds((seconds) => seconds - 1);
            }, 1000);
        } else if ( gameState === "LOST" || gameState === "PAUSE"){
                clearInterval(timer);
        } else if (gameState === "RESET"){
            clearInterval(timer);
            setSeconds(timeLimit * 60 - 1);
        }
        if (gameState === "RUN" && seconds === 0){
            clearInterval(timer);
            timeIsFinished();
        }

        return () => clearInterval(timer);
    }, [gameState, seconds, timeIsFinished, timeLimit]);
    
    return (<p className='time-left'>Time left: {secondsToTime(seconds)}</p>);
}

export default Timer;