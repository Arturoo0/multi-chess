
import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Button';

const MatchPanel = (props) => {
    const styleConfig = {
        backgroundColor : props.config.color,
        display : 'flex',
        flexDirection : 'column'
    }

    const styleInnerPanelDiv = {
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'center',
    }

    const displayAwait = () => {
        if (props.connectedPlayers !== 2) 
            return (
                <div style={{styleInnerPanelDiv}}>
                    {
                        (props.config.connectedPlayers < 2) 
                        ? (
                            <div>
                                <Button size='sm' variant="primary" disabled>
                                    Waiting for player 
                                    <Badge bg="secondary">
                                        <Spinner animation="grow" />
                                    </Badge>
                                </Button>
                                <h6>Invite code - {props.config.inviteCode}</h6>
                            </div>
                        )
                        : null
                    }
                </div>
            ); 
        else return null;
    };
    
    return (
        <div style={styleConfig}>
            {displayAwait()}
            <div>
                Connected Users : {props.config.connectedPlayers}
            </div>
        </div> 
    );
}

export default MatchPanel; 