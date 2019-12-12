import React, { useState } from 'react'
import { Form, Button, Col, InputGroup, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';



export default function New_dish(props) {
    const [validated, setValidated] = useState(false);
    const [input, setInput] = useState({})
    const history = useHistory()



    const hansol = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }


    const add_food = async e => {
        e.preventDefault()
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        setValidated(true);

        const res = await fetch(process.env.REACT_APP_BURL + "/product/new", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(input)
        })
        if (res.ok) {
            const data = await res.json()
            if (data.success) {
                // window.location(process.env.REACT_APP_FURL+"/login") // redirect using window
                history.push('/shop')
                props.setDishes(data.data)

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
                        </div>
                    </div>
                </div>
            </div>
            <Container className="my-5">

                <Form noValidate validated={validated} onChange={e => hansol(e)} onSubmit={(e) => add_food(e)}>
                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Food name"
                                name="name"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Label>Price ($)
                        </Form.Label>
                            <Form.Control type="number" placeholder="Price" required name="price" />
                            <Form.Control.Feedback type="invalid">
                                Please input a valid price.
            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom04">
                            <Form.Label>Image url</Form.Label>
                            <Form.Control type="text" placeholder="Image URL" name="img_url" required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid URL.
            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows="4" name="description" />
                    </Form.Group>
                    <Button type="submit" variant="success">Submit</Button>
                </Form>
            </Container>
        </>
    )
}
