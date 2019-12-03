import React from 'react'
import Navi from './Navi';
import Home from './Home'


export default function Main(props) {
    return (
        <div>
              <Navi user={props.user} setUser={props.setUser} />
              <Home user={props.user} />
        </div>
    )
}
