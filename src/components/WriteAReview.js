import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import { FaStar } from 'react-icons/fa';
import { createReviewThunk } from "../features/reviews/reviewThunks.js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from "./LoadingSpinner.js";


const WriteAReview = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const userId = user._id;
    const userFirstName = user.firstName;
    const isLoading = false;

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [reviewForm, setReviewForm] = useState({
        reviewText: '',
    });

    const handleSendReview = async (e) => {
        e.preventDefault();

        if (rating === 0) {
            toast.error("Please rate us before submitting your review.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
            });
            return;
        }

        const reviewData = { userId, userFirstName, rating, reviewText: reviewForm.reviewText };
        await dispatch(createReviewThunk(reviewData));

        toast.success("Thank you for your feedback!", {
            onClose: () => navigate('/'),
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
        });

        setReviewForm({ reviewText: '' });
        setRating(0);
    }

    return (
        isLoading ? <LoadingSpinner /> :
            (
                <>
                    <Container fluid="sm" style={{ minHeight: '65vh', maxWidth: '800px' }} >
                        <Row className="mt-5 mb-5">
                            <Col>
                                <Form onSubmit={handleSendReview}>
                                    <Form.Group controlId="formGroupRating" className="mb-3">
                                        <div className="star-rating">
                                            {[...Array(5)].map((star, index) => {
                                                const starValue = index + 1;
                                                return (
                                                    <label key={index}>
                                                        <input
                                                            type="radio"
                                                            name="rating"
                                                            value={starValue}
                                                            onClick={() => setRating(starValue)}
                                                            style={{ display: 'none' }}
                                                        />
                                                        <FaStar
                                                            size={30}
                                                            color={starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                                            onMouseEnter={() => setHover(starValue)}
                                                            onMouseLeave={() => setHover(null)}
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </Form.Group>
                                    <Form.Group controlId="formGroupTextarea">
                                        <Form.Control
                                            required
                                            className="mb-3"
                                            as="textarea"
                                            placeholder="Your message"
                                            value={reviewForm.reviewText}
                                            onChange={(e) => setReviewForm({ ...reviewForm, reviewText: e.target.value })}
                                            style={{ minHeight: '45vh' }}
                                        />
                                    </Form.Group>
                                    <Row>
                                        <Col className="d-flex justify-content-between">
                                            <Button
                                                variant="primary"
                                                className='mb-5'
                                                onClick={() => navigate('/')}
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                variant="primary"
                                                className='mb-5'
                                                type="submit"
                                            >
                                                Send
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Container >
                </>
            )
    );
}


export default WriteAReview;
