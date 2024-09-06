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


const ExecutorsCard = () => {

    const navigate = useNavigate();
    const executorsData = useSelector(state => state.additionalExecutors)
    const currentOrder = useSelector(state => state.currentOrder)
    const currentOrderStep = useSelector(state => state.currentOrderStep);

    const allExecutors = currentOrder.peopleAndRoles
        .filter(p => p.role.includes('executor') || p.role.includes('additional executor'))

    const allNecessaryFieldsSpecified = currentOrderStep.currentStep >= 6;


    return (
        <>
            <Container className="mb-5">
                <Card className='shadow' bg="light" text="dark">
                    <Card.Body>
                        <Card.Title>
                            <Row>
                                <Col xs={10}>
                                    <h2>Your Executors</h2>
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
                            <Card.Text as="div">
                                {allExecutors.map((executor, index) => (
                                    <React.Fragment key={index}>
                                        <Row className="mb-4">
                                            <Col>
                                                <div className="order-item-p">
                                                    <span className="order-item-p-span">Name: </span>
                                                    {executor.personId.title} {executor.personId.fullLegalName}
                                                </div>
                                                <div className="order-item-p">
                                                    <span className="order-item-p-span">Date of birth: </span>{new Date(executor.personId.dob).toLocaleDateString()}
                                                </div>
                                                <div className="order-item-p">
                                                    <span className="order-item-p-span">Address: </span>{executor.personId.fullAddress}
                                                </div>
                                            </Col>
                                        </Row>
                                    </React.Fragment>
                                ))}
                                <Row className="d-flex justify-content-end">
                                    <Col xs="auto">
                                        <Button variant="primary" className="creating-order-tile-btns"
                                            onClick={() => {
                                                navigate('/executors')
                                                window.scrollTo(0, 0);
                                            }
                                            }
                                            style={currentOrderStep.currentStep < 5 ?
                                                styles.disabledButton : {}}
                                            disabled={currentOrderStep.currentStep < 5}
                                        >Edit</Button>
                                    </Col>
                                </Row>
                            </Card.Text>
                        ) : (
                            <>
                                <Row>
                                    <Col>
                                        <div>Tell us about executors </div>
                                    </Col>
                                </Row>
                                <Row className="d-flex justify-content-end">
                                    <Col xs="auto">
                                        <Button
                                            variant="primary"
                                            className="m-1 creating-order-tile-btns"
                                            onClick={() => {
                                                navigate('/executors')
                                                window.scrollTo(0, 0);
                                            }
                                            }
                                            style={currentOrderStep.currentStep !== 5 ?
                                                styles.disabledButton : {}}
                                            disabled={currentOrderStep.currentStep !== 5}
                                        >Get Started</Button>
                                    </Col>
                                </Row>
                            </>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}


export default ExecutorsCard;
