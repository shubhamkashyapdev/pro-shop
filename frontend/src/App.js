import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// react bootstrap //
import { Container } from 'react-bootstrap'

// Layout //
import Header from './UI/Layout/Header'
import Footer from './UI/Layout/Footer'

// pages //
import Home from './UI/Pages/Home'
import Products from './UI/Pages/Products'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/products/:id' component={Products} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
