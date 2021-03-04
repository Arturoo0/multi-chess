
import React, { useState, useEffect } from "react";
import { Board } from '../components';
import socketIOClient from "socket.io-client";

const PlayMatch = () => {
    const SERVER = "http://localhost:3000/";

    useEffect(() => {
        const socket = socketIOClient(SERVER);
        socket.on("connection", () => {
          console.log(socket.id);
        });
    }, []);

    return (
        <div>
            <Board />
        </div>
    );
}

export default PlayMatch;