
import React, { useState, useEffect } from "react";
import { Board } from '../components';
import socketIOClient from "socket.io-client";

const PlayMatch = () => {
    useEffect(() => {
        const SERVER = "http://localhost:3000/";
        const socket = socketIOClient(SERVER);
        socket.emit('testCom', 'testMsg');
    }, []);

    return (
        <div>
            <Board />
        </div>
    );
}

export default PlayMatch;