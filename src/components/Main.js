import React from 'react'
import Home from './Home'


export default function Main(props) {
    return (
        <div>
              <Home user={props.user} />
        </div>
    )
}
