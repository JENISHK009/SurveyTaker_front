/* eslint-disable import/no-cycle */
/* eslint-disable react/no-unused-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';

import { Form, InputGroup } from 'react-bootstrap';
import classNames from 'classnames';
import editIcon from '../../../assets/images/edit.svg';
import editBlueIcon from '../../../assets/images/blue/edit.svg';
import shareIcon from '../../../assets/images/share.svg';
import shareBlueIcon from '../../../assets/images/blue/share.svg';
import ButtonWithHoverEffect from '../../../common/ButtonWithHoverEffect';
import {
  requestSurveyshare,
  resetRegistration,
} from '../../../store/actions/registrationForm';
import injectReducer from '../../../utils/injectReducer';
import injectSaga from '../../../utils/injectSaga';
import saga from '../../../store/sagas/registrationForm';
import reducer, { shareSurvey } from '../../../store/reducers/registrationForm';
import ShareModal from '../../../common/ShareModal';

const HoverMenu = ({ itemId, ...props }) => {
  console.log('itemId', itemId);
  const history = useHistory();
  const [shareModal, setShareModal] = useState(false);
  const [text, setText] = useState('');
  const [copy, setCopy] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const [errors, setErrors] = useState({});

  const pathName = window.location.host;
  const handleEditManage = () => {
    props.resetRegistration();
    history.push(`/surveys/registration-form/${itemId}`);
  };

  const handleCopy = () => {
    if (!customValue) {
      setErrors({ name: 'Please enter text' });
      return;
    }
    setErrors({});
    const data = {
      url: `https://${pathName}`,
      customUrl: customValue,
      surveyId: itemId,
    };
    setCopy(true);
    props.requestSurveyshare({ data });
  };

  useEffect(() => {
    if (
      props.shareSurvey &&
      props.shareSurvey.shareSurvey &&
      props.shareSurvey.shareSurvey.success
    ) {
      setShareModal(false);
    }
  }, [props.shareSurvey]);
  return (
    <>
      <div className="survey-hover-menu">
        <ul>
          <li>
            <ButtonWithHoverEffect
              defaultImage={editIcon}
              hoverImage={editBlueIcon}
              hoverColor="blue"
              text="Edit"
              imageWidth={16}
              imageClassNames="me-2"
              btnClassNames="p-0 fw-normal"
              onClick={handleEditManage}
            />
          </li>
          <li>
            <ButtonWithHoverEffect
              defaultImage={shareIcon}
              hoverImage={shareBlueIcon}
              hoverColor="blue"
              text="Share"
              imageWidth={16}
              imageClassNames="me-2"
              btnClassNames="p-0 fw-normal"
              onClick={() => setShareModal(true)}
            />
          </li>
        </ul>
      </div>
      <ShareModal
        handleClose={() => setShareModal(false)}
        handleCloseIcon={() => {
          setShareModal(false);
          setCopy(false);
        }}
        handleClick={() => handleCopy()}
        isActive={shareModal}
        text={text}
        isHandleCloseSpinner={
          props.shareSurvey && props.shareSurvey.shareSurveyFetch
        }
        footerTitle={`${
          props.shareSurvey && props.shareSurvey.shareSurveyFetch && copy
            ? 'Copying'
            : 'Copy'
        }`}
      >
        <Form.Group className="form-group">
          <Form.Label>Custom URL</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              http://{pathName}/user-survey/{itemId}
            </InputGroup.Text>
            {/* <  /> */}
          </InputGroup>
        </Form.Group>
      </ShareModal>
    </>
  );
};

const mapStateToProps = state => {
  const { registrationForm, app } = state;
  return {
    shareSurvey: shareSurvey(registrationForm),
    isGlobalAppFetching: app.fetching,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestSurveyshare: payload => dispatch(requestSurveyshare(payload)),
    resetRegistration: () => dispatch(resetRegistration()),
    dispatch,
  };
}

const withReducer = injectReducer({ key: 'registrationForm', reducer });
const withSaga = injectSaga({ key: 'registrationForm', saga });

HoverMenu.propTypes = {
  itemId: PropTypes.string,
  resetRegistration: PropTypes.func,
  requestSurveyshare: PropTypes.object,
  shareSurvey: PropTypes.object,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(HoverMenu);
