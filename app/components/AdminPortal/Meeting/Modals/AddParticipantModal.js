/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import classNames from 'classnames';
import { ReactMultiEmail } from 'react-multi-email';
import 'react-multi-email/style.css';
import DropzoneComponent from '../../../../common/Dropzone';

const options = [
  { value: 'yuliabraslavska@gmail.com', label: 'yuliabraslavska@gmail.com' },
  { value: 'yulia@gmail.com', label: 'yulia@gmail.com' },
  { value: 'denis.designer@gmail.com', label: 'denis.designer@gmail.com' },
];

const styles = {
  fontFamily: 'sans-serif',
  width: '500px',
  border: '1px solid #eee',
  background: '#f3f3f3',
  padding: '25px',
  margin: '20px',
};

export const AddParticipantModal = ({
  changeParticipantData,
  setErrors,
  errors,
  payload,
  participantData,
}) => {
  const [emails, setEmail] = useState([]);
  const [role, setRole] = useState(
    (participantData && participantData.role_id) || '',
  );

  useEffect(() => {
    if (Object.keys(participantData).length) {
      setEmail([participantData && participantData.email]);
    }
  }, [participantData]);

  const onAddEmails = emailData => {
    setEmail(emailData);
    setErrors({});
    changeParticipantData({ email: emailData });
  };

  const onAddRole = id => {
    setRole(id);
    changeParticipantData({ role_id: id });
  };
  return (
    <div className="exports-btn_participant">
      <Form.Group className="form-group mb-1">
        <Form.Label>User Role</Form.Label>
        <Form.Select
          value={role}
          defaultValue={role}
          className="ms-2"
          onChange={e => onAddRole(e.target.value)}
        >
          <option value="">Please Select Role</option>
          <option value="2">Host</option>
          <option value="3">Moderator</option>
          <option value="4">Participant</option>
          <option value="5">Observer</option>
        </Form.Select>

        {errors.option && (
          <Form.Control.Feedback type="invalid" className="is-invalid-text">
            {errors.option}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="form-group mb-1">
        <Form.Label>Email</Form.Label>
        <ReactMultiEmail
          className={classNames({ 'is-invalid': errors.email })}
          placeholder="Input your Email Address"
          emails={emails}
          onChange={_emails => {
            onAddEmails(_emails);
          }}
          getLabel={(email, index, removeEmail) => (
            <div data-tag key={index}>
              {email}
              <span
                aria-hidden="true"
                data-tag-handle
                onClick={() => removeEmail(index)}
              >
                ×
              </span>
            </div>
          )}
        />
        {errors.email && (
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <label className="particiapnt_drag">
        {' '}
        <span>Or</span>{' '}
      </label>

      {/* <img src={UploadImg} alt="upload" /> */}
      <DropzoneComponent
        changeParticipantData={changeParticipantData}
        setErrors={setErrors}
        payload={payload}
      />
      {/* </div> */}

      {errors.error && (
        <Form.Control.Feedback type="invalid" className="is-invalid-text">
          {errors.error}
        </Form.Control.Feedback>
      )}
    </div>
  );
};

AddParticipantModal.propTypes = {
  changeParticipantData: PropTypes.func,
  setErrors: PropTypes.func,
  errors: PropTypes.object,
  payload: PropTypes.object,
  participantData: PropTypes.object,
};
