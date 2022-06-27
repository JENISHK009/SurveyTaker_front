/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */

import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import Meetings from './MeetingList';

// for meetings
import reducer, {
  getMeetings,
  getIsMeetingFetching,
} from '../../../store/reducers/meetings';
import saga from '../../../store/sagas/meetings';
import injectReducer from '../../../utils/injectReducer';
import injectSaga from '../../../utils/injectSaga';

import { meetingsRequest } from '../../../store/actions/meetings';

const mapStateToProps = state => {
  console.log(`state::`, state);
  const { meetings, app } = state;

  return {
    isFetching: getIsMeetingFetching(meetings),
    meetings: getMeetings(meetings),
    isGlobalAppFetching: app.fetching,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    meetingsRequest: payload => dispatch(meetingsRequest(payload)),
    dispatch,
  };
}

const withReducer = injectReducer({ key: 'meetings', reducer });
const withSaga = injectSaga({ key: 'meetings', saga });

const MeetingContainer = compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Meetings);

MeetingContainer.propTypes = {
  history: PropTypes.object,
  meetingsRequest: PropTypes.func,
  meetings: PropTypes.object,
};

export default MeetingContainer;
