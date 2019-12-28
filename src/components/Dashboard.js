import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Dashboard_s from './Dashboard_s'
import { Form, Spinner, Container } from 'react-bootstrap'


export default function Dashboard(props) {

    const [order, setOrder] = useState(null)
    const [length, setLength] = useState("0")

    useEffect(() => {
        getOrder();
    }, [props.user])

    const getOrder = async () => {
        const response = await fetch(process.env.REACT_APP_BURL + "/user/order/get", {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const json = await response.json();
            setOrder(json);
            setLength(json.items.length)
        }
    }
    console.log(order)

    return (
        <>
            <div className="dashboard">
                <div className="container h-100">
                    <div className="row h-100 justify-content-start">
                        <div className="col-12">
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Container className="single shadow my-5 p-3">
                    {!props.user ?
                        <>
                            <Container className="single my-5 d-flex justify-content-center">
                                <div style={{ "height": "300px" }}>
                                    <Spinner animation="border" variant="success" />
                                </div>
                            </Container>
                        </> :
                        <>
                            {props.user && props.user.seller ?
                                <>
                                    <Dashboard_s user={props.user} />
                                </>
                                :
                                <>
                                    <div class="row">
                                        <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                                            <div class="card card-profile">
                                                <div class="row justify-content-center">
                                                    <div class="col-lg-3 order-lg-2">
                                                        <div class="card-profile-image">
                                                            <a href="#">
                                                                <img src={props.user && props.user.avatar_url} class="rounded-circle" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                                    <div class="d-flex justify-content-between">
                                                    </div>
                                                </div>
                                                <div class="card-body pt-0 pt-md-1">
                                                    <div class="row">
                                                        <div class="col">
                                                            <div class="card-profile-stats d-flex justify-content-center mt-md-1">
                                                                <div>
                                                                    <span class="heading">{length}</span>
                                                                    <span class="description">Order</span>
                                                                </div>
                                                                <div>
                                                                    <span class="heading">{props.cart && props.cart.whole}</span>
                                                                    <span class="description">Cart</span>
                                                                </div>
                                                                <div>
                                                                    <span class="heading">{order ?
                                                                        <>{order && order.comments}</> : <>0</>}</span>
                                                                    <span class="description">Comments</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="text-center">
                                                        <h3>
                                                            {props.user && props.user.user_name}
                                                        </h3>
                                                        <div>
                                                            <i class="ni education_hat mr-2"></i>Customer</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-8 order-xl-2 mb-5 mb-xl-0">
                                            <h5><i class="fas fa-shopping-bag"></i> Ordered lists</h5>
                                            {order && order.items.map((item) => item.map((cart) =>
                                                <div className="border-card row mx-3">
                                                    <div className="col-1">
                                                        <div className="card-type-icon with-border">{cart.cart_id}</div>
                                                    </div>
                                                    <div className="col-11 d-flex justify-content-start align-items-center">
                                                        <div className="col-2">
                                                            <span className="title"><strong>{cart.status}</strong></span>
                                                        </div>
                                                        <div className="col-4">
                                                            <small className="caption">{moment(cart.ordered).format('lll')}</small>
                                                        </div>
                                                        <div className="col-5">
                                                            <span className="title">{cart.product_name}</span>
                                                        </div>
                                                        <div className="col-1">
                                                            <small className="title">X{cart.quantity}</small>
                                                        </div>
                                                    </div>

                                                    <i className="material-icons end-icon"></i>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>}
                        </>}
                </Container>
            </div>
        </>
    )
}
