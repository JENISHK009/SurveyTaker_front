import React, { useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import sendBlueIcon from '../assets/images/blue/send.svg';
import sendIcon from '../assets/images/send.svg';

const MessageInput = () => {
  const [message, setMessage] = useState('');

  return (
    <div className="message__input">
      <Form.Control
        type="text"
        placeholder="Send a message..."
        onChange={e => setMessage(e.target.value)}
        value={message}
      />
      <Button
        disabled={!message}
        onClick={() => {
          setMessage('');
        }}
        className="border-0"
      >
        <Image src={message ? sendBlueIcon : sendIcon} alt="Send" width={24} />
      </Button>
    </div>
  );
};

export default MessageInput;
