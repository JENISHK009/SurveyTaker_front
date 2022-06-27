/* eslint-disable no-shadow */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Form, ListGroup, Image, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { toast } from 'react-toastify';
import SurveyListTable from './SurveyListTable';
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
  getIsRegistrationFormFetching,
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
  SurveysRequest,
  surveysRemoveRequest,
  requestCreateSurveyFolder,
  resetCreateSurvey,
  // requestFolderList,
  requestCopySurvey,
  requestSurveyArchived,
  createSurveyFolderSuccess,
  createSurveyFolderFailed,
  resetLogic,
} from '../../../store/actions/registrationForm';
import tickIcon from '../../../assets/images/blue/tick.svg';
import SurveyTopHeader from './SurveyTopHeader';
import CustomToaster from '../CustomToaster';
import CustomBreadcrumbs from '../../../common/customBreadcrumbs';
import SearchBar from '../../../common/searchBar';

const SurveyView = props => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const { modalState, setModalState } = useModalWithData();
  const [modalMove, setModalMove] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [surveyData, setsurveyData] = useState([]);
  const [search, setSearch] = useState(false);
  const [removeId, setRemoveId] = useState(false);
  const [nextModal, setNextModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [folderId, setFolderId] = useState('null');
  const [errors, setErrors] = useState({});
  const [surveyType, setSurveyType] = useState('');
  const [checkedCount, setCheckedCount] = useState([]);
  const { id } = useParams();

  const { apiMessage, apiSuccess, getSuerveyData } = props;

  if (!apiSuccess && apiMessage) {
    toast.error(apiMessage || 'Something went wrong');
  }
  if (apiSuccess && apiMessage) {
    toast.success(apiMessage);
  }

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
    setNextModal(true);
  };

  const createSurvayBuild = () => {
    // payload create
    props.requestCreateSurvey({ surveyName: name, folder: folderId });
  };

  useEffect(() => {
    if (
      props.isCreateSurvey &&
      props.isCreateSurvey.survey &&
      props.isCreateSurvey.survey.success
    ) {
      history.replace(
        `/surveys/registration-form/${
          props.isCreateSurvey.survey.data.uniqueNumber
        }`,
      );
      props.resetCreateSurvey();
    }
    if (!search) {
      setsurveyData(props.getSuerveyData);
    }
  }, [props.isCreateSurvey.survey, props.getSuerveyData]);

  useEffect(() => {
    props.SurveysRequest({ surveyType, id });
  }, [surveyType]);

  const onSearch = event => {
    let newList = [];
    if (event.target.value !== '') {
      setSearch(true);
      // eslint-disable-next-line camelcase
      newList =
        props.getSuerveyData &&
        props.getSuerveyData.length > 0 &&
        props.getSuerveyData.filter(({ surveyName }) => {
          const first = (surveyName && surveyName.toLowerCase()) || '';
          const filter = event.target.value.toLowerCase().trim();
          return first.includes(filter);
        });
      setsurveyData(newList);
    } else {
      setSearch(false);
      setsurveyData(props.getSuerveyData);
    }
  };

  // useEffect(() => {
  //   props.requestFolderList();
  // }, []);

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
        surveyData &&
        surveyData.length > 0 &&
        surveyData.filter(data => !removeId.includes(data.id));
      setsurveyData(updatedData);
      setCheckedCount([]);
      setDeleteModal(false);
    }
  }, [props.removeSurveys]);

  const [activeTemplate, setActiveTemplate] = useState();

  const breadCrumb = [
    { title: 'Surveys', url: '/surveys' },
    {
      title:
        getSuerveyData &&
        getSuerveyData.length > 0 &&
        getSuerveyData &&
        getSuerveyData[0].folderName,
      url: '',
    },
  ];

  return (
    <>
      <CustomToaster />
      <CustomBreadcrumbs breadCrumb={breadCrumb} />

      <div className="wrapper__header">
        <div className="wrapper__heading">
          {getSuerveyData &&
            getSuerveyData.length > 0 &&
            getSuerveyData &&
            getSuerveyData[0].folderName}
        </div>
        <div className="wrapper__heading-right">
          <SearchBar placeHolder="Search For Surveys" handleSearch={onSearch} />
        </div>
      </div>

      <SurveyListTable
        setModalState={setModalState}
        setModalMove={setModalMove}
        setDeleteModal={setDeleteModal}
        handleSurveyDelete={handleSurveyDelete}
        getSuerveyData={surveyData}
        getAllSurveyFetching={props.getAllSurveyFetching}
        requestCopySurvey={props.requestCopySurvey}
        copySurvey={props.copySurvey}
        requestSurveyArchived={props.requestSurveyArchived}
        surveyArchivedData={props.surveyArchived}
        setCheckedCount={setCheckedCount}
        checkedCount={checkedCount}
        SurveysRequest={() => props.SurveysRequest({ surveyType, id })}
      />

      <CustomModal
        title="Create New Survey"
        isActive={modalOpen}
        buttonTitle="Next"
        handleClose={() => {
          namevalidate();
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

      {nextModal && (
        <CustomModal
          title="Select Folder"
          isActive={modalOpen}
          buttonTitle="Start Building"
          handleClose={createSurvayBuild}
          isHandleCloseSpinner={
            props.isCreateSurvey && props.isCreateSurvey.surveyFetching
          }
          buttonBottomTitle="Cancel"
          buttonBottomFrom
          handleSaveClick={() => {
            setNextModal(false);
            setModalOpen(false);
          }}
          handleCloseIcon={() => setNextModal(false)}
        >
          {getFolderList && getFolderList.fetching ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="grow" />
            </div>
          ) : (
            <ListGroup className="select-template-list">
              <ListGroup.Item
                onClick={() => setFolderId(null)}
                className={classNames({ 'text-blue': folderId === null })}
              >
                No Folder
                {folderId === null && (
                  <Image
                    className="ms-auto"
                    src={tickIcon}
                    width={24}
                    height={24}
                  />
                )}
              </ListGroup.Item>
              {getFolderList &&
                getFolderList.folderListdata &&
                getFolderList.folderListdata.data &&
                getFolderList.folderListdata.data.length > 0 &&
                getFolderList.folderListdata.data.map((obj, index) => (
                  <ListGroup.Item
                    onClick={() => {
                      setFolderId(obj.id);
                      setActiveTemplate(index);
                    }}
                    className={classNames({
                      'text-blue': activeTemplate === index,
                    })}
                  >
                    {obj.folderName}
                    {activeTemplate === index && (
                      <Image
                        className="ms-auto"
                        src={tickIcon}
                        width={24}
                        height={24}
                      />
                    )}
                  </ListGroup.Item>
                ))}
            </ListGroup>
          )}
        </CustomModal>
      )}

      <DeleteModal
        title="Are you sure?"
        isActive={deleteModal}
        handleDelete={() => {
          hanldleRemoveSurvey();
        }}
        buttonBottomTitle="Cancel"
        handleClose={() => setDeleteModal(false)}
        buttonTitle="Delete"
        isHandleCloseSpinner={
          props.removeSurveys && props.removeSurveys.fetching
        }
      >
        <p className="text-bismark mb-1">
          This Item Will be Deleted immidiately.{' '}
        </p>
        <p className="text-bismark mb-0">You can't undo this action</p>
      </DeleteModal>
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
    SurveysRequest: payload => dispatch(SurveysRequest(payload)),
    surveysRemoveRequest: payload => dispatch(surveysRemoveRequest(payload)),
    resetCreateSurvey: () => dispatch(resetCreateSurvey()),
    requestCreateSurveyFolder: payload =>
      dispatch(requestCreateSurveyFolder(payload)),
    createSurveyFolderSuccess: payload =>
      dispatch(createSurveyFolderSuccess(payload)),
    createSurveyFolderFailed: payload =>
      dispatch(createSurveyFolderFailed(payload)),
    // requestFolderList: payload => dispatch(requestFolderList(payload)),
    requestCopySurvey: payload => dispatch(requestCopySurvey(payload)),
    requestSurveyArchived: payload => dispatch(requestSurveyArchived(payload)),
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
)(SurveyView);

SurveyView.propTypes = {
  requestCreateSurvey: PropTypes.func,
  SurveysRequest: PropTypes.func,
  surveysRemoveRequest: PropTypes.func,
  getSuerveyData: PropTypes.object,
  isCreateSurvey: PropTypes.func,
  // requestCreateSurveyFolder: PropTypes.func,
  getAllSurveyFetching: PropTypes.bool,
  resetCreateSurvey: PropTypes.object,
  // requestFolderList: PropTypes.func,
  getFolderList: PropTypes.object,
  requestCopySurvey: PropTypes.func,
  copySurvey: PropTypes.object,
  requestSurveyArchived: PropTypes.func,
  surveyArchived: PropTypes.object,
  removeSurveys: PropTypes.object,
  apiSuccess: PropTypes.bool,
  apiMessage: PropTypes.string,
  resetLogic: PropTypes.func,
};
