import React, { useState, useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';


export default function Shop(props) {

    const history = useHistory()


    const add_cart = async (id) => {


    const res = await fetch(process.env.REACT_APP_BURL + "/add_cart/"+id, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        Authorization: `Token ${props.token}`
      }
    })
    if (res.ok) {
      const data = await res.json()
      if (data.success) {
        history.push('/shop')

      } else {
        alert(data.message)
      }
    }

    };

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
                <div className="row">
                    <div className="col-2">
                        {(props.user && props.user.seller == true) ?
                            <Button variant="success" size="sm" href="/new_dish">Serve your dish</Button>
                            : <> </>
                        }
                    </div>
                    <div className="col-10">
                        <div className="row my-5">
                            {props.dishes && props.dishes.dishes.map((dish) =>
                                <div className="col-md-4 col-sm-6 my-3">
                                    <div className="product-grid">
                                        <div className="product-image">
                                            <a href="#">
                                                <img className="pic-1" src={dish.img_url} />
                                                <img className="pic-2" src={dish.img_url} />
                                            </a>
                                            <ul className="social">
                                                <li><a href={'/detail/' + dish.id} data-tip="View detail"><i className="fa fa-search"></i></a></li>
                                                <li><a href='#' onClick={()=> add_cart(dish.id)} data-tip="Add to Cart"><i className="fa fa-shopping-cart"></i></a></li>
                                            </ul>
                                            <span className="product-new-label">{dish.seller}</span>
                                            <span className="product-discount-label">20%</span>
                                        </div>

                                        <div className="product-content">
                                            <h3 className="title"><a href="#">{dish.name}</a></h3>
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
