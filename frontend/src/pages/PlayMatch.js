
import React, { useState, useEffect } from "react";
import { Board } from '../components';
import socketIOClient from "socket.io-client";

const PlayMatch = () => {
    const [connectedUsers, setUserCount] = useState(0);
    const [displayLinkState, setLinkState] = useState(true);
    const [socketID, setSocketID] = useState(0);
    useEffect(() => {
        const SERVER = "http://localhost:3000/";
        const socket = socketIOClient(SERVER);
        // socket.emit('testCom', 'testMsg');
        socket.emit('joinRoom');
        socket.on('connectedToRoom', (numberOfMembers) => {
            setUserCount(numberOfMembers);
            if (numberOfMembers === 2) setLinkState(false);
        });
        setSocketID(socket.id);
    }, []);

    const displayLink = () => {
        if (displayLinkState) return <p>Invite link</p>
    }

    return (
        <div>
            <p>Current room members - {connectedUsers}</p>
            {displayLink()}
            <Board boardFEN={'2R5/4bppk/1p1p3Q/5R1P/4P3/5P2/r4q1P/7K b - - 6 50'}/>
        </div>
    );
}

export default PlayMatch;