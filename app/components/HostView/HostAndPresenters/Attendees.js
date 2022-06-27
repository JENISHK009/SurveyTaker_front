import React from 'react';
import { Accordion, Button, Image, ListGroup } from 'react-bootstrap';
import moreIcon from '../../../assets/images/more-horizontal.svg';
import DropdownAction from '../../../common/dropdownAction';

const HOST_ACTIONS = ['Mute', 'Start a Private Chat', 'Remove from the Room'];
const PRESENTERS_ACTIONS = [
  'Improve Speaking Rights',
  'Disable Chat Rights',
  'Start a Private Chat',
  'Remove from the Room',
  'Block User',
];

const Attendees = () => (
  <>
    <Accordion defaultActiveKey={['0']} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header className="fw-bold">Hosts (1)</Accordion.Header>
        <Accordion.Body>
          <ListGroup>
            <ListGroup.Item className="d-flex align-items-center">
              anon-43
              <span className="text-gray-middle ms-2">Guest</span>
              <DropdownAction options={HOST_ACTIONS} />
            </ListGroup.Item>
            <ListGroup.Item className="d-flex align-items-center">
              {' '}
              anon-43
              <span className="text-gray-middle ms-2">Guest</span>
              <DropdownAction options={HOST_ACTIONS} />
            </ListGroup.Item>
            <ListGroup.Item className="d-flex align-items-center">
              {' '}
              anon-43
              <span className="text-gray-middle ms-2">Guest</span>
              <DropdownAction options={HOST_ACTIONS} />
            </ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Presenters (1)</Accordion.Header>
        <Accordion.Body>
          <ListGroup>
            <ListGroup.Item className="d-flex align-items-center">
              anon-43
              <span className="text-gray-middle ms-2">Guest</span>
              <DropdownAction options={PRESENTERS_ACTIONS} />
            </ListGroup.Item>
            <ListGroup.Item className="d-flex align-items-center">
              {' '}
              anon-43
              <span className="text-gray-middle ms-2">Guest</span>
              <DropdownAction options={PRESENTERS_ACTIONS} />
            </ListGroup.Item>
            <ListGroup.Item className="d-flex align-items-center">
              {' '}
              anon-43
              <span className="text-gray-middle ms-2">Guest</span>
              <Button className=" ms-auto p-0">
                <Image src={moreIcon} alt="More" />
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Participants (5)</Accordion.Header>
        <Accordion.Body>
          <ListGroup>
            <ListGroup.Item className="d-flex align-items-center">
              anon-43
              <span className="text-gray-middle ms-2">Guest</span>
              <DropdownAction options={PRESENTERS_ACTIONS} />
            </ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </>
);

export default Attendees;
