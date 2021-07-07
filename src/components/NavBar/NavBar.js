import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const NavBar = () => {
    const navLogin = {
        background: '#ff6e40',
        color: 'white',
        width: "100px",
        textAlign: 'center',
        borderRadius: '5px'
    }
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/home" >Dhaka Riders</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/home" eventKey={2}>Home</Nav.Link>
                            <Nav.Link eventKey={2} href="/destination">
                                Destination
                            </Nav.Link>
                            <Nav.Link href="/blog" eventKey={2}>Blog</Nav.Link>
                        </Nav>
                        <Nav.Link href="/login" style={navLogin} >Login</Nav.Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavBar;