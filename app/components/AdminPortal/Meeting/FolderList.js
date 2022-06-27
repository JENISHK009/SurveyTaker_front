import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form } from 'react-bootstrap';
import MeetingFolderListTable from './MeetingFolderListTable';
import { MeetingListHeader } from './MeetingListHeader';
import reducer, {
  deleteMeeting,
  meetingFolder,
  meetingsFolder,
  moveMeetingFolder,
} from '../../../store/reducers/meetings';
import saga from '../../../store/sagas/meetings';
import injectReducer from '../../../utils/injectReducer';
import injectSaga from '../../../utils/injectSaga';
import {
  requestGetAllMeetingsFolder,
  requestCreateMeetingFolder,
  requestMoveMeetingFolder,
  requestDeleteMeeting,
  resetApi,
} from '../../../store/actions/meetings';
import CustomModal from '../../../common/customModal';
import MoveMeeting from './Modals/MoveMeeting';
import DeleteModal from '../../../common/DeleteModal';

const FolderList = props => {
  const [search, setSearch] = useState(false);
  const [folderMeetingData, setFolderMeetingData] = useState([]);
  const [meetingFolderModal, setMeetingFolderModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [folderName, setFolderName] = useState('');
  const [modalMove, setModalMove] = useState(false);
  const [moveFolderId, setMoveFolderId] = useState('');
  const [meetingId, setMeetingId] = useState('');
  const [checkedCount, setCheckedCount] = useState([]);
  const [checkedFolderCount, setCheckedFolderCount] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [removeId, setRemoveId] = useState({});
  useEffect(() => {
    props.requestGetAllMeetingsFolder(true);
  }, []);

  const meetingFolderData =
    props.meetingsFolder &&
    props.meetingsFolder.meetingsFolderList &&
    props.meetingsFolder.meetingsFolderList.data;

  useEffect(() => {
    if (!search) {
      setFolderMeetingData(
        props.meetingsFolder &&
          props.meetingsFolder.meetingsFolderList &&
          props.meetingsFolder.meetingsFolderList.data,
      );
    }
  }, [props.meetingsFolder]);

  const validateForm = () => {
    const error = {};
    if (!folderName) {
      error.folderName = 'Please Enter Folder Name';
    }

    return error;
  };

  const onSearch = event => {
    let newList = [];
    if (event.target.value !== '') {
      setSearch(true);
      // eslint-disable-next-line no-shadow
      newList = meetingFolderData.filter(obj => {
        const first =
          obj.type === 'meeting'
            ? obj && obj.name && obj.name.toLowerCase()
            : (obj && obj.folderName && obj.folderName.toLowerCase()) || '';

        const filter = event.target.value.toLowerCase().trim();
        return first.includes(filter);
      });
      setFolderMeetingData(newList);
    } else {
      setSearch(false);
      setFolderMeetingData(meetingFolderData);
    }
  };

  useEffect(() => {
    if (props.meetingFolder.fetching === false) {
      props.requestGetAllMeetingsFolder(true);
      setMeetingFolderModal(false);
      setErrors({});
    }
    if (props.meetingFolder.fetching === null && props.meetingFolder.error) {
      setErrors({ folderName: props.meetingFolder.error });
    }
  }, [props.meetingFolder.fetching]);

  const validateMoveForm = () => {
    const error = {};

    if (!moveFolderId) {
      error.folderId = 'Please Select Folder';
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
    if (props.moveMeetingFolder && props.moveMeetingFolder.success) {
      setModalMove(false);
      setErrors({});
      setMoveFolderId('');
      setCheckedCount([]);
      setCheckedFolderCount([]);
      props.requestGetAllMeetingsFolder(true);
      props.resetApi();
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
  useEffect(() => {
    if (props.deleteMeeting && props.deleteMeeting.success) {
      props.requestGetAllMeetingsFolder(true);
      setCheckedCount([]);
      setCheckedFolderCount([]);
      setDeleteModal(false);
      props.resetApi();
    }
  }, [props.deleteMeeting]);

  const handleDelete = () => {
    props.requestDeleteMeeting(removeId);
  };

  return (
    <>
      <MeetingListHeader
        handleMeetingFolderClick={() => setMeetingFolderModal(true)}
        handleSearch={onSearch}
      />
      <MeetingFolderListTable
        folderMeetingData={folderMeetingData}
        fetching={props.meetingsFolder && props.meetingsFolder.fetching}
        setMeetingId={setMeetingId}
        setModalMove={setModalMove}
        setCheckedCount={setCheckedCount}
        checkedCount={checkedCount}
        setRemoveId={setRemoveId}
        setDeleteModal={setDeleteModal}
        setCheckedFolderCount={setCheckedFolderCount}
        checkedFolderCount={checkedFolderCount}
      />

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

      {/* Move modal meeting */}
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
        <p className="text-bismark mb-0">You {"can't"} undo this action</p>
      </DeleteModal>
    </>
  );
};

FolderList.propTypes = {
  requestGetAllMeetingsFolder: PropTypes.func,
  requestCreateMeetingFolder: PropTypes.func,
  meetingsFolder: PropTypes.object,
  meetingFolder: PropTypes.object,
  requestMoveMeetingFolder: PropTypes.func,
  moveMeetingFolder: PropTypes.object,
  requestDeleteMeeting: PropTypes.func,
  deleteMeeting: PropTypes.object,
  resetApi: PropTypes.func,
};

const mapStateToProps = state => {
  const { meetings, app } = state;

  return {
    meetingsFolder: meetingsFolder(meetings),
    meetingFolder: meetingFolder(meetings),
    moveMeetingFolder: moveMeetingFolder(meetings),
    deleteMeeting: deleteMeeting(meetings),
    isGlobalAppFetching: app.fetching,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestGetAllMeetingsFolder: payload =>
      dispatch(requestGetAllMeetingsFolder(payload)),
    requestCreateMeetingFolder: payload =>
      dispatch(requestCreateMeetingFolder(payload)),
    requestMoveMeetingFolder: payload =>
      dispatch(requestMoveMeetingFolder(payload)),
    requestDeleteMeeting: payload => dispatch(requestDeleteMeeting(payload)),
    resetApi: () => dispatch(resetApi()),
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
)(FolderList);
