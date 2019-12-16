import React from 'react'
import { Container, Col, Image } from 'react-bootstrap'


export default function About() {
    return (
        <>
            <div className="shop">
                <div className="container h-100">
                    <div className="row h-100 justify-content-start">
                        <div className="col-12">
                            <p className="shop-text">About</p>
                        </div>
                    </div>
                </div>
            </div>
            <Container>
            <div className="row my-5">
                <Col sm>
                <Image width="180px" src="https://image.flaticon.com/icons/png/512/190/190673.png" className="mx-1" fluid ></Image>
                    <h3 className="main-f my-3">crafted by chefs</h3>
                    <h5>Every meal is hand prepared with love, balanced by nutritionists and designed for you.</h5>
                </Col>
                <Col sm>
                <Image width="180px" src="https://image.flaticon.com/icons/png/512/1889/1889941.png" className="mx-1" fluid ></Image>
                    <h3 className="main-f my-3">fresh & fast</h3>
                    <h5>We always try to provide the fastest delivery.</h5>
                </Col>
                <Col sm>
                <Image width="180px" src="https://image.flaticon.com/icons/png/512/706/706164.png" className="mx-1" fluid ></Image>
                <h3 className="main-f my-3">healthy + nutritious</h3>
                <h5>We deliver flavourful and filling meals packed with vegetables, fruits and nuts.</h5>
                </Col>
            </div>
            </Container>
        </>
    )
}
