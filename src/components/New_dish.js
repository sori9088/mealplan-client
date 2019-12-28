import React, { useState } from 'react'
import { Form, Button, Col, InputGroup, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { uploadFile } from 'react-s3';
import { store } from 'react-notifications-component';




const config = {
    bucketName: 'mealplann',
    dirName: 'product', /* optional */
    region: 'ap-northeast-2',
    accessKeyId: process.env.REACT_APP_CLIENT,
    secretAccessKey: process.env.REACT_APP_KEY,
}


export default function New_dish(props) {
    const [validated, setValidated] = useState(false);
    const [input, setInput] = useState({})
    const [file, setFile] = useState(null)
    const [imageurl, setImageurl] = useState("")
    const history = useHistory()



    const hansol = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const onchangeHandle = e => {
        setFile(e.target.files[0])
    }


    const upload = () => {
        uploadFile(file, config)
            .then(data => {
                store.addNotification({
                    message: "Completely uploaded :)",
                    type: "success",
                    insert: "top",
                    container: "bottom-center",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 3000,
                        onScreen: true
                    }
                });
                setImageurl(data.location)
            })
            .catch(err => console.error(err))
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
            body: JSON.stringify({
                input,
                "img_url": imageurl
            })
        })

        if (res.ok) {
            const data = await res.json()
            if (data.success) {
                // window.location(process.env.REACT_APP_FURL+"/login") // redirect using window
                props.setDishes(data.data)
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
                            <Form.Control type="number" step="any" placeholder="Price" required name="price" />
                            <Form.Control.Feedback type="invalid">
                                Please input a valid price.
            </Form.Control.Feedback>
                        </Form.Group>
                        <div className="form-group col-md-6">
                            <Form.Label>Food Image  <small>{imageurl ? <><i class="fas fa-check-circle" style={{"color" : "green"}}></i> uploaded !</> :<><i class="fas fa-exclamation-circle" style={{"color" : "red"}} ></i> please upload !</>}</small>
                        </Form.Label><br />
                            <input type="file" name="file" onChange={(e) => onchangeHandle(e)} />
                            <Button variant="success" onClick={() => upload()}>Upload</Button>
                        </div>
                    </Form.Row>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows="4" name="description" wrap="hard" />
                    </Form.Group>
                    <Button type="submit" variant="success">Submit</Button>
                </Form>
            </Container>
        </>
    )
}
