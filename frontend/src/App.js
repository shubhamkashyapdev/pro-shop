import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// react bootstrap //
import { Container } from 'react-bootstrap';

// Layout //
import Header from './UI/Layout/Header';
import Footer from './UI/Layout/Footer';

// pages //
import Home from './UI/Pages/Home';
import Products from './UI/Pages/Products';
import Cart from './UI/Pages/Cart';
import Login from './UI/Pages/Login';
import Register from './UI/Pages/Register';
import Profile from './UI/Pages/Profile';
import Shipping from './UI/Pages/Shipping';
import PaymentMethod from './UI/Pages/PaymentMethod';
import PlaceOrder from './UI/Pages/PlaceOrder';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/profile' component={Profile} />
            <Route path='/shipping' component={Shipping} />
            <Route path='/payment' component={PaymentMethod} />
            <Route path='/placeorder' component={PlaceOrder} />
            <Route exact path='/' component={Home} />
            <Route path='/products/:id' component={Products} />
            <Route path='/cart/:id?' component={Cart} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
