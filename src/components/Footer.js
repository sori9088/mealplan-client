import React from 'react'
import logo from '../images/logo.png';
import { Link } from 'react-router-dom'


import { Row, Col } from 'react-bootstrap'

export default function Footer() {
    return (
        <>
        <footer id="footer" class="footer-1">
<div class="main-footer widgets-dark typo-light">
<div class="container">
<div class="row">

<div class="col-xs-12 col-sm-6 col-md-6">
<div class="widget subscribe no-box">
<img src={logo} width="160" alt="" href="/" />
<p>About the company, little discription will goes here.. </p>
</div>
</div>

<div class="col-xs-12 col-sm-6 col-md-3">
<div class="widget no-box">
<h5 class="widget-title">Quick Links<span></span></h5>
<ul class="thumbnail-widget">
<li>
<div class="thumb-content"><a href="#.">Get Started</a></div>
</li>
<li>
<div class="thumb-content"><a href="#.">Top Leaders</a></div>
</li>
<li>
<div class="thumb-content"><a href="#.">Success Stories</a></div>
</li>
</ul>
</div>
</div>

<div class="col-xs-12 col-sm-6 col-md-3">

<div class="widget no-box">
<h5 class="widget-title">Contact Us<span></span></h5>

<p><a href="mailto:info@domain.com">info@domain.com</a></p>
<ul class="social-footer2">
<li class=""><a title="youtube" target="_blank" href="https://www.youtube.com/"></a></li>
<li class=""><a href="https://www.facebook.com/" target="_blank" title="Facebook"></a></li>
<li class=""><a href="https://twitter.com" target="_blank" title="Twitter"></a></li>
<li class=""><a title="instagram" target="_blank" href="https://www.instagram.com/"></a></li>
</ul>
</div>
</div>

</div>
</div>
</div>

<div class="footer-copyright">
<div class="container">
<div class="row">
<div class="col-md-12 text-center">
<p>Copyright Meal Plan © 2019. All rights reserved.</p>
</div>
</div>
</div>
</div>
</footer>
        </>
    )
}
