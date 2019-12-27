import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Navi from './components/Navi'
import Shop from './components/Shop'
import About from './components/About'
import Single_product from './components/Single_product';
import New_dish from './components/New_dish'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer'
import StripeHookProvider from './components/StripeHookProvider'
import Checkout from './components/Checkout'
import Cart from './components/Cart'
import Home from './components/Home'
import Complete from './components/Complete'
import Setlocation from './components/Setlocation'
import { StripeProvider, Elements } from 'react-stripe-elements';
import { useStripe } from './components/StripeHookProvider'
import { useHistory } from 'react-router-dom';
import 'react-input-range/lib/css/index.css'

function App() {
  const stripe = useStripe()
  const key = process.env.STRIPE_API

  const [user, setUser] = useState(null) // it is an object, by default it is null, if the user is logged in, it will become {id:1, email:"hansol@gmail.com", name:"hansol"}
  const [dishes, setDishes] = useState([])
  const [filteredDishes, setFiltereddishes] = useState([])
  const [newDishes , setNewDishes] = useState([])
  const [cart, setCart] = useState(null)
  const [rating, setRating] = useState({ min: 0, max: 5 })



  const id = user && user.user_id
  const existingToken = localStorage.getItem("token");
  const accessToken =
    window.location.search.split("=")[0] === "?api_key"
      ? window.location.search.split("=")[1]
      : null;

  useEffect(() => {
    getDishes();
    getUser();
  }, [])


  useEffect(() => {
    getCart(id);
  }, [user])




  const onChangehandle = (value) => {
    const filter = dishes.filter(dish => dish.seller.toLowerCase().includes(value.toLowerCase()))
    setFiltereddishes(filter)
  }


  
  const onRatingSliderChange = (value) => {
    setRating(value)

    const newDishes = dishes.filter(dish => {
        const isAboveMinimumRating = dish.rating.rating >= value.min
        const isBelowMaximumRating = dish.rating.rating <= value.max
        return isAboveMinimumRating && isBelowMaximumRating
      })
    
    console.log(newDishes)
    setFiltereddishes(newDishes)

}




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


  const getCart = async () => {
    const response1 = await fetch(process.env.REACT_APP_BURL + "/cart/get", {
      headers: {
        'Content-Type': "application/json",
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });

    if (response1.ok) {
      const json1 = await response1.json();
      setCart(json1);
    }
  }


  async function getDishes() {
    const response = await fetch(process.env.REACT_APP_BURL + "/product/get", {
      headers: {
        'Content-Type': "application/json"
      }
    });

    if (response.ok) {
      const json = await response.json();
      const data = json && json.dishes.slice()
      setDishes(data);
      setFiltereddishes(data)

    }
  }


  const add_cart = async (id, quantity) => {
    const res = await fetch(process.env.REACT_APP_BURL + "/cart/add", {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        product_id: id,
        quantity: quantity
      })
    })
    if (res.ok) {
      const data = await res.json()
      if (data.success) {
        alert('Successfully add to cart :)))')
        setCart(data.data);
      } else {
        alert(data.message)
      }
    }
  };


 console.log(filteredDishes)

  return (
    <>
      <ReactNotification />
      <Navi user={user} setUser={setUser} cart={cart} />
      <Switch>
        <Route exact path='/' render={() => <Home user={user} setUser={setUser} dishes={dishes} />} />
        <Route exact path='/about' render={() => <About />} />
        <Route exact path='/shop' render={() => <Shop user={user} setUser={setUser} dishes={filteredDishes} setRating={setRating} rating={rating} onRatingSliderChange={onRatingSliderChange} getDishes={getDishes} onChangehandle={onChangehandle} add_cart={add_cart}  />} />
        <Route exact path='/detail/:id' render={(props) => <Single_product user={user} dishes={dishes} setDishes={setDishes} {...props} add_cart={add_cart} />} />
        <Route exact path='/user/dashboard/' render={() => <Dashboard user={user} cart={cart} />} />
        <Route exact path='/new_dish' render={() => <New_dish user={user} setDishes={setDishes} />} />
        <Route exact path='/user/checkout' render={() =>
          <StripeProvider apiKey="pk_test_Ud5Rz42QmBEXPEkkMmIfwQUq00UK5iUSii" {...{ stripe }}>
            <Elements>
              <StripeHookProvider>
                <Checkout user={user} cart={cart} setCart={setCart} />
              </StripeHookProvider>
            </Elements>
          </StripeProvider>
        } />
        <Route exact path='/user/cart' render={() => <Cart user={user} cart={cart} setCart={setCart} />} />
        <Route exact path='/user/checkout/complete' render={() => <Complete user={user} cart={cart} />} />
        <Route exact path='/location' render={() => <Setlocation />} />
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
