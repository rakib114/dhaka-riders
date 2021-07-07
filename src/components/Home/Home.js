import React from 'react';
import './Home.css'
import { Card, Button } from 'react-bootstrap';
import image1 from '../../img/bike.png'
import image2 from '../../img/car.png'
import image3 from '../../img/bus (1).png'
import image4 from '../../img/train.png'
import NavBar from '../NavBar/NavBar';
import { useHistory } from 'react-router-dom';


const Home = () => {
    const history = useHistory()
    const handleProceedCheckOut = () => {
        history.push('/destination')
    }
    return (
        <div className="main-container">
            <NavBar></NavBar>
            <div className="container card-container">
                <div className="row">
                    <div className="col">
                        <Card style={{ width: '17rem', backgroundColor: '#ffffff85' }} className="text-center shadow p-3 mb-5 bg-body rounded">
                            <Card.Img variant="top" src={image1} height="160px" width="100px" />
                            <Card.Body>
                                <Card.Title>BIKE</Card.Title>
                                <Button style={{ background: '#ff6e40', border: 'none' }} variant="primary" onClick={handleProceedCheckOut} >Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col">
                        <Card style={{ width: '17rem' }} className="text-center shadow p-3 mb-5 bg-body rounded">
                            <Card.Img variant="top" src={image2} height="160px" width="100px" />
                            <Card.Body>
                                <Card.Title>CAR</Card.Title>
                                <Button style={{ background: '#ff6e40', border: 'none' }} variant="primary" onClick={handleProceedCheckOut} >Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col">
                        <Card style={{ width: '17rem' }} className="text-center shadow p-3 mb-5 bg-body rounded">
                            <Card.Img variant="top" src={image3} height="160px" width="100px" />
                            <Card.Body>
                                <Card.Title>BUS</Card.Title>
                                <Button style={{ background: '#ff6e40', border: 'none' }} variant="primary" onClick={handleProceedCheckOut} >Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col">
                        <Card style={{ width: '17rem' }} className="text-center shadow p-3 mb-5 bg-body rounded">
                            <Card.Img variant="top" src={image4} height="160px" width="100px" />
                            <Card.Body>
                                <Card.Title>TRAIN</Card.Title>
                                <Button style={{ background: '#ff6e40', border: 'none' }} variant="primary" onClick={handleProceedCheckOut} >Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;