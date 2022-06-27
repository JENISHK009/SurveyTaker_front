import React from 'react';
import { Image } from 'react-bootstrap';
import checkAllIcon from '../../assets/images/blue/check-all.svg';

const Messages = () => (
  <>
    <div className="message">
      <div className="message__sent">
        <div className="message__sent-text">Slim Aarons</div>
      </div>
      <div className="message__sent-detail">
        <Image src={checkAllIcon} alt="Double Tick" /> 3:00PM{' '}
      </div>

      <div className="message__received">
        <div className="message__received-text">That’s him!</div>
        <div className="message__received-text">
          What was his vision statement?
        </div>
      </div>
      <div className="message__received-detail">anon 1, 3:00PM </div>
      <div className="message__sent">
        <div className="message__sent-text">
          “Attractive people doing attractive things in attractive places”{' '}
        </div>
      </div>
      <div className="message__sent-detail">
        <Image src={checkAllIcon} alt="Double Tick" /> 3:00PM{' '}
      </div>
      <div className="message__received">
        <div className="message__received-text">That’s him!</div>
        <div className="message__received-text">
          What was his vision statement?
        </div>
      </div>
      <div className="message__received-detail">anon 1, 3:00PM </div>
    </div>
  </>
);

export default Messages;
