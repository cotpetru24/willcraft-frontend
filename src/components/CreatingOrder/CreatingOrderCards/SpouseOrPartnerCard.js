import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import constants from "../../../common/constants";
import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from "../../../common/styles";


const SpouseOrPartnerCard = () => {

    const navigate = useNavigate();

    const [spouseOrPartnerInitialData, setSpouseOrPartnerInitialData] = useState({
        spouseOrPartnerTitle: '',
        spouseOrPartnerLegalName: '',
        spouseOrPartnerDob: '',
        spouseOrPartnerFullAddress: ''
    });

    const spouseOrPartnerData = useSelector(state => state.spouseOrPartner);
    const testatorData = useSelector(state => state.testator);
    const currentOrderStep = useSelector(state => state.currentOrderStep);
    const allNecessaryFieldsSpecified = currentOrderStep.currentStep >= 2;


    useEffect(() => {
        if (spouseOrPartnerData) {
            setSpouseOrPartnerInitialData({
                spouseOrPartnerTitle: spouseOrPartnerData.title || '',
                spouseOrPartnerLegalName: spouseOrPartnerData.fullLegalName || '',
                spouseOrPartnerDob: spouseOrPartnerData.dob || '',
                spouseOrPartnerFullAddress: spouseOrPartnerData.fullAddress || '',
            });
        }
    }, [spouseOrPartnerData]);


    return (
        <>
            <Container className="mb-5">
                <Card className="shadow" bg="light" text="dark">
                    <Card.Body>
                        <Card.Title>
                            <Row>
                                <Col xs={10}>
                                    <h2>Your spouse or partner</h2>
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
                        {allNecessaryFieldsSpecified && (
                            testatorData.maritalStatus !== constants.maritalStatus.SINGLE &&
                            testatorData.maritalStatus !== constants.maritalStatus.WIDOWED
                        ) ? (
                            <Card.Text as="div">
                                <Row>
                                    <Col>
                                        <div className="order-item-p">
                                            <strong>Name: </strong>
                                            {spouseOrPartnerInitialData.spouseOrPartnerTitle} {spouseOrPartnerInitialData.spouseOrPartnerLegalName}
                                        </div>
                                        <div className="order-item-p">
                                            <strong>Date of birth: </strong>
                                            {new Date(spouseOrPartnerInitialData.spouseOrPartnerDob).toLocaleDateString()}
                                        </div>
                                        <div className="order-item-p">
                                            <strong>Address: </strong>
                                            {spouseOrPartnerInitialData.spouseOrPartnerFullAddress}
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="d-flex justify-content-end">
                                    <Col xs="auto">
                                        <Button
                                            variant="primary"
                                            onClick={() => navigate('/spouseOrPartner')}
                                            className="creating-order-tile-btns"
                                            style={currentOrderStep.currentStep < 1 ?
                                                styles.disabledButton : {}}
                                            disabled={currentOrderStep.currentStep < 1}
                                        >
                                            Edit
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Text>
                        ) : (
                            <>
                                {testatorData.maritalStatus === constants.maritalStatus.SINGLE ? (
                                    <>
                                        <Row>
                                            <Col>
                                                <div>Your marital status is single.</div>
                                            </Col>
                                        </Row>
                                        <Row className="d-flex justify-content-end">
                                            <Col xs="auto">
                                                <Button
                                                    variant="primary"
                                                    onClick={() => navigate('/spouseOrPartner')}
                                                    className="creating-order-tile-btns"
                                                    style={currentOrderStep.currentStep < 1 ?
                                                        styles.disabledButton : {}}
                                                    disabled={currentOrderStep.currentStep < 1}
                                                >
                                                    Edit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </>
                                ) : testatorData.maritalStatus === constants.maritalStatus.WIDOWED ? (
                                    <>
                                        <Row>
                                            <Col>
                                                <div>Your marital status is widowed.</div>
                                            </Col>
                                        </Row>
                                        <Row className="d-flex justify-content-end">
                                            <Col xs="auto">
                                                <Button
                                                    variant="primary"
                                                    onClick={() => navigate('/spouseOrPartner')}
                                                    className="creating-order-tile-btns"
                                                    style={currentOrderStep.currentStep < 1 ?
                                                        styles.disabledButton : {}}
                                                    disabled={currentOrderStep.currentStep < 1}
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
                                                <div>Tell us about your spouse or partner</div>
                                            </Col>
                                        </Row>
                                        <Row className="d-flex justify-content-end">
                                            <Col xs="auto">
                                                <Button
                                                    variant="primary"
                                                    onClick={() => navigate('/spouseOrPartner')}
                                                    className="creating-order-tile-btns"
                                                    style={currentOrderStep.currentStep !== 1 ?
                                                        styles.disabledButton : {}}
                                                    disabled={currentOrderStep.currentStep !== 1}
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


export default SpouseOrPartnerCard;
