
import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

const MatchPanel = (props) => {
    const styleParentContainer = {
        backgroundColor : props.config.color,
        display : 'flex',
        flexDirection : 'column', 
        padding : '10px 10px',
        borderRadius : '0 5px 5px 0'
    }

    const styleInnerPanelDiv = {
        display : 'flex',
        flexDirection : 'column',
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
                                <Card className='mb-2' body>
                                    <Button size='md' variant="primary" disabled>
                                        Waiting for player 
                                        <Button bg="secondary" disabled>
                                            <Spinner animation="grow" />
                                        </Button>
                                    </Button>
                                </Card>
                                <Badge style={{fontSize : '1rem'}} variant="success" disabled>
                                    Invite code: <Badge bg="secondary">
                                        {props.config.inviteCode}
                                    </Badge>
                                </Badge>
                            </div>
                        )
                        : null
                    }
                </div>
            ); 
        else return null;
    };
    
    return (
        <div style={styleParentContainer}>
            {displayAwait()}
            <div>
                Connected Users : {props.config.connectedPlayers}
            </div>
        </div> 
    );
}

export default MatchPanel; 