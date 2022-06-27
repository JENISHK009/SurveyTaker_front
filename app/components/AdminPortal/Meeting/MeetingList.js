/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useModalWithData } from '../../../hooks/useModalWithData';
import CustomModal from '../../../common/customModal';
import ExportAsModal from './Modals/ExportAsModal';
import { MeetingFolderList } from './MeetingListHeader';
import MeetingListTable from './MeetingListTable';
import DeleteModal from '../../../common/DeleteModal';
import reducer, {
  getMeetings,
  getIsMeetingFetching,
  apiMessage,
  apiSuccess,
  deleteMeeting,
  getTemplates,
  getLanguages,
  getMeetingAccess,
  meetingFolder,
  meetingsFolder,
  moveMeetingFolder,
} from '../../../store/reducers/meetings';
import saga from '../../../store/sagas/meetings';
import injectReducer from '../../../utils/injectReducer';
import injectSaga from '../../../utils/injectSaga';
import {
  meetingsRequest,
  resetApi,
  requestDeleteMeeting,
  templateRequest,
  languageRequest,
  meetingAccessRequest,
  requestCreateMeetingFolder,
  requestGetAllMeetingsFolder,
  requestMoveMeetingFolder,
} from '../../../store/actions/meetings';
import CustomToaster from '../CustomToaster';
import CustomBreadcrumbs from '../../../common/customBreadcrumbs';
import MoveMeeting from './Modals/MoveMeeting';

const MeetingList = props => {
  const { modalOpen, setModalState } = useModalWithData();
  const [deleteModal, setDeleteModal] = useState(false);
  const [meetingListData, setmeetingListData] = useState([]);
  const [search, setSearch] = useState(false);
  const [removeId, setRemoveId] = useState();
  const [checkedCount, setCheckedCount] = useState([]);
  const [meetingFolderModal, setMeetingFolderModal] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [errors, setErrors] = useState({});
  const [modalMove, setModalMove] = useState(false);
  const [moveFolderId, setMoveFolderId] = useState();
  const [meetingId, setMeetingId] = useState('');
  const { id } = useParams();

  // eslint-disable-next-line no-shadow
  const { apiSuccess, apiMessage } = props;

  if (!apiSuccess && apiMessage) {
    toast.error(apiMessage);
  }
  if (apiSuccess && apiMessage) {
    toast.success(apiMessage);
  }

  useEffect(() => {
    if (apiMessage) {
      props.resetApi();
    }
  }, [apiMessage]);

  const meetings = props.meetings && props.meetings.meetingData;

  useEffect(() => {
    props.meetingsRequest(id);
  }, []);

  const { template, languages, accessMeeting } = props;

  useEffect(() => {
    if (
      !template ||
      Object.keys(template).length === 0 ||
      (!languages || Object.keys(languages).length === 0) ||
      (!accessMeeting || Object.keys(accessMeeting).length === 0)
    ) {
      props.templateRequest();
      props.languageRequest();
      props.meetingAccessRequest();
    }
  }, []);

  useEffect(() => {
    if (!search) {
      setmeetingListData(meetings);
    }
  }, [props.meetings]);

  const onSearch = event => {
    let newList = [];
    if (event.target.value !== '') {
      setSearch(true);

      newList =
        meetings &&
        meetings.length > 0 &&
        meetings.filter(({ name }) => {
          const first = name.toLowerCase() || '';
          const filter = event.target.value.toLowerCase().trim();
          return first.includes(filter);
        });
      setmeetingListData(newList);
    } else {
      setSearch(false);
      setmeetingListData(meetings);
    }
  };

  const handleDelete = () => {
    props.requestDeleteMeeting(removeId);
  };

  useEffect(() => {
    if (props.deleteMeeting.fetching === false) {
      props.meetingsRequest(id);
      setCheckedCount([]);
      setDeleteModal(false);
    }
  }, [props.deleteMeeting.fetching]);

  const validateForm = () => {
    const error = {};
    if (!folderName) {
      error.folderName = 'Please Enter Folder Name';
    }

    return error;
  };

  const namevalidate = () => {
    const errorsArray = validateForm();
    if (Object.keys(errorsArray).length > 0) {
      setErrors(errorsArray);
      return;
    }
    props.requestCreateMeetingFolder({ folderName });
  };

  useEffect(() => {
    if (props.meetingFolder.fetching === false) {
      props.meetingsRequest(id);
      setMeetingFolderModal(false);
      setErrors({});
    }
    if (props.meetingFolder.fetching === null && props.meetingFolder.error) {
      setErrors({ folderName: props.meetingFolder.error });
    }
  }, [props.meetingFolder.fetching]);

  const breadCrumb = [
    { title: 'Meetings', url: '/meetings' },
    {
      title:
        meetingListData &&
        meetingListData.length > 0 &&
        meetingListData[0].folderName,
      url: '',
    },
  ];

  const validateMoveForm = () => {
    const error = {};
    if (!moveFolderId && moveFolderId !== null) {
      error.folderId = 'Please Select Folder';
    }
    return error;
  };

  useEffect(() => {
    if (props.moveMeetingFolder && props.moveMeetingFolder.success) {
      setModalMove(false);
      setErrors({});
      setMoveFolderId('');
      setCheckedCount([]);
      props.meetingsRequest(id);
    }
  }, [props.moveMeetingFolder]);

  const handleMoveToFolder = () => {
    const errorsArray = validateMoveForm();
    if (Object.keys(errorsArray).length > 0) {
      setErrors(errorsArray);
      return;
    }

    const data = {
      meetingId,
      folderId: moveFolderId,
    };
    props.requestMoveMeetingFolder(data);
  };
  return (
    <>
      <CustomToaster />
      <CustomBreadcrumbs breadCrumb={breadCrumb} />
      <MeetingFolderList
        handleSearch={onSearch}
        handleMeetingFolderClick={() => setMeetingFolderModal(true)}
        folderData={
          meetingListData &&
          meetingListData.length > 0 &&
          meetingListData[0].folderName
        }
      />
      <MeetingListTable
        setModalState={setModalState}
        setDeleteModal={setDeleteModal}
        meetingsList={meetingListData || []}
        fetching={props.meetings && props.meetings.fetching}
        setRemoveId={setRemoveId}
        setCheckedCount={setCheckedCount}
        checkedCount={checkedCount}
        setModalMove={setModalMove}
        setMeetingId={setMeetingId}
      />

      <CustomModal
        title="Export As"
        isActive={modalOpen}
        handleClose={() => setModalState(false)}
        handleCloseIcon={() => setModalState(false)}
        buttonTitle="Export"
      >
        <ExportAsModal />
      </CustomModal>

      <CustomModal
        title="Create New Folder"
        isActive={meetingFolderModal}
        buttonTitle="Save"
        handleClose={() => {
          namevalidate();
        }}
        handleCloseIcon={() => setMeetingFolderModal(false)}
        isHandleCloseSpinner={
          props.meetingFolder && props.meetingFolder.fetching
        }
      >
        <p>What would you like to name this Folder?</p>
        <Form.Control
          type="text"
          placeholder="Enter"
          name="name"
          onChange={e => {
            setFolderName(e.target.value.trim());
            setErrors({});
          }}
          className={classNames({ 'is-invalid': errors.folderName })}
        />
        {errors.folderName && (
          <Form.Control.Feedback type="invalid">
            {errors.folderName}
          </Form.Control.Feedback>
        )}
      </CustomModal>

      <CustomModal
        title="Move To Folder"
        isActive={modalMove}
        handleClose={handleMoveToFolder}
        handleCloseIcon={() => {
          setModalMove(false);
          setMoveFolderId('');
        }}
        buttonTitle="Move"
        handleClick={() => setModalMove(false)}
        isHandleCloseSpinner={
          props.moveMeetingFolder && props.moveMeetingFolder.fetching
        }
      >
        <MoveMeeting
          meetingsFolder={props.meetingsFolder}
          setMoveFolderId={setMoveFolderId}
          moveFolderId={moveFolderId}
          errors={errors}
          setErrors={setErrors}
        />
      </CustomModal>

      <DeleteModal
        title="Are you sure?"
        isActive={deleteModal}
        handleClose={() => setDeleteModal(false)}
        buttonBottomTitle="Cancel"
        buttonTitle="Delete"
        handleDelete={handleDelete}
        isHandleCloseSpinner={props.deleteMeeting.fetching}
      >
        <p className="text-bismark mb-1">
          This Item Will be Deleted immidiately.{' '}
        </p>
        <p className="text-bismark mb-0">You can't undo this action</p>
      </DeleteModal>
    </>
  );
};

