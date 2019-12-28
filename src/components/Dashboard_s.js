import React, { useState, useEffect } from 'react'
import { Spinner, Button, Tooltip, OverlayTrigger, Modal, Badge, Media, Image } from 'react-bootstrap'
import moment from 'moment'
import { useHistory } from 'react-router-dom';
import { store } from 'react-notifications-component';




export default function Dashboard_s(props) {

    const [products, setProducts] = useState(null)
    const [sellerorder, setSellerorder] = useState(null)
    const [modalShow, setModalShow] = useState(false);
    const [order, setOrder] = useState(null)
    const history = useHistory()


    useEffect(() => {
        getProduct();
        getSellerorder();
    }, [props.user])


    async function getProduct() {
        const response = await fetch(process.env.REACT_APP_BURL + "/product/seller", {

            headers: {
                'Content-Type': "application/json",
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const json = await response.json();
            setProducts(json);

        }
    }

    async function getSellerorder() {
        const response = await fetch(process.env.REACT_APP_BURL + "/seller/order", {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const json = await response.json();
            setSellerorder(json)
        }
    }


    console.log(sellerorder)

    const soldout = async (id) => {

        let response = await fetch(process.env.REACT_APP_BURL + "/product/soldout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                "product_id": id
            })
        });

        if (response.ok) {
            const data = await response.json()
            if (data.success) {
                store.addNotification({
                    title: "Discontinued Out!",
                    message: "Successfully discontinued :)))",
                    type: "success",
                    insert: "top",
                    container: "bottom-center",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                      duration: 4000,
                      onScreen: true
                    }
                  });
                setProducts(data)
            } else {
                alert(data.message)
            }
        }
    }


    function renderTooltip(props) {
        return <Tooltip {...props}>Order Number</Tooltip>;
    }


    function MyVerticallyCenteredModal(props) {
        console.log(order)
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {order && order.product}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Media>
                        <Image
                            width={64}
                            height={64}
                            className="mr-3"
                            src={order && order.img_url}
                            alt="Generic placeholder"
                            rounded
                        />
                        <Media.Body>
                            <div className="row">
                                <div className="col-9">
                                    <h5>Status :
                                   {order && order.shipped ?
                                            <>Shipped Out</>
                                            :
                                            <>Ordered</>
                                        }</h5>
                                    <p>
                                        lala
                                </p>
                                </div>
                                <div className="col-3 d-flex justify-content-center align-items-center">
                                    <div>
                                        <i class="fas fa-user"></i> {order && order.user_name}
                                    </div>
                                </div>
                            </div>
                        </Media.Body>
                    </Media>
                </Modal.Body>
                <Modal.Body>
                    <small>If you delievered the dish, click this button and keep the customer updated :) </small>
                    {order && order.shipped ?
                        <>
                            <Button variant="danger" disabled>Shipped Out</Button>
                        </>
                        :
                        <>
                            <Button variant="success" onClick={(e) => handleShipped(e, order.product_id, order.cart_id)}>Ship</Button>
                        </>
                    }

                </Modal.Body>
            </Modal>
        );
    }

    const handleShow = curorder => {
        setOrder(curorder);
        setModalShow(true);
    };


    const handleShipped = async (e, pid, cid) => {
        e.preventDefault();

        let response = await fetch(process.env.REACT_APP_BURL + "/seller/shipped", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                "product_id": pid,
                "cart_id": cid
            })
        });

        if (response.ok) {
            const data = await response.json()
            if (data) {
                // alert('Successfully shipped out :)))')
                store.addNotification({
                    title: "Shipped Out!",
                    message: "Successfully shipped out :)))",
                    type: "success",
                    insert: "top",
                    container: "bottom-center",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                      duration: 3000,
                      onScreen: true
                    }
                  });
                setSellerorder(data)
                history.push('/user/dashboard')
            }
        }
    }


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                        <div className="card card-profile">
                            <div className="row justify-content-center">
                                <div className="col-lg-3 order-lg-2">
                                    <div className="card-profile-image">
                                        <img src={props.user && props.user.avatar_url} className="rounded-circle" />
                                    </div>
                                </div>
                            </div>
                            <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                <div className="d-flex justify-content-between">
                                </div>
                            </div>
                            <div className="card-body pt-0 pt-md-1">
                                <div className="row">
                                    <div className="col">
                                        <div className="card-profile-stats d-flex justify-content-center mt-md-1">
                                            <div>
                                                <span className="heading">{sellerorder && sellerorder.order_count}</span>
                                                <span className="description">Orders</span>
                                            </div>
                                            <div>
                                                <span className="heading">{products && products.quantity}</span>
                                                <span className="description">Products</span>
                                            </div>
                                            <div>
                                                <span className="heading">1</span>
                                                <span className="description">Comments</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3>
                                        {props.user && props.user.user_name}
                                    </h3>
                                    <div>
                                        <i className="ni education_hat mr-2"></i>Seller</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8 order-xl-2 mb-5 mb-xl-0">
                        <h5><i class="fas fa-shopping-bag"></i> Manage orders</h5>
                        <div className="mt-2">
                            {sellerorder && sellerorder.orders.map((order) => order.map((item) =>
                            <>

                                    <MyVerticallyCenteredModal
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                    />
                                    <div className="border-card row mx-3" onClick={(e) => {
                                        e.preventDefault();
                                        handleShow(item)
                                    }}>
                                        <div className="col-1">
                                            <OverlayTrigger
                                                placement="top"
                                                delay={{ show: 250, hide: 300 }}
                                                overlay={renderTooltip}
                                            >
                                                <div className="card-type-icon with-border">{item.cart_id}</div>
                                            </OverlayTrigger>
                                        </div>
                                        <div className="col-11 d-flex justify-content-start">
                                            <div className="col-2">
                                                <span className="title"><strong><i class="fas fa-user"></i> {item.user_name}</strong></span>
                                            </div>
                                            <div className="col-7">
                                                <span className="caption">{item.product}</span>
                                            </div>

                                            <div className="col-1">
                                                <small className="title">X {item.quantity}</small>
                                            </div>
                                            <div className="col-1">
                                                {item.shipped ? 
                                                <><Badge variant="danger">Shipped Out</Badge></> 
                                                :
                                                <><Badge variant="success">Ordered</Badge></>
                                                }
                                        </div>
                                        </div>
                                    </div>
                                    </>
                            ))}

                        </div>

                    </div>
                </div>
                <div className="row mt-3 m-md-3">
                    <div className="col-md-12">
                        <div className="row d-flex justify-content-between">
                            <h5><i className="fas fa-store"></i> Manage your products</h5>
                            <a href="/new_dish"><div className="addbutton">
                                <div className="icon">
                                    <i className="fas fa-plus"></i>
                                </div>
                            </div></a>
                        </div>
                    </div>
                    <div className="col-md-12">
                        {!products ?
                            <>
                                <div className="d-flex justify-content-center" style={{ "height": "300px" }}>
                                    <Spinner animation="border" variant="success" />
                                </div>
                            </> :
                            <>
                            </>}
                        <div className="row">
                            {products && products.dishes.map((dish) =>
                                <div className="col-md-3 col-sm-6 my-3">
                                    <div className="product-grid">
                                        <div className="product-image">
                                            <img className="pic-1" src={dish.img_url} />
                                            <img className="pic-2" src={dish.img_url} />
                                            <ul className="social">
                                                <li><a href={'/detail/' + dish.id} data-tip="View detail"><i className="fa fa-search"></i></a></li>
                                                <li><a data-tip="Discontinued"><i onClick={(e) => {
                                                    e.preventDefault();
                                                    soldout(dish.id)
                                                }} class="far fa-times-circle"></i></a></li>                                            </ul>
                                        </div>

                                        <div className="product-content">
                                            <h3 className="title"><a href={'/detail/' + dish.id}>{dish.name}</a></h3>
                                            <div className="price">$ {dish.price}
                                            </div>
                                            {!dish.status ? <>In stock</> : <>Sold out</>}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
