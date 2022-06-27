import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Button, Form, Image, ProgressBar } from 'react-bootstrap';
import tickIcon from '../../../../assets/images/tick.svg';
import standardUI from '../../../../assets/images/standard.svg';
import OAATUI from '../../../../assets/images/one_at_a_time.svg';
import LockedHeader from '../LockedHeader';

const Style = () => {
  const [fontSize, setFontSize] = useState('large');
  const [desktopInteraction, setDesktopInteraction] = useState('standard');

  useEffect(() => {
    const wrapper = document.querySelector('.wrapper');
    wrapper.style.width = 'calc(100% - 515px)';

    return () => {
      wrapper.style.width = 'auto';
    };
  }, []);
  return (
    <>
      <div className="style-sidebar">
        <div className="fs-14 text-uppercase text-bismark fw-bold">TEXT</div>
        <div className="ticks-btn export-as-btn mb-5">
          <Button
            variant="alice-blue"
            className={classNames({ active: fontSize === 'large' })}
            onClick={() => setFontSize('large')}
            onFocus={() => setFontSize('large')}
          >
            <div
              style={{ fontSize: '40px' }}
              className="text-gray-black fw-bold"
            >
              A
            </div>
            {fontSize === 'large' && (
              <Image className="tick-icon" src={tickIcon} alt="tick" />
            )}
          </Button>
          <Button
            variant="alice-blue"
            className={classNames({ active: fontSize === 'small' })}
            onClick={() => setFontSize('small')}
            onFocus={() => setFontSize('small')}
          >
            <div
              style={{ fontSize: '32px' }}
              className="text-gray-black fw-bold"
            >
              A
            </div>
            {fontSize === 'small' && (
              <Image className="tick-icon" src={tickIcon} alt="tick" />
            )}
          </Button>
        </div>
        <div className="fs-14 text-uppercase text-bismark mb-2 fw-bold">
          THEMES
        </div>
        <Form.Select className="mb-5">
          <option value="1">EVS</option>
          <option value="2">Seramount</option>
        </Form.Select>

        <div className="fs-14 text-uppercase text-bismark fw-bold">
          DESKTOP iNTERACTION
        </div>
        <div className="ticks-btn export-as-btn mb-5">
          <Button
            variant="alice-blue"
            className={classNames(
              { active: desktopInteraction === 'standard' },
              'px-1 w-50',
            )}
            onClick={() => setDesktopInteraction('standard')}
            onFocus={() => setDesktopInteraction('standard')}
          >
            <Image src={standardUI} alt="Standard UI" />
            <div className="fs-14 mt-2">Standard</div>
            {desktopInteraction === 'standard' && (
              <Image className="tick-icon" src={tickIcon} alt="tick" />
            )}
          </Button>
          <Button
            variant="alice-blue"
            className={classNames(
              { active: desktopInteraction === 'oaat' },
              'px-1 w-50',
            )}
            onClick={() => setDesktopInteraction('oaat')}
            onFocus={() => setDesktopInteraction('oaat')}
          >
            <Image src={OAATUI} alt="OAAT UI" />
            <div className="fs-14 mt-2">One at a Time</div>
            {desktopInteraction === 'oaat' && (
              <Image className="tick-icon" src={tickIcon} alt="tick" />
            )}
          </Button>
        </div>
      </div>

      <div className="registration-style">
        <LockedHeader />
        <div className="registration-style__wrapper">
          <div className="style__header">
            <div className="wrapper__heading">Registration Demo Test</div>
            <div className="custom-progressbar">
              <div className="custom-progressbar__header">
                <div>Progress</div>
                <div>1/3</div>
              </div>
              <ProgressBar now={25} />
            </div>
          </div>
          <div className="style__content">
            <p className="mb-4">
              As part of our initiative to continue to build a more inclusive
              and collaborative culture, we are eager to hear your perspectives
              and invite you to join an upcoming Employee Voice (EV) Session.
              This virtual for group will allow to share your feedback in an
              engaging and anonymous forum facilitated by diversity and
              inclusion experts at Seramount. You can join in the conversation
              from any location. You’ll need a laptop, desktop computer or
              iPad/tablet and a phone to participate. Thank you in advance for
              your consideration to participate.{' '}
            </p>
            <h6 className="fs-18 fw-bold mb-3">Registration and Logistics:</h6>
            <p className="mb-3">
              The Employee Voice Sessions are 60 minute anonymous on-line focus
              groups that allow colleagues to participate in real-time on a
              web-based platform. You will not be speaking during the session,
              rather the sessions will be moderated by a Seramount employee.
              During the session, you will be assigned an anonymous user ID and
              respond to questions through the platform by selecting answer
              choices and entering comments to questions online. We hope you are
              able to join us for an upcoming session. Please begin the
              registration process by clicking “Next” at the bottom of this
              page.
            </p>
            <p className="mb-0 text-bismark">
              “The form will be asking for your email address. We are constantly
              concerned with your anonymity during this process, so would like
              to take this time to assure you that this information is being
              collected only for event registration purposes, and will not be
              tied to your responses in the online focus group session.”
            </p>
            <Form.Group className="form-group mt-5 mb-5">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter"
                style={{ width: '484px' }}
              />
            </Form.Group>
          </div>
          <div className="style__footer">
            <Button variant="blue">Next</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Style;
