
const AudioRunner=()=>{
    let audioElements = {}; 

    const addAudio = (request) => {
        if(!audioElements[request.id]) {
            audioElements[request.id] = new Audio(request.src); 
            audioElements[request.id].loop = true;
            audioElements[request.id].id = request.id;
            audioElements[request.id].volume = request.volume / 100;
            audioElements[request.id].play();
        }
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
    
}