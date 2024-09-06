import React from "react";
import Card from 'react-bootstrap/Card'
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";


const Prices = () => {

    return (
        <>
            <Container>
                <Row className="pt-4 justify-content-center align-items-stretch no-gutters">
                    <Col xs={12} md={5} className="mb-4">
                        <Card className='prices-card p-2 d-flex flex-column shadow' bg="light" text="dark" >
                            <Card.Img variant="top" src="./fill_out.png" className="mx-auto d-block" style={{ width: '70%' }} />
                            <Card.Body className="flex-grow-1 d-flex flex-column">
                                <Card.Title>Wills starting from £20</Card.Title>
                                <Card.Text>
                                    Creating a will is a crucial step in ensuring that your wishes are respected and your loved ones are protected.
                                    Our basic will creation service starts at just £20. This option provides you with a comprehensive, legally sound
                                    will that covers all the essentials, making it both affordable and accessible. Begin the process today and gain peace of
                                    mind knowing your affairs are in order.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={5} className="mb-4">
                        <Card className='prices-card p-2 d-flex flex-column shadow' bg="light" text="dark">
                            <Card.Img variant="top" src="./printer_v.2.png" className="mx-auto d-block" style={{ width: '70%' }} />
                            <Card.Body className="flex-grow-1 d-flex flex-column">
                                <Card.Title>Printing service for £10</Card.Title>
                                <Card.Text>
                                    Once your will is drafted, it’s important to have a clear, professionally printed copy for your records and for legal validation.
                                    We offer a high-quality printing service for only £10. Our service ensures that your will is printed on premium paper,
                                    giving it the durability and professionalism it deserves. Whether you need one copy or several, we’ve got you covered.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row className=" pb-4 justify-content-center align-items-stretch no-gutters">
                    <Col xs={12} md={5} className="mb-4">
                        <Card className='prices-card p-2 d-flex flex-column shadow' bg="light" text="dark" >
                            <Card.Img variant="top" src="./top_secret.png" className="mx-auto d-block" style={{ width: '70%' }} />
                            <Card.Body className="flex-grow-1 d-flex flex-column">
                                <Card.Title>Document storage at £25 per annum</Card.Title>
                                <Card.Text>
                                    Keeping your will safe is just as important as creating it. Our secure document storage service is available for £25 per annum.
                                    By choosing our storage service, you ensure that your will is protected from loss, damage, or unauthorized access. We store your will
                                    in a secure, climate-controlled environment, providing you with the assurance that your final wishes are safeguarded for the future.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={5} className="mb-4">
                        <Card className='prices-card p-2 d-flex flex-column shadow' bg="light" text="dark" >
                            <Card.Img variant="top" src="./consulting.png" className="mx-auto d-block" style={{ width: '70%' }} />
                            <Card.Body className="flex-grow-1 d-flex flex-column">
                                <Card.Title>Custom Wills and Consultations</Card.Title>
                                <Card.Text>
                                    For those with more complex needs, we offer custom will drafting and personalized consultations. Whether you have unique requirements
                                    or need expert advice, our experienced team is here to assist you. To discuss your specific situation and get a tailored quote,
                                    please contact our enquiries team directly at +44 02454654654. We’re here to help you create a will that meets all your needs.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}


export default Prices;