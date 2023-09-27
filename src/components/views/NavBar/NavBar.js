import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = () =>{
    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="mt-4 mb-4 rounded">
            <Container>
                <Nav.Link as={NavLink} to="/">
                    <Navbar.Brand>Waiter.app</Navbar.Brand>
                </Nav.Link>
                <Nav className="justify-content-end" >
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar;