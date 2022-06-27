import classNames from 'classnames';
import React, { useState } from 'react';
import { Image, ListGroup } from 'react-bootstrap';
import tickIcon from '../../../assets/images/blue/check.svg';

const LIST = [
  'Template1_1.0',
  'Template1_1.0',
  'Template1_1.0',
  'Template1_1.0',
  'Template1_1.0',
  'Template1_1.0',
  'Template1_1.0',
  'Template1_1.0',
  'Template1_1.0',
  'Template1_1.0',
  'Template1_1.0',
  'Template1_1.0',
  'Template1_1.0',
  'Template1_1.0',
];
const SelectTemplate = () => {
  const [activeTemplate, setActiveTemplate] = useState(1);
  return (
    <ListGroup className="select-template-list">
      {LIST.map((obj, index) => (
        <ListGroup.Item
          onClick={() => setActiveTemplate(index)}
          className={classNames({ 'text-blue': activeTemplate === index })}
        >
          {obj}{' '}
          {activeTemplate === index && (
            <Image className="ms-auto" src={tickIcon} width={24} height={24} />
          )}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default SelectTemplate;
