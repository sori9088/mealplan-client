import React, { useState, useEffect } from 'react';
import { Form, Button, Badge } from 'react-bootstrap'
import Rating from '@material-ui/lab/Rating';
import {Box, Typography} from '@material-ui/core';

export default function Single_product(props) {
    const [value, setValue] = useState(5);
    const [dish, setDish] = useState(null)
    const product_id = props.match.params.id
    const [quantity, setQuantity] = useState(1)
    const [sellerorder, setSellerorder] = useState(null)


    useEffect(() => {
        getDish(product_id);
    }, []);

    useEffect(() => {
        getSellerorder();
    }, [dish]);

    
    

    async function getDish(id) {
        const response = await fetch(process.env.REACT_APP_BURL + "/product/detail/" + id, {
            headers: {
                'Content-Type': "application/json"
            }
        });

        if (response.ok) {
            const json = await response.json();
            setDish(json);
        }
    }

    const hansol = e => {
        setQuantity(e.target.value)
    }


    const seller_id = dish && dish.seller_id
    async function getSellerorder() {
        const response = await fetch(process.env.REACT_APP_BURL + "/product/seller/info", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                "id" :seller_id })
        });

        if (response.ok) {
            const json = await response.json();
            setSellerorder(json)
        }
    }
    console.log(sellerorder)


    return (
        <>
            <div className="shop">
                <div className="container h-100">
                    <div className="row h-100 justify-content-start">

                    </div>
                </div>
            </div>

            <div className="container dark-grey-text my-5">
                <div className='single shadow'>
                    <div className="row wow fadeIn">

                        <div className="col-md-6 mb-4">

                            <img src={dish && dish.img_url} className="img-fluid" alt={dish && dish.name} />

                        </div>
                        <div className="col-md-6 mb-4">

                            <div className="p-4">

                                <div className="mb-3">
                                    <a href="">
                                        <Badge variant="success" className="mr-1">{dish && dish.seller}</Badge>
                                    </a>
                                    <a href="">
                                        <span className="badge blue mr-1">{dish && dish.status}</span>
                                    </a>
                                    <a href="">
                                        <span className="badge red mr-1">Bestseller</span>
                                    </a>
                                </div>

                                <p className="lead">
                                    <span className="mr-1">
                                        {/* <del>$200</del> */}
                                    </span>
                                    <span>$ {dish && dish.price}</span>
                                </p>

                                <p className="lead font-weight-bold">{dish && dish.name}</p>

                                <p>{dish && dish.description}</p>
                                <div className="col-8">
                                    <div className="row">
                                        <Form className="d-flex justify-content-left" onChange={e => hansol(e)} onSubmit={(e) => {
                                            e.preventDefault();
                                            props.add_cart(product_id, quantity)
                                        }} >
                                            {dish && dish.status === "Sold Out" ?
                                                <>
                                                    <Form.Control type="number" name='quantity' defaultValue={quantity} disabled />
                                                    <Button variant="success" type="submit" size="sm" disabled>
                                                        <i className="fas fa-shopping-cart"></i></Button>
                                                </>
                                                :
                                                <>
                                                    <Form.Control type="number" name='quantity' defaultValue={quantity} />
                                                    <Button variant="success" type="submit" size="sm">
                                                        <i className="fas fa-shopping-cart"></i></Button>
                                                </>}

                                        </Form>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>

                    <hr />
                    <div>
                        <h3 className="px-3 my-3 text-center">Seller Info</h3>
                    </div>
                    <div className="row">
                        <div className="col-xl-5 order-xl-2 mb-5 mb-xl-0 p-4 mx-3">
                            <div className="card card-profile">
                                <div className="row justify-content-center">
                                    <div className="col-lg-3 order-lg-2">
                                        <div className="card-profile-image">
                                            <img src={dish && dish.seller_img} className="rounded-circle" />
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
                                                    <span className="heading">{sellerorder && sellerorder.orders.length}</span>
                                                    <span className="description">Orders</span>
                                                </div>
                                                <div>
                                                    <span className="heading">{sellerorder && sellerorder.count}</span>
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
                                            {dish && dish.seller}
                                        </h3>
                                        <div>
                                            <i className="ni education_hat mr-2"></i>Seller</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-lg-4 col-md-12 mb-4">

                            <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/11.jpg" className="img-fluid" alt="" />

                        </div>

                        <div className="col-lg-4 col-md-6 mb-4">

                            <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/12.jpg" className="img-fluid" alt="" />

                        </div>

                        <div className="col-lg-4 col-md-6 mb-4">

                            <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/13.jpg" className="img-fluid" alt="" />

                        </div> */}

                    </div>
                    <hr />

                    <div className="row d-flex justify-content-center">
                        <div>
                            <h3 className="px-3">Comments</h3>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div class="col-md-10">
                            <div class="widget-area no-padding blank">
                                <div class="status-upload">
                                    <form>
                                        <textarea placeholder="Add a comment..." ></textarea>
                                        <ul>
                                            <li className="pt-2">
                                            <Box component="fieldset" mb={3} borderColor="transparent">
                                                <Rating
                                                    name="simple-controlled"
                                                    value={value}
                                                    onChange={(event, newValue) => {
                                                        setValue(newValue);
                                                    }}
                                                />
                                            </Box>
                                            </li>
                                        </ul>
                                        <button type="submit" class="btn btn-success green"><i class="far fa-comment-dots"></i></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center py-3">
                        <div class="col-md-10">
                            <div class="card">
                                <div class="card-body">

                                    <div class="row">
                                        <div class="col-md-2">
                                            <img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded img-fluid" />
                                            <p class="text-secondary text-center">15 Minutes Ago</p>
                                        </div>
                                        <div class="col-md-10">
                                            <p>
                                                <a class="float-left" href="https://maniruzzaman-akash.blogspot.com/p/contact.html"><strong>Maniruzzaman Akash</strong></a>
                                                <span class="float-right"><i class="text-warning fa fa-star"></i></span>
                                                <span class="float-right"><i class="text-warning fa fa-star"></i></span>
                                                <span class="float-right"><i class="text-warning fa fa-star"></i></span>
                                                <span class="float-right"><i class="text-warning fa fa-star"></i></span>

                                            </p>
                                            <div class="clearfix"></div>
                                            <p>Lorem Ipsum is simply dummy text of the pr make  but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div >

        </>
    )
}
