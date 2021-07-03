
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Chessboard from "chessboardjsx";
import './CSS/PlayMatch.css';
const { Chess } = require('./chess.js')

const PlayMatch = () => {
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
    const [currBoardPos, setBoardPosition] = useState('');
    const [currSocketConn, setSocket] = useState(0);
    const [roomName, setName] = useState(0);
    const [localGameObj, setLocalGameObj] = useState(0);

    useEffect(() => {
        const SERVER = "http://localhost:3000/";
        const socket = socketIOClient(SERVER);
        setSocket(socket);
        socket.emit('joinRoom', urlParams.match);
        socket.on('connectedToRoom', (numberOfMembers, boardPosition, roomID) => {
            setUserCount(numberOfMembers);
            setBoardPosition(boardPosition);
            setName(roomID);
            if (numberOfMembers === 2){
                setLinkState(false);
                setLocalGameObj(new Chess())
            } 
            setSocketID(socket.id);
        });
        socket.on('updateBoard', (pos) => {
            setBoardPosition(pos);
        })
    }, []);

    const displayLink = () => {
        if (displayLinkState) return <p>Invite code - {socketID}</p>
    }

    const updateBoard = (position) => {
        currSocketConn.emit('moveMade', position, roomName);
    }

    return (
        <div id='play-match-container'>
            <div style={{backgroundColor : 'white', textAlign : 'center'}}>
                <Chessboard 
                    position={currBoardPos}
                    getPosition={position => updateBoard(position)}
                    allowDrag={() => (connectedUsers == 2)}
                />
                <p>Current room members - {connectedUsers}</p>
                {displayLink()}
            </div>
        </div>
    );
}

export default PlayMatch;