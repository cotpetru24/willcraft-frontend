import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { createMessageThunk } from '../features/messages/messagesThunks';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Footer = () => {
    
    const dispatch = useDispatch();
    const [messageForm, setMessageForm] = useState({
        senderName: '',
        senderEmail: '',
        messageText: ''
    });

    const handleSendMessage = async (e) => {
        e.preventDefault();

        const { senderName, senderEmail, messageText } = messageForm;
        const messageData = { senderName, senderEmail, messageText };

        try {
            const response = await dispatch(createMessageThunk(messageData));
            if (response) {
                toast.success("Message sent!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                });
                setMessageForm({ senderName: '', senderEmail: '', messageText: '' });
            }
        } catch (error) {
            console.error('Error in handleSendMessage:', error);
        }
    }

    return (
        <footer>
            <Container fluid className="main-footer pt-4">
                <Container fluid="md">
                    <Row>
                        <Col xs={12} md={5} className="order-1 order-md-1">
                            <Row>
                                <h5>MESSAGE US</h5>
                            </Row>
                            <Row>
                                <Form onSubmit={handleSendMessage}>
                                    <Form.Group className="mb-3" controlId="formGroupName">
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Your name"
                                            value={messageForm.senderName}
                                            onChange={(e) => setMessageForm({ ...messageForm, senderName: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                        <Form.Control
                                            required
                                            type="email"
                                            placeholder="Your email"
                                            value={messageForm.senderEmail}
                                            onChange={(e) => setMessageForm({ ...messageForm, senderEmail: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formGroupTextarea">
                                        <Form.Control
                                            required
                                            className="mb-3 message-form-textarea"
                                            as="textarea"
                                            placeholder="Your message"
                                            value={messageForm.messageText}
                                            onChange={(e) => setMessageForm({ ...messageForm, messageText: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Button
                                        className='mb-5'
                                        id="send-message-btn"
                                        type="submit"
                                    >
                                        Send
                                    </Button>
                                </Form>
                            </Row>
                        </Col>
                        <Col xs={12} md={{ span: 3, offset: 3 }} className="container-sm order-2 order-md-2">
                            <div className="footer-sub-container footer-contact-us">
                                <Row>
                                    <h5>CALL US ON</h5>
                                </Row>
                                <Row>
                                    <h4>+44 024 123 4567</h4>
                                </Row>
                                <Row className="pt-3">
                                    <h5>OR EMAIL</h5>
                                </Row>
                                <Row>
                                    <a href="mailto:someone@example.com" id="sendEmailLink">
                                        <h4>info@willcraft.co.uk</h4>
                                    </a>
                                </Row>
                                <Row className="d-block social-media-icons pt-3">
                                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                        <FaFacebook size={30} />
                                    </a>
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                        <FaTwitter size={30} />
                                    </a>
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                        <FaInstagram size={30} />
                                    </a>
                                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                        <FaLinkedin size={30} />
                                    </a>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={{ span: 6, offset: 6 }} className="order-3 order-md-3">
                            <Row className="justify-content-end">
                                <Col xs="auto">
                                    <h6>123 High Street</h6>
                                </Col>
                            </Row>
                            <Row className="justify-content-end">
                                <Col xs="auto">
                                    <h6>Coventry, CV1 1AB, UK</h6>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <Col xs="auto">
                                    <p>&copy;2024 WillCraft</p>
                                </Col>
                                <Col xs="auto">
                                    <p>STU124543 Computing Project</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row className="justify-content-end">
                                <Col>
                                <a href="https://storyset.com/education">Education illustrations by Storyset</a>
                                </Col>
                                <Col xs="auto">
                                    <Link to='/'>
                                        Terms of Service
                                    </Link>
                                </Col>
                                <Col xs="auto">
                                    <Link to='/'>
                                        Privacy Policy
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </footer >
    );
}


export default Footer;

