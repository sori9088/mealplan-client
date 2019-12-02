import React from 'react'
import logo from '../images/logo.png'
export default function Navi() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark transparent fixed-top">
        <div className="container">
          <a className="navbar-brand"><img src={logo} width="170" alt="" /></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Menu</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Subscribe</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Feedback</a>
              </li>


            </ul>
          </div>
        </div>
      </nav>

      <header className="masthead">
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12 text-center">
              <span>Healthy and Tasty</span>
              <p className="lead">A great starter layout for a landing page</p>

              <section id="intro">

                <div id="intro-content" className="center-content">

                  <div className="center-content-inner">

                    <div className="content-section content-section-margin">

                      <div className="content-section-grid clearfix">

                        <a href="/login" className="button nav-link">

                          <div className="bottom"></div>

                          <div className="top">

                            <div className="label">Sign In</div>

                            <div className="button-border button-border-left"></div>
                            <div className="button-border button-border-top"></div>
                            <div className="button-border button-border-right"></div>
                            <div className="button-border button-border-bottom"></div>

                          </div>

                        </a>

                      </div>

                    </div>

                  </div>

                </div>

              </section>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
