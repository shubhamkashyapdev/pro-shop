import React from 'react'
import { Link } from 'react-router-dom'

// react bootstrap //
import { Card } from 'react-bootstrap'

// components //
import Rating from './Rating/Rating'

const Products = ({ _id: id, name, image, rating, numReviews, price }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/products/${id}`}>
        <Card.Img src={image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/products/${id}`}>
          <Card.Title as='div'>
            <strong>{name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating value={rating} text={`${numReviews} reviews`} />
        </Card.Text>
        <Card.Text as='h3'>${price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Products
