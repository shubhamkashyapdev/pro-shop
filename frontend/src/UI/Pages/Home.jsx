import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

// component //
import Product from '../Components/Product/Product';
import { listProducts } from '../../actions/productActons';
import Message from '../Shared/Message';
import Loader from '../Shared/Loader';

const Home = () => {
  const dispatch = useDispatch();
  // fetch data //
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <Fragment>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={6} md={4} lg={3} xl={3}>
              <Product {...product} />
            </Col>
          ))}
        </Row>
      )}
    </Fragment>
  );
};

export default Home;
