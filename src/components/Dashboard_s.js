import React from 'react'
import {Button} from 'react-bootstrap'

export default function Dashboard_s(props) {
    return (
        <>
        <div class="row">
            <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                <div class="card card-profile">
                    <div class="row justify-content-center">
                        <div class="col-lg-3 order-lg-2">
                            <div class="card-profile-image">
                                    <img src={props.user && props.user.avatar_url} class="rounded-circle" />
                            </div>
                        </div>
                    </div>
                    <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0">
                    </div>
                    <div class="card-body pt-0 pt-md-4 mt-xs-4">
                        <div class="row">
                            <div class="col">
                                <div class="card-profile-stats d-flex justify-content-center mt-lg-5">
                                    <div>
                                        <span class="heading">2</span>
                                        <span class="description">Orders</span>
                                    </div>
                                    <div>
                                        <span class="heading">6</span>
                                        <span class="description">Products</span>
                                    </div>
                                    <div>
                                        <span class="heading">1</span>
                                        <span class="description">Comments</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center">
                            <h3>
                            {props.user && props.user.user_name}
                            </h3>
                            <div>
                                <i class="ni education_hat mr-2"></i>Seller</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-8 order-xl-2 mb-5 mb-xl-0">
            <h5>Manage orders</h5>
            <div class="border-card">
                <div class="card-type-icon with-border">1</div>
                <div class="content-wrapper">
                    <div class="label-group fixed">
                        <p class="title">EG links</p>
                        <p class="caption">Einheit</p>
                    </div>
                    <div class="min-gap"></div>
                    <div class="label-group">
                        <p class="title">Marc-Philipp Weber</p>
                        <p class="caption">Eigentümer</p>
                    </div>
                    <div class="min-gap"></div>
                    <div class="label-group">
                        <p class="title">Alexander Oemisch</p>
                        <p class="caption">Mieter</p>
                    </div>
                </div>
                <i class="material-icons end-icon">more_vert</i>
            </div>
            </div>
        </div>
        </>
    )
}
