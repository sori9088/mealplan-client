import React from 'react';
import logo from '../images/logo.png';

export default function Navi(props) {
  const logout = async (e) => {
    e.preventDefault()
    const res = await fetch(process.env.REACT_APP_BURL + '/logout', {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    if (res.ok) {
      props.setUser(null)  // setState the user back to null (original state from app.js)
      localStorage.clear('token')
      // navigate user to somewhere after log out
    } else {
      alert(" CANNOT LOG OUT")
    }
  }



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
              <li className="nav-item">
                <a className="nav-link" activeClassName="active" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/shop">Shop</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" activeClassName="active" href="#">Menu</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" activeClassName="active" href="#" >Contact</a>
              </li>

              {props.user
                ?
                <>
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
                          <a className="dropdown-item" href={"/dashboard/" + props.user.user_name} >Dashboard</a>
                        </div>
                      </li>
                      <div className="align-items-center d-flex">
                      <i class="fas fa-shopping-cart"></i>
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
