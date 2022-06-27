/* eslint-disable indent */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable radix */
/* eslint-disable camelcase */
import React, { forwardRef, useState, useEffect } from 'react';
import {
  Button,
  Col,
  Form,
  FormControl,
  Image,
  InputGroup,
  Modal,
  // ProgressBar,
  Row,
  Spinner,
} from 'react-bootstrap';
import classNames from 'classnames';
import moment from 'moment-timezone';
import ct from 'countries-and-timezones';
import { Link, useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import reducer, {
  getLanguages,
  getMeetingAccess,
  getMeetingAudioConfig,
  getTemplates,
  getPostMeeting,
  apiMessage,
  apiSuccess,
  templateFetch,
  languageFetch,
  accessFetch,
  meetingsFolder,
} from '../../../store/reducers/meetings';
import {
  getAllSurveyFetching,
  getSurveys,
} from '../../../store/reducers/registrationForm';
import saga from '../../../store/sagas/meetings';
import injectReducer from '../../../utils/injectReducer';
import injectSaga from '../../../utils/injectSaga';
import {
  templateRequest,
  languageRequest,
  meetingAccessRequest,
  // meetingAudioConfigRequest,
  requestCreateMeeting,
  resetApi,
  requestGetAllMeetingsFolder,
} from '../../../store/actions/meetings';
import { SurveysRequest } from '../../../store/actions/registrationForm';
import leftArrow from '../../../assets/images/left-arrow.svg';
import calendarIcon from '../../../assets/images/calendar.svg';
import CustomToaster from '../CustomToaster';
import { HOST_URL } from '../../../config/env';

const CustomDatepickerInput = forwardRef(
  ({ value, onChange, onClick }, ref) => (
    <InputGroup>
      <FormControl
        value={value}
        onChange={onChange}
        ref={ref}
        onClick={onClick}
      />
      <InputGroup.Text onClick={onClick} className="cursor-pointer">
        <Image src={calendarIcon} alt="Calendar" />
      </InputGroup.Text>
    </InputGroup>
  ),
);

const CreateMeeting = props => {
  const today = new Date();
  const tomorrow = today.setDate(today.getDate());
  const { id } = useParams();
  const state =
    props.location && props.location.state && props.location.state.meeting;
  const edit =
    props.location && props.location.state && props.location.state.edit;

  let timePeriod = edit
    ? moment(state && state.start_date_time).format('LT')
    : moment(new Date()).format('LT');
  timePeriod = timePeriod.split(' ');
  const min = timePeriod && timePeriod[0].split(':');

  const [errors, setErrors] = useState({});

  const [startDate, setStartDate] = useState(
    edit
      ? new Date(state.start_date_time)
      : new Date(new Date().setDate(new Date().getDate())),
  );

  const [name, setName] = useState((state && state.name) || '');
  const [meeting_url, setMeetingURL] = useState(
    (state && state.meeting_url) || '',
  );
  const [summary, setSummary] = useState((state && state.summary) || '');
  const [templateId, setTemplateId] = useState(
    (state && state.template_id) || null,
  );

  const [language, setLanguage] = useState(
    (state && state.LANGUAGE_MS_LANGUAGE && state.LANGUAGE_MS_LANGUAGE.id) ||
      '',
  );
  const [duration, setDuration] = useState(
    (state && state.durationHours) || '',
  );
  // eslint-disable-next-line no-unused-vars
  const [access, setAccess] = useState((state && state.access_to) || []);
  const [survey, setSurvey] = useState((state && state.surveyId) || null);
  const [folderId, setFolderId] = useState((state && state.folderId) || null);
  // const [browserInterface, setBrowserInterface] = useState(
  //   (state && state.browser_inteface) || '',
  // );
  // const [audioConference, setAudioConference] = useState(
  //   (state && state.audio_conference_setting) || '',
  // );
  const [uniqueAccess, setUniqueAccess] = useState(
    (state && state.access_to) || [],
  );
  const [hour, setHour] = useState(edit ? min[0] : '12');
  const [minute, setMinute] = useState(edit ? min[1] : '00');
  const [time, setTime] = useState(edit ? timePeriod[1] : 'AM');
  const [timezone, setTimeZone] = useState(
    edit ? state.timezone : moment.tz.guess(),
  );
  const [durationMinute, setDurationMinute] = useState(
    (state && state.durationMinute) || '',
  );
  const history = useHistory();
  const timezoneObjects = ct.getAllTimezones();
  // eslint-disable-next-line arrow-body-style
  const timezones = Object.keys(timezoneObjects).map(e => {
    return {
      key: `${e} ${timezoneObjects[e].utcOffsetStr}`,
      value: e,
    };
  });
  // console.log('moment.tz.guess().format', moment.tz.guess().format('z'));
  // useEffect(() => {
  //   const editable =
  //     props.location && props.location.state && props.location.state.edit;

  //   let timePeriodDate = editable
  //     ? moment(state && state.start_date_time).format('LT')
  //     : moment(new Date()).format('LT');
  //   timePeriodDate = timePeriodDate.split(' ');
  //   const minTime = timePeriodDate && timePeriodDate[0].split(':');
  //   setHour(minTime[0]);
  //   setMinute(minTime[1]);
  //   setTime(timePeriodDate[1]);
  // }, [props.location && props.location.state && props.location.state.edit]);

  useEffect(() => {
    if (state && state.access_to) {
      setUniqueAccess(state.access_to);
    }
  }, [state]);

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
      props.resetApi();
    }
  }, [apiMessage]);

  const handleCheckbox = e => {
    let updatedData = [];
    const value = parseInt(e.target.value);
    if (e.target.checked) {
      updatedData = [...uniqueAccess, value];
      setUniqueAccess([...uniqueAccess, value]);
    } else {
      updatedData =
        uniqueAccess &&
        uniqueAccess.length > 0 &&
        uniqueAccess.filter(opt => opt !== value);
      setUniqueAccess(updatedData);
    }
  };

  useEffect(() => {
    if (props.postMeeting && props.postMeeting.success) {
      if (id) {
        history.replace({
          pathname: `/meetings/list${id ? `/${id}` : ''}`,
          state: { edit: false },
        });
      } else {
        history.replace({ pathname: '/meetings', state: { edit: false } });
      }
      props.resetApi();
    }
  }, [props.postMeeting]);

  const { template, languages, accessMeeting } = props;

  useEffect(() => {
    if (
      !template ||
      Object.keys(template).length === 0 ||
      (!languages || Object.keys(languages).length === 0) ||
      (!accessMeeting || Object.keys(accessMeeting).length === 0)
    ) {
      props.templateRequest();
      props.languageRequest();
      props.meetingAccessRequest();
    }
  }, []);

  useEffect(() => {
    props.SurveysRequest({ surveyType: 'All' });
    props.requestGetAllMeetingsFolder();
  }, []);

  const validateForm = () => {
    const error = {};
    if (!name) {
      error.label = 'Please Enter Name';
    }
    if (!language) {
      error.options = 'Please Add Language';
    }
    const isCurrentDate = moment(startDate).isSame(moment(), 'day');
    if (isCurrentDate) {
      const dateTime = `${moment(startDate).format(
        'YYYY/MM/DD',
      )} ${hour}:${minute} ${time}`;
      if (moment().diff(dateTime, 'seconds') > 0) {
        error.date = 'Please select future date time';
      }
    } else if (moment(startDate).isBefore(moment())) {
      error.date = 'Please select future date time';
    }
    return error;
  };

  const handleSubmit = () => {
    const errorsArray = validateForm();
    if (Object.keys(errorsArray).length > 0) {
      setErrors(errorsArray);
      return;
    }
    setErrors({});
    // const dateTime = `${moment(startDate).format('YYYY-MM-DD')}T`;
    // let timeFormat = `{${hour}:${minute}:${'00'}} ${time}`;
    // // timeFormat = moment(timeFormat).format();
    // timeFormat = moment(timeFormat, 'h:mm:ss A').format('HH:mm:ss');
    // const timeData = dateTime.concat(timeFormat);
    const dateTime = `${moment(startDate).format(
      'YYYY/MM/DD',
    )} ${hour}:${minute} ${time}`;
    // const newDateFormat = new Date(dateTime);
    const data = {
      name,
      meeting_url,
      summary,
      template_id: templateId !== '' ? templateId : null,
      language,
      start_date_time: dateTime,
      durationHours: duration,
      durationMinute,
      access_to: uniqueAccess.length ? uniqueAccess : access,
      surveyId: survey,
      // browser_inteface: browserInterface,
      category_id: null,
      // audio_conference_setting: audioConference,
      timezone: timezone || moment.tz.guess(),
      folderId,
    };
    if (edit) {
      data.id = state.id;
    }
    if (id) {
      data.folderId = id;
    }
    props.requestCreateMeeting(data);
  };

  useEffect(() => {
    const isCurrentDate = moment(startDate).isSame(moment(), 'day');
    if (isCurrentDate) {
      const dateTime = `${moment(startDate).format(
        'YYYY/MM/DD',
      )} ${hour}:${minute} ${time}`;
      if (moment().diff(dateTime, 'seconds') > 0) {
        setErrors({ date: 'Please select future date time' });
      } else {
        setErrors({ date: '' });
      }
    }
  }, [startDate, hour, minute, time]);

  const { meetingsFolderList } = props.meetingsFolder;
  return (
    <div className="create-meeting">
      <CustomToaster />
      <div className="create-meeting__header">
        <div className="create-meeting__back">
          <Link
            className="text-decoration-none"
            to={`/meetings${id ? `/list/${id}` : ''}`}
          >
            <Button
              variant="link"
              className="create-meeting__back-btn text-decoration-none fw-bold"
            >
              <Image src={leftArrow} alt="Arrow" className="me-2" />{' '}
              <span className="d-sm-block d-none">Shared Meetings</span>
            </Button>
          </Link>
        </div>
        <div className="create-meeting__heading">
          <h6 className="fw-bold mb-0">
            {edit ? 'Edit Meeting' : 'Create New Meeting'}
          </h6>
          {/* <div className="custom-progressbar">
            <div className="custom-progressbar__header">
              <div>Progress</div>
              <div>24%</div>
            </div>
            <ProgressBar now={25} />
          </div> */}
        </div>
      </div>
      <div className="create-meeting-dialog">
        <Modal.Dialog>
          <Modal.Body>
            <div className="create-meeting__modal-header">
              <div className="wrapper__heading">Meeting Information</div>
              <div className="text-gray-middle mt-sm-0 mt-3">
                * - indicates required fields
              </div>
            </div>
            <div className="create-meeting__modal-heading">General Info</div>
            <Form>
              <Form.Group className="form-group">
                <Form.Label>Name *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Cieden Meeting"
                  name="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className={classNames({ 'is-invalid': errors.label })}
                />
                {errors.label && (
                  <Form.Control.Feedback type="invalid">
                    {errors.label}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group className="form-group">
                <Form.Label>Custom URL</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    {HOST_URL && `${HOST_URL}/meeting/`}
                  </InputGroup.Text>
                  <FormControl
                    defaultValue="0123"
                    name="meeting_url"
                    value={meeting_url}
                    onChange={e => setMeetingURL(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="form-group">
                <Form.Label>
                  Summary{' '}
                  <div className="form-label-sub">
                    max length = 4000 characters
                  </div>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="summary"
                  value={summary}
                  maxLength="4000"
                  onChange={e => setSummary(e.target.value)}
                />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group className="form-group" as={Col}>
                  <Form.Label>Template</Form.Label>
                  <Form.Select
                    value={templateId}
                    defaultValue={templateId}
                    onChange={e => setTemplateId(e.target.value)}
                  >
                    <option value="">Please Select Template</option>
                    {props.templateFetch && (
                      <option value="">Loading ...</option>
                    )}
                    {props.template &&
                      props.template.length > 0 &&
                      props.template.map(obj => (
                        <option value={obj.id}>{obj.type_name}</option>
                      ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="form-group" as={Col}>
                  <Form.Label>Select Folder</Form.Label>
                  <Form.Select
                    value={folderId}
                    defaultValue={folderId}
                    onChange={e => setFolderId(e.target.value)}
                  >
                    <option value="">Please Select Folder</option>
                    {props.meetingsFolder && props.meetingsFolder.fetching && (
                      <option value="">Loading ...</option>
                    )}
                    {meetingsFolderList &&
                      meetingsFolderList.data &&
                      meetingsFolderList.data.length > 0 &&
                      meetingsFolderList.data.map(obj => (
                        <option value={obj.id}>{obj.folderName}</option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Row>
              <Form.Group className="form-group">
                <Form.Label>Language *</Form.Label>
                <Form.Select
                  value={language}
                  defaultValue={language}
                  onChange={e => setLanguage(e.target.value)}
                  btnClassNames="p-0"
                >
                  <option value=""> Please Select Language</option>
                  {props.languageFetch && <option value="">Loading ...</option>}
                  {props.languages &&
                    props.languages.length > 0 &&
                    props.languages.map(lan => (
                      <option value={lan.id}>{lan.language}</option>
                    ))}
                </Form.Select>
                {errors.options && (
                  <Form.Control.Feedback
                    type="invalid"
                    className="is-invalid-text"
                  >
                    {errors.options}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Form>

            <div className="create-meeting__modal-heading">When</div>
            <Row className="align-items-end flex-sm-nowrap calendar-row position-relative">
              <Form.Group className="form-group calendar-date" as={Col} xs={5}>
                <Form.Label>Start Date {'&'} Time</Form.Label>
                <DatePicker
                  className="form-control calendar-form-control"
                  defaultValue={
                    state && state.start_date_time
                      ? new Date(state && state.start_date_time)
                      : new Date(new Date().setDate(new Date().getDate() + 1))
                  }
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  showPopperArrow={false}
                  customInput={<CustomDatepickerInput />}
                  dateFormat="dd MMMM yyyy"
                  min={moment().toDate()}
                  minDate={tomorrow}
                  minTime={moment()
                    .hours(moment().hour())
                    .minutes(moment().minutes())}
                  style={{ height: '80%' }}
                />
              </Form.Group>
              <Form.Group className="form-group" as={Col}>
                <Form.Control
                  type="text"
                  defaultValue={hour}
                  style={{ width: '58px' }}
                  onChange={e => {
                    setHour(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group
                className="form-group ps-0 pe-1 position-relative"
                as={Col}
              >
                <Form.Control
                  type="text"
                  defaultValue={minute}
                  style={{ width: '58px' }}
                  onChange={e => {
                    setMinute(e.target.value);
                  }}
                />
                <div className="calendar-colon">:</div>
              </Form.Group>
              <Form.Group className="form-group ps-1" as={Col}>
                <Form.Select
                  style={{ width: '96px' }}
                  onChange={e => {
                    setTime(e.target.value);
                  }}
                  defaultValue={time}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="form-group ps-1" as={Col} xs={4}>
                <Form.Select
                  onChange={e => {
                    setTimeZone(e.target.value);
                  }}
                  defaultValue={timezone}
                >
                  <option value={moment.tz.guess()}>{moment.tz.guess()}</option>
                  {timezones.map(obj => (
                    <option value={obj.value}>{obj.key}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              {errors.date && (
                <Form.Control.Feedback
                  type="invalid"
                  className="is-invalid-text calendar-error"
                >
                  {errors.date}
                </Form.Control.Feedback>
              )}
            </Row>

            <Form.Group className="form-group">
              <Form.Label>Duration</Form.Label>
              <div className="d-flex">
                <Form.Select
                  value={duration}
                  defaultValue={duration}
                  className="me-2"
                  onChange={e => setDuration(e.target.value)}
                >
                  <option value="">Please Select Hour</option>
                  <option value="1 Hour">1 Hour</option>
                  <option value="2 Hour">2 Hour</option>
                  <option value="3 Hour">3 Hour</option>
                </Form.Select>
                {/* </Form.Group>

            <Form.Group className="form-group"> */}
                {/* <Form.Label>Duration</Form.Label> */}
                <Form.Select
                  value={durationMinute}
                  defaultValue={durationMinute}
                  className="ms-2"
                  onChange={e => setDurationMinute(e.target.value)}
                >
                  <option value="">Please Select Minute</option>
                  <option value="15 Minute">15 Minute</option>
                  <option value="30 Minute">30 Minute</option>
                  <option value="45 Minute">45 Minute</option>
                </Form.Select>
              </div>
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label>Survey List</Form.Label>
              <Form.Select
                value={survey}
                defaultValue={survey}
                onChange={e => setSurvey(e.target.value)}
              >
                <option value="">Please Select Survey</option>
                {props.getAllSurveyFetching && (
                  <option value="">Loading ...</option>
                )}
                {props.getSurveyData &&
                  props.getSurveyData.length > 0 &&
                  props.getSurveyData.map(obj => (
                    <option value={obj.id}>{obj.surveyName}</option>
                  ))}
              </Form.Select>
            </Form.Group>

            <div className="create-meeting__modal-heading">Access</div>
            {props.accessFetch && <span value="">Loading ...</span>}
            {props.accessMeeting &&
              props.accessMeeting.length > 0 &&
              props.accessMeeting.map(obj => (
                <Form.Check className="checkbox">
                  <Form.Check.Input
                    id={obj.id}
                    className="checkbox-input"
                    name="access"
                    // defaultChecked={access.includes(obj.id)}
                    value={obj.id}
                    checked={
                      uniqueAccess && uniqueAccess.includes(obj && obj.id)
                    }
                    onChange={handleCheckbox}
                  />
                  <Form.Check.Label htmlFor={obj.id} className="checkbox-label">
                    {obj.description}
                  </Form.Check.Label>
                </Form.Check>
              ))}

            {/* <div className="create-meeting__modal-heading">
              Browser Interface
            </div>

            <Form.Check className="checkbox" defaultChecked>
              <Form.Check.Input
                id="checkbox-5"
                className="checkbox-input"
                name="audio"
                defaultChecked={browserInterface}
                onChange={e => setBrowserInterface(e.target.checked)}
              />
              <Form.Check.Label htmlFor="checkbox-5" className="checkbox-label">
                Enable Classic View{' '}
                <span className="text-gray-middle">
                  (Users can switch to classic view)
                </span>
              </Form.Check.Label>
            </Form.Check> */}
            {/* <div className="wrapper__heading acs-pad">
              Audio Conference Settings
            </div>

            {props.audioConfig.map(audio => (
              <>
                {audio.key_name === 'include_this_audio' ? (
                  <>
                    <Form.Check>
                      <Form.Check.Input
                        id="checkbox-audio-2"
                        type="radio"
                        name="audioConference"
                        value={audio.id}
                        defaultChecked={audioConference === audio.id}
                        onChange={e => setAudioConference(e.target.value)}
                      />
                      <Form.Check.Label
                        htmlFor="checkbox-audio-2"
                        className="w-100"
                      >
                        <div>{audio.description}</div>
                        <div className="form-label-sub aligned-right fw-bold text-blue mt-2 mt-md-0 text-end">
                          Manage Audio Profiles
                        </div>
                      </Form.Check.Label>
                    </Form.Check>
                    <div className="ml-42">
                      <Form.Select className="mt-3 ">
                        <option value="1">FUSE PHONE LINE</option>
                      </Form.Select>
                      <div className="form-label-sub mt-2 mb-3 ">
                        {audio.sub_title}
                      </div>
                    </div>
                  </>
                ) : (
                  <Form.Check>
                    <Form.Check.Input
                      id="checkbox-audio"
                      type="radio"
                      name="audioConference"
                      value={audio.id}
                      defaultChecked={audioConference === audio.id}
                      onChange={e => setAudioConference(e.target.value)}
                    />
                    <Form.Check.Label htmlFor="checkbox-audio">
                      {audio.description}
                      <div className="text-gray-middle mt-1 form-label-sub">
                        {audio.sub_title}{' '}
                      </div>
                    </Form.Check.Label>
                  </Form.Check>
                )}
              </>
            ))} */}

            {/* <Form.Check className="checkbox mt-7">
              <Form.Check.Input
                id="checkbox-7"
                className="checkbox-input"
                defaultChecked
              />
              <Form.Check.Label htmlFor="checkbox-7" className="checkbox-label">
                Update Information for any items linked to this item
              </Form.Check.Label>
            </Form.Check> */}
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="blue"
              type="submit"
              disabled={props.postMeeting && props.postMeeting.fetching}
              onClick={() => handleSubmit()}
            >
              Save
              {props.postMeeting && props.postMeeting.fetching && (
                <Spinner
                  className="ms-2"
                  animation="border"
                  role="status"
                  size="sm"
                />
              )}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </div>
  );
};

CustomDatepickerInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

CreateMeeting.propTypes = {
  template: PropTypes.object,
  templateRequest: PropTypes.func,
  languageRequest: PropTypes.func,
  languages: PropTypes.object,
  meetingAccessRequest: PropTypes.func,
  accessMeeting: PropTypes.object,
  // meetingAudioConfigRequest: PropTypes.func,
  // audioConfig: PropTypes.object,
  requestCreateMeeting: PropTypes.func,
  postMeeting: PropTypes.object,
  location: PropTypes.object,
  SurveysRequest: PropTypes.func,
  getSurveyData: PropTypes.object,
  resetApi: PropTypes.func,
  apiSuccess: PropTypes.bool,
  apiMessage: PropTypes.string,
  templateFetch: PropTypes.bool,
  languageFetch: PropTypes.bool,
  accessFetch: PropTypes.bool,
  getAllSurveyFetching: PropTypes.bool,
  meetingsFolder: PropTypes.object,
  requestGetAllMeetingsFolder: PropTypes.func,
};

const mapStateToProps = state => {
  const { meetings, app, registrationForm } = state;
  return {
    template: getTemplates(meetings),
    languages: getLanguages(meetings),
    accessMeeting: getMeetingAccess(meetings),
    audioConfig: getMeetingAudioConfig(meetings),
    postMeeting: getPostMeeting(meetings),
    apiMessage: apiMessage(meetings),
    apiSuccess: apiSuccess(meetings),
    templateFetch: templateFetch(meetings),
    languageFetch: languageFetch(meetings),
    accessFetch: accessFetch(meetings),
    getSurveyData: getSurveys(registrationForm),
    getAllSurveyFetching: getAllSurveyFetching(registrationForm),
    meetingsFolder: meetingsFolder(meetings),
    isGlobalAppFetching: app.fetching,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    templateRequest: payload => dispatch(templateRequest(payload)),
    languageRequest: payload => dispatch(languageRequest(payload)),
    meetingAccessRequest: payload => dispatch(meetingAccessRequest(payload)),
    // meetingAudioConfigRequest: payload =>
    //   dispatch(meetingAudioConfigRequest(payload)),
    requestCreateMeeting: payload => dispatch(requestCreateMeeting(payload)),
    SurveysRequest: payload => dispatch(SurveysRequest(payload)),
    resetApi: () => dispatch(resetApi()),
    requestGetAllMeetingsFolder: payload =>
      dispatch(requestGetAllMeetingsFolder(payload)),
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
)(CreateMeeting);
