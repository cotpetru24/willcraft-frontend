import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'


const HowDoesItWork = () => {

  return (
    <>
      <Carousel variant='dark' interval={null}>
        <Carousel.Item>
          <Container>
            <Row className="d-flex align-items-center">
              <Col xs={12} md={6}>
                <img
                  className="d-block w-100"
                  src='/typing.png'
                  alt="First slide"
                />
              </Col>
              <Col xs={12} md={6} className="d-flex align-items-center ">
                <div>
                  <h3 className="carousel-item-header">Enter your details</h3>
                  <p>Start by entering your personal information, including your name, address, and details of your beneficiaries.
                    Our intuitive platform guides you through each step, ensuring you do not miss any critical details.
                    This process sets the foundation for a legally sound will that accurately reflects your wishes.
                    Once your will is completed and paid for, you have 30 days to edit the details if needed.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </Carousel.Item>
        <Carousel.Item>
          <Container>
            <Row className="d-flex align-items-center">
              <Col xs={12} md={6}>
                <img
                  className="d-block w-100"
                  src='/printer.png'
                  alt="First slide"
                />
              </Col>
              <Col xs={12} md={6} className="d-flex align-items-center">
                <div>
                  <h3 className="carousel-item-header">Print your will or get it printed and delivered</h3>
                  <p>After completing your will, you have the flexibility to print it at home for immediate use or take advantage of our professional printing service.
                    We offer high-quality, legally formatted documents that can be delivered to your doorstep,
                    ensuring your will is presented in a professional and durable format.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </Carousel.Item>
        <Carousel.Item>
          <Container>
            <Row className="d-flex align-items-center">
              <Col xs={12} md={6}>
                <img
                  className="d-block w-100"
                  src='/signing.png'
                  alt="First slide"
                />
              </Col>
              <Col xs={12} md={6} className="d-flex align-items-center">
                <div>
                  <h3 className="carousel-item-header">Sign your will</h3>
                  <p >The final and most important step is signing your will in the presence of witnesses. This legally binding action ensures that your
                    will is enforceable and accurately represents your final wishes. By completing this step, you solidify your plans, giving you peace
                    of mind that your estate will be handled according to your instructions.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </Carousel.Item>
      </Carousel>
    </>
  );
}


export default HowDoesItWork;