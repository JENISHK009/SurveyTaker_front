/* eslint-disable react/prop-types */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'moment-timezone';
import { getTimeZoneFormat } from '../../../common/timezone';
// import classNames from 'classnames';

const MeetingDatesOption = ({
  data,
  from,
  onChange,
  payload,
  handleOptionChange,
  pagedata,
  erorrs,
  errors,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dataAvailable, setDataAvailable] = useState({});

  useEffect(() => {
    if (data && data.length > 0) {
      setDataAvailable(data[data && data.length - 1]);
    }
  }, [data]);

  useEffect(() => {
    if (payload && payload.length > 0) {
      setSelectedOptions(payload);
      onChange({ contentOptions: payload });
    }
  }, [payload]);
  const handleOnChange = (e, index, option) => {
    if (from === 'logic') {
      onChange({ contentOptions: [index.toString()] });
      if (e.target.checked) {
        setSelectedOptions([index.toString()]);
      }
    }
    if (from === 'preview') {
      if (data.questionType === 'meeting_dates' && option) {
        let optionValue;

        if (option && option.not_available) {
          optionValue = option.not_available;
        } else if (option && option.start_date_time) {
          optionValue = `${option &&
            option.displayMsg &&
            `${option.displayMsg} -`} ${getTimeZoneFormat(
            option.start_date_time,
            option.end_date_time,
          ).trim()}`;
        } else {
          optionValue = option;
        }

        handleOptionChange(data, pagedata, index, option.id, optionValue);
      } else {
        handleOptionChange(data, pagedata, index);
      }
    }
  };
  return (
    <>
      <Form className="registration-options">
        <Form.Label>
          {data && data.label} {data && data.isRequire && '*'}
        </Form.Label>
        {from === 'logic' ? (
          <Form.Check>
            <Form.Check.Input
              id={`${from}-not_available`}
              type="radio"
              name="meeting_dates"
              checked={
                from === 'logic' &&
                selectedOptions &&
                selectedOptions[0] &&
                selectedOptions[0].toString()
              }
              onChange={e =>
                handleOnChange(e, dataAvailable && dataAvailable.id)
              }
            />
            <Form.Check.Label
              htmlFor={`${dataAvailable &&
                dataAvailable.not_available &&
                `${from}-not_available`}`}
              className="w-100"
            >
              {dataAvailable && dataAvailable.not_available}
            </Form.Check.Label>
          </Form.Check>
        ) : (
          <>
            {data &&
              data.updatedOptionValue &&
              data.updatedOptionValue.length > 0 &&
              data.updatedOptionValue.map((option, index) => (
                <>
                  {option && option.start_date_time && (
                    <Form.Check>
                      {' '}
                      <Form.Check.Input
                        id={`m-${data.id}-${index}`}
                        type="radio"
                        name="meeting_dates"
                        checked={
                          data.is_checked &&
                          data.is_checked.includes(index.toString())
                        }
                        onChange={e => handleOnChange(e, index, option)}
                      />
                      <Form.Check.Label
                        htmlFor={`m-${data.id}-${index}`}
                        className="w-100"
                      >
                        {option && option.displayMsg && (
                          <span className="fw-bold">
                            {option.displayMsg} -&nbsp;
                          </span>
                        )}
                        {getTimeZoneFormat(
                          option.start_date_time,
                          option.end_date_time,
                        )}
                      </Form.Check.Label>
                    </Form.Check>
                  )}

                  {typeof option !== 'object' && (
                    <Form.Check>
                      <Form.Check.Input
                        id={`c-${from}-${data.id}-${index}`}
                        type="radio"
                        name={`${from && from}-meeting_dates`}
                        checked={
                          data.is_checked &&
                          data.is_checked.includes(index.toString())
                        }
                        onChange={e => handleOnChange(e, index, option)}
                      />
                      <Form.Check.Label
                        htmlFor={`c-${from}-${data.id}-${index}`}
                        className="w-100"
                      >
                        {option}
                      </Form.Check.Label>
                    </Form.Check>
                  )}
                </>
              ))}

            {data &&
              data.updatedOptionValue &&
              data.updatedOptionValue.length > 0 &&
              data.updatedOptionValue.map((option, index) => (
                <>
                  {option && option.not_available && (
                    <Form.Check>
                      <Form.Check.Input
                        id="not_available"
                        type="radio"
                        name="meeting_dates"
                        checked={
                          data.is_checked &&
                          data.is_checked.includes(index.toString())
                        }
                        onChange={e => handleOnChange(e, index, option)}
                      />
                      <Form.Check.Label
                        htmlFor="not_available"
                        className="w-100"
                      >
                        {option.not_available}
                      </Form.Check.Label>
                    </Form.Check>
                  )}
                </>
              ))}
          </>
        )}
        {from === 'logic' && errors && errors.options && (
          <Form.Control.Feedback type="invalid" className="is-invalid-text">
            {errors.options}
          </Form.Control.Feedback>
        )}
        {data && data.has_error && erorrs && (
          <Form.Control.Feedback type="invalid" className="is-invalid-text">
            {erorrs && erorrs.options}
          </Form.Control.Feedback>
        )}
      </Form>
    </>
  );
};

MeetingDatesOption.propTypes = {
  data: PropTypes.object,
  from: PropTypes.string,
  onChange: PropTypes.func,
  payload: PropTypes.object,
  errors: PropTypes.object,
};

export default MeetingDatesOption;
