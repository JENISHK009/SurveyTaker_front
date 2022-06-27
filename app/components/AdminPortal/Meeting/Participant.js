/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Dropdown, Image, Spinner, Form, Button } from 'react-bootstrap';
import trashIcon from '../../../assets/images/trash.svg';
import moreHZIcon from '../../../assets/images/more-horizontal.svg';
import preview from '../../../assets/images/preview.svg';

import { ParticipantHeader } from './MeetingListHeader';

import CustomModal from '../../../common/customModal';
import DeleteModal from '../../../common/DeleteModal';
import { useModalWithData } from '../../../hooks/useModalWithData';
import reducer, {
  addParticipants,
  getParticipants,
  getPostEmail,
} from '../../../store/reducers/meetings';
import saga from '../../../store/sagas/meetings';
import injectReducer from '../../../utils/injectReducer';
import injectSaga from '../../../utils/injectSaga';
import {
  participantsRequest,
  participantsAddRequest,
  participantsRemoveRequest,
  requestPostEmail,
  resetApi,
} from '../../../store/actions/meetings';
import TableComponent from '../../../common/TableComponent';
import { AddParticipantModal } from './Modals/AddParticipantModal';
import {
  SendEmailParticipant,
  MailSchedule,
} from './Modals/SendEmailParticipant';
import editIcon from '../../../assets/images/edit.svg';

