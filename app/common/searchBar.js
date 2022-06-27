import React from 'react';
import PropTypes from 'prop-types';
import { Form, Image } from 'react-bootstrap';
import searchIcon from '../assets/images/search.svg';
const SearchBar = ({ placeHolder, handleSearch }) => (
  <Form className="searchbar-form">
    <div className="custom-input-group position-relative">
      <Image className="custom-input-group__prefix" src={searchIcon} />
      <Form.Control
        type="text"
        placeholder={placeHolder}
        className="searchbar-form__control"
        onChange={handleSearch}
      />
    </div>
  </Form>
);

SearchBar.propTypes = {
  placeHolder: PropTypes.string,
  handleSearch: PropTypes.func,
};
export default SearchBar;
