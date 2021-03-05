
import React, { useState, useEffect } from "react";
import { Board } from '../components';
import socketIOClient from "socket.io-client";

const PlayMatch = () => {
    const [connectedUsers, setUserCount] = useState(0);
    useEffect(() => {
        const SERVER = "http://localhost:3000/";
        const socket = socketIOClient(SERVER);
        // socket.emit('testCom', 'testMsg');
        socket.emit('joinRoom');
        socket.on('connectedToRoom', (numberOfMembers) => {
            console.log('returnedValue', numberOfMembers)
            setUserCount(numberOfMembers);
        });
    }, []);

    return (
        <div>
            <p>Current room members - {connectedUsers}</p>
            <Board boardFEN={'2R5/4bppk/1p1p3Q/5R1P/4P3/5P2/r4q1P/7K b - - 6 50'}/>
        </div>
    );
}

export default PlayMatch;