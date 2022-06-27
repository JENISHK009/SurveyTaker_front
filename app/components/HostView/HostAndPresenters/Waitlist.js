import React from 'react';
import { Button, Image, ListGroup } from 'react-bootstrap';
import tickIcon from '../../../assets/images/blue/check.svg';
import closeIcon from '../../../assets/images/close.svg';

const Waitlist = () => (
  <>
    <div className="px-3 d-flex justify-content-end border-bottom">
      <Button
        variant="link"
        className="fw-bold text-decoration-none text-blue px-0"
      >
        Admit All
      </Button>
      <Button
        variant="link"
        className="fw-bold text-decoration-none px-0 ms-3 text-bismark"
      >
        Close All
      </Button>
    </div>
    <ListGroup className="waitlist">
      <ListGroup.Item className="d-flex align-items-center">
        anon-43
        <span className="text-gray-middle ms-2">Guest</span>
        <Button className=" ms-auto p-0">
          <Image src={tickIcon} alt="Admit" width={24} />
        </Button>
        <Button className="p-0 ms-2">
          <Image src={closeIcon} alt="Close" width={24} />
        </Button>
      </ListGroup.Item>
      <ListGroup.Item className="d-flex align-items-center">
        anon-43
        <span className="text-gray-middle ms-2">Guest</span>
        <Button className=" ms-auto p-0">
          <Image src={tickIcon} alt="Admit" width={24} />
        </Button>
        <Button className="p-0 ms-2">
          <Image src={closeIcon} alt="Close" width={24} />
        </Button>
      </ListGroup.Item>{' '}
      <ListGroup.Item className="d-flex align-items-center">
        anon-43
        <span className="text-gray-middle ms-2">Guest</span>
        <Button className=" ms-auto p-0">
          <Image src={tickIcon} alt="Admit" width={24} />
        </Button>
        <Button className="p-0 ms-2">
          <Image src={closeIcon} alt="Close" width={24} />
        </Button>
      </ListGroup.Item>
      <ListGroup.Item className="d-flex align-items-center">
        anon-43
        <span className="text-gray-middle ms-2">Guest</span>
        <Button className=" ms-auto p-0">
          <Image src={tickIcon} alt="Admit" width={24} />
        </Button>
        <Button className="p-0 ms-2">
          <Image src={closeIcon} alt="Close" width={24} />
        </Button>
      </ListGroup.Item>
      <ListGroup.Item className="d-flex align-items-center">
        anon-43
        <span className="text-gray-middle ms-2">Guest</span>
        <Button className=" ms-auto p-0">
          <Image src={tickIcon} alt="Admit" width={24} />
        </Button>
        <Button className="p-0 ms-2">
          <Image src={closeIcon} alt="Close" width={24} />
        </Button>
      </ListGroup.Item>
      <ListGroup.Item className="d-flex align-items-center">
        anon-43
        <span className="text-gray-middle ms-2">Guest</span>
        <Button className=" ms-auto p-0">
          <Image src={tickIcon} alt="Admit" width={24} />
        </Button>
        <Button className="p-0 ms-2">
          <Image src={closeIcon} alt="Close" width={24} />
        </Button>
      </ListGroup.Item>
    </ListGroup>
  </>
);

export default Waitlist;
