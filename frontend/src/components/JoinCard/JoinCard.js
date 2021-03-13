
import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    Form, FormGroup, Label, Input
} from 'reactstrap';
import './JoinCard.css';

const JoinCard = () => {
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Join a Match</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">Join an existing lobby</CardSubtitle>
                    <CardText>Paste the given URL into the browser or provided box.</CardText>
                    <Form inline id='form-submit-container'>
                        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                            <Input type="password" name="password" id="examplePassword" placeholder="Lobby URL" />
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}

export default JoinCard;