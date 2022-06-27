/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { forwardRef, useEffect, useState } from 'react';
import {
  Form,
  Row,
  InputGroup,
  FormControl,
  Image,
  Col,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import 'react-multi-email/style.css';
import classNames from 'classnames';
import calendarIcon from '../../../../assets/images/calendar.svg';
import TextEditor from '../../../../common/TextEditor';

const options = [
  { value: 'yuliabraslavska@gmail.com', label: 'yuliabraslavska@gmail.com' },
  { value: 'yulia@gmail.com', label: 'yulia@gmail.com' },
  { value: 'denis.designer@gmail.com', label: 'denis.designer@gmail.com' },
];

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

export const SendEmailParticipant = ({
  onChange,
  getEditorContent,
  setErrors,
  errors,
  checkedEmails,
  sendEmailData,
}) => {
  const [emails, setEmail] = useState([]);
  const [subject, setSubject] = useState('');

  const onAddEmails = emailData => {
    setErrors({ ...errors, email: '' });

    setEmail(emailData);
    onChange({ to_user_emails: emailData });
  };

  const onAddSubject = sub => {
    setSubject(sub);
    onChange({ subject: sub });
    setErrors({ ...errors, subject: '' });
  };

  useEffect(() => {
    if (checkedEmails && checkedEmails.length > 0) {
      setEmail(checkedEmails);
    }
  }, [checkedEmails]);

  useEffect(() => {
    if (sendEmailData) {
      setEmail(sendEmailData);
    }
  }, [sendEmailData]);
  return (
    <div className="exports-btn_participant">
      <Form.Group className="form-group">
        <Form.Label>Email</Form.Label>
        <ReactMultiEmail
          className={classNames({ 'is-invalid': errors.email })}
          placeholder="Input your Email Address"
          emails={emails}
          onChange={_emails => {
            onAddEmails(_emails);
          }}
          validateEmail={email => {
            return isEmail(email);
          }}
          getLabel={(email, index, removeEmail) => {
            return (
              <div data-tag key={index}>
                {email}
                <span data-tag-handle onClick={() => removeEmail(index)}>
                  ×
                </span>
              </div>
            );
          }}
        />
        {errors.email && (
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label>Subject</Form.Label>
        <Form.Control
          type="text"
          placeholder="Subject"
          onChange={e => {
            onAddSubject(e.target.value);
          }}
          className={classNames({ 'is-invalid': errors.subject })}
        />
        {errors.subject && (
          <Form.Control.Feedback type="invalid">
            {errors.subject}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label>Text</Form.Label>
        <TextEditor getEditorContent={getEditorContent} height={300} />
        {errors.body && (
          <Form.Control.Feedback type="invalid" className="is-invalid-text">
            {errors.body}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    </div>
  );
};

export const MailSchedule = ({ onChange, scheduleTime }) => {
  let timePeriod = moment(scheduleTime).format('LT');
  timePeriod = timePeriod.split(' ');
  const min = timePeriod && timePeriod[0].split(':');

  const [startDate, setStartDate] = useState(
    scheduleTime ? new Date(scheduleTime) : new Date(),
  );

  const [hour, setHour] = useState(scheduleTime ? min[0] : '12');
  const [minute, setMinute] = useState(scheduleTime ? min[1] : '00');
  const [time, setTime] = useState(scheduleTime ? timePeriod[1] : 'AM');

  useEffect(() => {
    // eslint-disable-next-line radix
    if (hour > 12 || hour < 0) {
      setHour('12');
    }
    if (minute > 59 || hour < 0) {
      setMinute('00');
    }
    const dateTime = `${moment(startDate).format(
      'YYYY/MM/DD',
    )} ${hour}:${minute} ${time}`;
    const newDateFormat = new Date(dateTime);

    onChange({ schedule_time: newDateFormat });
  }, [startDate, hour, minute, time]);

  return (
    <Row className="align-items-end flex-sm-nowrap calendar-row">
      <Form.Group className="form-group calendar-date" as={Col}>
        <Form.Label>Start Date {'&'} Time</Form.Label>
        <DatePicker
          className="form-control calendar-form-control"
          selected={startDate}
          onChange={date => setStartDate(date)}
          showPopperArrow={false}
          customInput={<CustomDatepickerInput />}
          dateFormat="dd MMMM yyyy"
          minDate={new Date()}
        />
      </Form.Group>
      <Form.Group className="form-group" as={Col}>
        <Form.Control
          type="text"
          value={hour}
          onChange={e => setHour(e.target.value)}
          style={{ width: '58px' }}
        />
      </Form.Group>

      <Form.Group className="form-group ps-0 pe-1 position-relative" as={Col}>
        <Form.Control
          type="text"
          defaultValue="00"
          onChange={e => setMinute(e.target.value)}
          style={{ width: '58px' }}
          value={minute}
        />
        <div className="calendar-colon">:</div>
      </Form.Group>
      <Form.Group className="form-group ps-1" as={Col}>
        <Form.Select
          style={{ width: '96px' }}
          onChange={e => setTime(e.target.value)}
          value={time}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </Form.Select>
      </Form.Group>
    </Row>
  );
};
CustomDatepickerInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

SendEmailParticipant.propTypes = {
  onChange: PropTypes.func,
  getEditorContent: PropTypes.func,
  setErrors: PropTypes.func,
  errors: PropTypes.func,
  checkedEmails: PropTypes.array,
  sendEmailData: PropTypes.string,
};

MailSchedule.propTypes = {
  onChange: PropTypes.func,
  scheduleTime: PropTypes.string,
};
