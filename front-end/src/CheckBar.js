import React from 'react'
import './CheckBar.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CheckBar = (props) => {
  return (
    <div>
        <Row className='checkbar'>
            <Col className={props.step1? 'active': ''}>
            Sign In
            </Col>
            <Col className={props.step2? 'active': ''}>
            Shipping
            </Col>
            <Col className={props.step3? 'active': ''}>
            payment
            </Col>
            <Col className={props.step4? 'active': ''}>
            Place Order
            </Col>
        </Row>
    </div>
  )
}

export default CheckBar