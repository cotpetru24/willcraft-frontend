import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LoadingSpinner from "./LoadingSpinner.js";
import { Container, Col, Row, Card } from "react-bootstrap";
import { getAllReviewsThunk } from "../features/reviews/reviewThunks.js";
import { FaStar } from 'react-icons/fa';


const Reviews = () => {

    const dispatch = useDispatch();
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllReviews = async () => {
            try {
                const resultAction = await dispatch(getAllReviewsThunk());
                if (resultAction.payload && Array.isArray(resultAction.payload)) {
                    setReviews(resultAction.payload);
                }
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllReviews();

    }, [dispatch]);


    const renderStars = (rating) => {

        return (
            <div>
                {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;
                    return (
                        <FaStar
                            key={index}
                            size={20}
                            color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                        />
                    );
                })}
            </div>
        );
    };

    return (

        isLoading ? <LoadingSpinner /> :
            (
                <>
                    <Container style={{ minHeight: '65vh' }}>
                        <Container className="md-container">
                            <Row className="mt-4 mb-5 ">
                                <Col>
                                    <h1 className="auth-header">Customer Reviews</h1>
                                </Col>
                            </Row>
                        </Container>
                        <Container className="md-container mb-5">
                            {reviews.length > 0 ? (
                                reviews.map((review, index) => (
                                    <Card className='shadow mb-3' bg="light" text="dark" key={index}>
                                        <Card.Body>
                                            <div>
                                                <Row>
                                                    <Col>
                                                        <div className="order-item-p">
                                                            {review.reviewText}
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row className="d-flex pt-3 justify-content-center">
                                                    <Col xs="auto">
                                                        {renderStars(review.rating)}
                                                    </Col>
                                                    <Col className="d-flex justify-content-end flex-grow-1">
                                                        <strong>{review.userFirstName}</strong> - {new Date(review.createdAt).toLocaleDateString()}
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))
                            ) : (
                                <p>No reviews available.</p>
                            )}
                        </Container>
                    </Container>
                </>
            )
    );
}


export default Reviews;
