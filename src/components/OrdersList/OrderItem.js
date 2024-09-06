import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteOrder } from "../../features/orders/ordersSlice";
import { getOrderThunk } from "../../features/currentOrder/currentOrderSlice";
import { useNavigate } from "react-router-dom";
import { resetOrderState } from "../../utils/reduxUtils";
import { Container } from "react-bootstrap";
import { Col, Row, Modal } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import generateWillPdf from '../../features/docGen/generateWillPdf.js';


export const OrderProgressBar = ({ step }) => {

    const now = Math.floor((step / 6) * 100 / 10) * 10;
    const textColor = now > 50 ? 'rgba(255, 255, 255, 0.87)' : 'black';

    return (
        <div style={{ position: 'relative' }}>
            <ProgressBar className="mb-3" now={now} />
            <div style={{
                position: 'absolute',
                width: '100%',
                textAlign: 'center',
                fontSize: '12px',
                bottom: -1,
                color: textColor
            }}>
                {`${now}%`}
            </div>
        </div>
    );
};


const OrderItem = ({ order }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);


    const handleDelete = async () => {
        await dispatch(deleteOrder(order._id));
        setShowModal(false);
    };


    const daysLeftToEdit = () => {
        const currentDate = new Date();
        const completionDate = new Date(order.completionDate);
        const timeDifference = completionDate.getTime() + 30 * 24 * 60 * 60 * 1000 - currentDate.getTime();
        const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        if (daysLeft > 0) {
            return (
                <Col xs="auto"
                    className="d-flex justify-content-start align-items-center flex-grow-1"
                >
                    <p className="m-0" style={{ fontWeight: 500 }}>{daysLeft} days left to edit</p>
                </Col>
            );
        }
        return null;
    };


    const handleGenerateWill = async () => {
        try {
            const response = await dispatch(getOrderThunk(order._id));
            if (getOrderThunk.fulfilled.match(response)) {
                generateWillPdf(response.payload);
            }
        } catch (error) {
            console.error("An error occurred while generating the Will PDF:", error);
        }
    };


    return (
        <>
            <Container className="mb-5">
                <Card className='shadow' bg="light" text="dark" >
                    <Card.Body>
                        {order.status !== 'complete' && (
                            <OrderProgressBar
                                step={order.currentStep} />
                        )}
                        {order.status === 'complete' && (
                            <>
                                <Row>
                                    <Col className="d-flex justify-content-end align-items-center">
                                        <h5 className="m-0 pe-1">Complete</h5>
                                        <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'green' }} />
                                    </Col>
                                </Row>
                            </>
                        )}
                        <Card.Title as="h5">{order.testator}</Card.Title>
                        <div>
                            <Row>
                                <Col>
                                    <div className="order-item-p">
                                        <span className="order-item-p-span">Date of birth: </span>{new Date(order.dob).toLocaleDateString('en-GB')}
                                    </div>
                                    <div className="order-item-p">
                                        <span className="order-item-p-span">Address: </span>{order.fullAddress}
                                    </div>
                                    <div className="order-item-p">
                                        <span className="order-item-p-span">Last updated: </span>{new Date(order.updatedAt).toLocaleString('en-GB')}
                                    </div>
                                </Col>
                            </Row>
                            <Row className=" d-flex justify-content-end">
                                {order.status === "complete" && daysLeftToEdit()}
                                <Col xs="auto">
                                    {order.status !== 'complete' && (
                                        <Button
                                            variant="warning m-1 order-item-btn"
                                            onClick={() => setShowModal(true)}
                                            className="order-item-btns"
                                        >
                                            Delete
                                        </Button>
                                    )}
                                    {order.status === "complete"
                                        && (new Date() < new Date(order.completionDate).getTime() + 30 * 24 * 60 * 60 * 1000)
                                        && (
                                            <Button variant="info m-2 order-item-btn"
                                                onClick={async () => {
                                                    await resetOrderState(dispatch);
                                                    await dispatch(getOrderThunk(order._id));
                                                    navigate('/creatingOrder');
                                                }}
                                                className="order-item-btns"
                                                id="continue-order-btn"
                                            >
                                                Edit
                                            </Button>
                                        )
                                    }
                                    {order.status === "complete" && (
                                        <Button variant="primary" className=""
                                            onClick={handleGenerateWill}
                                        >
                                            Generate the Will
                                        </Button>
                                    )}
                                    {order.status === "CreatingOrder" && (
                                        <Button
                                            variant="success m-1 order-item-btn"
                                            onClick={async () => {
                                                await resetOrderState(dispatch);
                                                await dispatch(getOrderThunk(order._id));
                                                navigate('/creatingOrder');
                                            }}
                                            className="order-item-btns"
                                            id="continue-order-btn"
                                        >
                                            Continue
                                        </Button>
                                    )}
                                </Col>
                            </Row>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this order?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default OrderItem