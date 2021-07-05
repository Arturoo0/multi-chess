
import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const MatchPanel = (props) => {
    return (
        <div style={{backgroundColor : props.config.color}}>
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
            Connected Users : {props.config.connectedPlayers}
        </div> 
    );
}

export default MatchPanel; 