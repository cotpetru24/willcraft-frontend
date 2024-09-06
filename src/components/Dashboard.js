import React from "react";
import OrdersList from "./OrdersList/OrdersList";
import { resetOrderState } from "../utils/reduxUtils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Col, Row, Button } from "react-bootstrap";


// Dashboard component
const Dashboard = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Function to start the creation of a new will
    const handleCreateWill = async () => {
        resetOrderState(dispatch);
        navigate('/creatingOrder');
    };

    return (
        <Container style={{ minHeight: "65vh" }} className="ps-4 pe-4">
            {/* Header for dashboard section */}
            <Row className="pt-5 mb-4">
                <Col>
                    <h1 className="auth-header">My Wills</h1>
                </Col>
            </Row>

            {/* Button to create a new will */}
            <Row className="pb-4">
                <Col>
                    <Button variant="primary mt-2 mb-3"
                        onClick={handleCreateWill}
                        className="order-item-btns"
                    >Create a new Will</Button>
                </Col>
            </Row>

            {/* Display the list of existing wills */}
            <Row>
                <Col className="ps-0 pe-0">
                    <OrdersList />
                </Col>
            </Row>
        </Container>
    );
}


export default Dashboard;
