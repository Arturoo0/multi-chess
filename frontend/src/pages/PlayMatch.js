
import React, { useState, useEffect, useReducer } from "react";
import socketIOClient from "socket.io-client";
import Chessboard from "chessboardjsx";
import './CSS/PlayMatch.css';
import Chess from "chess.js";
import { MatchPanel } from "../components";

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
        'white' : 'w',
        'black' : 'b'
    };

    const baseStartingFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    const [userCount, setUserCount] = useState(0);
    const [currBoardPos, setBoardPosition] = useState(baseStartingFEN);
    const [currSocketConn, setSocket] = useState(0);
    const [roomName, setRoomName] = useState(0);
    const [localGameObj, setLocalGameObj] = useState(new Chess());
    const [localPlayerColor, setlocalPlayerColor] = useState();
    const [isDisconnected, setIsDisconnected] = useState(false);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        const SERVER = "http://localhost:3000/";
        const socket = socketIOClient(SERVER);
        setSocket(socket);

        socket.emit('joinRoom', pullURL().match);
        socket.on('connectedToRoom', (color) => {
            setlocalPlayerColor(color);
            setUserCount(userCount => userCount + 1);
        });

        socket.on('startGame', (numberOfMembers, boardPosition, roomID) => {
            setUserCount(numberOfMembers);
            setBoardPosition(boardPosition);
            setRoomName(roomID);
        });

        socket.on('playerDisconnect', () => {
            setUserCount(userCount => userCount - 1);
            setIsDisconnected(true);
        });

        socket.on('gameOver', (winner) => {
            setWinner(winner);
        });

        socket.on('updateBoard', (pos, pre, target) => {
            setBoardPosition(pos);
            localGameObj.move({
                from : pre,
                to : target
            });
        });
    }, []);

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
            <div style={
                {
                    textAlign : 'center',
                    display : 'flex'
                }
            }>
                <Chessboard 
                    position={currBoardPos}
                    allowDrag={drag => (
                        userCount === 2 
                        && colorMapper[localPlayerColor] == drag.piece.charAt(0)
                        && winner === null 
                    )}
                    onDrop={move => updateBoard(move)}
                    orientation={localPlayerColor}
                />
                <MatchPanel config={{
                    color : 'white',
                    connectedPlayers : userCount, 
                    inviteCode : currSocketConn.id,
                    _isDisconnected : isDisconnected,
                    _winner : winner 
                }}/>
            </div>
        </div>
    );
}

export default PlayMatch;