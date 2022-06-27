import React from 'react';
import { Button, Image } from 'react-bootstrap';
import increaseIcon from '../../../assets/images/increase.svg';
import handCursorIcon from '../../../assets/images/hand-cursor.svg';

const Broadcast = () => (
  <div className="broadcast-card">
    <div className="text-uppercase">Broadcast</div>
    <Button className="p-0 ms-auto">
      <Image src={increaseIcon} alt="Increase" width={24} />
    </Button>
    <Button className="p-0 ms-4">
      <Image src={handCursorIcon} alt="Hand Cursor" width={24} />
    </Button>
    <Button size="sm" variant="red-10" className="text-red ms-4">
      Stop Sharing
    </Button>
  </div>
);
export default Broadcast;
