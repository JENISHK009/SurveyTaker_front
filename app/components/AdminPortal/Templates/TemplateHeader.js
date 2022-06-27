import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SearchBar from '../../../common/searchBar';
import { CONSTANT } from '../../../enum';

const TemplateHeader = ({ handleSearch }) => {
  const { TEMPLATE_URL } = CONSTANT;

  const token = sessionStorage.getItem('userToken');

  const handleRedirect = () => {
    window.open(`${TEMPLATE_URL}?authURI=${token}`, '_blank');
  };

  return (
    <div className="wrapper__header">
      <div className="wrapper__heading">Templates</div>
      <div className="wrapper__heading-right">
        <SearchBar placeHolder="Search Template" handleSearch={handleSearch} />
        <Button
          variant="blue"
          className="ms-3"
          onClick={() => handleRedirect()}
        >
          New Template
        </Button>
      </div>
    </div>
  );
};

TemplateHeader.propTypes = {
  handleSearch: PropTypes.func,
};
export default TemplateHeader;
