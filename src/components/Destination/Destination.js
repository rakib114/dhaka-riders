import React from 'react';
import { Container, Row, Col, } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
import { TextField, Button } from '@material-ui/core';
import './Destination.css'
import image from '../../img/Map.png'

const Destination = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Container className='mt-5'>
                <Row>
                    <Col className='detail-container' >
                        <TextField id="standard-basic" label="Pick From" />
                        <br />
                        <TextField id="standard-basic" label="Pick To" />
                        <Button
                            type="submit"
                            color="primary"
                            fullWidth
                            variant="contained"
                            style={{ margin: "20px 0px", background: "#ff6e40" }}
                        >
                            Sign Up
                        </Button>
                    </Col>
                    <Col>
                        <img src={image} alt="" />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Destination;