import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import MessageInput from '../../../common/messageInput';

const Answers = ({ type, answers }) => {
  if (type === 'rank_order') {
    return (
      <>
        <ListGroup>
          {answers.map((answer, index) => (
            <ListGroupItem>
              <div>
                <span className="text-gray-middle">{index + 1}.</span>
                <span className="fw-bold" style={{ marginLeft: '.75rem' }}>
                  {answer.name}
                </span>
              </div>
              <div>{answer.value}</div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </>
    );
  }

  if (type === 'quick_answer') {
    return (
      <>
        <ListGroup className="quick-answer-list">
          {answers.map(answer => (
            <ListGroupItem>
              <div className="fw-bold text-left">{answer.name}:</div>
              <div
                className="text-gray-middle text-right"
                style={{ marginLeft: '.375rem' }}
              >
                {answer.value}
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
        <MessageInput />
      </>
    );
  }
  return (
    <ListGroup>
      {answers.map(answer => (
        <ListGroupItem>
          <span className="fw-bold">{answer.name}</span>{' '}
          <span>{answer.value}</span>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

Answers.propTypes = {
  type: PropTypes.string,
  answers: PropTypes.object,
};

export default Answers;
