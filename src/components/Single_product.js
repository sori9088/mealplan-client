import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'

export default function Single_product(props) {

    const [dish, setDish] = useState(null)
    const product_id = props.match.params.id
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        getDish(product_id);
    }, []);



    async function getDish(id) {
        const response = await fetch(process.env.REACT_APP_BURL + "/detail/" + id, {
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




    return (
        <>
            <div className="shop">
                <div className="container h-100">
                    <div className="row h-100 justify-content-start">

                    </div>
                </div>
            </div>

            <div className="container dark-grey-text mt-5">
                <div className='single shadow'>
                    <div className="row wow fadeIn">

                        <div className="col-md-6 mb-4">

                            <img src={dish && dish.img_url} className="img-fluid" alt={dish && dish.name} />

                        </div>
                        <div className="col-md-6 mb-4">

                            <div className="p-4">

                                <div className="mb-3">
                                    <a href="">
                                        <span className="badge purple mr-1">{dish && dish.seller}</span>
                                    </a>
                                    <a href="">
                                        <span className="badge blue mr-1">New</span>
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

                                <p className="lead font-weight-bold">Description</p>

                                <p>{dish && dish.description}</p>
                                <div className="col-8">
                                    <div className="row">
                                    <Form className="d-flex justify-content-left" onChange={e => hansol(e)} onSubmit={(e)=> {
                                      e.preventDefault();
                                       props.add_cart(dish.id,quantity)
                                    }} >
                                        <Form.Control type="number" name='quantity' defaultValue={quantity} />
                                        <Button variant="success" type="submit" size="sm">
                                        <i className="fas fa-shopping-cart"></i></Button>

                                    </Form>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                    <hr />

                    <div className="row d-flex justify-content-center wow fadeIn">

                        <div className="col-md-6 text-center">

                            <h4 className="my-4 h4">Additional information</h4>

                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus suscipit modi sapiente illo soluta odit
                              voluptates,
quibusdam officia. Neque quibusdam quas a quis porro? Molestias illo neque eum in laborum.</p>

                        </div>

                    </div>

                    <div className="row wow fadeIn">

                        <div className="col-lg-4 col-md-12 mb-4">

                            <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/11.jpg" className="img-fluid" alt="" />

                        </div>

                        <div className="col-lg-4 col-md-6 mb-4">

                            <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/12.jpg" className="img-fluid" alt="" />

                        </div>

                        <div className="col-lg-4 col-md-6 mb-4">

                            <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/13.jpg" className="img-fluid" alt="" />

                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}
