/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Form, ListGroup, Image, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { toast } from 'react-toastify';
import { useModalWithData } from '../../../hooks/useModalWithData';
import DeleteModal from '../../../common/DeleteModal';
import SurveyListHeader from './SurveyListHeader';
import CustomModal from '../../../common/customModal';
import saga from '../../../store/sagas/registrationForm';
import injectReducer from '../../../utils/injectReducer';
import injectSaga from '../../../utils/injectSaga';
import SurveyTab from './SurveyTab';
import reducer, {
  createSurveyForm,
  getAllSurveyFetching,
  //   getIsRegistrationFormFetching,
  getSurveys,
  getFolderList,
  fetchCopySurvey,
  surveyArchived,
  removeSurveys,
  apiMessage,
  apiSuccess,
} from '../../../store/reducers/registrationForm';
import {
  requestCreateSurvey,
  surveysRemoveRequest,
  requestCreateSurveyFolder,
  resetCreateSurvey,
  requestFolderList,
  requestCopySurvey,
  requestSurveyArchived,
  createSurveyFolderSuccess,
  createSurveyFolderFailed,
  resetLogic,
  SurveysRequest,
} from '../../../store/actions/registrationForm';
import tickIcon from '../../../assets/images/blue/tick.svg';
import SurveyTopHeader from './SurveyTopHeader';
import CustomToaster from '../CustomToaster';
import SurveyFolderListTable from './SurveyFolderListTable';

const SurveyFolderView = props => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const { modalState, setModalState } = useModalWithData();
  const [modalMove, setModalMove] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [search, setSearch] = useState(false);
  const [removeId, setRemoveId] = useState({});
  const [nextModal, setNextModal] = useState(false);
  const [folderId, setFolderId] = useState('null');
  const [errors, setErrors] = useState({});
  const [surveyType, setSurveyType] = useState('');
  const [checkedCount, setCheckedCount] = useState([]);
  const [surveyFolderData, setSurveyFolderData] = useState([]);
  const [checkedFolderCount, setCheckedFolderCount] = useState([]);

  const { apiMessage, apiSuccess } = props;

  if (!apiSuccess && apiMessage) {
    toast.error(apiMessage || 'Something went wrong');
  }
  if (apiSuccess && apiMessage) {
    toast.success(apiMessage);
  }

  useEffect(() => {
    if (
      props.getFolderList &&
      props.getFolderList.folderListdata &&
      props.getFolderList.folderListdata.data &&
      props.getFolderList.folderListdata.data.length > 0
    ) {
      if (!search) {
        setSurveyFolderData(
          props.getFolderList &&
            props.getFolderList.folderListdata &&
            props.getFolderList.folderListdata.data,
        );
      }
    }
  }, [props.getFolderList]);

  useEffect(() => {
    if (apiMessage) {
      props.resetLogic();
    }
  }, [apiMessage]);

  const validateForm = () => {
    const error = {};
    if (!name) {
      error.label = 'Please Enter SurveyName';
    }
    return error;
  };

  const namevalidate = () => {
    const errorsArray = validateForm();
    if (Object.keys(errorsArray).length > 0) {
      setErrors(errorsArray);
      return;
    }
    setNextModal(false);
  };
  const createSurvayBuild = () => {
    // payload create
    props.requestCreateSurvey({ userId: 1, surveyName: name });
  };

  useEffect(() => {
    console.log(
      'props.isCreateSurveyprops.isCreateSurvey.survey.success',
      props.isCreateSurvey,
    );
    if (
      props.isCreateSurvey &&
      props.isCreateSurvey.survey &&
      props.isCreateSurvey.survey.success
    ) {
      console.log('inueeeeeee');
      history.push(
        `/surveys/registration-form/${props.isCreateSurvey.survey.data.id}`,
      );
      props.resetCreateSurvey();
    }
  }, [props.isCreateSurvey.survey, props.getSuerveyData]);

  useEffect(() => {
    props.requestFolderList(true);
  }, []);

  const handleSurveyDelete = Id => {
    setRemoveId(Id);
    setDeleteModal(true);
  };

  const { getFolderList } = props;
  const hanldleRemoveSurvey = () => {
    props.surveysRemoveRequest(removeId);
  };

  useEffect(() => {
    if (props.removeSurveys && props.removeSurveys.fetching === false) {
      const updatedData =
        surveyFolderData &&
        surveyFolderData.length > 0 &&
        surveyFolderData.filter(
          data =>
            ![...removeId.surveyId, ...removeId.folderId].includes(data.id),
        );
      props.requestFolderList(true);

      // setSurveyFolderData(updatedData);
      setCheckedCount([]);
      setCheckedFolderCount([]);
      setDeleteModal(false);
    }
  }, [props.removeSurveys]);

  const [activeTemplate, setActiveTemplate] = useState();
  useEffect(() => {
    if (surveyType === 'All Surveys') {
      props.requestFolderList(true);
      return;
    }
    props.SurveysRequest({ surveyType });
  }, [surveyType]);

  return (
    <>
      {/* <CustomToaster /> */}
      <SurveyTopHeader setModalOpen={setModalOpen} />
      <SurveyFolderListTable
        requestFolderList={props.requestFolderList}
        setModalState={setModalState}
        setModalMove={setModalMove}
        setDeleteModal={setDeleteModal}
        handleSurveyDelete={handleSurveyDelete}
        getSuerveyFolderData={surveyFolderData}
        getAllSurveyFetching={props.getAllSurveyFetching}
        requestCopySurvey={props.requestCopySurvey}
        copySurvey={props.copySurvey}
        requestSurveyArchived={props.requestSurveyArchived}
        surveyArchivedData={props.surveyArchived}
        setCheckedCount={setCheckedCount}
        checkedCount={checkedCount}
        getFolderList={props.getFolderList}
        setCheckedFolderCount={setCheckedFolderCount}
        checkedFolderCount={checkedFolderCount}
        surveyType={surveyType}
        getSuerveyData={props.getSuerveyData}
      />
      <CustomModal
        title="Create New Survey"
        isActive={modalOpen}
        buttonTitle="Next"
        handleClose={() => {
          // namevalidate();
          createSurvayBuild();
        }}
        handleCloseIcon={() => setModalOpen(false)}
      >
        <p>What would you like to name this Survey?</p>
        <Form.Control
          type="text"
          placeholder="Enter"
          name="name"
          onChange={e => setName(e.target.value)}
          className={classNames({ 'is-invalid': errors.label })}
        />
        {errors.label && (
          <Form.Control.Feedback type="invalid">
            {errors.label}
          </Form.Control.Feedback>
        )}
      </CustomModal>
    </>
  );
};

