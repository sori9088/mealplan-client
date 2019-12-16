import React from 'react'
import Head from './Head'
import { Container, Carousel, Image, Button, CardDeck } from 'react-bootstrap';


export default function Home(props) {

    console.log(props.dishes, 'lala')
    return (
        <>
            <Head user={props.user} />
            <Container>
                <div className='home'>

                    <h1 className='text-center my-5 main-f'>Get ready to get hungry?</h1>
                    <div className="d-flex justify-content-center">
                        <Carousel className="mb-3 w-50">
                            {props.dishes && props.dishes.dishes.map((item) =>
                                <Carousel.Item>
                                    <Image
                                        className="d-block w-100"
                                        src={item.img_url}
                                        alt="First slide"
                                        fluid
                                    />
                                    <Carousel.Caption>
                                        <h5>{item.name}</h5>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )}
                        </Carousel>
                    </div>
                    <div className="d-flex justify-content-center mb-5">
                    <a class="button nav-link" href="/shop"><div class="bottom"></div><div class="top"><div class="label">See More</div><div class="button-border button-border-left"></div><div class="button-border button-border-top"></div><div class="button-border button-border-right"></div><div class="button-border button-border-bottom"></div></div></a>
                    </div>
                </div>
            </Container>
        </>
    )
}
