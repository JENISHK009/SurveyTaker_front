import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { isEmail, ReactMultiEmail } from 'react-multi-email';
import classNames from 'classnames';
// import CreatableSelect from 'react-select/creatable';
import { MailSchedule } from './SendEmailParticipant';
import TextEditor from '../../../../common/TextEditor';

const EditSendEmailModal = ({
  errors,
  setErrors,
  onChange,
  payload,
  getEditorContent,
}) => {
  //   const [emailData, setEmailData] = useState([]);
  //   const [emailPayload, setEmailPayload] = useState(null);

  const onAddEmails = emailData => {
    setErrors({ ...errors, email: '' });

    onChange({ to_user_emails: emailData });
  };

  const onAddSubject = sub => {
    onChange({ subject: sub });
    setErrors({ ...errors, subject: '' });
  };

  //   const handleChange = newValue => {
  //     const mappedData = emailPayload.map(t => ({
  //       value: t,
  //       label: t,
  //     }));
  //     if (newValue && newValue.length === 0) {
  //       setEmailData([
  //         { label: 'All Participants', value: emailPayload },
  //         ...mappedData,
  //       ]);
  //       onChange({ to_user_emails: newValue });
  //     } else {
  //       onChange({ to_user_emails: newValue });
  //       setEmailData([]);

  //     }
  //   };

  //   useEffect(() => {
  //     if (!emailPayload) {
  //       const allEmailData = {
  //         label: 'All Participants',
  //         value: payload.to_user_emails,
  //       };
  //       const mappedData = payload.to_user_emails.map(t => ({
  //         value: t,
  //         label: t,
  //       }));
  //       setEmailData([allEmailData, ...mappedData]);
  //       setEmailPayload(payload.to_user_emails);
  //     }
  //   }, [emailPayload]);
  return (
    <>
      <MailSchedule
        onChange={onChange}
        scheduleTime={payload['MS_SCHEDULED_EMAILs.schedule_time']}
      />
      <Form.Group className="form-group">
        <Form.Label>Email</Form.Label>
        <ReactMultiEmail
          className={classNames({ 'is-invalid': errors.email })}
          placeholder="Input your Email Address"
          emails={payload.to_user_emails}
          onChange={_emails => {
            onAddEmails(_emails);
          }}
          validateEmail={
            email => isEmail(email) // return boolean
          }
          getLabel={(email, index, removeEmail) => (
            <div data-tag key={index}>
              {email}
              <button type="button" onClick={() => removeEmail(index)}>
                ×
              </button>
            </div>
          )}
        />
        {/* <CreatableSelect
          isMulti
          onChange={handleChange}
          options={emailData}
          defaultValue={emailData[0]}
          noOptionsMessage={() => null}
        /> */}
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
          value={payload.subject}
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
        <TextEditor
          getEditorContent={getEditorContent}
          height={300}
          value={payload.body}
        />
        {errors.body && (
          <Form.Control.Feedback type="invalid" className="is-invalid-text">
            {errors.body}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    </>
  );
};

EditSendEmailModal.propTypes = {
  errors: PropTypes.object,
  onChange: PropTypes.func,
  setErrors: PropTypes.func,
  payload: PropTypes.object,
  getEditorContent: PropTypes.func,
};

export default EditSendEmailModal;
