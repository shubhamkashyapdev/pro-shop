import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Form, Col, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Shared/Message';
import Loader from '../Shared/Loader';

import { registerUser } from '../../actions/userActions';
import FormContainer from '../Components/Form/FormContainer';

const Register = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const redirect = location.serach ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  // effects //
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  // handlers //
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch register user //
    if (password !== confirmPassword) {
      setMessage('Password Do Not Match');
    } else {
      dispatch(registerUser(name, email, password));
    }
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button type='submit' variant='primary'>
          Sign Up
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Already Have An Accout?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/register'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;
