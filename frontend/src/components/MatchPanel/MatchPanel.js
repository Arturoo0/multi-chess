
import React, { useState } from 'react';

const MatchPanel = (props) => {
    return (
        <div style={{backgroundColor : props.config.color}}>
            Connected Users : {props.config.connectedPlayers}
        </div> 
    );
}

export default MatchPanel; 