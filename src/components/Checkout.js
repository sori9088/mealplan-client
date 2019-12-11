import React from 'react'
import {Form , Col, Button, Container } from 'react-bootstrap'
import logo from '../images/logo2.png'

export default function Checkout (props) {


  return(
    <>
    <div className="dashboard">
        <div className="container h-100">
            <div className="row h-100 justify-content-start">
                <div className="col-12">
                </div>
            </div>
        </div>
    </div>
    <div className="single shadow">
    <Container className="my-5 py-3">
      <div class="py-5 text-center">
        <img class="d-block mx-auto mb-4" src={logo} alt="" width="72" height="72" />
        <h2>Checkout form</h2>
        <p class="lead">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
      </div>

      <div class="row">
        <div class="col-md-4 order-md-2 mb-4">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Your cart</span>
            <span class="badge badge-secondary badge-pill">{props.cart && props.cart.count}</span>
          </h4>
          {props.cart && props.cart.items_cart.map((item) =>
          <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 class="my-0">{item.product_name}</h6>
                <div className="row d-flex justify-content-between">
                <div className="col">
                <small class="text-muted">{item.seller_name}</small>
                </div>
                <div className="col">
                <small>X {item.quantity}</small>
                </div>
                </div>
              </div>
              <span class="text-muted">$ {item.product_price}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>${item.each_total}</strong>
            </li>
          </ul>
          )}
        </div>

        <div class="col-md-8 order-md-1">
        <Form>
        <Form.Row>
         <Form.Group as={Col} controlId="Firstname">
           <Form.Control placeholder="First name" />
           </Form.Group>
        <Form.Group as={Col} controlId="Lastname">
           <Form.Control placeholder="Last name" />
           </Form.Group>
       </Form.Row>
        <Form.Group controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="1234 Main St" />
        </Form.Group>

        <Form.Group controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control placeholder="Apartment, studio, or floor" />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control />
          </Form.Group>
        </Form.Row>

        <Form.Group id="formGridCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <hr class="mb-4" />

        <h4 class="mb-3">Payment</h4>

        <div class="d-block my-3">
          <div class="custom-control custom-radio">
            <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" required="" />
            <label class="custom-control-label" for="credit">Credit card</label>
          </div>
          <div class="custom-control custom-radio">
            <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required="" />
            <label class="custom-control-label" for="debit">Debit card</label>
          </div>
          <div class="custom-control custom-radio">
            <input id="paypal" name="paymentMethod" type="radio" class="custom-control-input" required="" />
            <label class="custom-control-label" for="paypal">PayPal</label>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="cc-name">Name on card</label>
            <input type="text" class="form-control" id="cc-name" placeholder="" required="" />
            <small class="text-muted">Full name as displayed on card</small>
            <div class="invalid-feedback">
              Name on card is required
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="cc-number">Credit card number</label>
            <input type="text" class="form-control" id="cc-number" placeholder="" required="" />
            <div class="invalid-feedback">
              Credit card number is required
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 mb-3">
            <label for="cc-expiration">Expiration</label>
            <input type="text" class="form-control" id="cc-expiration" placeholder="" required="" />
            <div class="invalid-feedback">
              Expiration date required
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <label for="cc-cvv">CVV</label>
            <input type="text" class="form-control" id="cc-cvv" placeholder="" required="" />
            <div class="invalid-feedback">
              Security code required
            </div>
          </div>
        </div>
        <hr class="mb-4" />
        <button class="btn btn-success btn-lg btn-block" type="submit">Continue to checkout</button>
        </Form>
    </div>


        </div>
        </Container>
        </div>


      </>
  )
}
