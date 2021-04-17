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

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
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
