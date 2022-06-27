import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Form, Image, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import logo from '../../assets/images/locked-logo.svg';
import { signUpRequest, resetApi } from '../../store/actions/auth';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import reducer, {
  signup,
  apiMessage,
  apiSuccess,
} from '../../store/reducers/auth';
import saga from '../../store/sagas/auth';

const Signup = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [errors, setErrors] = useState({});

  // eslint-disable-next-line no-shadow

  useEffect(() => {
    if (props.signup && props.signup.success) {
      history.push('/login');
    }
  }, [props.signup]);

  const validateForm = () => {
    const error = {};
    const isEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
    if (!email) {
      error.email = 'Please Enter Email';
    } else if (!isEmail.test(email)) {
      error.email = 'Please Enter Valid Email';
    }

    if (!password) {
      error.password = 'Please Enter Password';
    }
    return error;
  };

  const handleSignUp = e => {
    e.preventDefault();
    const errorsArray = validateForm();
    if (Object.keys(errorsArray).length > 0) {
      setErrors(errorsArray);
      return;
    }
    if (email && password) {
      props.signUpRequest({ email, password });
    }
  };
  return (
    <>
      <header className="locked-screen-header">
        <Image src={logo} alt="Logo" width={108} className="mb-2" />
        <div className="text-white mt-1">We Empower Inclusive Workplaces</div>
      </header>
      <div className="login_wrapper_main">
        <div className="container">
          <div className="login_wrapper col-lg-6 mx-auto">
            <form className="card p-80">
              <h5 className="login__signin mb-2 fw-bold">Sign up</h5>
              <p style={{ marginBottom: '40px' }} className="text-bismark mt-1">
                to enter the system:
              </p>
              <Form.Group className="form-group">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  onChange={e => setEmail(e.target.value)}
                  className={classNames({ 'is-invalid': errors })}
                />
                {errors && errors.email && (
                  <Form.Control.Feedback
                    type="invalid"
                    className="is-invalid-text"
                  >
                    {errors.email}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group className="form-group">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  onChange={e => setPassword(e.target.value)}
                  className={classNames({ 'is-invalid': errors })}
                />
                {errors && errors.password && (
                  <Form.Control.Feedback
                    type="invalid"
                    className="is-invalid-text"
                  >
                    {errors.password}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              {props.apiMessage && !props.apiSuccess && (
                <span className="is-invalid-text text-ceneter mb-2">
                  {props.apiMessage}
                </span>
              )}

              <button
                type="submit"
                className="login__submitbtn"
                disabled={props.signup && props.signup.fetching}
                onClick={handleSignUp}
              >
                Signup
                {props.signup && props.signup.fetching && (
                  <Spinner
                    className="ms-2"
                    animation="border"
                    role="status"
                    size="sm"
                  />
                )}
              </button>

              <span className="mt-2">
                Already have an account?{' '}
                <Link to="/login" className="ml-2">
                  <strong className="text-pink">Sign In</strong>
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

Signup.propTypes = {
  signUpRequest: PropTypes.func,
  signup: PropTypes.object,
  apiMessage: PropTypes.string,
  apiSuccess: PropTypes.string,
};

const mapStateToProps = state => {
  const { auth, app } = state;
  return {
    signup: signup(auth),
    apiSuccess: apiSuccess(auth),
    apiMessage: apiMessage(auth),
    isGlobalAppFetching: app.fetching,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    signUpRequest: payload => dispatch(signUpRequest(payload)),
    resetApi: () => dispatch(resetApi()),
    dispatch,
  };
}

const withReducer = injectReducer({ key: 'auth', reducer });
const withSaga = injectSaga({ key: 'auth', saga });

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Signup);
