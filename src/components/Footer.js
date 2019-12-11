import React from 'react'
import logo from '../images/logo.png';
import { Link } from 'react-router-dom'


import { Row, Col } from 'react-bootstrap'

export default function Footer() {
    return (
        <>
            <footer>
                <Row fluid className="footer">
                    <Col xs={6} md={6}>
                    <Link to="/">
                    <img src={logo} width="130" alt="" className="my-3" />
                    </Link>
                        <h4>About</h4>
                    </Col>
                    <Col xs={4} md={3}>
                        xs=6 md=4
    </Col>
                    <Col xs={4} md={3}>
                        xs=6 md=4
    </Col>
                </Row>
            </footer>
        </>
    )
}
