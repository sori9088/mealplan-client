import React from 'react'

export default function Dashboard(props) {
    return (
        <>
        <div className="dashboard">
                <div className="container h-100">
                    <div className="row h-100 justify-content-start">
                        <div className="col-12">
                        </div>
                    </div>
                </div>
            </div>
        <div>
            {props.user && props.user.seller ?
            <>New order requested</> 
        :
        <>Your order list</>}
        </div>
        </>
    )
}
