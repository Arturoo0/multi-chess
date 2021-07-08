
import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { Reception4 } from 'react-bootstrap-icons';
import { CardTitle } from 'reactstrap';

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
                        (props.config.connectedPlayers < 2 && !props.config._isDisconnected) 
                        ? (
                            <div>
                                <Card className='mb-2' body>
                                    <div style={{styleInnerPanelDiv}}>
                                        <div style={{marginBottom : '10px'}}>
                                            <Button size='md' variant="primary" disabled>
                                                Waiting for player 
                                                <Button bg="secondary" disabled>
                                                    <Spinner animation="grow" />
                                                </Button>
                                            </Button>
                                        </div>
                                        <div>
                                            <Badge style={{fontSize : '1rem'}} variant="success" disabled>
                                                Invite code: <Badge bg="secondary">
                                                    {props.config.inviteCode}
                                                </Badge>
                                            </Badge>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        )
                        : null
                    }
                </div>
            ); 
        return null;
    };

    const displayPlayerDisconnect = () => {
        if (props.config._isDisconnected){
            return (
                <div> 
                    <Card className='mb-2' body>
                        <Button size='md' variant="danger" disabled>
                            Opponent has disconnected
                        </Button>
                    </Card>
                </div>
            ); 
        }
        return null;
    }   

    const displayConnected = () => {
        if (props.config.connectedPlayers === 2 && props.config._winner === null){
            props.config.color = 'transparent';
            return (
                <div style={{marginTop : 'auto'}}>
                    <Button style={{opacity : '1'}} variant='success' disabled>
                        <Reception4 size={32}/>
                    </Button>
                </div>
            );
        }
        return null;
    }

    const displayWinner = () => {
        if (props.config._winner !== null){
            props.config.color = 'white';
            return (
                <div style={{justifyContent : 'center'}}>
                    <Card style={{ width: '10rem', padding : '7px'}}>
                        <CardTitle style={{
                            fontWeight : '600', 
                            fontSize : '1.4rem',
                            opacity : '.9'
                        }}>Game over</CardTitle>
                        <Badge style={{fontSize : '.9rem'}} variant="success" disabled>
                            <Badge style={{fontSize : '.9rem'}}>
                                {props.config._winner.toUpperCase() + ' wins'}
                            </Badge>
                        </Badge>
                    </Card>
                </div> 
            );
        }
        
    }
    
    return (
        <div style={styleParentContainer}>
            {displayAwait()}
            {displayPlayerDisconnect()}
            {displayConnected()}
            {displayWinner()}
        </div> 
    );
}

export default MatchPanel; 