import React from "react";
import HomeReview from "./HomeReview";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/esm/Container";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import HowDoesItWork from "./HowDoesItWork";
import 'bootstrap/dist/css/bootstrap.min.css';


// Home component for the landing page
const Home = () => {

    // Get the current user from the Redux state
    const { user } = useSelector(state => state.auth);

    return (
        <>
            <Container className="pt-5">
                <Row className="justify-content-center" >
                    <Col md={{ span: 4 }}>
                        <h1>Will writing made simple</h1>
                        {/* List of benefits using FontAwesome icons */}
                        <Container className="pt-3">
                            <h5><FontAwesomeIcon
                                icon={faCheckCircle}
                                className="custom-icon"
                                style={{ color: 'green' }} /> no appointments</h5>
                            <h5><FontAwesomeIcon
                                icon={faCheckCircle}
                                className="custom-icon"
                                style={{ color: 'green' }} /> no solicitors</h5>
                            <h5><FontAwesomeIcon
                                icon={faCheckCircle}
                                className="custom-icon"
                                style={{ color: 'green' }} /> step by Step guide</h5>
                            <h5><FontAwesomeIcon
                                icon={faCheckCircle}
                                className="custom-icon"
                                style={{ color: 'green' }} /> ready in 10 minutes</h5>
                            <h5><FontAwesomeIcon
                                icon={faCheckCircle}
                                className="custom-icon"
                                style={{ color: 'green' }} /> starting from £20</h5>
                        </Container>

                        {/* Conditional button rendering based on whether the user is logged in */}
                        <Row className="p-2 pt-3">
                            {user ? (
                                <Container>
                                    <Link to='/dashboard'>
                                        <Button
                                            className='mb-5'
                                            id="get-started-btn">
                                            Get Started
                                        </Button>
                                    </Link>
                                </Container>
                            ) : (
                                <Container>
                                    <Link to='/login'>
                                        <Button
                                            className='mb-5'
                                            id="get-started-btn">
                                            Get Started
                                        </Button>
                                    </Link>
                                </Container>
                            )}
                        </Row>
                    </Col>

                    {/* Hero image */}
                    <Col md={{ span: 8 }}>
                        <img src="/hero1.png" style={{ width: '100%' }} alt="Home" />
                    </Col>
                </Row>
            </Container>

            {/* Section for How It Works */}
            <Container className="mt-5">
                <Row className="pt-5 mb-5 section-header">
                    <Col>
                        <h2>How does it work</h2>
                    </Col>
                </Row>
                <HowDoesItWork />
            </Container>

            {/* Section for Testimonials */}
            <Container className="mb-5 mt-5">
                <Row className="pt-5 mb-3 section-header">
                    <Col>
                        <h2>Testimonials</h2>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <HomeReview />
                    </Col>
                </Row>
            </Container>
        </>
    );
}


export default Home;
