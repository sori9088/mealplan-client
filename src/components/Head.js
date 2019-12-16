import React from 'react'
import { Link } from 'react-router-dom';


export default function Head(props) {
    return (
        <header className="masthead">
        <div className="container h-100">
            <div className="row h-100 align-items-center">
                <div className="col-12 text-center">
                    <span>Healthy and Tasty</span>
                    <p className="lead">We provide simple, tasty and refreshing health food based on well-being trends.</p>

                    <section id="intro">

                        <div id="intro-content" className="center-content">

                            <div className="center-content-inner">

                                <div className="content-section content-section-margin">

                                    <div className="content-section-grid clearfix">
                                        {props.user
                                            ?
                                            <> </>
                                            :
                                            <Link to="/signup" className="button nav-link">

                                                <div className="bottom"></div>

                                                <div className="top">

                                                    <div className="label">Check Out Our Dishes</div>

                                                    <div className="button-border button-border-left"></div>
                                                    <div className="button-border button-border-top"></div>
                                                    <div className="button-border button-border-right"></div>
                                                    <div className="button-border button-border-bottom"></div>

                                                </div>

                                            </Link>
                                        }
                                    </div>

                                </div>

                            </div>

                        </div>

                    </section>
                </div>
            </div>
        </div>
    </header>
    )
}
