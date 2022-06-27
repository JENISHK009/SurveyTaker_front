import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import MeetingList from './MeetingTab';

class MeetingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  meetingListClick = () => {};

  handleRedirectMeetingDetail = () => {};

  render() {
    return (
      <div>
        <MeetingList
          meetingListClick={this.meetingListClick}
          handleRedirectMeetingDetail={this.handleRedirectMeetingDetail}
        />
      </div>
    );
  }
}

export default MeetingPage;
