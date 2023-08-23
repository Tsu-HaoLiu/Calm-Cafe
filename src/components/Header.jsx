import React, { useEffect, useState } from "react";

import { headphone } from "../assets";
import MuteButton from "../assets/MuteButton";
import PauseButton from "../assets/PauseButton";
import PlayButton from "../assets/PlayButton";
import { sendMessage, styles } from "../utils";
import eventBus from './EventBus';

const muteAll = () => {
    sendMessage({type: 'MUTE_ALL'});
    eventBus.emit('update');
}

const Header = () => {
    const [muteClick, setMuteClick] = useState(false)
    const [scrolled, setScrolled] = useState(false);
    const [paused, setPaused] = useState(true);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 100);

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll); 
    }, []);

    useEffect(() => {
        const pauseStatus = localStorage.getItem('paused');
        if (pauseStatus !== null) {
            setPaused(pauseStatus === 'true'); 
        }
    }, []);

    const handlePause = () => {
        paused ? sendMessage({type: 'PAUSE_ALL_AUDIO'}):
        sendMessage({type: 'PLAY_ALL_AUDIO'});

        // set pause button status to persist through extension unmounting.
        localStorage.setItem('paused', `${!paused}`);
        setPaused(!paused);
    }

    const handleMuteClick = () => {
        setMuteClick(!muteClick)
    }

    const buttonColor = muteClick ? '#c6c6c6' : '#ffffff'

    return (
        <nav
        className={'px-6 w-full flex items-center py-3 fixed top-0 bg-primary backdrop-blur-lg'}
        style={{ backgroundColor: `rgba(5, 8, 22, ${scrolled ? 0.3 : 0.2})` }}
        >
            <div className='w-full flex justify-between items-center max-w-7xl mx-auto gap-2'>
                <img src={headphone} alt='headphone-logo' className='w-9 h-9 object-contain' />
                <p className='text-white text-[18px] font-bold cursor-pointer flex '>
                    Calm Café Sounds
                </p>

                <div className='flex flex-1 justify-end items-center'>

                    <div 
                        className="w-8 h-7 object-contain cursor-pointer hover:scale-110 hover:fill-white" 
                        onClick={handlePause}
                    >
                        {paused ? <PauseButton /> : <PlayButton />}
                    </div>

                    <div 
                        className='w-8 h-7 object-contain cursor-pointer hover:scale-110'
                        onClick={() => {
                            handleMuteClick()
                            muteAll()
                        }}
                    >
                        <MuteButton fill={buttonColor}/>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
