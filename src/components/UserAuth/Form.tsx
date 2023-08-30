import React, { JSX } from 'react';
import { Link } from 'react-router-dom';
import useForm from './useForm';
import './Form.css';

const Form = (): JSX.Element => {
  const { loginPathname, submitForm, handleAnyInput, errorMessages } =
    useForm();

  return (
    <div className="container container-app">
      <div className="wrap-form pl-4 pr-4 pt-4 pb-4">
        <form onSubmit={submitForm} className="form-signup">
          <span className="form-title pb-4">
            {loginPathname ? 'Account Login' : 'Create Account'}
          </span>
          <div className="wrap-form-input validate-input">
            <input
              className="input"
              type="text"
              name="username"
              placeholder="Username"
              required
              onChange={e => handleAnyInput(e, 'username')}
            />
          </div>
          {!loginPathname && (
            <div className="wrap-form-input validate-input">
              <input
                className="input"
                type="email"
                name="email"
                required
                placeholder={`${loginPathname ? 'Email' : 'Your Email'}`}
                onChange={e => handleAnyInput(e, 'email')}
              />
            </div>
          )}
          <div className="wrap-form-input">
            <input
              className="input"
              type="password"
              name="password"
              required
              placeholder="Password"
              onChange={e => handleAnyInput(e, 'password')}
            />
          </div>
          {!loginPathname && (
            <div className="wrap-form-input">
              <input
                className="input"
                type="password"
                name="passwordCheck"
                required
                placeholder="Repeat your password"
                onChange={e => handleAnyInput(e, 'passwordCheck')}
              />
            </div>
          )}
          <div className="container-form-btn mt-4">
            <input
              className="form-form-btn btn btn-outline-info btn-sm"
              type="submit"
              value={loginPathname ? 'Login' : 'Sign Up'}
            />
          </div>
          {errorMessages?.length > 0 ? (
            <div className="text-center pt-4">
              <div className="alert alert-danger" role="alert">
                {errorMessages}
              </div>
            </div>
          ) : null}
          <div className="text-center pt-4">
            <span className="form-info-txt1">
              {loginPathname
                ? 'Create an account '
                : 'Have already an account? '}
            </span>
            <Link
              to={loginPathname ? '/signup' : '/login'}
              className="form-info-txt2">
              {loginPathname ? 'Sign Up' : 'Login here'}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
