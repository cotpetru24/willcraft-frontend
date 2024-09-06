import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const TestatorCard = () => {

    const navigate = useNavigate();

    const [testatorInitialData, setTestatorInitialData] = useState({
        testatorTitle: '',
        testatorFullLegalName: '',
        testatorDob: '',
        testatorFullAddress: ''
    });

    const testatorData = useSelector(state => state.testator);
    const currentOrderStep = useSelector(state => state.currentOrderStep);
    const allNecessaryFieldsSpecified = currentOrderStep.currentStep >= 1;


    useEffect(() => {
        if (testatorData) {
            setTestatorInitialData({
                testatorTitle: testatorData.title || '',
                testatorFullLegalName: testatorData.fullLegalName || '',
                testatorDob: testatorData.dob || '',
                testatorFullAddress: testatorData.fullAddress || '',
            });
        }
    }, [testatorData]);


    return (
        <Container className="mb-5">
            <Card className="shadow" bg="light" text="dark">
                <Card.Body>
                    <Card.Title>
                        <Row>
                            <Col xs={10}>
                                <h2>About you</h2>
                            </Col>
                            <Col className="d-flex justify-content-end align-items-center">
                                {allNecessaryFieldsSpecified ? (
                                    <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'green' }} />
                                ) : (
                                    <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'grey' }} />
                                )}
                            </Col>
                        </Row>
                    </Card.Title>
                    {allNecessaryFieldsSpecified ? (
                        <>
                            <Card.Text as="div">
                                <Row>
                                    <Col>
                                        <p className="order-item-p">
                                            <span className="order-item-p-span">Name: </span>{testatorInitialData.testatorTitle} {testatorInitialData.testatorFullLegalName}
                                        </p>
                                        <p className="order-item-p">
                                            <span className="order-item-p-span">Date of birth: </span>{new Date(testatorInitialData.testatorDob).toLocaleDateString()}
                                        </p>
                                        <p className="order-item-p">
                                            <span className="order-item-p-span">Address: </span>{testatorInitialData.testatorFullAddress}
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="d-flex justify-content-end">
                                    <Col xs="auto">
                                        <Button variant="primary"
                                            onClick={() => navigate('/testator')}
                                            className="creating-order-tile-btns"
                                        >Edit</Button>
                                    </Col>
                                </Row>
                            </Card.Text>
                        </>
                    ) : (
                        <>
                            <Row>
                                <Col>
                                    <p>Tell us about you</p>
                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-end">
                                <Col xs="auto">
                                    <Button variant="primary"
                                        onClick={() => navigate('/testator')}
                                        className="creating-order-tile-btns"
                                    >Get Started</Button>
                                </Col>
                            </Row>
                        </>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}


export default TestatorCard;
