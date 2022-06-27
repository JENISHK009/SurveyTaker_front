import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link, useParams } from 'react-router-dom';

import { Button, Form, Image } from 'react-bootstrap';
import SearchBar from '../../../common/searchBar';
import Email from '../../../assets/images/email.svg';
import Plus from '../../../assets/images/plus.svg';
import searchIcon from '../../../assets/images/search.svg';

export const MeetingListHeader = ({
  handleSearch,
  handleMeetingFolderClick,
}) => (
  <div className="wrapper__header">
    <div className="wrapper__heading">Meetings</div>
    <div className="wrapper__heading-right">
      <SearchBar placeHolder="Search For Meeting" handleSearch={handleSearch} />
      <Button
        variant="blue"
        className="ms-3"
        onClick={handleMeetingFolderClick}
      >
        New Folder
      </Button>
      <Link to="/meeting/create" className="text-decoration-none">
        <Button variant="blue" className="ms-3">
          New Meeting
        </Button>
      </Link>
    </div>
  </div>
);

export const MeetingFolderList = ({ folderData, handleSearch }) => {
  const { id } = useParams();
  return (
    <div className="wrapper__header">
      <div className="wrapper__heading">{folderData}</div>
      <div className="wrapper__heading-right">
        <SearchBar
          placeHolder="Search For Meetings"
          handleSearch={handleSearch}
        />
        {/* <Button variant="blue-10" className="ms-3 text-blue">
        Export All reports
      </Button> */}
        <Link to={`/meeting${id ? `/${id}` : ''}/create`}>
          <Button variant="blue" className="ms-3">
            New Meeting
          </Button>
        </Link>
      </div>
    </div>
  );
};

export const ParticipantHeader = ({
  setModalState,
  setSendMailModal,
  handleSearch,
  totalCount,
}) => (
  <div className="wrapper__header">
    <div className="wrapper__heading">
      Users {totalCount !== undefined && `(${totalCount})`}
    </div>
    <div className="wrapper__heading-right">
      <SearchBar placeHolder="Search For User" handleSearch={handleSearch} />
      {/* <Link to="/"> */}
      <Button
        color="blue"
        variant="blue-10"
        className="ms-3 text-blue"
        onClick={setSendMailModal}
      >
        <Image className="me-2" src={Email} />
        Send Email
      </Button>
      {/* </Link> */}
      {/* <Link to="/meeting/create"> */}
      <Button variant="blue" className="ms-3" onClick={setModalState}>
        <Image className="me-2 invert-white" src={Plus} />
        Add User
      </Button>
      {/* </Link> */}
    </div>
  </div>
);

export const EmailHeader = ({ setSendMailModal, handleSearch }) => (
  <div className="wrapper__header">
    <div className="wrapper__heading">Emails </div>
    <div className="wrapper__heading-right">
      <Form className="searchbar-form">
        <div className="custom-input-group position-relative">
          <Image className="custom-input-group__prefix" src={searchIcon} />
          <Form.Control
            type="text"
            placeholder="Search For Emails"
            className="searchbar-form__control"
            onChange={e => handleSearch(e.target.value)}
          />
        </div>
      </Form>
      <Button
        color="blue"
        variant="blue-10"
        className="ms-3 text-blue"
        onClick={setSendMailModal}
      >
        <Image className="me-2" src={Email} />
        Send Email
      </Button>
    </div>
  </div>
);

MeetingListHeader.propTypes = {
  handleSearch: PropTypes.func,
  handleMeetingFolderClick: PropTypes.func,
};

EmailHeader.propTypes = {
  setSendMailModal: PropTypes.bool,
  handleSearch: PropTypes.func,
};

ParticipantHeader.propTypes = {
  setModalState: PropTypes.bool,
  setSendMailModal: PropTypes.bool,
  handleSearch: PropTypes.func,
  totalCount: PropTypes.number,
};

export const MeetingInfoHeader = ({ meetingDetail }) => {
  const history = useHistory();
  const handleRedirectEditMeet = (meeting, edit) => {
    history.replace({
      pathname: `/meeting/create`,
      state: { meeting, edit },
    });
  };
  return (
    <div className="wrapper__header">
      <div className="wrapper__heading">
        {meetingDetail && meetingDetail.name}
      </div>
      <div className="wrapper__heading-right">
        <Button
          variant="blue-10"
          className="ms-3 text-blue"
          onClick={() => handleRedirectEditMeet(meetingDetail, true)}
        >
          Edit
        </Button>
        {/* <Link to="/meeting/create" className="text-decoration-none">
          <Button variant="blue" className="ms-3">
            Enter Meeting Room
          </Button>
        </Link> */}
      </div>
    </div>
  );
};

MeetingInfoHeader.propTypes = {
  meetingDetail: PropTypes.object,
};

MeetingFolderList.propTypes = {
  folderData: PropTypes.object,
  handleSearch: PropTypes.func,
};