const Participant = props => {
  const { modalOpen, setModalState } = useModalWithData();
  const [sendMailModal, setSendMailModal] = useState(false);
  const [removeId, setRemoveId] = useState(false);
  const [schedualCalModal, setSchedualCalModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [participantsData, setparticipantsData] = useState([]);
  const [search, setSearch] = useState(false);
  const [participantApiCall, setParticipantApiCall] = useState(false);
  // eslint-disable-next-line camelcase
  const [is_scheduled, setIsSchedule] = useState(false);
  const [contentEditorData, setTextEditorData] = useState('');
  const [errors, setErrors] = useState({});
  const [sendEmailData, setSendEmailData] = useState({});
  const [checkedCount, setCheckedCount] = useState([]);
  const [editParticipant, setEditParticipant] = useState(false);
  const [participantData, setParticipantData] = useState([]);
  const participants =
    props.participantsData && props.participantsData.participants;

  const [payload, setPayload] = useState({
    meeting_id: props.meetingDetail.id,
  });
  const [checkedEmails, setCheckedEmails] = useState([]);
  useEffect(() => {
    if (!search) {
      setparticipantsData(participants);
    }
  }, [participants]);

  const handleChange = (e, id, email) => {
    let updatedData = [];
    let updatedIds = [];
    if (e.target.checked) {
      updatedData = [...checkedEmails, email];
      updatedIds = [...checkedCount, id];
      setCheckedEmails([...checkedEmails, email]);
      setCheckedCount([...checkedCount, id]);
    } else {
      updatedData =
        checkedEmails &&
        checkedEmails.length > 0 &&
        checkedEmails.filter(opt => opt !== email);
      updatedIds =
        checkedCount &&
        checkedCount.length > 0 &&
        checkedCount.filter(opt => opt !== id);
      setCheckedEmails(updatedData);
      setCheckedCount(updatedIds);
    }
  };

  const setAllRowsChecked = e => {
    if (participantsData && participantsData.length > 0) {
      setCheckedCount([]);
      setCheckedEmails([]);
      if (e.target.checked) {
        const surveyIdsArray = participantsData.map(list => list.id);
        const surveyEmailsArray = participantsData.map(list => list.email);
        setCheckedCount(surveyIdsArray);
        setCheckedEmails(surveyEmailsArray);
      } else {
        setCheckedCount([]);
        setCheckedEmails([]);
      }
    }
  };

  useEffect(() => {
    if (checkedCount.length === 0) {
      setCheckedEmails([]);
    }
  }, [checkedCount]);
  const tableConstants = () => [
    {
      title: (
        <Form.Check className="checkbox">
          <Form.Check.Input
            id="checkbox2"
            className="checkbox-input"
            onChange={setAllRowsChecked}
          />
          <Form.Check.Label htmlFor="checkbox2" className="checkbox-label" />
        </Form.Check>
      ),
      render: rowData => (
        <Form.Check className="checkbox">
          <Form.Check.Input
            id={`checkbox-${rowData.id}`}
            className="checkbox-input"
            onChange={e => handleChange(e, rowData.id, rowData.email)}
            checked={checkedCount.includes(rowData.id)}
          />
          <Form.Check.Label htmlFor="checkbox2" className="checkbox-label" />
        </Form.Check>
      ),
    },
    {
      title: 'User Email',
      render: rowData => <span>{rowData.email}</span>,
    },
    {
      title: 'Role',
      render: rowData => <span>{rowData.role}</span>,
    },
    {
      title: 'Time of Registration',
      render: rowData => (
        <span>
          {`${moment(rowData.registration_time).format('L')}${', '}${moment(
            rowData.registration_time,
          ).format('LT')}`}
        </span>
      ),
    },
    {
      title: '',
      render: rowdata => (
        <>
          <Dropdown className="d-inline mx-2" align="end">
            <Dropdown.Toggle className="p-0">
              <Image src={moreHZIcon} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setSendMailModal(true);
                  setSendEmailData(rowdata);
                }}
              >
                <Image className="me-2" src={preview} />
                Send Email
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setEditParticipant(true);
                  setParticipantData(rowdata);
                  setModalState(true);
                }}
              >
                <Image className="me-2" src={editIcon} />
                Edit
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                className="text-red"
                onClick={() => {
                  handleParticipantsDelete(rowdata.id);
                }}
              >
                <Image className="me-2" src={trashIcon} /> Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      ),
    },
  ];

  // useEffect(() => {
  //   if (modalOpen || sendMailModal) {
  //     if (!payload && payload.meeting_id) {
  //       setPayload({ meeting_id: props.meetingDetail.id });
  //     }
  //   }
  // }, [modalOpen, payload]);

  useEffect(() => {
    if (contentEditorData) {
      setErrors({ ...errors, body: '' });
    }
  }, [contentEditorData]);

  const handleParticipantsDelete = participateId => {
    setRemoveId(participateId);
    setDeleteModal(true);
  };

  const hanldleRemoveParticipant = () => {
    const newArr = [...participantsData];
    const dataVal =
      newArr &&
      newArr.length > 0 &&
      newArr.filter(datas => datas.id === removeId);
    if (dataVal[0].id) {
      const idx = newArr.findIndex(val => val.id === removeId);
      newArr.splice(idx, 1);
      setparticipantsData(newArr);
    }

    setparticipantsData(newArr);
    props.participantsRemoveRequest(removeId);
    setDeleteModal(false);
  };

  useEffect(() => {
    if (sendEmailData) {
      setPayload({
        ...payload,
        to_user_emails: sendEmailData && sendEmailData.email,
      });
    }
  }, [sendEmailData.email]);

  const onAddParticipant = () => {
    if (!payload.role_id) {
      setErrors({ option: 'Please select any role' });
      return;
      // eslint-disable-next-line no-else-return
    } else if (
      (!payload.email || payload.email.length === 0) &&
      (!payload.emailData || payload.emailData.length === 0)
    ) {
      setErrors({ email: 'Please enter email' });
      return;
    }

    if (
      payload.email &&
      payload.email.length > 0 &&
      (payload.emailData && payload.emailData.length > 0)
    ) {
      setErrors({ error: 'Please choose only one field' });
      return;
    }

    if (payload.email && payload.email.length > 0) {
      delete payload.emailData;
    }
    if (payload.emailData && payload.emailData.length > 0) {
      setPayload({ ...payload, email: payload.emailData });
      payload.email = payload.emailData;
      delete payload.emailData;
    }
    setErrors({});
    props.participantsAddRequest({
      ...payload,
      meeting_id: props.meetingDetail.id,
    });
    setPayload({});
  };

  useEffect(() => {
    if (
      props.addParticipants &&
      props.addParticipants.participants &&
      props.addParticipants.participants.success
    ) {
      setModalState(false);
      props.participantsRequest(props.meetingDetail.id);
    }
  }, [props.addParticipants]);

  useEffect(() => {
    if (!participantApiCall) {
      props.participantsRequest(props.meetingDetail.id);
      setParticipantApiCall(true);
    }
  }, []);

  const changeParticipantData = data => {
    const payloadData = {
      ...payload,
      ...data,
    };
    setPayload(payloadData);
  };

  const onSearch = event => {
    let newList = [];
    if (event.target.value !== '') {
      setSearch(true);

      newList =
        participants &&
        participants.length > 0 &&
        participants.filter(({ email }) => {
          const first = email.toLowerCase() || '';
          const filter = event.target.value.toLowerCase().trim();
          return first.includes(filter);
        });
      setparticipantsData(newList);
    } else {
      setSearch(false);
      setparticipantsData(participants);
    }
  };

  const validateForm = () => {
    const error = {};
    if (!payload.to_user_emails || payload.to_user_emails.length === 0) {
      error.email = 'Please Enter Email';
    }
    if (!payload.subject) {
      error.subject = 'Please Add Subject';
    }
    if (!contentEditorData) {
      error.body = 'Please Add Text';
    }
    return error;
  };

  const handleEmail = () => {
    const errorsArray = validateForm();

    if (Object.keys(errorsArray).length > 0) {
      setErrors(errorsArray);
      return;
    }
    setErrors({});
    setSendEmailData({});
    setPayload();
    const data = {
      to_user_emails: payload.to_user_emails ? payload.to_user_emails : '',
      subject: payload.subject ? payload.subject : '',
      body: contentEditorData,
      schedule_time: payload.schedule_time ? payload.schedule_time : '',
      meeting_id: props.meetingDetail.id,
      is_scheduled,
      isParticipant: true,
    };
    props.requestPostEmail(data);
  };
  const changeEmailData = data => {
    const payloadData = {
      ...payload,
      ...data,
      meeting_id: props.meetingDetail.id,
    };
    setPayload(payloadData);
  };
  useEffect(() => {
    if (checkedEmails && checkedEmails.length > 0) {
      setPayload({ ...payload, to_user_emails: checkedEmails });
    }
  }, [checkedEmails]);

  useEffect(() => {
    if (props.postEmail && props.postEmail.success) {
      props.resetApi();
      setPayload({});
      setCheckedEmails([]);
      props.participantsRequest(props.meetingDetail.id);
      setSendMailModal(false);
    }
  }, [props.postEmail]);

  const headerActions = () => (
    <th colSpan={6} className="text-end bg-blue">
      <div className="d-flex justify-content-end">
        <Button
          variant="blue"
          className="me-0"
          onClick={() => {
            setSendMailModal(true);
          }}
        >
          <Image src={preview} className="me-2" />
          Send Email
        </Button>
      </div>
    </th>
  );

  return (
    <>
      <ParticipantHeader
        setModalState={setModalState}
        setSendMailModal={setSendMailModal}
        handleSearch={onSearch}
        totalCount={participantsData && participantsData.length}
      />
      {props.participantsData && props.participantsData.fetching ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" />
        </div>
      ) : (
        <TableComponent
          cols={tableConstants(handleChange)}
          checkedCount={checkedCount}
          setCheckedCount={setCheckedCount}
          data={participantsData || []}
          hasHoverMenu
          tableClassName="Users"
          striped
          headerActions={headerActions}
          totalCount={participantsData && participantsData.length}
        />
      )}

      <CustomModal
        title={editParticipant ? 'Edit User' : 'Add User'}
        isActive={modalOpen}
        handleClose={onAddParticipant}
        handleCloseIcon={() => {
          setErrors({});
          setModalState(false);
          setEditParticipant(false);
          setParticipantData([]);
        }}
        buttonTitle={editParticipant ? 'Edit' : 'Add'}
        isHandleCloseSpinner={
          props.addParticipants && props.addParticipants.fetching
        }
      >
        <AddParticipantModal
          changeParticipantData={changeParticipantData}
          setErrors={setErrors}
          errors={errors}
          payload={payload}
          editParticipant={editParticipant}
          participantData={participantData}
        />
      </CustomModal>
      <CustomModal
        title="Send Email"
        isActive={sendMailModal}
        handleClose={() => {
          handleEmail();
        }}
        handleCloseIcon={() => {
          setSendMailModal(false);
          setSendEmailData({});
        }}
        buttonTitle="Send"
        buttonBottomTitle="Schedule"
        isHandleCloseSpinner={props.postEmail && props.postEmail.fetching}
        buttonBottomFrom
        handleSaveClick={() => setSchedualCalModal(true)}
      >
        <SendEmailParticipant
          onChange={changeEmailData}
          getEditorContent={setTextEditorData}
          setErrors={setErrors}
          errors={errors}
          checkedEmails={checkedEmails}
          sendEmailData={
            sendEmailData && sendEmailData.email && [sendEmailData.email]
          }
        />
      </CustomModal>

      {schedualCalModal && (
        <CustomModal
          title="Schedule Email"
          isActive={schedualCalModal}
          handleClose={() => {
            setSchedualCalModal(false);
            setIsSchedule(true);
          }}
          buttonTitle="Schedule"
          handleCloseIcon={() => setSchedualCalModal(false)}
          handleSaveClick={() => setSchedualCalModal(true)}
        >
          <MailSchedule
            onChange={changeEmailData}
            scheduleTime={payload.schedule_time}
          />
        </CustomModal>
      )}

      <DeleteModal
        title="Are you sure?"
        isActive={deleteModal}
        handleDelete={() => {
          hanldleRemoveParticipant();
        }}
        buttonBottomTitle="Cancel"
        handleClose={() => setDeleteModal(false)}
        buttonTitle="Delete"
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
  const { meetings } = state;

  return {
    participantsData: getParticipants(meetings),
    postEmail: getPostEmail(meetings),
    addParticipants: addParticipants(meetings),
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    participantsRequest: payload => dispatch(participantsRequest(payload)),
    participantsRemoveRequest: payload =>
      dispatch(participantsRemoveRequest(payload)),
    participantsAddRequest: payload =>
      dispatch(participantsAddRequest(payload)),
    requestPostEmail: payload => dispatch(requestPostEmail(payload)),
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
)(Participant);

Participant.propTypes = {
  participantsRequest: PropTypes.func,
  participantsAddRequest: PropTypes.func,
  participantsRemoveRequest: PropTypes.func,
  participantsData: PropTypes.func,
  meetingDetail: PropTypes.object,
  requestPostEmail: PropTypes.object,
  postEmail: PropTypes.object,
  addParticipants: PropTypes.object,
  resetApi: PropTypes.object,
};
