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


const AssetsCard = () => {

    const navigate = useNavigate();
    const assetsData = useSelector(state => state.assets);
    const currentOrderStep = useSelector(state => state.currentOrderStep);
    const allNecessaryFieldsSpecified = currentOrderStep.currentStep >= 4;


    return (
        <>
            <Container className="mb-5">
                <Card className="shadow" bg="light" text="dark">
                    <Card.Body>
                        <Card.Title>
                            <Row>
                                <Col xs={10}>
                                    <h2>Your Assets</h2>
                                </Col>
                                <Col className="d-flex justify-content-end align-items-center">
                                    {allNecessaryFieldsSpecified ? (
                                        <FontAwesomeIcon
                                            icon={faCheckCircle}
                                            className="custom-icon"
                                            style={{ color: 'green' }}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            icon={faCheckCircle}
                                            className="custom-icon"
                                            style={{ color: 'grey' }}
                                        />
                                    )}
                                </Col>
                            </Row>
                        </Card.Title>
                        {allNecessaryFieldsSpecified && (Array.isArray(assetsData) && assetsData.length > 0) ? (
                            <Card.Text as="div">
                                {assetsData.map((asset, index) => (
                                    <React.Fragment key={index}>
                                        <Row className="mb-4">
                                            <Col>
                                                <div className="order-item-p">
                                                    <strong>Asset: </strong>{asset.assetType}
                                                </div>
                                                {asset.assetType === 'Property' && (
                                                    <div className="order-item-p">
                                                        <strong>Address: </strong>{asset.propertyAddress}
                                                    </div>
                                                )}
                                                {asset.assetType === 'Bank Account' && (
                                                    <div className="order-item-p">
                                                        <strong>Bank Name: </strong>{asset.bankName}
                                                    </div>
                                                )}
                                                {asset.assetType === 'Stocks and shares' && (
                                                    <div className="order-item-p">
                                                        <strong>Company Name: </strong>{asset.companyName}
                                                    </div>
                                                )}
                                                {(asset.assetType === 'Pension' || asset.assetType === 'Life insurance') && (
                                                    <div className="order-item-p">
                                                        <strong>Provider: </strong>{asset.provider}
                                                    </div>
                                                )}
                                                {asset.assetType === 'Other' && (
                                                    <div className="order-item-p">
                                                        <strong>Details: </strong>{asset.otherAssetDetails}
                                                    </div>
                                                )}
                                            </Col>
                                        </Row>
                                    </React.Fragment>
                                ))}
                                <Row className="d-flex justify-content-end">
                                    <Col xs="auto">
                                        <Button
                                            variant="primary"
                                            className="creating-order-tile-btns"
                                            onClick={() => {
                                                navigate('/assets')
                                                window.scrollTo(0, 0);
                                            }
                                            }
                                            style={currentOrderStep.currentStep < 3 ?
                                                styles.disabledButton : {}}
                                            disabled={currentOrderStep.currentStep < 3}
                                        >
                                            Edit
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Text>
                        ) : (
                            <>
                                <Row>
                                    <Col>
                                        <div>Tell us about your assets</div>
                                    </Col>
                                </Row>
                                <Row className="d-flex justify-content-end">
                                    <Col xs="auto">
                                        <Button
                                            variant="primary"
                                            className="m-1 creating-order-tile-btns"
                                            onClick={() => {
                                                navigate('/assets')
                                                window.scrollTo(0, 0);
                                            }
                                            }
                                            style={currentOrderStep.currentStep !== 3 ?
                                                styles.disabledButton : {}}
                                            disabled={currentOrderStep.currentStep !== 3}
                                        >
                                            Get Started
                                        </Button>
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


export default AssetsCard;
