/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { MeetingInfoHeader } from './MeetingListHeader';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import saga from '../../../store/sagas/meetings';
import { meetingAccessRequest } from '../../../store/actions/meetings';
import reducer, { getMeetingAccess } from '../../../store/reducers/meetings';
import { getTimeZoneFormat } from '../common/timezone';
const MeetingInfo = ({ meetingDetail, ...props }) => {
  useEffect(() => {
    if (
      (!props.accessMeeting || props.accessMeeting.length === 0) &&
      !meetingDetail
    ) {
      props.meetingAccessRequest();
    }
  }, [props.accessMeeting, meetingDetail]);
  return (
    <div>
      <MeetingInfoHeader meetingDetail={meetingDetail} />
      <div className="row">
        <div className="card p-5 rounded">
          <div className="row mb-4">
            <div className="col-3">
              <div className="meetingDetail__key">Summary:</div>
            </div>
            <div className="col-9">
              <div className="">{meetingDetail && meetingDetail.name}</div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-3">
              <div className="meetingDetail__key">Start Time:</div>
            </div>
            <div className="col-9">
              <div className="">
                {getTimeZoneFormat(
                  meetingDetail && meetingDetail.start_date_time,
                  meetingDetail && meetingDetail.end_date_time,
                )}
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-3">
              <div className="meetingDetail__key">Duration:</div>
            </div>
            <div className="col-9">
              <div className="">
                {meetingDetail &&
                  `${meetingDetail.durationHours} ${
                    meetingDetail.durationMinute
                  }`}
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-3">
              <div className="meetingDetail__key">Session URL:</div>
            </div>
            <div className="col-9">
              <div className="">
                <a
                  href={meetingDetail && meetingDetail.sessionUrl}
                  className="text-decoration-none meetingDetail__ancor"
                  target="_blank"
                >
                  {meetingDetail && meetingDetail.sessionUrl}
                </a>
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-3">
              <div className="meetingDetail__key">Registration URL:</div>
            </div>
            <div className="col-9">
              <div className="">
                {' '}
                <a
                  href={meetingDetail && meetingDetail.registratoionUrl}
                  className="text-decoration-none meetingDetail__ancor"
                  target="_blank"
                >
                  {meetingDetail && meetingDetail.registratoionUrl}
                </a>
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-3">
              <div className="meetingDetail__key">
                Number of users in the room:
              </div>
            </div>
            <div className="col-9">
              <div className="">{meetingDetail && meetingDetail.name}</div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-3">
              <div className="meetingDetail__key">Language:</div>
            </div>
            <div className="col-9">
              <div className="">
                {meetingDetail &&
                  meetingDetail.LANGUAGE_MS_LANGUAGE &&
                  meetingDetail.LANGUAGE_MS_LANGUAGE.language}
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-3">
              <div className="meetingDetail__key">Access:</div>
            </div>
            <div className="col-9">
              {meetingDetail &&
                meetingDetail.access_to &&
                meetingDetail.access_to.length > 0 &&
                props.accessMeeting &&
                props.accessMeeting.length > 0 &&
                props.accessMeeting
                  .filter(accessMeet =>
                    meetingDetail.access_to.includes(accessMeet.id),
                  )
                  .map((accessData, index) => (
                    <li>
                      {accessData.description}
                      {meetingDetail.access_to.length - 1 !== index && `,`}
                    </li>
                  ))}
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-3">
              <div className="meetingDetail__key">
                Allow participants to opt out from Engagement Tracking:
              </div>
            </div>
            <div className="col-9">
              <div className="">{meetingDetail && meetingDetail.name}</div>
            </div>
          </div>
          {meetingDetail && meetingDetail.browser_inteface && (
            <div className="row mb-4">
              <div className="col-3">
                <div className="meetingDetail__key">Browser Interface:</div>
              </div>

              <div className="col-9">
                <div className="">
                  {meetingDetail && meetingDetail.browser_inteface}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

MeetingInfo.propTypes = {
  meetingDetail: PropTypes.object,
  accessMeeting: PropTypes.object,
  meetingAccessRequest: PropTypes.func,
};

const mapStateToProps = state => {
  const { meetings, app } = state;
  return {
    accessMeeting: getMeetingAccess(meetings),
    isGlobalAppFetching: app.fetching,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    meetingAccessRequest: payload => dispatch(meetingAccessRequest(payload)),
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
)(MeetingInfo);

// export default MeetingInfo;
