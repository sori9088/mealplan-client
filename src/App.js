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
import {useHistory} from 'react-router-dom';

function App() {
  const history = useHistory()

  const [user, setUser] = useState(null) // it is an object, by default it is null, if the user is logged in, it will become {id:1, email:"hansol@gmail.com", name:"hansol"}
  const [dishes, setDishes] = useState(null)
  const [token, setToken] = useState('')
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
    setToken(token)
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
      alert(res.message)
      history.push('/signup')
    }

  }


  const getCart = async (id) => {
    const response1 = await fetch(process.env.REACT_APP_BURL + "/get_cart/"+id, {
      headers: {
        'Content-Type': "application/json",
        Authorization: `token ${token}`
      }
    });

    if (response1.ok) {
      const json1 = await response1.json();
      setCart(json1);
    }
  }
  console.log(cart)


  async function getDishes() {
    const response = await fetch(process.env.REACT_APP_BURL + "/get_products", {
      headers: {
        'Content-Type': "application/json"
      }
    });

    if (response.ok) {
      const json = await response.json();
      setDishes(json);
    }

  }



  return (
    <>
      <Navi user={user} setUser={setUser} cart={cart} />
      <Switch>
        <Route exact path='/' render={() => <Main user={user} setUser={setUser} />} />
        <Route exact path='/shop' render={() => <Shop user={user} setUser={setUser} dishes={dishes} token={token} />} />
        <Route exact path='/detail/:id' render={(props) => <Single_product user={user} dishes={dishes} setDishes={setDishes} {...props} />} />
        <Route exact path='/dashboard/:user_name' render={() => <Dashboard user={user} setUser={setUser} />} />
        <Route exact path='/new_dish' render={() => <New_dish user={user} token={token} />} />
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
