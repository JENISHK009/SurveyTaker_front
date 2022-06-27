/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Image } from 'react-bootstrap';
import classNames from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import dragIcon from '../../../../../../assets/images/drag.svg';
import tickIcon from '../../../../../../assets/images/check.svg';
import tickBlueIcon from '../../../../../../assets/images/blue/tick.svg';
import deleteIcon from '../../../../../../assets/images/trash-default.svg';
import deleteRedIcon from '../../../../../../assets/images/trash.svg';
import addIcon from '../../../../../../assets/images/blue/plus.svg';
import ButtonWithHoverEffect from '../../../../../../common/ButtonWithHoverEffect';
import injectSaga from '../../../../../../utils/injectSaga';
import injectReducer from '../../../../../../utils/injectReducer';
import reducer, {
  getSurveyMeetings,
} from '../../../../../../store/reducers/registrationForm';
import saga from '../../../../../../store/sagas/registrationForm';
import { getTimeZoneFormat } from '../../../../common/timezone';

const OPTIONS = ['one_choice', 'multiple_choice', 'Text'];

const Question = ({
  pageData,
  setQuestionData,
  QuestionData,
  handleFinalPyalod,
  errors,
  setErrors,
  ...props
}) => {
  const [choiseOptions, setChoiseOptions] = useState([]);
  const [customLabels, setCustomLabels] = React.useState([]);
  const [questionType, setQuestionType] = React.useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (
      props.surveyMeetings &&
      props.surveyMeetings.data &&
      props.surveyMeetings.data.length > 0
    ) {
      setCount(props.surveyMeetings.data.length);
    }
  }, [props.surveyMeetings]);

  useEffect(() => {
    if (Object.keys(QuestionData).length === 0) {
      return;
    }
    setQuestionType(QuestionData.questionType);
    if (choiseOptions && choiseOptions.length === 0) {
      setChoiseOptions(QuestionData.optionsValue);
    }
  }, [QuestionData]);

  const handleChange = (e, index) => {
    setErrors({ options: '' });
    const { value } = e.target;
    const newOptions = [...choiseOptions];
    newOptions[index] = value;
    setChoiseOptions(newOptions);
  };
  const handleAddNewOption = () => {
    if (
      choiseOptions &&
      choiseOptions.length > 0 &&
      choiseOptions[choiseOptions.length - 1] === null &&
      QuestionData.questionType !== 'meeting_dates'
    ) {
      setErrors({ options: 'Please Add Option' });
      return;
    }

    const newList = choiseOptions.concat(null);
    setChoiseOptions(newList);
  };

  useEffect(() => {
    setQuestionData({ ...QuestionData, optionsValue: choiseOptions });
  }, [choiseOptions]);

  useEffect(() => {
    if (!questionType) {
      return;
    }
    const updatedData = [];
    if (
      customLabels.length === 0 &&
      questionType === 'meeting_dates' &&
      props.surveyMeetings &&
      props.surveyMeetings.data &&
      props.surveyMeetings.data.length > 0
    ) {
      // eslint-disable-next-line consistent-return
      props.surveyMeetings.data.map((data, i) => {
        if (data.displayMsg) {
          updatedData[i] = {
            id: data.id,
            text: data.displayMsg,
          };
          return updatedData;
        }
      });
      setCustomLabels(updatedData);
    }
  }, [questionType]);

  useEffect(() => {
    setQuestionData({ ...QuestionData, meetingDateCustom: customLabels });
  }, [customLabels]);

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

  return (
    <>
      <Form>
        <Form.Group className="form-group">
          <Form.Label>Question Type</Form.Label>
          <Form.Select
            value={QuestionData.questionType}
            className="text-capitalize"
            name="questionType"
            onChange={e =>
              setQuestionData({
                ...QuestionData,
                [e.target.name]: e.target.value,
              })
            }
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
            value={QuestionData.label}
            placeholder="Enter"
            // value={questionLabel}
            name="label"
            onChange={e =>
              setQuestionData({
                ...QuestionData,
                [e.target.name]: e.target.value,
              })
            }
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
            // defaultValue={editModal.isRequire}
            className="checkbox-input"
            onChange={e =>
              setQuestionData({
                ...QuestionData,
                [e.target.name]: e.target.checked,
              })
            }
            name="isRequire"
            checked={QuestionData.isRequire}
          />
          <Form.Check.Label htmlFor="checkbox-21" className="checkbox-label">
            Require this question
          </Form.Check.Label>
        </Form.Check> */}

        {QuestionData.questionType !== 'meeting_dates' && (
          <>
            <div className="registration-modal__subheading text-capitalize">
              {Object.keys(QuestionData).length > 0 &&
                QuestionData.questionType.replace('_', ' ')}{' '}
              Options
            </div>
            <ul className="question-list">
              {QuestionData.questionType === 'meeting_dates' &&
                props.surveyMeetings &&
                props.surveyMeetings.data &&
                props.surveyMeetings.data.length > 0 &&
                props.surveyMeetings.data.map((option, index) => (
                  <>
                    {option.start_date_time && (
                      <li>
                        <Form.Check
                          type={
                            QuestionData.questionType === 'one_choice' ||
                            QuestionData.questionType === 'meeting_dates'
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
                        QuestionData.questionType === 'one_choice' ||
                        QuestionData.questionType === 'meeting_dates'
                          ? 'radio'
                          : 'checkbox'
                      }
                    />

                    <div className="form-control--prefix">
                      {/* <span>
                      {' '}
                      {questionType === 'meeting_dates' &&
                      props.surveyMeetings &&
                      props.surveyMeetings.data &&
                      props.surveyMeetings.data.length > 0
                        ? count + index
                        : index + 1}
                      .
                    </span> */}
                      <Form.Control
                        type="text"
                        placeholder=""
                        value={option || ''}
                        onChange={e => handleChange(e, index)}
                        className={classNames({ 'is-invalid': errors.options })}
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
    </>
  );
};

Question.propTypes = {
  surveyMeetings: PropTypes.object,
  pageData: PropTypes.object,
  setQuestionData: PropTypes.func,
  QuestionData: PropTypes.object,
  handleFinalPyalod: PropTypes.func,
  errors: PropTypes.object,
  setErrors: PropTypes.func,
};

const mapStateToProps = state => {
  const { registrationForm, app } = state;
  return {
    surveyMeetings: getSurveyMeetings(registrationForm),
    isGlobalAppFetching: app.fetching,
  };
};

// export function mapDispatchToProps(dispatch) {
//   return {
//     AddUpdateContentPageRequestFailed: payload =>
//       dispatch(AddUpdateContentPageRequestFailed(payload)),
//     dispatch,
//   };
// }

const withReducer = injectReducer({ key: 'registrationForm', reducer });
const withSaga = injectSaga({ key: 'registrationForm', saga });

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    null,
  ),
)(Question);
