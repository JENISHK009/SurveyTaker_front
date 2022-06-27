import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SearchBar from '../../../common/searchBar';
import Plus from '../../../assets/images/blue/plus.svg';
// import Download from '../../../assets/images/blue/download.svg';
import CustomModal from '../../../common/customModal';
import { createSurveyFolder } from '../../../store/apis/registrationForm';
import saga from '../../../store/sagas/registrationForm';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import {
  createSurveyFolderFailed,
  createSurveyFolderSuccess,
  requestFolderList,
} from '../../../store/actions/registrationForm';
import reducer from '../../../store/reducers/registrationForm';

const SurveyListHeader = ({ handleSearch, ...props }) => {
  const [newFolderModal, setNewFolderModal] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [isProcessing, setIsprocessing] = useState(false);
  const [createRes, setCreateRes] = useState();

  const handleAddSurveyFolder = () => {
    setIsprocessing(true);
    createSurveyFolder({ folderName })
      .then(res => {
        props.createSurveyFolderSuccess(res.data.data);
        setCreateRes(res.data);
      })
      .catch(err => {
        props.createSurveyFolderFailed(err);
      })
      .finally(() => {
        setIsprocessing(false);
      });
  };

  useEffect(() => {
    if (createRes && createRes.success) {
      setNewFolderModal(false);
      props.requestFolderList(true);
    }
  }, [createRes]);

  return (
    <>
      <div className="wrapper__header">
        <SearchBar
          placeHolder="Search For Surveys"
          handleSearch={handleSearch}
        />
        <div className="wrapper__heading-right">
          {/* <Button variant="" className="ms-3 text-blue">
            <Image className="me-2" src={Download} />
            Download Survey List
          </Button> */}
          <Button
            variant="blue-10"
            className="ms-3 text-blue"
            onClick={() => setNewFolderModal(true)}
          >
            <Image className="me-2" src={Plus} />
            New Folder
          </Button>
        </div>
      </div>
      {newFolderModal && (
        <CustomModal
          title="Create New Survey Folder"
          isActive
          buttonTitle="Save"
          handleClose={handleAddSurveyFolder}
          buttonBottomTitle="Cancel"
          handleCloseIcon={() => setNewFolderModal(false)}
          isHandleCloseSpinner={isProcessing}
        >
          <p>What would you like to name this Survey Folder?</p>
          <Form.Control
            type="text"
            placeholder="Enter"
            name="name"
            className="mb-3"
            onChange={e => setFolderName(e.target.value)}
          />
        </CustomModal>
      )}
    </>
  );
};

SurveyListHeader.propTypes = {
  handleSearch: PropTypes.bool,
  createSurveyFolderSuccess: PropTypes.func,
  createSurveyFolderFailed: PropTypes.func,
  requestFolderList: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    createSurveyFolderSuccess: payload =>
      dispatch(createSurveyFolderSuccess(payload)),
    createSurveyFolderFailed: payload =>
      dispatch(createSurveyFolderFailed(payload)),
    requestFolderList: payload => dispatch(requestFolderList(payload)),

    dispatch,
  };
}

const withReducer = injectReducer({ key: 'registrationForm', reducer });
const withSaga = injectSaga({ key: 'registrationForm', saga });

export default compose(
  withReducer,
  withSaga,
  connect(
    null,
    mapDispatchToProps,
  ),
)(SurveyListHeader);
