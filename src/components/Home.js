import React from 'react'
import Head from './Head'
import { Container, Card, Button, CardDeck } from 'react-bootstrap';


export default function Home(props) {
    return (
        <>
            <Head user={props.user} />
            <Container>
                <div className='home'>
                    <div className='text-center my-5 display-4'>Best</div>
                    <div className='row my-5'>
                        <CardDeck>
                            <div className="col-sm">
                                <Card clssName="shadow">
                                    <Card.Img variant="top" src="holder.js/100px180" />
                                    <Card.Body>
                                        <Card.Title>Card Title</Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                </Card.Text>
                                        <Button variant="success">Go somewhere</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        

                        </CardDeck>
                    </div>
                </div>
            </Container>
        </>
    )
}
