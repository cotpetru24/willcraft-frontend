import React from 'react';
import styles from '../../common/styles';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';


const CreatingOrderNavigation = ({ onBack, onSaveAndContinue, buttonsDisabled }) => {

  return (
    <Container className='pt-4 pb-5'>
      <Row>
        <Col className='d-flex justify-content-start'>
          <Button
            className="order-nav-btn"
            variant='primary'
            onClick={onBack}
            style={buttonsDisabled ? styles.disabledButton : {}}
            disabled={buttonsDisabled}
          >Cancel
          </Button>
        </Col>
        <Col className='d-flex justify-content-end'>
          <Button
            className="order-nav-btn"
            variant='primary'
            onClick={onSaveAndContinue}
            style={buttonsDisabled ? styles.disabledButton : {}}
            disabled={buttonsDisabled}
          >Save and continue
          </Button>
        </Col>
      </Row>
    </Container >
  );
};


export default CreatingOrderNavigation;
