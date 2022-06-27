import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/locked-logo.svg';

const isScreenLocked = true;
const LockedScreen = () => (
  <>
    <header className="locked-screen-header">
      <Image src={logo} alt="Logo" width={108} className="mb-2" />
      <div className="text-white mt-1">We Empower Inclusive Workplaces</div>
    </header>
    <section className="locked-screen-wrapper text-center">
      {isScreenLocked && (
        <>
          <div className="mb-5 fs-18" style={{ maxWidth: '486px' }}>
            Please join the conference line using the information below and wait
            for further instructions from the facilitator.
          </div>
          <Link className="text-blue mb-2 text-decoration-none fs-18" to="/">
            Dial-In#
          </Link>
          <div className="mt-1 fs-18" style={{ maxWidth: '486px' }}>
            US: +1 201-479-4595 // Outside US: +1 855-346-3893 Meeting Number:
            33911576 followed by the # key
          </div>
          <div className="text-bismark mt-4">
            You must dial in using a separate phone line to hear the audio when
            the session begins
          </div>
        </>
      )}
      {!isScreenLocked && (
        <>
          <div className="wrapper__heading mb-4">
            Waiting for the host to start this meeting
          </div>
          <div className="mb-2 fs-18">This is a recurring meeting</div>
          <div className="mt-1 fs-18">
            If you are the host, please{' '}
            <Link className="text-blue" to="/">
              sign in
            </Link>{' '}
            to start this meeting
          </div>
        </>
      )}
    </section>
  </>
);

export default LockedScreen;
