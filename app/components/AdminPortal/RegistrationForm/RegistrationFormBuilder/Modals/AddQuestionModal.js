import React, { useEffect, useState } from 'react';
import { Button, Form, Image, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { connect } from 'react-redux';
import { compose } from 'redux';
import closeIcon from '../../../../../assets/images/close.svg';
import dragIcon from '../../../../../assets/images/drag.svg';
import tickIcon from '../../../../../assets/images/check.svg';
import tickBlueIcon from '../../../../../assets/images/blue/tick.svg';
import deleteIcon from '../../../../../assets/images/trash-default.svg';
import deleteRedIcon from '../../../../../assets/images/trash.svg';
import addIcon from '../../../../../assets/images/blue/plus.svg';
import ButtonWithHoverEffect from '../../../../../common/ButtonWithHoverEffect';
import { addUpdatePageContent } from '../../../../../store/apis/registrationForm';
import {
  AddUpdateContentPageRequestSuccess,
  AddUpdateContentPageRequestFailed,
} from '../../../../../store/actions/registrationForm';
import injectSaga from '../../../../../utils/injectSaga';
import injectReducer from '../../../../../utils/injectReducer';
import saga from '../../../../../store/sagas/registrationForm';
import reducer, {
  getSurveyMeetings,
} from '../../../../../store/reducers/registrationForm';
import { getTimeZoneFormat } from '../../../common/timezone';

const OPTIONS = ['one_choice', 'multiple_choice', 'Text'];

const AddQuestionModal = ({
  close,
  pageData,
  activeContentIndex,
  isHandleCloseSpinner,
  pageId,
  setActiveContentIndex,
  setContentData,
  requestGetMeetingsForSurvey,
  ...props
}) => {
  const [questionType, setQuestionType] = useState(OPTIONS[0]);
  const [questionLabel, setQuestionLabel] = useState('');
  const [questionRequired, setQuestionRequired] = useState(false);
  const [choiseOptions, setChoiseOptions] = useState([null]);
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(null);
  const [customLabels, setCustomLabels] = useState([]);
  const [count, setCount] = useState(0);

  const handleChange = (e, index) => {
    setErrors({ options: '' });
    const { value } = e.target;
    const newOptions = [...choiseOptions];
    newOptions[index] = value;
    setChoiseOptions(newOptions);
  };
  const handleAddNewOption = () => {
    if (choiseOptions[choiseOptions.length - 1] === null) {
      setErrors({ options: 'Please Add Option' });
      return;
    }

    const newList = choiseOptions.concat(null);
    setChoiseOptions(newList);
  };

  const onSaveQuestion = type => {
    if (choiseOptions[choiseOptions.length - 1] === null) {
      choiseOptions.splice(choiseOptions.length - 1, 1);
    }
    const REGISTRATOION_PAGE_CONTENT = {
      questionType,
      type: 'question',
      title: questionLabel,
      isRequire: questionRequired,
      options: JSON.stringify(choiseOptions),
      meetingDateCustom: customLabels,
    };
    setIsProcessing(type);
    const finalPayload = {
      REGISTRATOION_PAGE_CONTENT,
      surveyId: pageId,
      // page_id: pageData.id,
      // upper_content_index: activeContentIndex,
    };
    addUpdatePageContent(finalPayload)
      .then(res => {
        props.AddUpdateContentPageRequestSuccess(res.data.data);
        setIsProcessing(null);
        // setContentData({
        //   success: res.data.success,
        //   message: res.data.message,
        // });
        if (type === 'save') {
          requestGetMeetingsForSurvey();
          setTimeout(() => {
            close();
          }, 200);
        }
        if (type === 'add_new') {
          setActiveContentIndex(activeContentIndex + 1);
        }
        setQuestionType(OPTIONS[0]);
        setQuestionLabel('');
        setQuestionRequired(false);
        setChoiseOptions([null]);
      })
      .catch(err => {
        props.AddUpdateContentPageRequestFailed(err);
        setContentData({
          success: false,
          message: err.response.message,
        });
        setIsProcessing(null);
        if (type !== 'add_new') {
          close();
        }
      });
  };

  const handleDeleteOption = id => {
    const copyChoiseOptions = [...choiseOptions];
    const newList =
      copyChoiseOptions &&
      copyChoiseOptions.length > 0 &&
      copyChoiseOptions.filter((item, index) => index !== id);
    setChoiseOptions(newList);
  };

  const handleCustomLabel = (e, id) => {
    const data = customLabels.some(el => el.id === id);
    if (data) {
      const updatedData = customLabels.map(cLabel => {
        if (cLabel.id === id) {
          // eslint-disable-next-line no-param-reassign
          cLabel.text = e.target.value;
        }
        return cLabel;
      });
      setCustomLabels(updatedData);
      return;
    }
    setCustomLabels([
      ...customLabels,
      {
        id,
        text: e.target.value,
      },
    ]);
  };

  useEffect(() => {
    if (
      props.surveyMeetings &&
      props.surveyMeetings.data &&
      props.surveyMeetings.data.length > 0
    ) {
      setCount(props.surveyMeetings.data.length);
    }
  }, [props.surveyMeetings]);

  return (
    <div className="registration-modal">
      <div className="registration-modal__header">
        <div className="wrapper__heading d-flex">Add Question</div>
        <Button className="p-0" onClick={close}>
          <Image src={closeIcon} alt="Close" width={24} />
        </Button>
      </div>
      <div className="registration-modal__content">
        <Form>
          <Form.Group className="form-group">
            <Form.Label>Question Type</Form.Label>
            <Form.Select
              className="text-capitalize"
              onChange={e => {
                setQuestionType(e.target.value);
              }}
              value={questionType}
            >
              {OPTIONS.map(option => (
                <option value={option === 'Text' ? 'meeting_dates' : option}>
                  {' '}
                  {option.replace('_', ' ')}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>What question do you want to ask?</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter"
              value={questionLabel}
              onChange={e => setQuestionLabel(e.target.value)}
              className={classNames({ 'is-invalid': errors.label })}
            />
            {errors.label && (
              <Form.Control.Feedback type="invalid">
                {errors.label}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          {/* <Form.Check className="checkbox">
            <Form.Check.Input
              id="checkbox-21"
              className="checkbox-input"
              onChange={() => setQuestionRequired(!questionRequired)}
              checked={questionRequired}
            />
            <Form.Check.Label htmlFor="checkbox-21" className="checkbox-label">
              Require this question
            </Form.Check.Label>
          </Form.Check> */}

          {questionType !== 'meeting_dates' && (
            <>
              <div className="registration-modal__subheading text-capitalize">
                {questionType.replace('_', ' ')} Optionssdfsfds
              </div>
              <ul className="question-list">
                {questionType !== 'meeting_dates' &&
                  props.surveyMeetings &&
                  props.surveyMeetings.data &&
                  props.surveyMeetings.data.length > 0 &&
                  props.surveyMeetings.data.map((option, index) => (
                    <>
                      {option.start_date_time && (
                        <li>
                          <Form.Check
                            type={
                              questionType === 'one_choice' ||
                              questionType === 'meeting_dates'
                                ? 'radio'
                                : 'checkbox'
                            }
                          />
                          <div className="d-flex flex-fill">
                            <div className="form-control--prefix w-50">
                              <span>{index + 1}.</span>

                              <Form.Control
                                type="text"
                                placeholder=""
                                defaultValue={option.displayMsg || ''}
                                onChange={e => handleCustomLabel(e, option.id)}
                              />
                            </div>
                            <Form.Control
                              type="text"
                              placeholder=""
                              className="ms-2 w-50"
                              value={
                                getTimeZoneFormat(
                                  option.start_date_time,
                                  option.end_date_time,
                                ) || ''
                              }
                              onChange={e => handleChange(e, index)}
                              disabled
                            />
                          </div>
                          <ButtonWithHoverEffect
                            defaultImage={tickIcon}
                            hoverImage={tickBlueIcon}
                            hoverColor="blue"
                            altText="Tick"
                            imageWidth={24}
                            btnClassNames="p-0"
                          />
                          <ButtonWithHoverEffect
                            defaultImage={deleteIcon}
                            hoverImage={deleteRedIcon}
                            hoverColor="red"
                            altText="Delete"
                            imageWidth={24}
                            btnClassNames="p-0 invisible"
                            onClick={() => handleDeleteOption(index)}
                          />
                        </li>
                      )}
                    </>
                  ))}

                {choiseOptions &&
                  choiseOptions.length > 0 &&
                  choiseOptions.map((option, index) => (
                    <li>
                      <Form.Check
                        type={
                          questionType === 'one_choice' ||
                          questionType === 'meeting_dates'
                            ? 'radio'
                            : 'checkbox'
                        }
                      />
                      <div className="form-control--prefix">
                        <span>
                          {questionType === 'meeting_dates' &&
                          props.surveyMeetings &&
                          props.surveyMeetings.data &&
                          props.surveyMeetings.data.length > 0
                            ? count + index
                            : index + 1}
                          .
                        </span>
                        <Form.Control
                          type="text"
                          placeholder=""
                          value={choiseOptions[index] || ''}
                          onChange={e => handleChange(e, index)}
                        />
                      </div>
                      <ButtonWithHoverEffect
                        defaultImage={tickIcon}
                        hoverImage={tickBlueIcon}
                        hoverColor="blue"
                        altText="Tick"
                        imageWidth={24}
                        btnClassNames="p-0"
                      />
                      <ButtonWithHoverEffect
                        defaultImage={deleteIcon}
                        hoverImage={deleteRedIcon}
                        hoverColor="red"
                        altText="Delete"
                        imageWidth={24}
                        btnClassNames="p-0"
                        onClick={() => handleDeleteOption(index)}
                      />
                    </li>
                  ))}
                {errors.options && (
                  <Form.Control.Feedback
                    type="invalid"
                    className="is-invalid-text"
                  >
                    {errors.options}
                  </Form.Control.Feedback>
                )}
                <Button
                  variant="link"
                  size="sm"
                  className="text-blue hover-decoration p-0 mt-4"
                  onClick={handleAddNewOption}
                >
                  <Image src={addIcon} alt="Add" className="me-2" width={22} />
                  <span className="fw-bold">Add New Option</span>
                </Button>
              </ul>
            </>
          )}
        </Form>
      </div>
      <div className="registration-modal__footer">
        <Button
          variant="blue"
          size="sm"
          onClick={() => onSaveQuestion('save')}
          disabled={isProcessing === 'save'}
        >
          Save
          {isProcessing === 'save' && (
            <Spinner
              className="ms-2"
              animation="border"
              role="status"
              size="sm"
            />
          )}
        </Button>

        <Button
          variant="link"
          size="sm"
          className="text-blue hover-decoration"
          onClick={close}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

AddQuestionModal.propTypes = {
  close: PropTypes.func,
  AddUpdateContentPageRequestSuccess: PropTypes.func,
  AddUpdateContentPageRequestFailed: PropTypes.func,
  pageData: PropTypes.object,
  activeContentIndex: PropTypes.number,
  isHandleCloseSpinner: PropTypes.bool,
  pageId: PropTypes.number,
  setContentData: PropTypes.object,
  setActiveContentIndex: PropTypes.number,
  surveyMeetings: PropTypes.object,
  requestGetMeetingsForSurvey: PropTypes.func,
};

const mapStateToProps = state => {
  const { registrationForm, app } = state;
  return {
    surveyMeetings: getSurveyMeetings(registrationForm),
    isGlobalAppFetching: app.fetching,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    AddUpdateContentPageRequestFailed: payload =>
      dispatch(AddUpdateContentPageRequestFailed(payload)),
    AddUpdateContentPageRequestSuccess: payload =>
      dispatch(AddUpdateContentPageRequestSuccess(payload)),

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
)(AddQuestionModal);
