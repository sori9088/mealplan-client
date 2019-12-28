import React, { useState, useEffect } from 'react';
import { Form, Button, Badge } from 'react-bootstrap'
import Rating from '@material-ui/lab/Rating';
import { Box, Typography } from '@material-ui/core';
import Simplemap from './Simplemap'
import { useHistory } from 'react-router-dom';
import moment from 'moment'



export default function Single_product(props) {
    const [value, setValue] = useState(5);
    const [dish, setDish] = useState(null)
    const product_id = props.match.params.id
    const [quantity, setQuantity] = useState(1)
    const [sellerorder, setSellerorder] = useState(null)
    const [input, setInput] = useState({ rating: "5" })
    const history = useHistory()
    const [comments, setComments] = useState(null)

    useEffect(() => {
        getDish(product_id);
        getComment(product_id);
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
                "id": seller_id
            })
        });

        if (response.ok) {
            const json = await response.json();
            setSellerorder(json)
        }
    }

    async function getComment(id) {
        const response = await fetch(process.env.REACT_APP_BURL + "/product/comment/get/" + id, {
            headers: {
                'Content-Type': "application/json"
            }
        });

        if (response.ok) {
            const json = await response.json();
            setComments(json);
        }
    }


    const comment = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const addComment = async e => {
        e.preventDefault()

        const res = await fetch(process.env.REACT_APP_BURL + "/product/comment/new", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                id: product_id,
                comment: input
            })
        })
        if (res.ok) {
            const data = await res.json()
            if (data.success) {
                console.log(data)
                setComments(data)
            } else {
                alert(data.message)
            }
        }


    };

    console.log(comments)

    const deleteComment = async (e, id) => {
        e.preventDefault()

        const response = await fetch(process.env.REACT_APP_BURL + "/product/comment/delete", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                p_id: product_id,
                id: id
            })
        })
        if (response.ok) {
            const data = await response.json()
            if (data.success) {
                console.log(data)
                setComments(data)
            } else {
                alert(data.message)
            }
        }
    }




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

                                <p>{dish && dish.description.split('\n').map(line => <>{line}<br /></>
                                )}</p>
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
                        <h3 className="px-3 my-5 text-center mb-md-5">Seller Info</h3>
                    </div>
                    <div className="row">
                        <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0 ml-2">
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
                        <div className="col-xl-7 order-xl-2 mb-5 mb-xl-0 p-2">
                            <Simplemap />
                        </div>

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
                                    <form onSubmit={(e) => addComment(e)} onChange={e => comment(e)}>
                                        <textarea name="comment" placeholder="Add a comment..." wrap="hard"></textarea>
                                        <ul>
                                            <li className="pt-2">
                                                <Box component="fieldset" mb={3} borderColor="transparent">
                                                    <Rating
                                                        name="rating"
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
                        <div className="col-md-10">
                            <div className="card">
                                {comments && comments.comments.length === 0 ? <>
                                    <h5 className="text-muted text-center my-4">Nothing to see...</h5>
                                </>
                                    : <>
                                        <div className="card-body">
                                            {comments && comments.comments.map((comment) =>
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <img src={comment.avatar_url} className="img rounded-circle img-fluid" />
                                                        <p className="text-secondary text-center">{moment(comment.created).fromNow()}</p>
                                                    </div>
                                                    <div className="col-md-10">
                                                        <div className="justify-content-between d-flex">
                                                            <div>
                                                                <a className="float-left mr-3" href="https://maniruzzaman-akash.blogspot.com/p/contact.html"><strong>{comment.user_name}</strong></a>
                                                                <Rating name="read-only" value={comment.rating} readOnly />
                                                            </div>
                                                            <div>
                                                                <a onClick={(e) => deleteComment(e, comment.id)}><i class="fas fa-trash-alt"></i></a>
                                                            </div>
                                                        </div>
                                                        <div className="clearfix"></div>
                                                        <p>{comment.body.split('\n').map(line => <>{line}<br /></> 
                                                            )}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </>}

                            </div>
                        </div>
                    </div>



                </div>
            </div >

        </>
    )
}
