import React, { useState, useEffect } from 'react'
import { Container, Button, Spinner, Form, FormControl } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';


export default function Shop(props) {
    const [rating, setRating] = useState({ min: 0, max: 5 })


    const onRatingSliderChange = (value) => {
        setRating(value)
    }

    return (
        <>
            <div className="shop">
                <div className="container h-100">
                    <div className="row h-100 justify-content-start">
                        <div className="col-12">
                            <p className="shop-text">Menu</p>
                        </div>
                    </div>
                </div>
            </div>
            <Container>
                <div className="row my-5">
                    <div className="col-md-3">
                        <div className="my-1">
                            <h5>Filter</h5>
                            <div className="filter">
                                <div className="mx-2 p-4 text-center">
                                    <InputRange
                                        maxValue={5}
                                        minValue={0}
                                        value={rating}
                                        onChange={value => onRatingSliderChange(value)} />
                                    <span className="my-3">Rating</span>
                                </div>
                                <div className="my-1">
                                <div className="mx-2 p-4 text-center">
                                    <Form onChange={(e) => {
                                        props.onChangehandle(e.target.value);
                                    }}>
                                        <FormControl type="text" placeholder="Search by seller" className="mr-sm-2" />
                                    </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        {!props.dishes ?
                            <>
                                <div className="d-flex justify-content-center" style={{ "height": "300px" }}>
                                    <Spinner animation="border" variant="success" />
                                </div>
                            </> :
                            <>
                            </>}
                        <div className="row">
                            {props.dishes && props.dishes.map((dish) =>
                                <div className="col-md-4 col-sm-6 my-3">
                                    <div className="product-grid">
                                        <div className="product-image">
                                            <img className={dish.status === "Sold Out" ? "pic-1 filtered" : "pic-1"} src={dish.img_url} />
                                            <img className="pic-2" src={dish.img_url} />
                                            <ul className="social">
                                                <li><a href={'/detail/' + dish.id} data-tip="View detail"><i className="fa fa-search"></i></a></li>
                                                {dish.status === "Sold Out" ?
                                                    <></>
                                                    :
                                                    <>
                                                        <li><a data-tip="Add to Cart"><i onClick={(e) => {
                                                            e.preventDefault();
                                                            props.add_cart(dish.id, 1)
                                                        }} className="fa fa-shopping-cart"></i></a></li>
                                                    </>}

                                            </ul>
                                            <span className="product-new-label">{dish.seller}</span>
                                            <span className="product-discount-label">{dish.status}</span>
                                        </div>

                                        <div className="product-content">
                                            <h3 className="title"><a href={'/detail/' + dish.id}>{dish.name}</a></h3>
                                            <div className="price">$ {dish.price}
                                            </div>
                                            <ul className="rating">
                                                <li className="fa fa-star"></li>
                                                <li className="fa fa-star"></li>
                                                <li className="fa fa-star"></li>
                                                <li className="fa fa-star"></li>
                                                <li className="fa fa-star disable"></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </Container>
        </>
    )
}
