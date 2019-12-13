import React from 'react'
import { useHistory } from 'react-router-dom';
import { Form, Spinner, Container } from 'react-bootstrap'
import logo from '../images/logo2.png'


export default function Cart(props) {
    const history = useHistory()


    const delete_cart = async (e, id) => {
        e.preventDefault();
        const response = await fetch(process.env.REACT_APP_BURL + "/cart/delete", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ product_id: id })
        })
        if (response.ok) {
            const data = await response.json()
            if (data.success) {
                alert('Successfully delete the product :)))')
                props.setCart(data.data);
            } else {
                alert(data.message)
            }
        }
    };



    console.log(props.user)

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
            {!props.cart ?
              <>
              <Container className="single my-5 d-flex justify-content-center">
              <div style={{"height": "300px"}}>
              <Spinner animation="border" variant="success" />
              </div>
              </Container>
              </> :
              <>
              <div className="pb-5">
                  <div className="container my-5 py-3">
                      <div className="row">
                          <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                          <div class="py-5 text-center">
            <img class="d-block mx-auto mb-4" src={logo} alt="" width="72" height="72" />
            <h2>Cart</h2>
          </div>
                              <div className="table-responsive">
                                  <table className="table">
                                      <thead>
                                          <tr>
                                              <th scope="col" className="border-0 bg-light">
                                                  <div className="p-2 px-3 text-uppercase">Product</div>
                                              </th>
                                              <th scope="col" className="border-0 bg-light">
                                                  <div className="py-2 text-uppercase">Price</div>
                                              </th>
                                              <th scope="col" className="border-0 bg-light">
                                                  <div className="py-2 text-uppercase">Quantity</div>
                                              </th>
                                              <th scope="col" className="border-0 bg-light">
                                                  <div className="py-2 text-uppercase">Remove</div>
                                              </th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          {props.cart && props.cart.whole == 0
                                              ?
                                              <>
                                                  <h3 className="text-muted text-center">Your cart is empty !</h3>
                                              </>
                                              :
                                              <>
                                                  {props.cart && props.cart.items_cart.map((item) =>
                                                      <tr>
                                                          <th scope="row" className="border-0">
                                                              <div className="p-2">
                                                                  <img src={item.img_url} alt="" width="70" className="img-fluid rounded shadow-sm" />
                                                                  <div className="ml-3 d-inline-block align-middle">
                                                                      <h5 className="mb-0"> <a href="#" className="text-dark d-inline-block align-middle">{item.product_name}</a></h5><span className="text-muted font-weight-normal font-italic d-block"></span>
                                                                  </div>
                                                              </div>
                                                          </th>
                                                          <td className="border-0 align-middle"><strong>$ {item.product_price}</strong></td>
                                                          <td className="border-0 align-middle">
                                                              <div className="row">
                                                                  <div className="col"><div className="border-0 align-middle">{item.quantity}</div></div>
                                                              </div>
                                                              </td>
                                                          <td className="border-0 align-middle"><a href="#" onClick={(e) => delete_cart(e, item.product_id)} className="text-dark"><i className="fa fa-trash"></i></a></td>
                                                      </tr>
                                                  )}
                                              </>}

                                      </tbody>
                                  </table>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="container">
                      <div className="row py-5 p-4 bg-white rounded shadow-sm">
                          <div className="col-lg-6">
                              <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Coupon code</div>
                              <div className="p-4">
                                  <p className="font-italic mb-4">If you have a coupon code, please enter it in the box below</p>
                                  <div className="input-group mb-4 border rounded-pill p-2">
                                      <input type="text" placeholder="Apply coupon" aria-describedby="button-addon3" className="form-control border-0" />
                                      <div className="input-group-append border-0">
                                          <button id="button-addon3" type="button" className="btn btn-dark px-4 rounded-pill"><i className="fa fa-gift mr-2"></i>Apply coupon</button>
                                      </div>
                                  </div>
                              </div>
                              <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Instructions for seller</div>
                              <div className="p-4">
                                  <p className="font-italic mb-4">If you have some information for the seller you can leave them in the box below</p>
                                  <textarea name="" cols="30" rows="2" className="form-control"></textarea>
                              </div>
                          </div>
                          <div className="col-lg-6">
                              <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div>
                              <div className="p-4">
                                  <p className="font-italic mb-4">Shipping and additional costs are calculated based on values you have entered.</p>
                                  <ul className="list-unstyled mb-4">
                                      <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Order Subtotal </strong><strong>${props.cart && props.cart.total}</strong></li>
                                      <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Shipping and handling</strong><strong>${props.cart && props.cart.shipfee}</strong></li>
                                      <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total</strong>
                                          <h5 className="font-weight-bold">${props.cart && props.cart.ship}</h5>
                                      </li>
                                  </ul>
                                  <a href={"/user/"+(props.user.user_id)+"/checkout"} className="btn btn-dark rounded-pill py-2 btn-block">Procceed to checkout</a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              </>
            }


        </>
    )
}
