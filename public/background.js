
let audioElements = {}; 

const addAudio = (request) => {
    audioElements[request.id] = new Audio(request.src); 
    audioElements[request.id].loop = true;
    audioElements[request.id].id = request.id;
    audioElements[request.id].volume = request.volume / 100;
    audioElements[request.id].play();
}

const getAudioInfo = (request) => {
    const sound = audioElements[request.id];
    return sound ? {
        type: 'REPLY_GET_AUDIO',
        id: sound.id,
        volume: Math.round(sound.volume * 100),
    } : undefined; 
}

const getAllAudio = () => {
    return audioElements;
}

const removeAudio = (request) => {
    if(audioElements[request.id]) {
        audioElements[request.id].pause();
        delete audioElements[request.id]; 
    }
}

const playAudio = (request) => {
    if(audioElements[request.id]) {
        audioElements[request.id].play();
    }
}

const playAllAudio = () => {
    for (var key in audioElements) { 
        playAudio({id: key});
    }
}

const pauseAudio = (request) => {
    if(audioElements[request.id]) {
        audioElements[request.id].pause(); 
    }
}

const pauseAllAudio = () => {
    for (var key in audioElements) { 
        pauseAudio({id: key});
    }
}

const setVolume = (request) => {
    if(audioElements[request.id]) {
        audioElements[request.id].volume = request.volume / 100;
        request.volume > 0 ? playAudio(request) : pauseAudio(request)
    }
}

const muteAll = () => {
    for (var key in audioElements) { 
        setVolume({id: key, volume: 0});
    }
}

const handlers = {
    'ADD_AUDIO': addAudio,
    'GET_AUDIO': getAudioInfo,
    'GET_ALL_AUDIO': getAllAudio,
    'REMOVE_AUDIO': removeAudio,
    'PLAY_AUDIO': playAudio,
    'PLAY_ALL_AUDIO': playAllAudio,
    'PAUSE_AUDIO': pauseAudio,
    'PAUSE_ALL_AUDIO': pauseAllAudio,
    'SET_VOLUME': setVolume,
    'MUTE_ALL': muteAll,
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log('heard on background:', request); // For debugging

    try {
        const status = handlers[request.type](request);
        sendResponse(status);
    } catch (err) {
        console.warn(err);
        sendResponse({error: err.message});
    }
    
});
