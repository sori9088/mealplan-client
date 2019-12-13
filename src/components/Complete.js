import React from 'react'
import {Container} from 'react-bootstrap'

export default function Complete() {
    return (
        <div>
            <div className="dashboard">
                <div className="container h-100">
                    <div className="row h-100 justify-content-start">
                        <div className="col-12">
                        </div>
                    </div>
                </div>
            </div>
            <div className="single shadow">
                <Container className="my-5 p-4">
                    Order Complete!
                </Container>
            </div>
        </div >
    )
}
