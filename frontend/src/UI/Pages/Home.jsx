import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Fragment } from 'react'
import { Col, Row } from 'react-bootstrap'

// component //
import Product from '../Components/Product/Product'

const Home = () => {
  const [products, setProducts] = useState([])

  // fetch data //
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products')
      setProducts(data)
    }
    fetchProducts()
    // eslint-disable-next-line
  }, [])
  return (
    <Fragment>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={6} md={4} lg={3} xl={3}>
            <Product {...product} />
          </Col>
        ))}
      </Row>
    </Fragment>
  )
}

export default Home
