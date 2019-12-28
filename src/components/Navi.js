import React, { useState, useEffect } from 'react';
import logo from '../images/logo.png';
import { useHistory } from 'react-router-dom';
import { store } from 'react-notifications-component';


export default function Navi(props) {

  const history = useHistory()

  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    if (window.scrollY === 0 || window.scrollY === 50) {
      setScrolling(false);
    } else if (window.scrollY > 450) {
      setScrolling(true);
    }
  }


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, [])

  const Update = (event) => {
    window.location.reload(false);
  }


  const logout = async (e) => {
    e.preventDefault()
    const res = await fetch(process.env.REACT_APP_BURL + '/logout', {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    if (res.ok) {
      // props.setUser(null)  // setState the user back to null (original state from app.js)
      // localStorage.clear('token')
      window.location.replace("/")

      store.addNotification({
        message: "Successfully logged out :)))",
        type: "success",
        insert: "top",
        container: "bottom-center",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 4000,
          onScreen: true
        }
      });

    } else {
      alert("Something wrong!")
    }
  }





  return (
    <>
      <nav className={scrolling ? "navbar-light navbar navbar-expand-lg fixed-top transition bg" : "navbar-dark navbar navbar-expand-lg fixed-top transition"}>
        <div className="container transition" style={{ color: scrolling ? 'black' : 'white' }}>
          <a className="navbar-brand"><img src={logo} width="170" alt="" /></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" activeClassName="active" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" activeClassName="active" href="/about">About</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/shop">Shop</a>
              </li>


              {props.user
                ?
                <>
                
              <li className="nav-item">
                <a className="nav-link" activeClassName="active" href="#" >Become a seller</a>
              </li>
                  <li>
                    <ul className="nav navbar-nav navbar-right">
                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown"
                          aria-haspopup="true" aria-expanded="false">

                          <img src={props.user && props.user.avatar_url} width="40"
                            height="40" className="rounded-circle" />
                        </a>

                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                          <a className="dropdown-item">Hello, {props.user && props.user.user_name} !</a>
                          <a className="dropdown-item" onClick={(e) => logout(e)}>Logout</a>
                          <a className="dropdown-item" href="#">Edit Profile</a>
                          <a className="dropdown-item" href={"/user/dashboard"} >Dashboard</a>
                        </div>
                      </li>
                      <div className="align-items-center d-flex">
                        <a href={"/user/cart"} style={{ color: scrolling ? 'black' : 'white' }}><i class="fas fa-shopping-cart"></i></a><span className="ml-2">{props.cart && props.cart.whole}</span>
                      </div>
                    </ul>

                  </li>
                </>

                : <>
                  <li>
                    <ul className="nav navbar-nav navbar-right">
                      <li className="nav-item active">
                        <a className="nav-link" href="/login">Login</a>
                      </li>
                    </ul>
                  </li>
                </>
              }
            </ul>
          </div>
        </div>
      </nav>

    </>

  )
}
