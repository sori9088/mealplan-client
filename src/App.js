import React, {useState, useEffect} from 'react';
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

function App() {
  const [user, setUser] = useState(null) // it is an object, by default it is null, if the user is logged in, it will become {id:1, email:"hansol@gmail.com", name:"hansol"}
  const [dishes, setDishes] = useState(null)

  
  const existingToken = localStorage.getItem("token");
  const accessToken =
    window.location.search.split("=")[0] === "?api_key"
      ? window.location.search.split("=")[1]
      : null;

  useEffect(()=>{
    getUser()
  }, [])

  const getUser = async() =>{

    const token = existingToken || accessToken
    const res = await fetch(process.env.REACT_APP_BURL + "/getuser", {
      headers:{
        Authorization: `Token ${token}`
      }
    })

    if (res.ok){ // user is logged in
      const data = await res.json()  // carefull you might be stuck here bcos of "await"
      setUser(data.user)
      localStorage.setItem('token', token)
    } else {
      localStorage.clear('token')
      /// more logic here , e.g redirect user to login page because he is no logged in
    }
  }

   

    useEffect(()=>{
        async function getDishes() {
            const response = await fetch(`https://api.myjson.com/bins/10yc0c`);
            const json = await response.json();
            setDishes(json);
        } 

        getDishes();
    });

  return (
    <>
    <Navi user={user} setUser={setUser} />
        <Switch>
          <Route exact path='/' render={()=> <Main user={user} setUser={setUser} />} />
          <Route exact path='/shop' render={()=> <Shop user={user} setUser={setUser} dishes={dishes} setDishes={setDishes} />} />
          <Route exact path='/detail/:id' render={()=> <Single_product user={user} setUser={setUser} />} />
          <Route exact path='/dashboard/:user_name' render={()=> <Dashboard user={user} setUser={setUser} />} />
          <Route exact path='/new_dish' component={New_dish} />
        {!user && 
           <>
          <Route exact path="/login" render={()=> <Login user={user} setUser={setUser} /> } />
          <Route exact path="/signup" component={Signup} />
          </>
        }
        </Switch>
      <Footer />
    </>
  );
}

export default App;
