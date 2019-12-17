import React,{useState, useEffect} from 'react'
import { Container, Row, Button } from 'react-bootstrap'
import moment from 'moment'

export default function Complete(props) {

    const [time, setTime] = useState('')

    useEffect(() => {
        getTime();
    }, [props.user])

    const getTime = () => {
        setTime(Date.now())
    }




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
                    <Row className="text-center d-flex justify-content-center">
                        <div className="my-5">
                            <h3 style={{ "color": "#7aa557" }}>Order Complete! <i class="fas fa-glass-cheers"></i></h3>
                            <small>{moment({time}).format('lll')}
                        </small>
                        </div>
                        
                    </Row>
                    <hr />
                    <Row className="p-3">
                        <div className="table-responsive">
                            {/* <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col" className="border-0 bg-light">
                                            <div className="p-2 text-uppercase">Product</div>
                                        </th>
                                        <th scope="col" className="border-0 bg-light">
                                            <div className="py-2 text-uppercase">Price</div>
                                        </th>
                                        <th scope="col" className="border-0 bg-light">
                                            <div className="py-2 text-uppercase">Quantity</div>
                                        </th>
                                        <th scope="col" className="border-0 bg-light">
                                            <div className="py-2 text-uppercase">Seller</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order && props.cart.items_cart.map((item) =>
                                        <tr>
                                            <th scope="row" className="border-0">
                                                <div className="p-2">
                                                    <img src={item.img_url} alt="" width="70" className="img-fluid rounded shadow-sm" />
                                                    <div className="ml-2 d-inline-block align-middle">
                                                        <h5 className="mb-0"> <div className="text-dark d-inline-block align-middle">{item.product_name}</div></h5>
                                                    </div>
                                                </div>
                                            </th>
                                            <td className="border-0 align-middle"><strong>$ {item.product_price}</strong></td>
                                            <td className="border-0 align-middle">
                                                <div className="row">
                                                    <div className="col"><div className="border-0 align-middle">{item.quantity}</div></div>
                                                </div>
                                            </td>
                                            <td className="border-0 align-middle">
                                                <div className="row">
                                                    <div className="col"><div className="border-0 align-middle"><i class="fas fa-store"></i> {item.seller_name}</div></div>
                                                </div>
                                            </td>

                                        </tr>
                                    )}
                                </tbody>
                            </table> */}
                        </div>
                    </Row>
                    <hr />
                    {/* <Row className="d-flex justify-content-end">
                        <div className="col-lg-6">
                            <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div>
                            <div className="p-4">
                                <ul className="list-unstyled mb-4">
                                    <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Order Subtotal </strong><strong>${props.cart && props.cart.total}</strong></li>
                                    <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Shipping and handling</strong><strong>${props.cart && props.cart.shipfee}</strong></li>
                                    <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total</strong>
                                        <h5 className="font-weight-bold">${props.cart && props.cart.ship}</h5>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Row> */}
                    <Row className="d-flex justify-content-around">
                        <a href="/user/dashboard"><Button variant="success">Go to dashboard</Button></a>
                        <a href="/shop"><Button variant="success">Continue to shop</Button></a>
                    </Row>

                </Container>
            </div>
        </div >
    )
}
