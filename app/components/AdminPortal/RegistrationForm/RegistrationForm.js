/* eslint-disable no-shadow */
import classNames from 'classnames';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Image } from 'react-bootstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import {
  requestSurveyshare,
  requestSurveyParticipant,
  resetLogic,
} from '../../../store/actions/registrationForm';
import reducer, {
  shareSurvey,
  fetchSurveyParticipant,
  editIcsData,
  apiMessage,
  apiSuccess,
} from '../../../store/reducers/registrationForm';
import leftArrowIcon from '../../../assets/images/left-arrow.svg';
import saga from '../../../store/sagas/registrationForm';
import RegistrationFormBuilder from './RegistrationFormBuilder/RegistrationFormBuilder';
import CustomToaster from '../CustomToaster';
// import Style from './Style/Style';

const RegistrationForm = props => {
  const history = useHistory();
  const pathName = window.location.host;
  const { id } = useParams();

  return (
    <>
      <CustomToaster />
      <div className="wrapper__header">
        <div className="wrapper__heading d-flex">
          <Button className="p-0 me-3" onClick={() => history.push('/surveys')}>
            <Image src={leftArrowIcon} width={24} />
          </Button>
          Survey
        </div>
        <div className="wrapper__heading-right">
          <Button
            variant="blue"
            className="ms-3"
            onClick={() =>
              history.push({
                pathname: `/surveys/registration-form/preview/${id}`,
                state: { from: 'registration-form' },
              })
            }
          >
            Preview
          </Button>
        </div>
      </div>

      <RegistrationFormBuilder />
    </>
  );
};

RegistrationForm.propTypes = {
  requestSurveyshare: PropTypes.object,
  shareSurvey: PropTypes.object,
  requestSurveyParticipant: PropTypes.func,
  fetchSurveyParticipant: PropTypes.object,
  editIcsData: PropTypes.object,
  resetLogic: PropTypes.func,
  apiSuccess: PropTypes.bool,
  apiMessage: PropTypes.string,
};

const mapStateToProps = state => {
  const { registrationForm, app } = state;
  return {
    shareSurvey: shareSurvey(registrationForm),
    fetchSurveyParticipant: fetchSurveyParticipant(registrationForm),
    editIcsData: editIcsData(registrationForm),
    apiSuccess: apiSuccess(registrationForm),
    apiMessage: apiMessage(registrationForm),
    isGlobalAppFetching: app.fetching,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestSurveyshare: payload => dispatch(requestSurveyshare(payload)),
    requestSurveyParticipant: payload =>
      dispatch(requestSurveyParticipant(payload)),
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
)(RegistrationForm);
