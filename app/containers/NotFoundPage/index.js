/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';

import errorImg from '../../assets/images/picture.svg';
export default function NotFound() {
  return (
    <>
      <div>
        <img
          src={errorImg}
          alt=""
          style={{ margin: '8rem auto auto auto', display: 'flex' }}
        />
      </div>
      <div style={{ marginTop: '4rem' }}>
        <h2 className="text-center">Oops...</h2>
        <p className="text-center">
          We {"can't"} seems to find the page you are looking for.{' '}
        </p>
      </div>
      <div className="onboarding-main ">
        <Link to="/">
          <button type="button" className="change_btn text-center">
            Return to Home
          </button>
        </Link>
      </div>
    </>
    // <h1>
    //   <FormattedMessage {...messages.header} />
    // </h1>
  );
}
