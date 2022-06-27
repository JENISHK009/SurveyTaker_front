/* eslint-disable array-callback-return */
/* eslint-disable no-cond-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable indent */
import React, { useEffect, useRef, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import injectSaga from '../../../../utils/injectSaga';
import injectReducer from '../../../../utils/injectReducer';
import {
  requestGetMeetingsForSurvey,
  requestGetSurveyById,
  requestSurveyAnswer,
  resetLogic,
} from '../../../../store/actions/registrationForm';
import reducer, {
  getRegistrationForm,
  getSurveyMeetings,
  surveyAnswer,
  surveyName,
  apiMessage,
  apiSuccess,
} from '../../../../store/reducers/registrationForm';
import saga from '../../../../store/sagas/registrationForm';
import SingleChoiseOption from './QuestionType/SingleChoiseOption';
import MultipleChoiseOption from './QuestionType/MultipleChoiseOption';
import CustomToaster from '../../CustomToaster';
import QuickAnswer from './QuestionType/QuickAnswer';

const Preview = props => {
  const [deviceType, setDeviceType] = useState('desktop');
  const [pages, setPages] = useState([]);
  const [pagesSurvayName, setPagesSurvayName] = useState(null);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState();
  const [textInstructionArray, setTextInstructionArray] = useState([]);

  const { id } = useParams();
  const { registrationFormPages, surveyMeetings } = props;

  const [activeNext, setActiveNext] = useState(0);
  const [progress, setProgress] = useState(2);
  const [textInstructions, setTextInstructions] = useState('');
  const [icalEventData, setIcalEventData] = useState({});
  const [meetingAnswerData, setMeetingAnswerData] = useState([]);
  const history = useHistory();
  const blockRef = useRef(null);

  const answers = [];
  const meetId = history.location.pathname;
  const meetid = meetId.split('_');
  const finalMeetid = meetid[meetid.length - 1];

  // eslint-disable-next-line no-shadow
  const { apiSuccess, apiMessage } = props;

  if (!apiSuccess && apiMessage) {
    toast.error(apiMessage);
  }
  if (apiSuccess && apiMessage) {
    toast.success(apiMessage);
  }

  useEffect(() => {
    if (apiMessage) {
      props.resetLogic();
    }
  }, [apiMessage]);

  useEffect(() => {
    if (registrationFormPages && registrationFormPages.length === 0) {
      const isPreview =
        history.location.pathname.includes('/user-survey/') ||
        history.location.pathname.includes('/survey-share/');
      const data = { id };
      if (isPreview) {
        data.isPreview = true;
        setDeviceType(null);
      }
      props.requestGetMeetingsForSurvey(data);
      props.requestGetSurveyById(data);
    }
    const { data, REGISTRATION_PAGE_CONTENT_EMAIL } = registrationFormPages;

    if (data && data.length > 0) {
      const getExceptZeroPage = data.filter(page => page.page_no !== 0);
      const getZeroPage = data.filter(page => page.page_no === 0);
      const newData = [...getExceptZeroPage, ...getZeroPage];
      setPages(data);
    }
    if (!pagesSurvayName) {
      setPagesSurvayName(props.surveyName);
    }
    if (
      REGISTRATION_PAGE_CONTENT_EMAIL &&
      REGISTRATION_PAGE_CONTENT_EMAIL.textInstructions
    ) {
      // const textInstructionArrayData = REGISTRATION_PAGE_CONTENT_EMAIL.textInstructions.split(
      //   'Click here to download the Calendar Event Invite',
      // );
      // setTextInstructionArray(textInstructionArrayData);
      // setTextInstructions(REGISTRATION_PAGE_CONTENT_EMAIL.textInstructions);
    }
  }, [registrationFormPages, id, history.location]);

  useEffect(() => {
    if (!pages || pages.length === 0) {
      return;
    }
    blockRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
    setProgress(((activeNext + 1) * 100) / pages.length - 1);
  }, [pages, activeNext]);

  useEffect(() => {
    if (!history.location.state || pages.length === 0) {
      return;
    }
    if (history.location.state.pageData === undefined) {
      return;
    }
    if (history.location.state && history.location.state.pageData !== null) {
      if (history.location.state.pageData === 0) {
        setActiveNext(pages.length - 1);
      } else {
        setActiveNext(history.location.state.pageData - 1);
      }
    }
  }, [history.location.state, pages]);

  const validateForm = () => {
    const error = {};
    const typechk =
      pages &&
      pages.length > 0 &&
      pages[activeNext].REGISTRATOION_PAGE_CONTENT &&
      pages[activeNext].REGISTRATOION_PAGE_CONTENT.length > 0 &&
      pages[activeNext].REGISTRATOION_PAGE_CONTENT.map(
        data => data.questionType,
      );
    const isEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

    if (typechk.includes('quick_answer')) {
      if (!email) {
        error.email = 'Please Enter Email Id';
      } else if (!isEmail.test(email)) {
        error.email = 'Please Enter Valid Email';
      }
    } else if (
      typechk.includes('one_choice') ||
      typechk.includes('multiple_choice')
    ) {
      const data =
        pages &&
        pages.length > 0 &&
        pages.map(page => {
          pages[activeNext].REGISTRATOION_PAGE_CONTENT.map(content => {
            if (content.isRequire) {
              if (
                !content.is_checked ||
                content.is_checked === undefined ||
                content.is_checked.length === 0
              ) {
                if (content.hasLogic === false) {
                  content.has_error = true;
                  error.options = 'Please select any option';
                  return content;
                }
              }
            }
            return content;
          });
          return page;
        });
      setPages(data);
    }
    return error;
  };

  const handleValidationChange = data => {
    setEmail(data);
  };

  const handleFinalSubmit = () => {
    saveData();
  };

  // eslint-disable-next-line no-shadow
  const handleOptionChange = (data, pagedata, index, id, meetingAnswer) => {
    let updatedPagedata;
    let checkIndex;
    if (meetingAnswer) {
      setMeetingAnswerData([meetingAnswer]);
    }
    if (data.questionType === 'meeting_dates' && id !== undefined) {
      checkIndex = id.toString();
    } else if (data.questionType !== 'meeting_dates') {
      checkIndex = index.toString();
    }
    if (data.contentOptions && data.contentOptions.includes(checkIndex)) {
      updatedPagedata =
        pagedata &&
        pagedata.length > 0 &&
        pagedata.map(content => {
          if (data.contentId && content.id === data.contentId.toString()) {
            content.hasLogic = false;
          }

          return content;
        });
      setPages(updatedPagedata);
    } else {
      updatedPagedata =
        pagedata &&
        pagedata.length > 0 &&
        pagedata.map(content => {
          if (data.contentId && content.id === data.contentId.toString()) {
            content.hasLogic = true;
            content.optionAnswer = [];
            content.is_checked = [];

            delete content.has_error;
          }
          return content;
        });
    }

    const newData =
      updatedPagedata &&
      updatedPagedata.length > 0 &&
      updatedPagedata.map(content => {
        if (content.id === data.id) {
          // if (textInstructions) {
          if (content.questionType === 'meeting_dates') {
            if (
              content.updatedOptionValue[index] &&
              content.updatedOptionValue[index].start_date_time
            ) {
              // const textInstructionArrayData =THANKS_CONTENT_FOR_DATE.split(
              //   'Click here to download the Calendar Event Invite',
              // );
              const replaceDateTime =
                THANKS_CONTENT_FOR_DATE &&
                THANKS_CONTENT_FOR_DATE.replace(
                  '|Date - Time - TimeZone|',
                  getTimeZoneFormat(
                    content.updatedOptionValue[index].start_date_time,
                    content.updatedOptionValue[index].end_date_time,
                  ),
                );
              setTextInstructions(null);
              const textInstructionArrayData = replaceDateTime.split(
                'Click here to download the Calendar Event Invite',
              );
              setTextInstructionArray(textInstructionArrayData);
              setIcalEventData({
                title: content.updatedOptionValue[index].name,
                startTime: content.updatedOptionValue[index].start_date_time,
                endTime: content.updatedOptionValue[index].end_date_time,
                url: content.updatedOptionValue[index].meeting_url,
              });
            } else {
              setTextInstructions(THANKS_CONTENT_FOR_WAITLIST);
              setTextInstructionArray([]);
            }
          }

          // }
          content.is_checked = [index.toString()];
          if (content.questionType === 'meeting_dates') {
            content.optionAnswer = [content.updatedOptionValue[index]];
          } else {
            content.optionAnswer = [content.optionsValue[index]];
          }
          if (content.has_error) {
            delete content.has_error;
          }
        }

        return content;
      });

    setPages(newData);
  };

  const handleMultiChoiseOnChange = (data, pagedata, index, option) => {
    let checkboxArr;
    let checkboxVal;
    const newData =
      pages &&
      pages.length > 0 &&
      pages.map(page => {
        page.REGISTRATOION_PAGE_CONTENT.map(content => {
          if (content.id === data.id) {
            checkboxArr = content.is_checked;
            checkboxVal = content.optionAnswer;
            if (checkboxArr) {
              const checkboxIdx = checkboxArr.indexOf(index.toString());
              const checkboxValIdx = checkboxVal.indexOf(option);
              if (checkboxIdx !== -1) {
                checkboxArr.splice(checkboxIdx, 1);
                checkboxVal.splice(checkboxValIdx, 1);
              } else {
                checkboxArr.push(index.toString());
                checkboxVal.push(option);
              }
            } else {
              content.is_checked = [index.toString()];
              content.optionAnswer = [option];
            }

            if (
              content.isRequire &&
              (content.is_checked && content.is_checked.length === 0)
            ) {
              content.has_error = true;
            } else {
              delete content.has_error;
            }
          }

          return content;
        });
        return page;
      });

    const checker = (arr, target) => target.every(v => arr.includes(v));

    const dataChecker =
      checkboxArr && checkboxArr.length > 0 && data.contentOptions
        ? checker(checkboxArr.map(String), data.contentOptions)
        : false;
    let updatedPagedata;
    if (dataChecker && data.contentOptions) {
      updatedPagedata =
        newData &&
        newData.length > 0 &&
        newData.map(page => {
          page.REGISTRATOION_PAGE_CONTENT.map(content => {
            if (content.id === data.contentId) {
              content.hasLogic = false;
            }

            return content;
          });
          return page;
        });
      setPages(updatedPagedata);
    } else {
      updatedPagedata =
        newData &&
        newData.length > 0 &&
        newData.map(page => {
          page.REGISTRATOION_PAGE_CONTENT.map(content => {
            if (content.id === data.contentId) {
              content.hasLogic = true;
            }
            return content;
          });
          return page;
        });
    }

    setPages(updatedPagedata);
  };

  const handleEmailChange = data => {
    if (data.contentId) {
      const updatedPagedata =
        pages &&
        pages.length > 0 &&
        pages.map(page => {
          page.REGISTRATOION_PAGE_CONTENT.map(content => {
            if (content.id === data.contentId) {
              content.hasLogic = false;
            }

            return content;
          });
          return page;
        });
      setPages(updatedPagedata);
    } else {
      const updatedPagedata =
        pages &&
        pages.length > 0 &&
        pages.map(page => {
          page.REGISTRATOION_PAGE_CONTENT.map(content => {
            if (content.id === data.contentId) {
              content.hasLogic = true;
              delete content.has_error;
            }
            return content;
          });
          return page;
        });
      setPages(updatedPagedata);
    }
  };

  const saveData = () => {
    if (meetId.includes('/user-survey/') || meetId.includes('/survey-share/')) {
      if (!pages || pages.length === 0) {
        return;
      }
      pages.map(content => {
        if (content.type === 'question') {
          const answerField =
            content.questionType === 'meeting_dates'
              ? meetingAnswerData
              : content.optionAnswer;

          answers.push({
            title: content.label,
            questionType: content.questionType,
            answers: answerField || [],
            content_id: content.id,
          });
        }
      });

      const data = {
        surveyId: id,
        answers: [answers],
        user_email: email,
        meetingId: meetId.includes('/survey-share/') ? null : finalMeetid,
      };
      props.requestSurveyAnswer(data);
    } else {
      setActiveNext(activeNext + 1);
    }
  };

  return (
    <>
      <CustomToaster />
      <div
        className={`create-meeting registration-form-preview ${(history.location.pathname.includes(
          '/survey-share/',
        ) ||
          history.location.pathname.includes('/user-survey/')) &&
          'survey-page'}`}
      >
        {pages && pages.length > 0 && (
          <>
            <div
              className={classNames(
                {
                  'd-flex':
                    deviceType === 'phone' || deviceType === 'landscape-phone',
                },
                'create-meeting-dialog p-0',
              )}
            >
              {pages.length > 0 && (
                <div className={`preview-content ${deviceType}`}>
                  <div className="registration-style__wrapper">
                    <div className="style__header">
                      <div className="wrapper__heading text-capitalize">
                        {pagesSurvayName}
                      </div>
                    </div>
                    <div className="style__content">
                      <div className="scroll" ref={blockRef}>
                        {pages &&
                          pages.length > 0 &&
                          pages.length > 0 &&
                          pages.map(data => (
                            <>
                              {/* {data.type === 'text_media' && (
                                <TextContent data={data.contentValue} />
                              )} */}
                              {data.questionType === 'meeting_dates' && (
                                <QuickAnswer
                                  data={data}
                                  erorrs={errors.email}
                                  emailValue={email}
                                  handleValidationChange={
                                    handleValidationChange
                                  }
                                  handleEmailChange={handleEmailChange}
                                  from="preview"
                                />
                              )}
                              {data.questionType === 'one_choice' && (
                                <>
                                  <SingleChoiseOption
                                    data={data}
                                    pagedata={pages}
                                    setPages={setPages}
                                    from="preview"
                                    erorrs={errors}
                                    handleOptionChange={handleOptionChange}
                                  />
                                </>
                              )}
                              {/* {data.questionType === 'meeting_dates' && (
                                <>
                                  {' '}
                                  <MeetingDatesOption
                                    data={data}
                                    pagedata={pages}
                                    setPages={setPages}
                                    from="preview"
                                    erorrs={errors}
                                    handleOptionChange={handleOptionChange}
                                    surveyMeetings={surveyMeetings.data}
                                  />
                                </>
                              )} */}
                              {data.questionType === 'multiple_choice' && (
                                <MultipleChoiseOption
                                  data={data}
                                  pagedata={pages}
                                  setPages={setPages}
                                  from="preview"
                                  handleOptionChange={handleMultiChoiseOnChange}
                                  erorrs={errors}
                                />
                              )}
                            </>
                          ))}
                      </div>{' '}
                    </div>
                    <div className="style__footer d-flex">
                      <Button
                        variant="blue"
                        disabled={
                          props.surveyFetch && props.surveyFetch.fetching
                        }
                        onClick={handleFinalSubmit}
                      >
                        Finish
                        {props.surveyFetch && props.surveyFetch.fetching && (
                          <Spinner
                            className="ms-2"
                            animation="border"
                            role="status"
                            size="sm"
                          />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

Preview.propTypes = {
  registrationFormPages: PropTypes.array,
  requestGetSurveyById: PropTypes.func,
  requestSurveyAnswer: PropTypes.func,
  surveyFetch: PropTypes.object,
  surveyName: PropTypes.string,
  requestGetMeetingsForSurvey: PropTypes.func,
  surveyMeetings: PropTypes.object,
  // meetingsRequest: PropTypes.object,
  apiSuccess: PropTypes.bool,
  apiMessage: PropTypes.string,
  resetLogic: PropTypes.func,
};

const mapStateToProps = state => {
  const { registrationForm, app } = state;
  return {
    registrationFormPages: getRegistrationForm(registrationForm),
    surveyFetch: surveyAnswer(registrationForm),
    surveyName: surveyName(registrationForm),
    surveyMeetings: getSurveyMeetings(registrationForm),
    apiSuccess: apiSuccess(registrationForm),
    apiMessage: apiMessage(registrationForm),
    isGlobalAppFetching: app.fetching,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestGetSurveyById: payload => dispatch(requestGetSurveyById(payload)),
    requestSurveyAnswer: payload => dispatch(requestSurveyAnswer(payload)),
    requestGetMeetingsForSurvey: payload =>
      dispatch(requestGetMeetingsForSurvey(payload)),
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
)(Preview);
