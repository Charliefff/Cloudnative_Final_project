import React, { useState, useContext, useEffect } from 'react';
import { Form, Container, Header, Icon } from 'semantic-ui-react';
import { Navigate } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import {
  useAuth,
  clearErrors,
  login,
  loadUser,
} from '../../context/auth/AuthState';
import './login.css';

const Login = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [authState, authDispatch] = useAuth();
  const { error, isAuthenticated } = authState;

  useEffect(() => {
    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors(authDispatch);
    }
    loadUser(authDispatch);
  }, [error, authDispatch, setAlert]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [isFocused, setIsFocused] = useState(false);

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      login(authDispatch, {
        email,
        password,
      });
    }
  };
  if (isAuthenticated) return <Navigate to='/' />;

  return (
    <Container className="container">
      <div>
        <Header as='h2' icon textAlign='center' className="header">
          <Icon name='users' circular />
          <Header.Content>Sign in</Header.Content>
        </Header>
      </div>
      <Form onSubmit={onSubmit} className="form">
        <Form.Input
          label='Email'
          id='email'
          name='email'
          value={email}
          onChange={onChange}
          placeholder='Email'
          type='email'
          required
          className="form-input"
          style={{
            border: 'none',
            borderBottom: email ? '3px solid' : 'none',
            borderImage: email ? 'linear-gradient(to right, #6065D9, #17D7FA) 1' : '',
            position: 'relative',
            margin: '10px 0',
          }}
        />
        <Form.Input
          label='Password'
          id='password'
          name='password'
          value={password}
          placeholder='Password'
          onChange={onChange}
          type='password'
          required
          className="form-input"
          style={{
            border: 'none',
            borderBottom: password ? '3px solid' : 'none',
            borderImage: password ? 'linear-gradient(to right, #6065D9, #17D7FA) 1' : '',
            position: 'relative',
            margin: '10px 0',
          }}
        />
        <Form.Button type='submit' value='Login' className="form-button"
        style={{ 
          background: 'linear-gradient(to right, #6065D9, #17D7FA)', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '10px', 
          fontSize: '15px', 
          fontWeight: '300', 
          display: 'block', 
          // width: '100px', 
          // height: '40px', 
          margin: '0 auto', 
          cursor: 'pointer',
          transition: 'background 1s ease',
          // outline: 'none'
        }}
        onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(to right, #17D7FA, #6065D9)'}
        onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(to right, #6065D9, #17D7FA)'}
        >
          Sign in <span class="fas fa-arrow-right"></span>
        </Form.Button>
      </Form>
    </Container>

    // <div className='form-container'>
    //   <h1>
    //     Account <span className='text-primary'>Login</span>
    //   </h1>
    //   <form onSubmit={onSubmit}>
    //     <div className='form-group'>
    //       <label htmlFor='email'>Email Address</label>
    //       <input
    //         id='email'
    //         type='email'
    //         name='email'
    //         value={email}
    //         onChange={onChange}
    //         required
    //       />
    //     </div>
    //     <div className='form-group'>
    //       <label htmlFor='password'>Password</label>
    //       <input
    //         id='password'
    //         type='password'
    //         name='password'
    //         value={password}
    //         onChange={onChange}
    //         required
    //       />
    //     </div>
    //     <input
    //       type='submit'
    //       value='Login'
    //       className='btn btn-primary btn-block'
    //     />
    //   </form>
    // </div>
  );
};

export default Login;
