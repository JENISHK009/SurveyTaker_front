import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const SurveyTopHeader = ({ setModalOpen }) => (
  <div className="wrapper__header">
    <div className="wrapper__heading">Surveys</div>
    <div className="wrapper__heading-right">
      <Button variant="blue" className="ms-3" onClick={setModalOpen}>
        Create New Survey
      </Button>
    </div>
  </div>
);

SurveyTopHeader.propTypes = {
  setModalOpen: PropTypes.bool,
};

export default SurveyTopHeader;
