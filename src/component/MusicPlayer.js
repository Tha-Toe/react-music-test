import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBackwardStep,faPlay,faPause,faForwardStep} from '@fortawesome/free-solid-svg-icons'
import MusicMap from "./MusicMap";

function MusicPlayer () {

    const audioEl = useRef(null);
    const [song] = useState([
        {id: 1 , src : "https://github.com/Tha-Toe/Tha-Toe/raw/main/track1.mp3", title : "Attention"},
        {id: 2 , src : "https://github.com/Tha-Toe/Tha-Toe/raw/main/track2.mp3", title : "I need you baby"},
        {id: 3 , src : "https://github.com/Tha-Toe/Tha-Toe/raw/main/track3.mp3", title : "Talking to the Moon"},
        {id: 4 , src : "https://github.com/Tha-Toe/Tha-Toe/raw/main/track4.mp3", title : "Bella Porah Build a bitch.."},
        {id: 5 , src : "https://github.com/Tha-Toe/Tha-Toe/raw/main/track5.mp3", title : "Image dragon Believer"},
    ])
    const [isPlaying,setIsPlaying] = useState(false);
    const [currentPlayingIndex,setCurrentPlayingIndex] = useState(1);
    const [duration,setDuration] = useState("");
    const [currentTime,setCurrentTime] = useState("00:00");
    const [currentProgressWidth,setCurrentProgressWidth] = useState("0px");
    const [totalSecondsForProgress,setTotalSecondsForProgress] = useState("");

    
    const getDurationSeconds = (e) => {
        const totalSeconds = Math.floor(e.duration);
        setTotalSecondsForProgress(totalSeconds);
        const totalTime = createMinutesAndSecondsText(totalSeconds);
        setDuration(totalTime);
    }
    
    const getCurrentDuration = (e) => {
        const currentSeconds = Math.floor(e.currentTarget.currentTime);
        const currentTotalSeconds = createMinutesAndSecondsText(currentSeconds);
        setCurrentTime(currentTotalSeconds);
        currentProgressPx(currentSeconds);
    }


    const currentProgressPx = (currentSeconds) => { 
        const currentAmount = (400 / totalSecondsForProgress) * currentSeconds;
        const currentPx = currentAmount + "px";
        setCurrentProgressWidth(currentPx);
    }

    const createMinutesAndSecondsText = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds /60);
        const seconds = Math.floor(totalSeconds %60);

        const minutesText = minutes <10 ? "0" + minutes.toString() : minutes;
        const secondsText = seconds <10? "0" + seconds.toString() : seconds;

        return minutesText + ":" + secondsText
    }

    const playSong = (id) => {
        setCurrentPlayingIndex(id);
        setIsPlaying(true);
    }

    const skipSong = (forward) => {
        if(forward) {
            setCurrentPlayingIndex (() => {
                let temp = currentPlayingIndex;
                temp ++;
                if(temp > song.length) {
                    temp = 1;
                }
                return temp;
            })
        } else {
            setCurrentPlayingIndex (() => {
                let temp = currentPlayingIndex;
                temp --;
                if(temp < 1) {
                    temp = song.length;
                }
                return temp;
        })
    }
}


    useEffect (() => {
        if(isPlaying) {
            audioEl.current.play();
        } else {
            audioEl.current.pause();
        }
    })

    return (
        <div className="container">
            <div className="songContainer">
            {song.map((music) => <MusicMap key = {music.id} id = {music.id} title = {music.title} playSong = {playSong}/>)}
            </div>
            <audio src = {song[currentPlayingIndex-1].src} 
                    ref = {audioEl}
                    onLoadedData = {(e) => {
                        getDurationSeconds(e.currentTarget)
                    }}
                    onTimeUpdate = {getCurrentDuration}>
                    </audio>
            
            <div className="currentTime">{currentTime}/{duration}</div>
            
            <div className="progressBar">
                <div className="currentProgressBar"
                    style={{width: `${currentProgressWidth}`}}
                ></div>
            </div>

            <div className="controls">
            <FontAwesomeIcon icon={faBackwardStep} className="button" onClick={() => skipSong(false)}/>
            {isPlaying !== true?  <FontAwesomeIcon icon={faPlay} className="button" onClick = {() => setIsPlaying(true)}/> : <FontAwesomeIcon icon={faPause} className="button" onClick = {() => setIsPlaying(false)}/>}
            
            <FontAwesomeIcon icon={faForwardStep} className="button" onClick={() => skipSong(true)}/>
            </div>
        </div>
    )
}

export default MusicPlayer;