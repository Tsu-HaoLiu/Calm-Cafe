import React, { useEffect, useState } from "react";

import { play, pause, mute, headphone } from "../assets";
import { sendMessage, styles } from "../utils";
import eventBus from './EventBus';

const muteAll = () => {
    sendMessage({type: 'MUTE_ALL'});
    eventBus.emit('update');
}

const Header = () => {
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
                    <img
                        src={paused ? pause : play}
                        alt='pause-button'
                        className='w-8 h-7 object-contain cursor-pointer hover:scale-110 hover:fill-white'
                        onClick={handlePause}
                    />

                    <img
                        src={mute}
                        alt='mute-button'
                        className='w-8 h-7 object-contain cursor-pointer hover:scale-110 hover:fill-white'
                        onClick={muteAll}
                    />
                </div>
            </div>
        </nav>
    );
};

export default Header;
