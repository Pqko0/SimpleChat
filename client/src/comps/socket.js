import { io } from 'socket.io-client';

const URL = 'http://localhost:81';

export const socket = io(URL);