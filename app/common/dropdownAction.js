import React from 'react';
import { Dropdown, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import moreIcon from '../assets/images/more-horizontal.svg';

const DropdownAction = ({ options }) => (
  <Dropdown align="end" className="ms-auto">
    <div className="custom-navbar__dropdown">
      <Dropdown.Toggle className="p-0">
        <Image
          className="custom-navbar__arrow"
          src={moreIcon}
          width={24}
          height={24}
          alt="Arrow"
        />
      </Dropdown.Toggle>
    </div>
    <Dropdown.Menu>
      {options &&
        options.length > 0 &&
        options.map(option => <Dropdown.Item>{option}</Dropdown.Item>)}
    </Dropdown.Menu>
  </Dropdown>
);

DropdownAction.propTypes = {
  options: PropTypes.array,
};

export default DropdownAction;
