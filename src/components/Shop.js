import React, { useState, useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'

export default function Shop(props) {





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
                <Container>
                    <div className="row">
                        <div className="col-2">
                            {(props.user && props.user.seller == true) ?
                                <Button variant="success" size="sm" href="/new_dish">Serve your dish</Button>
                                : <> </>
                            }
                        </div>
                        <div className="col-10">
                            <div className="row my-5">
                                {props.dishes && props.dishes.map((dish) =>
                                    <div className="col-md-4 col-sm-6 my-3">
                                        <div className="product-grid">
                                            <div className="product-image">
                                                <a href="#">
                                                    <img className="pic-1" src={dish.image} />
                                                    <img className="pic-2" src={dish.image} />
                                                </a>
                                                <ul className="social">
                                                    <li><a href={'/detail/'+dish.id} data-tip="View detail"><i className="fa fa-search"></i></a></li>
                                                    <li><a href="" data-tip="Add to Cart"><i className="fa fa-shopping-cart"></i></a></li>
                                                </ul>
                                                <span className="product-new-label">{dish.seller}</span>
                                                <span className="product-discount-label">20%</span>
                                            </div>
                                            
                                            <div className="product-content">
                                                <h3 className="title"><a href="#">{dish.name}</a></h3>
                                                <div className="price">{dish.price}
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
            </div>
        </>
    )
}
