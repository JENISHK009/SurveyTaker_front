/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { EmailHeader } from './MeetingListHeader';
import EmailTabs from './emailTab';
import CustomModal from '../../../common/customModal';
import {
  SendEmailParticipant,
  MailSchedule,
} from './Modals/SendEmailParticipant';
import reducer, {
  getPostEmail,
  getEmails,
  deleteEmail,
} from '../../../store/reducers/meetings';
import saga from '../../../store/sagas/meetings';
import injectReducer from '../../../utils/injectReducer';
import injectSaga from '../../../utils/injectSaga';
import {
  requestPostEmail,
  requestGetEmail,
  requestDeleteEmail,
  resetApi,
} from '../../../store/actions/meetings';
const Email = props => {
  const [sendMailModal, setSendMailModal] = useState(false);
  const [sendEmailModal, setSendEmailModal] = useState(false);
  const [schedualCalModal, setSchedualCalModal] = useState(false);
  const [is_scheduled, setIsSchedule] = useState(false);
  const [payload, setPayload] = useState({});
  const [emailData, setEmailData] = useState([]);
  const [search, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [contentEditorData, setTextEditorData] = useState('');
  const [activeTab, setActiveTab] = useState(null);
  const [errors, setErrors] = useState({});
  const prevActiveTabRef = useRef();
  const changeEmailData = data => {
    const payloadData = {
      ...payload,
      ...data,
    };
    setPayload(payloadData);
  };
  useEffect(() => {
    props.requestGetEmail(props.meetingDetail.id);
  }, []);

  useEffect(() => {
    const getEmailData =
      props.getEmails &&
      props.getEmails.getEmail &&
      props.getEmails.getEmail.data;

    if (!search) {
      setEmailData(getEmailData);
    }
  }, [props.getEmails, search]);

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
    const data = {
      to_user_emails: payload.to_user_emails ? payload.to_user_emails : '',
      subject: payload.subject ? payload.subject : '',
      body: contentEditorData,
      schedule_time: payload.schedule_time ? payload.schedule_time : '',
      meeting_id: props.meetingDetail.id,
      is_scheduled,
    };
    props.requestPostEmail(data);
  };

  useEffect(() => {
    if (props.postEmail && props.postEmail.success) {
      setPayload({});
      props.requestGetEmail(props.meetingDetail.id);
      setSendMailModal(false);
      setSendEmailModal(false);
      props.resetApi();
    }
  }, [props.postEmail]);

  useEffect(() => {
    if (activeTab && searchValue) {
      prevActiveTabRef.current = activeTab;
      onSearch(searchValue);
    }
  }, [activeTab]);
  const onSearch = value => {
    setSearchValue(value);
    if (!activeTab) {
      return;
    }
    const newArr = [];
    if (value) {
      const updatedData =
        props.getEmails &&
        props.getEmails.getEmail &&
        props.getEmails.getEmail.data &&
        props.getEmails.getEmail.data[activeTab].filter(
          // eslint-disable-next-line consistent-return
          data => {
            const first = data.subject.toLowerCase();
            const second = value.toLowerCase().trim();
            if (first.includes(second)) {
              newArr.push(data);

              return newArr;
            }
          },
        );
      setEmailData({ ...emailData, [activeTab]: updatedData });
    } else {
      setSearch(false);
      setEmailData(props.getEmails.getEmail.data);
    }
  };

  useEffect(() => {
    if (props.deleteEmail && props.deleteEmail.success) {
      props.resetApi();
      props.requestGetEmail(props.meetingDetail.id);
    }
  }, [props.deleteEmail]);

  return (
    <>
      <EmailHeader
        setSendMailModal={setSendMailModal}
        handleSearch={onSearch}
      />
      <EmailTabs
        response={emailData}
        setActiveTab={setActiveTab}
        requestDeleteEmail={props.requestDeleteEmail}
        deleteEmail={props.deleteEmail}
        getEmails={props.getEmails}
        meetingId={props.meetingDetail.id}
        resetApi={props.resetApi}
        setSendEmailModal={setSendEmailModal}
        sendEmailModal={sendEmailModal}
        activeTab={activeTab}
      />
      <CustomModal
        title="Send Email"
        isActive={sendMailModal}
        handleClose={() => {
          handleEmail();
        }}
        handleCloseIcon={() => setSendMailModal(false)}
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
          handleCloseIcon={() => setSchedualCalModal(false)}
          buttonTitle="Schedule"
        >
          <MailSchedule
            onChange={changeEmailData}
            scheduleTime={payload.schedule_time}
          />
        </CustomModal>
      )}
    </>
  );
};
Email.propTypes = {
  requestGetEmail: PropTypes.func,
  deleteEmail: PropTypes.object,
  requestDeleteEmail: PropTypes.func,
  postEmail: PropTypes.object,
  requestPostEmail: PropTypes.func,
  getEmails: PropTypes.object,
  meetingDetail: PropTypes.object,
  resetApi: PropTypes.func,
};
const mapStateToProps = state => {
  const { meetings, app } = state;
  return {
    deleteEmail: deleteEmail(meetings),
    postEmail: getPostEmail(meetings),
    getEmails: getEmails(meetings),
    isGlobalAppFetching: app.fetching,
  };
};
export function mapDispatchToProps(dispatch) {
  return {
    requestGetEmail: payload => dispatch(requestGetEmail(payload)),
    requestDeleteEmail: payload => dispatch(requestDeleteEmail(payload)),
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
)(Email);
