
import { React, useRef } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    Form, FormGroup, Label
} from 'reactstrap';
import './JoinCard.css';

const JoinCard = () => {
    const inputLobbyRef = useRef(null);
    const handleJoinSubmit = () => {
        // check backend for existing lobby
        // lobby does not exist display alert message
        window.alert('No such lobby exists.');
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
                            <input ref={inputLobbyRef} placeholder="Lobby URL"></input>
                        </FormGroup>
                        <Button onClick={handleJoinSubmit}>Submit</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}

export default JoinCard;