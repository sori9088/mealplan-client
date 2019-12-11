import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Login from './components/Login'
import Signup from './components/Signup'
import { Switch, Route } from 'react-router-dom'
import Navi from './components/Navi'
import Main from './components/Main'
import Shop from './components/Shop'
import Single_product from './components/Single_product';
import New_dish from './components/New_dish'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer'
import Checkout from './components/Checkout'
import Cart from './components/Cart'
import {useHistory} from 'react-router-dom';

function App() {
  const history = useHistory()

  const [user, setUser] = useState(null) // it is an object, by default it is null, if the user is logged in, it will become {id:1, email:"hansol@gmail.com", name:"hansol"}
  const [dishes, setDishes] = useState(null)
  const [cart, setCart] = useState(null)

  const [noofitem, setNoofitem] = useState(null)

  const id = user && user.user_id
  const existingToken = localStorage.getItem("token");
  const accessToken =
    window.location.search.split("=")[0] === "?api_key"
      ? window.location.search.split("=")[1]
      : null;


  useEffect(() => {
    getUser();
    getDishes();
  }, [])


  useEffect(() => {
    getCart(id);
  }, [user])


  const getUser = async () => {

    const token = existingToken || accessToken
    const res = await fetch(process.env.REACT_APP_BURL + "/getuser", {
      headers: {
        Authorization: `Token ${token}`
      }
    })

    if (res.ok) { // user is logged in
      const data = await res.json()  // carefull you might be stuck here bcos of "await"
      setUser(data.user)
      localStorage.setItem('token', token)

    } else {
      localStorage.clear('token')
    }

  }


  const getCart = async (id) => {
    const response1 = await fetch(process.env.REACT_APP_BURL + "/get_cart/"+id, {
      headers: {
        'Content-Type': "application/json",
        Authorization: `token ${localStorage.getItem('token')}`
      }
    });

    if (response1.ok) {
      const json1 = await response1.json();
      setCart(json1);
    }
  }
  console.log(cart)


  async function getDishes() {
    const response = await fetch(process.env.REACT_APP_BURL + "/product/get", {
      headers: {
        'Content-Type': "application/json"
      }
    });

    if (response.ok) {
      const json = await response.json();
      setDishes(json);
    }
  }


  const add_cart = async (id,quantity) => {
      const res = await fetch(process.env.REACT_APP_BURL + "/add_cart", {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          Authorization: `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({product_id : id,
                              quantity : quantity })
      })
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          alert('Successfully add to cart :)))')
          // getCart();
        } else {
          alert(data.message)
        }
      }
      };



  return (
    <>
      <Navi user={user} setUser={setUser} cart={cart} />
      <Switch>
        <Route exact path='/' render={() => <Main user={user} setUser={setUser} />} />
        <Route exact path='/shop' render={() => <Shop user={user} setUser={setUser} dishes={dishes} add_cart={add_cart} />} />
        <Route exact path='/detail/:id' render={(props) => <Single_product user={user} dishes={dishes} setDishes={setDishes} {...props} add_cart={add_cart} />}  />
        <Route exact path='/user/:id/dashboard/' render={() => <Dashboard user={user} setUser={setUser} />} />
        <Route exact path='/new_dish' render={() => <New_dish user={user} />} />
        <Route exact path='/user/:id/checkout' render={() => <Checkout user={user} cart={cart} /> } />
        <Route exact path='/user/:id/cart' render={()=> <Cart user={user} cart={cart} />} />
        {!user &&
          <>
            <Route exact path="/login" render={() => <Login user={user} setUser={setUser} />} />
            <Route exact path="/signup" component={Signup} />
          </>
        }

      </Switch>
      <Footer />
    </>
  );
}

export default App;
