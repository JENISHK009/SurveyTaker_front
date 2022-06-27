import React, { useState } from 'react';
import {
  Button,
  Dropdown,
  Image,
  OverlayTrigger,
  Tab,
  Tabs,
  Tooltip,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Messages from './messages';
import closeIcon from '../../assets/images/close.svg';

import MessageInput from '../messageInput';

const OPTIONS = ['Host', 'Presenter'];

const Chat = ({ isChatExpanded }) => {
  const [selectedOption, setSelectedOption] = useState();

  return (
    <>
      <div className={classNames({ expanded: isChatExpanded }, 'chat')}>
        <div className="host-sidebar__heading">Moderator</div>
        <div className="chat-tabs">
          <Tabs activeKey={selectedOption || 'Everyone'} className="lined-tabs">
            <Tab eventKey="Everyone" title="Everyone">
              <Messages />
            </Tab>
            {selectedOption && (
              <Tab
                eventKey={selectedOption}
                title={
                  <span className="d-flex align-items-center">
                    {selectedOption}
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Close</Tooltip>}
                    >
                      <Button
                        className="p-0 ms-2"
                        onClick={() => setSelectedOption()}
                      >
                        <Image src={closeIcon} width={16} />
                      </Button>
                    </OverlayTrigger>
                  </span>
                }
              >
                <Messages />
              </Tab>
            )}
          </Tabs>
          <Dropdown align="end">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Start a Private Chat</Tooltip>}
            >
              <Dropdown.Toggle className="p-0" />
            </OverlayTrigger>

            <Dropdown.Menu>
              {OPTIONS.map(option => (
                <Dropdown.Item onClick={() => setSelectedOption(option)}>
                  {option}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <MessageInput />
      </div>
    </>
  );
};

Chat.propTypes = {
  isChatExpanded: PropTypes.bool,
};

export default Chat;
