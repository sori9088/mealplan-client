import React, { Component, setState } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { useHistory } from 'react-router-dom';
import { Form, Col, Button, Container } from 'react-bootstrap'
import logo from '../images/logo2.png';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state={

    }
    this.submit = this.submit.bind(this);
    this.hansol = this.hansol.bind(this);
  }

   hansol = e => {
    this.setState({
      input:{
        [e.target.name]: e.target.value
      }
    })

  }


  async submit(ev) {
    ev.preventDefault();
    let { token } = await this.props.stripe.createToken({ name: this.props.user.user_name });
    let response = await fetch(process.env.REACT_APP_BURL + "/cart/charge", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain"
      },
      body: {
        "token" :  token.id,
        "price" : this.props.cart.ship
      }
    });

    if (response.ok) {
      alert("Purchase Complete!")
      // history.push('/cart/'+(props.user.user_id)+'/complete')
    }
  }

  render() {

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
        <div className="single shadow">
          <Container className="my-5 py-3">
            <div class="py-5 text-center">
              <img class="d-block mx-auto mb-4" src={logo} alt="" width="72" height="72" />
              <h2>Checkout form</h2>
              <p class="lead"></p>
            </div>

            <div class="row">
              <div class="col-md-4 order-md-2 mb-4">
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                  <span class="text-muted">Your cart</span>
                  <span class="badge badge-secondary badge-pill">{this.props.cart && this.props.cart.whole}</span>
                </h4>
                {this.props.cart && this.props.cart.items_cart.map((item) =>
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
                <Form onChange={e => this.hansol(e)}>
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
                  <CardElement />

                  <hr class="mb-4" />
                  <button class="btn btn-success btn-lg btn-block" type="submit" onClick={this.submit}>Continue to checkout</button>
                </Form>
              </div>


            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default injectStripe(CheckoutForm);