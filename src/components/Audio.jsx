import React, { useState, useEffect } from 'react'

import { volumeStyle, sendMessage } from "../utils";
import { audios, domain } from "../constants";
import eventBus from './EventBus';


const AudioCard = ({ id, title, icon }) => {
    const [volume, setVolume] = useState(0);
    const [audioStatus, setAudioStatus] = useState(false); // used to prevent duplicate AudioPlayers in background

    const gradientStops = volumeStyle(volume);

    // Handle mute event from Header and set all volumes to 0
    useEffect(() => {
        eventBus.on('update', () => setVolume(0));
        return () => eventBus.removeAllListeners();
    }, []);

    useEffect(() => {
        // On mount check if audio exists 
        sendMessage({
            type: 'GET_AUDIO',
            id,
        }).then(res => {
            // Add volume display if audio exists
            if (res) {
                setVolume(res.volume);
                setAudioStatus(true);
            }
        }).catch((e) => {
            console.warn(e);
        });
    }, []);

    const fetchAudio = (vol) => {
        // check if audio exists. if not, play audio.
        sendMessage({
            type: 'GET_AUDIO',
            id, 
        }).then((res) => {
            setAudioStatus(true);
            if (res === undefined || res == null || res.length <= 0) {
                sendMessage({
                    type: 'ADD_AUDIO',
                    id, 
                    src: `${domain}/${id}.mp3`,
                    volume: vol,
                });
            }
        }).catch((e) => {
            console.warn(e);
        });
    }

    const handleAudioVolume = (event) => {
        const newVolume = Math.max(event.target.value, 0);
        setVolume(newVolume);

        !audioStatus ? 
        fetchAudio(newVolume) : 
        sendMessage({
            type: 'SET_VOLUME',
            id,
            volume: newVolume,
        });
    }

    return (
        <div className="w-1/2 p-2 grow shrink basis-4">
            <p className='whitespace-nowrap'>{title} {volume > 0 && volume}</p>
            
            <input 
            className="w-[100px] mx-auto my-0 rounded-2xl bg-gray-600"
            style={{background: gradientStops}}
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={handleAudioVolume}
            />

        </div>
    );
}


const AudioPlayer = () => {
    return (
      <>
        <div className='m-10 mt-20 flex flex-wrap gap-10 md:gap-6'>
          {audios.map((sound, index) => (
            <AudioCard title={sound.name} id={sound.id} key={index} {...sound} />
          ))}
        </div>
      </>
    );
};
  
export default AudioPlayer;