const mapStateToProps = state => {
  const { app, registrationForm } = state;
  return {
    isCreateSurvey: createSurveyForm(registrationForm),
    getSuerveyData: getSurveys(registrationForm),
    getAllSurveyFetching: getAllSurveyFetching(registrationForm),
    getFolderList: getFolderList(registrationForm),
    copySurvey: fetchCopySurvey(registrationForm),
    surveyArchived: surveyArchived(registrationForm),
    removeSurveys: removeSurveys(registrationForm),
    apiSuccess: apiSuccess(registrationForm),
    apiMessage: apiMessage(registrationForm),
    isGlobalAppFetching: app.fetching,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestCreateSurvey: payload => dispatch(requestCreateSurvey(payload)),
    surveysRemoveRequest: payload => dispatch(surveysRemoveRequest(payload)),
    resetCreateSurvey: () => dispatch(resetCreateSurvey()),
    requestCreateSurveyFolder: payload =>
      dispatch(requestCreateSurveyFolder(payload)),
    createSurveyFolderSuccess: payload =>
      dispatch(createSurveyFolderSuccess(payload)),
    createSurveyFolderFailed: payload =>
      dispatch(createSurveyFolderFailed(payload)),
    requestFolderList: payload => dispatch(requestFolderList(payload)),
    requestCopySurvey: payload => dispatch(requestCopySurvey(payload)),
    requestSurveyArchived: payload => dispatch(requestSurveyArchived(payload)),
    SurveysRequest: payload => dispatch(SurveysRequest(payload)),
    resetLogic: () => dispatch(resetLogic()),
    dispatch,
  };
}

const withReducer = injectReducer({ key: 'registrationForm', reducer });
const withSaga = injectSaga({ key: 'registrationForm', saga });

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(SurveyFolderView);

SurveyFolderView.propTypes = {
  requestCreateSurvey: PropTypes.func,
  surveysRemoveRequest: PropTypes.func,
  getSuerveyData: PropTypes.object,
  isCreateSurvey: PropTypes.func,
  requestCreateSurveyFolder: PropTypes.func,
  getAllSurveyFetching: PropTypes.bool,
  resetCreateSurvey: PropTypes.object,
  requestFolderList: PropTypes.func,
  getFolderList: PropTypes.object,
  requestCopySurvey: PropTypes.func,
  copySurvey: PropTypes.object,
  requestSurveyArchived: PropTypes.func,
  surveyArchived: PropTypes.object,
  removeSurveys: PropTypes.object,
  apiSuccess: PropTypes.bool,
  apiMessage: PropTypes.string,
  resetLogic: PropTypes.func,
  SurveysRequest: PropTypes.func,
};
