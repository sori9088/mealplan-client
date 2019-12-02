import React from 'react';
import {Container} from 'react-bootstrap';
import Navi from './components/Navi'
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

function App() {
  return (
    <>
    <Navi />
    <Container>
    <Home />
    </Container>
    </>
  );
}

export default App;
