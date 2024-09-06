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


const AssetsDistributionCard = () => {

    const navigate = useNavigate();
    const testator = useSelector(state => state.testator)
    const assetsData = useSelector(state => state.assets);
    const currentOrderStep = useSelector(state => state.currentOrderStep);
    const allNecessaryFieldsSpecified = currentOrderStep.currentStep >= 5;


    return (
        <>
            <Container className="mb-5">
                <Card className="shadow" bg="light" text="dark">
                    <Card.Body>
                        <Card.Title>
                            <Row>
                                <Col xs={10}>
                                    <h2>Assets Distribution</h2>
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
                                {assetsData.map((asset, assetIndex) => (
                                    <React.Fragment key={assetIndex}>
                                        <Row className="mb-4">
                                            <Col>
                                                {asset.assetType === 'Bank Account' && (
                                                    <div className="order-item-p">
                                                        <strong>{asset.assetType} - {asset.bankName}</strong>
                                                    </div>
                                                )}

                                                {asset.assetType === 'Property' && (
                                                    <div className="order-item-p">
                                                        <strong>{asset.assetType} - {asset.propertyAddress}</strong>
                                                    </div>
                                                )}

                                                {asset.assetType === 'Stocks and shares' && (
                                                    <div className="order-item-p">
                                                        <strong>{asset.assetType} - {asset.companyName}</strong>
                                                    </div>
                                                )}

                                                {(asset.assetType === 'Pension' || asset.assetType === 'Life insurance') && (
                                                    <div className="order-item-p">
                                                        <strong>{asset.assetType} - {asset.provider}</strong>
                                                    </div>
                                                )}

                                                {asset.assetType === 'Other' && (
                                                    <div className="order-item-p">
                                                        <strong>{asset.assetType} - {asset.otherAssetDetails}</strong>
                                                    </div>
                                                )}

                                                {Array.isArray(asset.distribution) && asset.distribution.length > 0 && (
                                                    asset.distribution.map((beneficiary, beneficiaryIndex) => (
                                                        <div key={beneficiaryIndex} className="order-item-p">
                                                            {beneficiary.personId.fullLegalName} - <strong>{beneficiary.receivingAmount}%</strong>
                                                        </div>
                                                        // ))}
                                                    ))
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
                                                navigate('/assetsDistribution')
                                                window.scrollTo(0, 0);
                                            }
                                            }
                                            style={currentOrderStep.currentStep < 4 ?
                                                styles.disabledButton : {}}
                                            disabled={currentOrderStep.currentStep < 4}
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
                                        <div>Tell us how you want to distribute your assets</div>
                                    </Col>
                                </Row>
                                <Row className="d-flex justify-content-end">
                                    <Col xs="auto">
                                        <Button
                                            variant="primary"
                                            className="m-1 creating-order-tile-btns"
                                            onClick={() => {
                                                navigate('/assetsDistribution')
                                                window.scrollTo(0, 0);
                                            }
                                            }
                                            style={currentOrderStep.currentStep !== 4 ?
                                                styles.disabledButton : {}}
                                            disabled={currentOrderStep.currentStep !== 4}
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


export default AssetsDistributionCard;
