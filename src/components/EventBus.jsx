import { EventEmitter } from 'events';
import { audios } from "../constants";

const eventBus = new EventEmitter()

// Update max listeners to the length of the audios.
// We don't do infinite because it prevents us from 
// being warned if a resource leakage occurs
eventBus.setMaxListeners(audios.length);

export default eventBus;