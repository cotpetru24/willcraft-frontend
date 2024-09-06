import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from "react";
import styles from "../../../common/styles";


const KidsCard = () => {

    const navigate = useNavigate();
    const testator = useSelector(state => state.testator)
    const kidsData = useSelector(state => state.kids);
    const currentOrderStep = useSelector(state => state.currentOrderStep);
    const allNecessaryFieldsSpecified = currentOrderStep.currentStep >= 3;


    return (
        <>
            <Container className="mb-5">
                <Card className="shadow" bg="light" text="dark">
                    <Card.Body>
                        <Card.Title>
                            <Row>
                                <Col xs={10}>
                                    <h2>Your children</h2>
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
                        {allNecessaryFieldsSpecified && testator.hasChildrenStatus !== 'no' ? (
                            <Card.Text as="div">
                                {kidsData.map((kid, index) => (
                                    <React.Fragment key={index}>
                                        <Row className="mb-4">
                                            <Col>
                                                <div className="order-item-p">
                                                    <strong>Name: </strong>{kid.title} {kid.fullLegalName}
                                                </div>
                                                <div className="order-item-p">
                                                    <strong>Date of birth: </strong>{new Date(kid.dob).toLocaleDateString()}
                                                </div>
                                                <div className="order-item-p">
                                                    <strong>Address: </strong>{kid.fullAddress}
                                                </div>
                                            </Col>
                                        </Row>
                                    </React.Fragment>
                                ))}
                                <Row className="d-flex justify-content-end">
                                    <Col xs="auto">
                                        <Button
                                            variant="primary"
                                            className="creating-order-tile-btns"
                                            onClick={() => navigate('/kids')}
                                            style={currentOrderStep.currentStep < 2 ?
                                                styles.disabledButton : {}}
                                            disabled={currentOrderStep.currentStep < 2}
                                        >
                                            Edit
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Text>
                        ) : (
                            <>
                                {testator.hasChildrenStatus === "no" ? (
                                    <>
                                        <Row>
                                            <Col>
                                                <div>You said you don't have children</div>
                                            </Col>
                                        </Row>
                                        <Row className="d-flex justify-content-end">
                                            <Col xs="auto">
                                                <Button
                                                    variant="primary"
                                                    className="creating-order-tile-btns"
                                                    onClick={() => navigate('/kids')}
                                                    style={currentOrderStep.currentStep < 2 ?
                                                        styles.disabledButton : {}}
                                                    disabled={currentOrderStep.currentStep < 2}
                                                >
                                                    Edit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </>
                                ) : (
                                    <>
                                        <Row>
                                            <Col>
                                                <div>Tell us about your children</div>
                                            </Col>
                                        </Row>
                                        <Row className="d-flex justify-content-end">
                                            <Col xs="auto">
                                                <Button
                                                    variant="primary"
                                                    className="m-1 creating-order-tile-btns"
                                                    onClick={() => navigate('/kids')}
                                                    style={currentOrderStep.currentStep !== 2 ?
                                                        styles.disabledButton : {}}
                                                    disabled={currentOrderStep.currentStep !== 2}
                                                >
                                                    Get Started
                                                </Button>
                                            </Col>
                                        </Row>
                                    </>
                                )}
                            </>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}


export default KidsCard;
