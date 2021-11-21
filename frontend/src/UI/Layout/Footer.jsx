import React from 'react'

// react bootstrap //
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy;{' '}
            <a href='https://shubhamwebdesign.com'>shubhamwebdesign</a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
