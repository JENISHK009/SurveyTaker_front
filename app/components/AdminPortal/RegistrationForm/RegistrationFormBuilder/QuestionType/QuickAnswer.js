import React from 'react';
import classNames from 'classnames';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const QuickAnswer = ({
  data,
  onChange,
  handleValidationChange,
  erorrs,
  emailValue,
  from,
  handleEmailChange,
}) => {
  const handleChange = val => {
    if (from === 'preview') {
      handleValidationChange(val);
      handleEmailChange(data);
    } else {
      onChange({ contentOptions: val });
    }
  };

  return (
    <div className="d-flex mt-5">
      <span className="me-3">1.</span>
      <Form.Group className="form-group mb-0">
        <Form.Label>
          {data.label}
          {data.isRequire && '*'}
        </Form.Label>
        <Form.Control
          type="email"
          required
          name="email"
          value={emailValue}
          placeholder="Enter"
          style={{ width: '484px' }}
          onChange={e => {
            handleChange(e.target.value);
          }}
          className={classNames({ 'is-invalid': erorrs })}
        />
        {erorrs && (
          <Form.Control.Feedback type="invalid">{erorrs}</Form.Control.Feedback>
        )}
      </Form.Group>
    </div>
  );
};

QuickAnswer.propTypes = {
  onChange: PropTypes.func,
  data: PropTypes.object,
  from: PropTypes.string,
  handleValidationChange: PropTypes.func,
  erorrs: PropTypes.array,
  emailValue: PropTypes.string,
  handleEmailChange: PropTypes.func,
};

export default QuickAnswer;
