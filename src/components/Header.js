import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, Offcanvas, Button, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';


const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)


    const logoutfn = () => {
        dispatch(logout())
            .unwrap()
            .then(() => {
                dispatch(reset());
                localStorage.clear();
                navigate('/');
            })
            .catch((error) => {
                console.error('Logout failed:', error);
            });
    };


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <Container fluid className='main-header'>
                <Row className='text-start'>
                    <Col xs={4} className="d-flex align-items-center align-items-xs-end">
                        <Navbar.Brand className='me-auto'>
                            <Link to='/'>
                                <img id="header-logo" src='/logo-latest.png' alt='WillCraft Logo' />
                            </Link>
                        </Navbar.Brand>
                    </Col>
                    <Col>
                        {user ? (
                            <Row className='pt-3 text-end'>
                                <h5>Welcome back {user ? user.firstName : ''}!</h5>
                            </Row>
                        ) : null}
                        <Row>
                            {user ? (
                                <>
                                    <Navbar expand="lg" className="pb-2">
                                        <Container fluid className="justify-content-end">
                                            <Button variant="outline-primary"
                                                style={{ borderColor: 'rgba(255, 255, 255, 0.87)' }}
                                                onClick={handleShow} className="d-lg-none ">
                                                <span className="navbar-toggler-icon" style={{ backgroundColor: 'rgba(255, 255, 255, 0.87)' }}></span>
                                            </Button>
                                            <Navbar.Collapse className="d-none d-lg-flex justify-content-end">
                                                <Nav variant='underline' className="ms-auto">
                                                    <Nav.Item>
                                                        <LinkContainer to="/">
                                                            <Nav.Link className='header-nav-link'>Home</Nav.Link>
                                                        </LinkContainer>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <LinkContainer to="/aboutus">
                                                            <Nav.Link className='header-nav-link'>About us</Nav.Link>
                                                        </LinkContainer>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <LinkContainer to="/prices">
                                                            <Nav.Link className='header-nav-link'>Prices</Nav.Link>
                                                        </LinkContainer>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <LinkContainer to="/dashboard">
                                                            <Nav.Link className='header-nav-link'>My Wills</Nav.Link>
                                                        </LinkContainer>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <LinkContainer to="/myAccount">
                                                            <Nav.Link className='header-nav-link'>My Account</Nav.Link>
                                                        </LinkContainer>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link className='header-nav-link' onClick={logoutfn}>Logout</Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                            </Navbar.Collapse>

                                            <Offcanvas show={show} onHide={handleClose} placement="end" className="d-lg-none">
                                                <Offcanvas.Header closeButton>
                                                    <Offcanvas.Title>WillCraft</Offcanvas.Title>
                                                </Offcanvas.Header>
                                                <Offcanvas.Body>
                                                    <Nav className="flex-column">
                                                        <Nav.Item>
                                                            <LinkContainer to="/" onClick={handleClose}>
                                                                <Nav.Link>Home</Nav.Link>
                                                            </LinkContainer>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <LinkContainer to="/aboutus" onClick={handleClose}>
                                                                <Nav.Link>About us</Nav.Link>
                                                            </LinkContainer>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <LinkContainer to="/prices" onClick={handleClose}>
                                                                <Nav.Link>Prices</Nav.Link>
                                                            </LinkContainer>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <LinkContainer to="/dashboard" onClick={handleClose}>
                                                                <Nav.Link>My Wills</Nav.Link>
                                                            </LinkContainer>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <LinkContainer to="/myAccount" onClick={handleClose}>
                                                                <Nav.Link>My Account</Nav.Link>
                                                            </LinkContainer>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <Nav.Link onClick={() => { logoutfn(); handleClose(); }}>Logout</Nav.Link>
                                                        </Nav.Item>
                                                    </Nav>
                                                </Offcanvas.Body>
                                            </Offcanvas>
                                        </Container>
                                    </Navbar>
                                </>
                            ) : (
                                <>
                                    <Navbar expand="lg" className="pb-2">
                                        <Container fluid className="justify-content-end">
                                            <Button variant="outline-primary"
                                                style={{ borderColor: 'rgba(255, 255, 255, 0.87)' }}
                                                onClick={handleShow} className="d-lg-none ">
                                                <span className="navbar-toggler-icon" style={{ backgroundColor: 'rgba(255, 255, 255, 0.87)' }}></span>
                                            </Button>
                                            <Navbar.Collapse className="d-none d-lg-flex justify-content-end">
                                                <Nav variant='underline' className="ms-auto">
                                                    <Nav.Item>
                                                        <LinkContainer to="/">
                                                            <Nav.Link className='header-nav-link'>Home</Nav.Link>
                                                        </LinkContainer>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <LinkContainer to="/aboutus">
                                                            <Nav.Link className='header-nav-link'>About us</Nav.Link>
                                                        </LinkContainer>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <LinkContainer to="/prices">
                                                            <Nav.Link className='header-nav-link'>Prices</Nav.Link>
                                                        </LinkContainer>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <LinkContainer to="/login">
                                                            <Nav.Link className='header-nav-link'>Login</Nav.Link>
                                                        </LinkContainer>
                                                    </Nav.Item>
                                                </Nav>
                                            </Navbar.Collapse>

                                            <Offcanvas show={show} onHide={handleClose} placement="end" className="d-lg-none">
                                                <Offcanvas.Header closeButton>
                                                    <Offcanvas.Title>WillCraft</Offcanvas.Title>
                                                </Offcanvas.Header>
                                                <Offcanvas.Body >
                                                    <Nav className="flex-column">
                                                        <Nav.Item>
                                                            <LinkContainer to="/" onClick={handleClose}>
                                                                <Nav.Link >Home</Nav.Link>
                                                            </LinkContainer>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <LinkContainer to="/aboutus" onClick={handleClose}>
                                                                <Nav.Link >About us</Nav.Link>
                                                            </LinkContainer>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <LinkContainer to="/prices" onClick={handleClose}>
                                                                <Nav.Link >Prices</Nav.Link>
                                                            </LinkContainer>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <LinkContainer to="/login" onClick={handleClose}>
                                                                <Nav.Link >Login</Nav.Link>
                                                            </LinkContainer>
                                                        </Nav.Item>
                                                    </Nav>
                                                </Offcanvas.Body>
                                            </Offcanvas>
                                        </Container>
                                    </Navbar>
                                </>
                            )}
                        </Row>
                    </Col>
                </Row>
            </Container >
        </>
    )
}


export default Header;