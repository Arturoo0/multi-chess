

import { React, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    Form, FormGroup, Label
} from 'reactstrap';

const CreateCard = (props) => {
    const [joinRoomState, setJoinRoomState] = useState(null);
    const history = useHistory();
    const handleCreateSubmit = () => {
        history.push(`/playMatch`)
    }
    
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Create a Match</CardTitle>
                    <div style={{display : 'flex', justifyContent : 'center'}}>
                        <Button onClick={handleCreateSubmit}>Create</Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default CreateCard;