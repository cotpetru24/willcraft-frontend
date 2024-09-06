import React from 'react';
import { Container, Spinner } from 'react-bootstrap';


function LoadingSpinner() {
  return (
    <Container className='d-flex justify-content-center align-items-center' data-testid="loading-spinner" style={{ minHeight: '40vh' }}>
      <div className='text-center'>
        <Spinner
          animation="border"
          variant="primary"
          style={{ width: '5rem', height: '5rem' }}
        />
        <div>Loading...</div>
      </div>
    </Container>
  );
}


export default LoadingSpinner;
