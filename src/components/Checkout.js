import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { CardElement, Elements } from 'react-stripe-elements'
import { useStripe } from './StripeHookProvider'
import { Form, Col, Button, Container } from 'react-bootstrap'
import logo from '../images/logo2.png';


export default function Checkout(props) {

  const id = props.user && props.user.user_id
  const [input, setInput] = useState(null)
  const history = useHistory()
  const stripe = useStripe()

  console.log(input)
  const hansol = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const addAdd = async (ev) => {
    ev.preventDefault();
    const data = {
      "cart_id": props.cart.cart_id,
      "form": input
        }
    let response = await fetch(process.env.REACT_APP_BURL + "/cart/addAdd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({data})
    });
    if (response.ok) {
      const data = await response.json()
      if (data.success) {
      } else {
        alert(data.message)
      }
    }
  }


  const submit = async (ev) => {
    ev.preventDefault();
    let { token } = await stripe.createToken({ type: 'card', name: props.user.user_name });
    const data = {
      "token": token.id,
      "price": props.cart.ship
        }
    console.log({data})
    let response = await fetch(process.env.REACT_APP_BURL + "/cart/charge" , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      const data = await response.json()
      addAdd(ev,id);
      if (data.success) {
        props.setCart(data.data)
        history.push('/user/checkout/complete')
      } else {
        alert(data.message)
      }
    }
  }



const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: 'Open Sans, sans-serif',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#c23d4b',
      },
    }
  }
};


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
      <Container className="my-5 p-4">
        <div class="py-4 text-center">
          <img class="d-block mx-auto mb-4" src={logo} alt="" width="72" height="72" />
          <h2>Checkout form</h2>
        </div>

        <div class="row">
          <div class="col-md-4 order-md-2 mb-4">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-muted">Your cart</span>
              <span class="badge badge-secondary badge-pill">{props.cart && props.cart.whole}</span>
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
                  <small class="text-muted">Shipping    $3 </small>
                  <strong>${props.cart.ship}</strong>
                </li>
              </ul>
            )}
          </div>

          <div class="col-md-8 order-md-1">
            <Form onChange={e => hansol(e)} onSubmit={(ev) => submit(ev)}>
              <Form.Row>
                <Form.Group as={Col} controlId="Firstname">
                  <Form.Control placeholder="First name" name="fname" />
                </Form.Group>
                <Form.Group as={Col} controlId="Lastname">
                  <Form.Control placeholder="Last name" name="lname" />
                </Form.Group>
              </Form.Row>
              <Form.Group controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" name="add1" />
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" name="add2" />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control name="city" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control name="zip" />
                </Form.Group>
              </Form.Row>

              <hr class="mb-4" />

              <h4 class="mb-3">Payment</h4>
              <CardElement {...createOptions()} />

              <hr class="mb-4" />
              <Button className="btn-block btn-rounded" variant="success" size="lg" type="submit" rounded>Continue to checkout</Button>
            </Form>
          </div>


        </div>
      </Container>
    </div>


  </>
)
}
