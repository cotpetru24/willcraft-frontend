import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingSpinner from '../LoadingSpinner';
import { login, reset } from '../../features/auth/authSlice'
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";


// Login component
const Login = () => {

    // Set local state to store form data
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    // Handle authentication status changes
    useEffect(() => {
        if (isError) toast.error(message);
        if (isSuccess || user) navigate('/dashboard');
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);


    // Handle form input changes
    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    // Handle login form submission
    const onSubmit = e => {
        e.preventDefault();
        const userData = { email, password };
        dispatch(login(userData));
    };

    // Render loading spinner if loading, otherwise render login form
    return (
        isLoading ? <LoadingSpinner /> : (
            <>
                <Container style={{ minHeight: '65vh' }} className="mt-5 mb-4">
                    <Row className="mt-3 mb-4 justify-content-center">
                        <Col xs={12} md={4} className="mx-auto">
                            <h1 className="auth-header">Login</h1>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col xs={12} md={4} className="mx-auto">
                            <Form onSubmit={onSubmit}>
                                {/* Email input field */}
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label className="bold-label">Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        value={email}
                                        onChange={onChange}
                                        required
                                    />
                                </Form.Group>

                                {/* Password input field */}
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Label className="bold-label">Password</Form.Label>
                                    <Form.Control
                                        placeholder="Enter password"
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={password}
                                        onChange={onChange}
                                        required
                                    />
                                </Form.Group>

                                {/* Submit button */}
                                <Button variant="primary" type="submit" className="w-100 mt-3">
                                    Login
                                </Button>
                            </Form>
                        </Col>
                    </Row>

                    {/* Link to register page */}
                    <Row className="mt-3 justify-content-start">
                        <Col xs={12} md={4} className="mx-auto">
                            <p>
                                Don't have an account? <Link to='/register'>Register</Link>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    );
}


export default Login;
