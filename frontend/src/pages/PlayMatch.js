
import React, { useState, useEffect } from "react";
import { Board } from '../components';
import socketIOClient from "socket.io-client";

const PlayMatch = () => {
    // maybe move this over into a utility folder
    const pullURL = () => {
        const windowUrl = window.location.search;
        const params = new URLSearchParams(windowUrl);
        let paramObj = {};
        for (let p of params){
            paramObj[p[0]] = p[1];
        }
        return paramObj
    }

    const [connectedUsers, setUserCount] = useState(0);
    const [displayLinkState, setLinkState] = useState(true);
    const [socketID, setSocketID] = useState(0);
    const [urlParams, setParams] = useState(pullURL());

    useEffect(() => {
        const SERVER = "http://localhost:3000/";
        const socket = socketIOClient(SERVER);
        socket.emit('joinRoom', urlParams.match);
        socket.on('connectedToRoom', (numberOfMembers) => {
            setUserCount(numberOfMembers);
            if (numberOfMembers === 2) setLinkState(false);
            setSocketID(socket.id);
        });
    }, []);

    const displayLink = () => {
        if (displayLinkState) return <p>Invite link - localhost:3001/playMatch?match={socketID}</p>
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