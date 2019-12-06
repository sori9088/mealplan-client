import React from 'react'

export default function Dashboard(props) {
    return (
        <div>
            {props.user && props.user.seller ?
            <>New order requested</> 
        :
        <>Your order list</>}
        </div>
    )
}