MeetingList.propTypes = {
  meetingsRequest: PropTypes.object,
  meetings: PropTypes.object,
  resetApi: PropTypes.func,
  apiSuccess: PropTypes.bool,
  apiMessage: PropTypes.string,
  requestDeleteMeeting: PropTypes.func,
  deleteMeeting: PropTypes.object,
  template: PropTypes.object,
  templateRequest: PropTypes.func,
  languageRequest: PropTypes.func,
  languages: PropTypes.object,
  meetingAccessRequest: PropTypes.func,
  accessMeeting: PropTypes.object,
  requestCreateMeetingFolder: PropTypes.func,
  meetingFolder: PropTypes.object,
  requestMoveMeetingFolder: PropTypes.func,
  moveMeetingFolder: PropTypes.func,
  meetingsFolder: PropTypes.func,
};

const mapStateToProps = state => {
  const { meetings, app } = state;

  return {
    isFetching: getIsMeetingFetching(meetings),
    meetings: getMeetings(meetings),
    apiMessage: apiMessage(meetings),
    apiSuccess: apiSuccess(meetings),
    deleteMeeting: deleteMeeting(meetings),
    template: getTemplates(meetings),
    languages: getLanguages(meetings),
    accessMeeting: getMeetingAccess(meetings),
    meetingFolder: meetingFolder(meetings),
    meetingsFolder: meetingsFolder(meetings),
    moveMeetingFolder: moveMeetingFolder(meetings),
    isGlobalAppFetching: app.fetching,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    meetingsRequest: payload => dispatch(meetingsRequest(payload)),
    templateRequest: payload => dispatch(templateRequest(payload)),
    languageRequest: payload => dispatch(languageRequest(payload)),
    meetingAccessRequest: payload => dispatch(meetingAccessRequest(payload)),
    resetApi: () => dispatch(resetApi()),
    requestDeleteMeeting: payload => dispatch(requestDeleteMeeting(payload)),
    requestCreateMeetingFolder: payload =>
      dispatch(requestCreateMeetingFolder(payload)),
    requestGetAllMeetingsFolder: payload =>
      dispatch(requestGetAllMeetingsFolder(payload)),
    requestMoveMeetingFolder: payload =>
      dispatch(requestMoveMeetingFolder(payload)),

    dispatch,
  };
}

const withReducer = injectReducer({ key: 'meetings', reducer });
const withSaga = injectSaga({ key: 'meetings', saga });

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(MeetingList);
