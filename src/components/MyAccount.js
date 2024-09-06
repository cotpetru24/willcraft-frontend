import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateUserDetailsThunk, updateUserPasswordThunk } from "../features/auth/authSlice.js";


const MyAccount = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, isError, message } = useSelector(state => state.orders)
    const user = useSelector(state => state.auth.user)

    const [detailsFormData, setDetailsFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const [passwordFormData, setPasswordFormData] = useState({
        currentPassword: '',
        password: '',
        password2: ''
    });

    const { firstName, lastName, email } = detailsFormData;
    const { currentPassword, password, password2 } = passwordFormData;

    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false)
    const [showEditDetailsForm, setShowEditDetailsForm] = useState(false)


    const onDetailsFormDataChange = e => {
        setDetailsFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }


    const onPasswordFormDataChange = e => {
        setPasswordFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }


    useEffect(() => {
        if (user) {
            setDetailsFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || ''
            });
        } else {
            setDetailsFormData({
                firstName: '',
                lastName: '',
                email: ''
            });
        }

        if (isError) {
            console.log(message);
        }
    }, [user, isError, message, dispatch, showEditDetailsForm]);


    useEffect(() => {
        if (!showChangePasswordForm) {
            setPasswordFormData({
                currentPassword: '',
                password: '',
                password2: ''
            });
        }
    }, [showChangePasswordForm]);


    const handleChangeDetailsSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = { firstName, lastName, email };
            const resultAction = await dispatch(updateUserDetailsThunk(userData));

            if (updateUserDetailsThunk.fulfilled.match(resultAction)) {
                toast.success("Details updated successfully!", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                });

                // Reset the details form
                setDetailsFormData({
                    firstName: '',
                    lastName: '',
                    email: ''
                });
                setShowEditDetailsForm(false);
            } else {
                const errorMessage = resultAction.payload || 'Error updating details';
                toast.error(errorMessage, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                });
            }
        } catch {
            toast.error("Error updating details!", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
            });
        }
    }


    const handleChangePasswordSubmit = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            toast.error('Passwords don\'t match')
        }
        else {

            try {
                const userData = { currentPassword, password };
                const resultAction = await dispatch(updateUserPasswordThunk(userData));

                if (updateUserPasswordThunk.fulfilled.match(resultAction)) {
                    toast.success("Password updated successfully!", {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                    });
                    // Reset password form
                    setPasswordFormData({
                        currentPassword: '',
                        password: '',
                        password2: ''
                    });
                    setShowChangePasswordForm(false);
                } else {
                    const errorMessage = resultAction.payload || 'Error updating password';
                    toast.error(errorMessage, {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                    });
                }
            }
            catch {
                toast.error("Error updating password!", {
                    onClose: () => navigate('/dashboard'),
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                });
            }
        }
    }


    return (
        <>
            <Container style={{ minHeight: '65vh' }} >
                <Container className="md-container">
                    <Row className="mt-4 mb-5 ">
                        <Col>
                            <h1 className="auth-header">My Account</h1>
                        </Col>
                    </Row>
                </Container>
                <Container className="md-container mb-5">
                    <Row>
                        <Col>
                            <Row>
                                <Col xs={4} sm={2} md={2} lg={2} xl={2}>
                                    First name:
                                </Col>
                                <Col>
                                    {user?.firstName || ''}
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4} sm={2} md={2} lg={2} xl={2}>
                                    Last name:
                                </Col>
                                <Col>
                                    {user?.lastName || ''}
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4} sm={2} md={2} lg={2} xl={2}>
                                    Email:
                                </Col>
                                <Col>
                                    {user?.email || ''}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    setShowChangePasswordForm(false)
                                    setShowEditDetailsForm(true)
                                }}
                            >
                                Edit
                            </Button>
                        </Col>
                    </Row>
                </Container>
                <Container className="md-container">
                    <Row>
                        <Col>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    setShowEditDetailsForm(false)
                                    setShowChangePasswordForm(true)
                                }}
                            >
                                Change password
                            </Button>
                        </Col>
                    </Row>
                </Container>
                {showEditDetailsForm && (
                    <Container className="mt-5">
                        <Row className="mt-3 mb-4 justify-content-center">
                            <Col xs={12} md={4} className="mx-auto">
                                <Form onSubmit={handleChangeDetailsSubmit} style={{ minWidth: '300px' }}>
                                    <Form.Group className="mb-3" controlId="formGroupFirstName">
                                        <Form.Label className="bold-label">First name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            value={detailsFormData.firstName}
                                            onChange={onDetailsFormDataChange}
                                            required
                                            className="custom-input"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGroupLastName">
                                        <Form.Label className="bold-label">Last name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            value={detailsFormData.lastName}
                                            onChange={onDetailsFormDataChange}
                                            required
                                            className="custom-input"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                        <Form.Label className="bold-label">Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={detailsFormData.email}
                                            required
                                            onChange={onDetailsFormDataChange}
                                            className="custom-input"
                                        />
                                    </Form.Group>
                                    <Row>
                                        <Col>
                                            <Button
                                                variant="primary"
                                                className="m-1 add-edit-form-btn"
                                                type="button"
                                                onClick={() => setShowEditDetailsForm(false)}
                                            >
                                                Cancel
                                            </Button>
                                        </Col>
                                        <Col className="d-flex justify-content-end">
                                            <Button
                                                variant="primary"
                                                className="m-1 add-edit-form-btn"
                                                type="submit"
                                            >
                                                Save
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>

                        </Row>
                    </Container>
                )}
                {showChangePasswordForm && (
                    <Container className="mt-5">
                        <Row className="mt-3 mb-4 justify-content-center">
                            <Col xs={12} sm={12} md={4} className="mx-auto">
                                <Form onSubmit={handleChangePasswordSubmit} style={{ minWidth: '300px' }}>
                                    <Form.Group className="mb-3" controlId="formGroupCurrentPassword">
                                        <Form.Label className="bold-label">Current password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Current password"
                                            name="currentPassword"
                                            value={passwordFormData.currentPassword}
                                            onChange={onPasswordFormDataChange}
                                            className="custom-input"
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGroupPassword">
                                        <Form.Label className="bold-label">New password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="New password"
                                            name="password"
                                            value={passwordFormData.password}
                                            onChange={onPasswordFormDataChange}
                                            className="custom-input"
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGroupPassword2">
                                        <Form.Label className="bold-label">Confirm new password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm new password"
                                            name="password2"
                                            value={passwordFormData.password2}
                                            onChange={onPasswordFormDataChange}
                                            className="custom-input"
                                            required
                                        />
                                    </Form.Group>
                                    <Row>
                                        <Col>
                                            <Button
                                                variant="primary"
                                                className="m-1 add-edit-form-btn"
                                                type="button"
                                                onClick={() => { setShowChangePasswordForm(false); }}                                                    >
                                                Cancel
                                            </Button>
                                        </Col>
                                        <Col className="d-flex justify-content-end">
                                            <Button
                                                variant="primary"
                                                className="m-1 add-edit-form-btn"
                                                type="submit"
                                            >
                                                Save
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Container >
                )}
            </Container>
        </>
    )
}


export default MyAccount