import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getLast3ReviewsThunk } from '../features/reviews/reviewThunks';
import { FaStar } from 'react-icons/fa';
import { Container, Col, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import LoadingSpinner from './LoadingSpinner'


const HomeReview = () => {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);

    useEffect(() => {
        const fetchLatest3Reviews = async () => {
            try {
                const resultAction = await dispatch(getLast3ReviewsThunk());
                if (resultAction.payload.latestReviews && Array.isArray(resultAction.payload.latestReviews)) {
                    setReviews(resultAction.payload.latestReviews);
                    setAverageRating(resultAction.payload.averageRating);
                    setTotalReviews(resultAction.payload.totalReviews);
                }
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLatest3Reviews();

    });

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
        <Container >
            {isLoading ? <LoadingSpinner /> : (
                <>
                    <Container className='ps-0 pe-0 mt-3'>
                        <Row className="d-flex justify-content-center justify-content-md-between">
                            {reviews.map((review, index) => (
                                <Col key={index} xs={12} sm={8} md={4} className="d-flex justify-content-center mb-4">
                                    <Card className="home-review-card shadow" bg="light" text="dark" style={{ width: '24rem' }}>
                                        <Card.Body className='d-flex flex-column justify-content-between'>
                                            <Card.Text className='home-review-card-text'>
                                                {review.reviewText}
                                            </Card.Text>
                                            <Row className="d-flex justify-content-center">
                                                <Col xs="auto">
                                                    {renderStars(review.rating)}
                                                </Col>
                                                <Col className="d-flex justify-content-end flex-grow-1">
                                                    <strong>{review.userFirstName}</strong> - {new Date(review.createdAt).toLocaleDateString()}
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                    <Container className="p-4">
                        <Row >
                            <Col className="d-flex justify-content-center">
                                <h5>Rating {averageRating}/5 based on {totalReviews} reviews. <Link to="/reviews">View all reviews</Link></h5>
                            </Col>
                        </Row>
                        {user && user._id &&
                            (
                                <Row >
                                    <Col className="d-flex justify-content-center">
                                        <Link to="/writeAReview" style={{ textDecoration: 'none', color: '#e0218a', fontWeight: 'bold' }}
                                            onClick={() => {
                                                window.scrollTo(0, 0);
                                            }}
                                        >
                                            Rate us
                                        </Link>
                                    </Col>
                                </Row>
                            )
                        }
                    </Container>
                </>
            )}
        </Container>
    );
};


export default HomeReview;
