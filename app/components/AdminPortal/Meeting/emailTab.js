/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tab, Form, Spinner, Tabs, Button, Image } from 'react-bootstrap';
import moment from 'moment';

import { connect } from 'react-redux';
import { compose } from 'redux';
import TableComponent from '../../../common/TableComponent';
import trashIcon from '../../../assets/images/trash.svg';
import EditIcon from '../../../assets/images/pen.png';
import ArchieveIcon from '../../../assets/images/archive.png';
import DeleteModal from '../../../common/DeleteModal';
import ButtonWithHoverEffect from '../../../common/ButtonWithHoverEffect';
import CustomModal from '../../../common/customModal';
import EditSendEmailModal from './Modals/EditSendEmailModal';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import {
  requestGetEmail,
  requestPostEmail,
} from '../../../store/actions/meetings';
import reducer, { getPostEmail } from '../../../store/reducers/meetings';
import saga from '../../../store/sagas/meetings';

const EmailTabs = ({
  response,
  requestDeleteEmail,
  deleteEmail,
  getEmails,
  setActiveTab,
  meetingId,
  resetApi,
  setSendEmailModal,
  sendEmailModal,
  activeTab,
  ...props
}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [removeId, setRemoveId] = useState(false);
  const [emailData, setEmailData] = useState([]);
  const [errors, setErrors] = useState({});
  const [payload, setPayload] = useState({});
  const [contentEditorData, setTextEditorData] = useState('');

  const changeEmailData = data => {
    const payloadData = {
      ...payload,
      ...data,
    };
    setPayload(payloadData);
  };

  const openSendEmailModal = data => {
    setSendEmailModal(true);
    setPayload(data);
  };
  const [checkedCount, setCheckedCount] = useState([]);

  useEffect(() => {
    if (payload && payload.body) {
      setTextEditorData(payload.body);
    }
  }, [payload]);
  const setAllRowsChecked = e => {
    if (emailData[activeTab] && emailData[activeTab].length > 0) {
      if (e.target.checked) {
        const surveyIdsArray = emailData[activeTab].map(list => list.id);
        setCheckedCount(surveyIdsArray);
      } else {
        setCheckedCount([]);
      }
    }
  };

  const scheduledTableConstants = () => [
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
            onChange={e => handleChange(e, rowData.id)}
            checked={checkedCount.includes(rowData.id)}
          />
          <Form.Check.Label htmlFor="checkbox2" className="checkbox-label" />
        </Form.Check>
      ),
    },
    {
      title: 'Email',
      render: rowData => <span aria-hidden="true">{rowData.subject}</span>,
    },
    {
      title: 'Date & Time',
      render: rowData => (
        <span>
          {rowData['MS_SCHEDULED_EMAILs.schedule_time'] &&
            `${moment(rowData['MS_SCHEDULED_EMAILs.schedule_time']).format(
              'L',
            )}${', '}${moment(
              rowData['MS_SCHEDULED_EMAILs.schedule_time'],
            ).format('LT')}`}
        </span>
      ),
    },

    {
      title: '',
      render: rawData => (
        <ul className="d-flex mb-0">
          <ButtonWithHoverEffect
            defaultImage={EditIcon}
            hoverImage={EditIcon}
            imageWidth={24}
            btnClassNames="p-0 me-4"
            onClick={() => openSendEmailModal(rawData)}
          />
          <ButtonWithHoverEffect
            defaultImage={ArchieveIcon}
            hoverImage={ArchieveIcon}
            imageWidth={24}
            btnClassNames="p-0"
            onClick={() => handleEmailDelete(rawData.id)}
          />
        </ul>
      ),
    },
  ];
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
            onChange={e => handleChange(e, rowData.id)}
            checked={checkedCount.includes(rowData.id)}
          />
          <Form.Check.Label htmlFor="checkbox2" className="checkbox-label" />
        </Form.Check>
      ),
    },
    {
      title: 'Email',
      render: rowData => <span aria-hidden="true">{rowData.subject}</span>,
    },
    {
      title: 'Date & Time',
      render: rowData => (
        <span>
          {rowData.createdAt &&
            `${moment(rowData.createdAt).format('L')}${', '}${moment(
              rowData.createdAt,
            ).format('LT')}`}
        </span>
      ),
    },

    {
      title: '',
      render: rawData => (
        <>
          <ButtonWithHoverEffect
            defaultImage={ArchieveIcon}
            hoverImage={ArchieveIcon}
            imageWidth={24}
            btnClassNames="p-0"
            onClick={() => handleEmailDelete(rawData.id)}
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    setEmailData(response);
  }, [response]);

  const headerActions = () => (
    <th colSpan={6} className="text-end bg-blue">
      <div className="d-flex justify-content-end">
        <Button
          variant="blue"
          className="me-0"
          onClick={() => {
            setDeleteModal(true);
          }}
        >
          <Image src={trashIcon} className="me-2" />
          Delete
        </Button>
      </div>
    </th>
  );

  const MENU_LIST = [
    {
      title: 'Scheduled',
      tabIndex: 'Scheduled',
      data: (
        <TableComponent
          cols={scheduledTableConstants(handleChange)}
          checkedCount={checkedCount}
          setCheckedCount={setCheckedCount}
          data={
            emailData && emailData.Scheduled && emailData.Scheduled.length > 0
              ? emailData.Scheduled
              : []
          }
          hasHoverMenu
          tableClassName="Schedule"
          striped
          headerActions={headerActions}
          totalCount={
            emailData && emailData.Scheduled && emailData.Scheduled.length
          }
        />
      ),
    },
    {
      title: 'Sent',
      tabIndex: 'Sent',
      data: (
        <TableComponent
          cols={tableConstants(handleChange)}
          checkedCount={checkedCount}
          setCheckedCount={setCheckedCount}
          data={
            emailData && emailData.Sent && emailData.Sent.length > 0
              ? emailData.Sent
              : []
          }
          hasHoverMenu
          tableClassName="Sent"
          striped
          headerActions={headerActions}
          totalCount={emailData && emailData.Sent && emailData.Sent.length}
        />
      ),
    },
    {
      title: 'Archived',
      tabIndex: 'Archived',
      data: (
        <TableComponent
          cols={tableConstants(handleChange)}
          checkedCount={checkedCount}
          setCheckedCount={setCheckedCount}
          data={
            emailData && emailData.Archived && emailData.Archived.length > 0
              ? emailData.Archived
              : []
          }
          hasHoverMenu
          tableClassName="Archived"
          striped
          headerActions={headerActions}
          totalCount={
            emailData && emailData.Archived && emailData.Archived.length
          }
        />
      ),
    },
  ];
  // eslint-disable-next-line no-unused-vars
  const [key, setKey] = useState(MENU_LIST[0].title);

  useEffect(() => {
    if (key) {
      setActiveTab(key);
    }
  }, [key]);
  const handleEmailDelete = participateId => {
    setRemoveId(participateId);
    setDeleteModal(true);
  };

  useEffect(() => {
    if (deleteEmail && deleteEmail.success) {
      setDeleteModal(false);
      setCheckedCount([]);
      resetApi();
    }
  }, [deleteEmail]);

  const hanldleRemoveEmail = () => {
    if (checkedCount && checkedCount.length > 0) {
      requestDeleteEmail(checkedCount);
    } else {
      requestDeleteEmail([removeId]);
    }
  };

  const handleChange = (e, id) => {
    let updatedData = [];
    if (e.target.checked) {
      updatedData = [...checkedCount, id];
      setCheckedCount([...checkedCount, id]);
    } else {
      updatedData =
        checkedCount &&
        checkedCount.length > 0 &&
        checkedCount.filter(opt => opt !== id);
      setCheckedCount(updatedData);
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

  const handleSaveEditEmails = () => {
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
      meeting_id: meetingId,
      id: payload.id,
    };
    props.requestPostEmail(data);
  };

  // useEffect(() => {
  //   if (
  //     props.postEmail &&
  //     // props.postEmail.email &&
  //     props.postEmail.success
  //   ) {
  //     setPayload({});
  //     setErrors({});
  //     setSendEmailModal(false);
  //   }
  // }, [props.postEmail]);

  useEffect(() => {
    if (contentEditorData) {
      setErrors({ ...errors, body: '' });
    }
  }, [contentEditorData]);
  return (
    <>
      <Tabs
        activeKey={key}
        className="lined-tabs"
        onSelect={k => {
          setKey(k);
          setActiveTab(k);
          setCheckedCount([]);
        }}
      >
        {MENU_LIST &&
          MENU_LIST.length > 0 &&
          MENU_LIST.map(menu => (
            <Tab eventKey={menu.title} title={menu.title} key={menu.title}>
              {getEmails && getEmails.emailfetching ? (
                <div className="d-flex justify-content-center">
                  <Spinner animation="grow" />
                </div>
              ) : (
                menu.data
              )}
            </Tab>
          ))}
      </Tabs>

      <DeleteModal
        title="Are you sure?"
        isActive={deleteModal}
        handleClose={() => setDeleteModal(false)}
        buttonBottomTitle="Cancel"
        isHandleCloseSpinner={deleteEmail && deleteEmail.fetching}
        buttonTitle="Delete"
        handleDelete={() => hanldleRemoveEmail()}
      >
        <p className="text-bismark mb-1">
          This Item Will be Deleted immidiately.{' '}
        </p>
        <p className="text-bismark mb-0">You can't undo this action</p>
      </DeleteModal>

      <CustomModal
        title="Edit Email"
        isActive={sendEmailModal}
        handleClose={handleSaveEditEmails}
        handleCloseIcon={() => setSendEmailModal(false)}
        buttonTitle="Save Edits"
        isHandleCloseSpinner={props.postEmail && props.postEmail.fetching}
      >
        <EditSendEmailModal
          setErrors={setErrors}
          errors={errors}
          onChange={changeEmailData}
          payload={payload}
          getEditorContent={setTextEditorData}
        />
      </CustomModal>
    </>
  );
};

EmailTabs.propTypes = {
  deleteEmail: PropTypes.object,
  requestDeleteEmail: PropTypes.func,
  setActiveTab: PropTypes.func,
  response: PropTypes.object,
  getEmails: PropTypes.object,
  meetingId: PropTypes.string,
  requestPostEmail: PropTypes.func,
  requestGetEmail: PropTypes.func,
  postEmail: PropTypes.object,
  resetApi: PropTypes.func,
  setSendEmailModal: PropTypes.func,
  sendEmailModal: PropTypes.bool,
  activeTab: PropTypes.bool,
};

const mapStateToProps = state => {
  const { meetings, app } = state;
  return {
    postEmail: getPostEmail(meetings),
    isGlobalAppFetching: app.fetching,
  };
};
export function mapDispatchToProps(dispatch) {
  return {
    requestGetEmail: payload => dispatch(requestGetEmail(payload)),
    requestPostEmail: payload => dispatch(requestPostEmail(payload)),
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
)(EmailTabs);
