import styles from "../common/styles";
import { useState, useEffect } from "react";
import { Accordion, Card, Button, Col, Row, Form, Container, InputGroup } from "react-bootstrap";
import { toast } from 'react-toastify';


const SectionListItem = ({ buttonsDisabled, data, onRemove, onEdit, section, onChecked, asset, onChange, assetIndex }) => {

    const [isChecked, setIsChecked] = useState(false);
    const [receivingAmount, setReceivingAmount] = useState('');


    useEffect(() => {
        if (data.role && data.role.includes("executor")) {
            setIsChecked(true);
        }

        if (section === 'assetDistribution-beneficiary' && asset?.distribution) {
            const personId = data._id || data.tempId; // Use tempId if _id is not available
            const isInDistribution = asset.distribution.some(dist => dist.personId._id === personId || dist.personId.tempId === personId);

            setIsChecked(isInDistribution);

            if (isInDistribution) {
                const currentAmount = asset.distribution.find(dist => dist.personId._id === personId || dist.personId.tempId === personId)?.receivingAmount || '';
                setReceivingAmount(currentAmount);
            } else {
                setIsChecked(false);
                setReceivingAmount('');
            }
        }

        if (section === 'assetDistribution-additionalBeneficiary' && asset?.distribution) {
            const personId = data._id || data.tempId; // Use tempId _id is not available
            const isInDistribution = asset.distribution.some(dist => dist.personId._id === personId || dist.personId.tempId === personId);
            setIsChecked(isInDistribution);
        }
    }, [data.role, section, data._id, data.tempId]);


    const currentReceivingAmount = asset?.distribution?.find(dist => dist.personId._id === data._id)?.receivingAmount || '';


    const handleCheckboxChange = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        setReceivingAmount('');
        onChecked(newCheckedState);
    };


    const handleAmountChange = (event) => {
        const value = event.target.value;

        if (/^\d*$/.test(value)) {
            setReceivingAmount(value);
        }
        else {
            toast.warn(`Only numbers allowed`);
        }

        onChange(value, assetIndex, data._id);
    };


    return (
        <>
            {section === 'assets' && (
                <>
                    <Container className="mb-3">
                        <Row>
                            <Col>
                                <Card className='shadow' bg="light" text="dark" style={{ borderColor: 'green' }}>
                                    <Card.Body>
                                        <Card.Text as="div">
                                            <Row>
                                                <Col>
                                                    <div className="order-item-p">
                                                        <span className="order-item-p-span">Asset: </span>{data.assetType}
                                                    </div>
                                                    {data.assetType === 'Property' && (
                                                        <div className="order-item-p">
                                                            <span className="order-item-p-span">Address: </span>{data.propertyAddress}
                                                        </div>
                                                    )}
                                                    {data.assetType === 'Bank Account' && (
                                                        <div className="order-item-p">
                                                            <span className="order-item-p-span">Bank Name: </span>{data.bankName}
                                                        </div>
                                                    )}
                                                    {data.assetType === 'Stocks and shares' && (
                                                        <div className="order-item-p">
                                                            <span className="order-item-p-span">Company Name: </span>{data.companyName}
                                                        </div>
                                                    )}
                                                    {(data.assetType === 'Pension' || data.assetType === 'Life insurance') && (
                                                        <div className="order-item-p">
                                                            <span className="order-item-p-span">Provider: </span>{data.provider}
                                                        </div>
                                                    )}
                                                    {data.assetType === 'Other' && (
                                                        <div className="order-item-p">
                                                            <span className="order-item-p-span">Details: </span>{data.otherAssetDetails}
                                                        </div>
                                                    )}
                                                </Col>
                                            </Row>
                                            <Row className="d-flex justify-content-end mt-1">
                                                <Col xs="auto">
                                                    <Button
                                                        variant="info"
                                                        className="section-list-item-card-btn m-1"
                                                        style={buttonsDisabled ? styles.disabledButton : {}}
                                                        disabled={buttonsDisabled}
                                                        onClick={onEdit}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="warning"
                                                        className="section-list-item-card-btn m-1"
                                                        style={buttonsDisabled ? styles.disabledButton : {}}
                                                        disabled={buttonsDisabled}
                                                        onClick={onRemove}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </>
            )}
            {section === 'kids' && (
                <>
                    <Container className="mb-3">
                        <Row>
                            <Col>
                                <Card className='shadow' bg="light" text="dark" style={{ borderColor: 'green' }}>
                                    <Card.Body>
                                        <Card.Text as="div">
                                            <Row>
                                                <Col>
                                                    <div className="order-item-p">
                                                        <span className="order-item-p-span">Name:  </span>{data.title} {data.fullLegalName}
                                                    </div>
                                                    <div className="order-item-p">
                                                        <span className="order-item-p-span">Date of birth:  </span>{new Date(data.dob).toLocaleDateString()}
                                                    </div>
                                                    <div className="order-item-p">
                                                        <span className="order-item-p-span">Address:  </span>{data.fullAddress}
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="d-flex justify-content-end mt-1">
                                                <Col xs="auto">
                                                    <Button
                                                        variant="info"
                                                        className="section-list-item-card-btn m-1"
                                                        style={buttonsDisabled ? styles.disabledButton : {}}
                                                        disabled={buttonsDisabled}
                                                        onClick={onEdit}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="warning"
                                                        className="section-list-item-card-btn m-1"
                                                        style={buttonsDisabled ? styles.disabledButton : {}}
                                                        disabled={buttonsDisabled}
                                                        onClick={onRemove}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </>
            )}
            {section === 'executors' && (
                <>
                    <Container className="mb-3">
                        <Row>
                            <Col>
                                <Card className='shadow' bg="light" text="dark" style={{ borderColor: 'green' }}>
                                    <Card.Body>
                                        <Card.Text as="div">
                                            <Row>
                                                <Col>
                                                    <div className="order-item-p">
                                                        <span className="order-item-p-span">Name:  </span>{data.personId.title} {data.personId.fullLegalName}
                                                    </div>
                                                    <div className="order-item-p">
                                                        <span className="order-item-p-span">Date of birth:  </span>{new Date(data.personId.dob).toLocaleDateString()}
                                                    </div>
                                                    <div className="order-item-p">
                                                        <span className="order-item-p-span">Address:  </span>{data.personId.fullAddress}
                                                    </div>
                                                    <Form.Check
                                                        type="checkbox"
                                                        label="Executor"
                                                        checked={isChecked}
                                                        onChange={handleCheckboxChange}
                                                        disabled={buttonsDisabled}
                                                    />
                                                </Col>
                                            </Row>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </>
            )}
            {section === 'additional-executors' && (
                <>
                    <Container className="mb-3">
                        <Row>
                            <Col>
                                <Card className='shadow' bg="light" text="dark" style={{ borderColor: 'green' }}>
                                    <Card.Body>
                                        <Card.Text as="div">
                                            <Row>
                                                <Col>
                                                    <div className="order-item-p">
                                                        <span className="order-item-p-span">Name:  </span>{data.title} {data.fullLegalName}
                                                    </div>
                                                    <div className="order-item-p">
                                                        <span className="order-item-p-span">Date of birth:  </span>{new Date(data.dob).toLocaleDateString()}
                                                    </div>
                                                    <div className="order-item-p">
                                                        <span className="order-item-p-span">Address:  </span>{data.fullAddress}
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="d-flex justify-content-end mt-1">
                                                <Col xs="auto">
                                                    <Button
                                                        variant="info"
                                                        className="section-list-item-card-btn m-1"
                                                        style={buttonsDisabled ? styles.disabledButton : {}}
                                                        disabled={buttonsDisabled}
                                                        onClick={onEdit}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="warning"
                                                        className="section-list-item-card-btn m-1"
                                                        style={buttonsDisabled ? styles.disabledButton : {}}
                                                        disabled={buttonsDisabled}
                                                        onClick={onRemove}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </>
            )}
            {section === 'assetsDistribution-asset' && (
                <>
                    <Container>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <Container>
                                        <Row>
                                            <Col>
                                                <div className="order-item-p">
                                                    <span className="order-item-p-span">Asset:  </span>{data.assetType}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {data.assetType === 'Property' && (
                                                    <div className="order-item-p">
                                                        <span className="order-item-p-span">Address:  </span>{data.propertyAddress}
                                                    </div>
                                                )}
                                                {data.assetType === 'Bank Account' && (
                                                    <div className="order-item-p">
                                                        <span className="order-item-p-span">Bank Name:  </span>{data.bankName}
                                                    </div>
                                                )}
                                                {data.assetType === 'Stocks and shares' && (
                                                    <div className="order-item-p">
                                                        <span className="order-item-p-span">Company Name:  </span>{data.companyName}
                                                    </div>
                                                )}
                                                {(data.assetType === 'Pension' || data.assetType === 'Life insurance') && (
                                                    <div className="order-item-p">
                                                        <span className="order-item-p-span">Provider:  </span>{data.provider}
                                                    </div>
                                                )}
                                                {data.assetType === 'Other' && (
                                                    <div className="order-item-p">
                                                        <span className="order-item-p-span">Details:  </span>{data.otherAssetDetails}
                                                    </div>
                                                )}
                                            </Col>
                                        </Row>
                                    </Container>
                                </Accordion.Header>
                            </Accordion.Item>
                        </Accordion>
                    </Container>
                </>
            )}
            {section === 'assetDistribution-beneficiary' && (
                <>
                    <Container className="p-0">
                        <Card
                            className={`mb-3 ${isChecked ? 'bg-warning text-dark' : 'bg-light text-dark'}`}>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <div className="order-item-p">
                                            <span className="order-item-p-span">Name:  </span>{data.title} {data.fullLegalName}
                                        </div>
                                        <div className="order-item-p">
                                            <span className="order-item-p-span">Date of birth:  </span>{new Date(data.dob).toISOString().split('T')[0]}
                                        </div>
                                        <div className="order-item-p">
                                            <span className="order-item-p-span">Address:  </span>{data.fullAddress}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="d-flex align-items-end">
                                        <Form.Check
                                            type="checkbox"
                                            label="Beneficiary"
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}
                                            disabled={buttonsDisabled}
                                        />
                                    </Col>
                                    {isChecked && (
                                        <Col>
                                            <Form.Group as={Row} controlId="formShareAmount" className="align-items-center">
                                                <Col>
                                                    <InputGroup className="receiving-amount-form-control">
                                                        <InputGroup.Text>Share</InputGroup.Text>
                                                        <Form.Control
                                                            type="text"
                                                            value={receivingAmount}
                                                            onChange={handleAmountChange}
                                                            disabled={buttonsDisabled}
                                                            required
                                                        />
                                                        <InputGroup.Text>%</InputGroup.Text>
                                                    </InputGroup>
                                                </Col>
                                            </Form.Group>
                                        </Col>
                                    )}
                                </Row>
                            </Card.Body>
                        </Card>
                    </Container>
                </>
            )}
            {section === 'assetDistribution-additionalBeneficiary' && (
                <>
                    <Container className="mb-3">
                        <Row>
                            <Col>
                                <Card className='shadow' bg="light" text="dark" style={{ borderColor: 'green' }}>
                                    <Card.Body>
                                        <Card.Text as="div">
                                            <Row>
                                                <Col>
                                                    <div className="order-item-p">
                                                        <span className="order-item-p-span">Name:  </span>{data.personId.title} {data.personId.fullLegalName}
                                                    </div>
                                                    <div className="order-item-p">
                                                        <span className="order-item-p-span">Date of birth:  </span>
                                                        {data.personId.dob ?
                                                            new Date(data.personId.dob).toISOString().split('T')[0] :
                                                            'Invalid date'}
                                                    </div>
                                                    <div className="order-item-p">
                                                        <span className="order-item-p-span">Address:  </span>{data.personId.fullAddress}
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="d-flex justify-content-end mt-1">
                                                <Col xs="auto">
                                                    <Button
                                                        variant="info"
                                                        className="section-list-item-card-btn m-1"
                                                        style={buttonsDisabled ? styles.disabledButton : {}}
                                                        disabled={buttonsDisabled}
                                                        onClick={onEdit}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="warning"
                                                        className="section-list-item-card-btn m-1"
                                                        style={buttonsDisabled ? styles.disabledButton : {}}
                                                        disabled={buttonsDisabled}
                                                        onClick={onRemove}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </>
            )}
        </>
    );
}


export default SectionListItem;
