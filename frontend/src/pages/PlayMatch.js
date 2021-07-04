
import React, { useState, useEffect, useReducer } from "react";
import socketIOClient from "socket.io-client";
import Chessboard from "chessboardjsx";
import './CSS/PlayMatch.css';
import Chess from "chess.js";

const PlayMatch = () => {
    const pullURL = () => {
        const windowUrl = window.location.search;
        const params = new URLSearchParams(windowUrl);
        let paramObj = {};
        for (let p of params){
            paramObj[p[0]] = p[1];
        }
        return paramObj
    };

    const colorMapper = {
        'white' : 'wP',
        'black' : 'bP'
    };

    const baseStartingFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    const [userCount, setUserCount] = useState(0);
    const [currBoardPos, setBoardPosition] = useState(baseStartingFEN);
    const [currSocketConn, setSocket] = useState(0);
    const [roomName, setName] = useState(0);
    const [localGameObj, setLocalGameObj] = useState(new Chess());
    const [localPlayerColor, setlocalPlayerColor] = useState();

    useEffect(() => {
        const SERVER = "http://localhost:3000/";
        const socket = socketIOClient(SERVER);
        setSocket(socket);
        socket.emit('joinRoom', pullURL().match);
        socket.on('connectedToRoom', (color) => {
            setlocalPlayerColor(color);
            setUserCount(userCount + 1);
        });
        socket.on('startGame', (numberOfMembers, boardPosition, roomID) => {
            setUserCount(numberOfMembers);
            setBoardPosition(boardPosition);
            setName(roomID);
        })
        socket.on('updateBoard', (pos, pre, target) => {
            setBoardPosition(pos);
            localGameObj.move({
                from : pre,
                to : target
            });
        })

        return () => {
            socket.disconnect();
        }
    }, []);

    const displayLink = () => {
        if (userCount !== 2) return <p>Invite code - {currSocketConn.id}</p>
        else return null;
    };

    const updateBoard = (move) => {
        currSocketConn.emit(
            'moveMade', 
            move.sourceSquare, 
            move.targetSquare, 
            roomName
        ); 
    }

    return (
        <div id='play-match-container'>
            <div style={{backgroundColor : 'white', textAlign : 'center'}}>
                <Chessboard 
                    position={currBoardPos}
                    allowDrag={drag => (userCount === 2)}
                    onDrop={move => updateBoard(move)}
                    orientation={localPlayerColor}
                />
                <p>Current room members - {userCount}</p>
                {displayLink()}
            </div>
        </div>
    );
}

export default PlayMatch;