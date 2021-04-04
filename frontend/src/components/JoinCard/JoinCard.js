
import { React, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    Form, FormGroup, Label
} from 'reactstrap';
import './JoinCard.css';

const JoinCard = (props) => {
    const [joinRoomState, setJoinRoomState] = useState(null);
    const history = useHistory();
    const handleJoinSubmit = () => {
        axios.get(`http://localhost:3000/doesRoomExist?roomID=${joinRoomState}`)
        .then(res => {
            if (res.data === 0) window.alert('No such lobby exists.');
            else history.push(`playMatch?match=${joinRoomState}`)
        })
    }
    
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Join a Match</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">Join an existing lobby</CardSubtitle>
                    <CardText>Paste the given URL into the browser or provided box.</CardText>
                    <Form inline id='form-submit-container'>
                        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                            <input 
                                placeholder="Lobby URL"
                                onChange={event => setJoinRoomState(event.target.value)}
                            ></input>
                        </FormGroup>
                        <Button onClick={handleJoinSubmit}>Submit</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}

export default JoinCard;