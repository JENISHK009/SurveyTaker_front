import React from 'react';
import PropTypes from 'prop-types';

const AnswerOptionsList = ({ data }) => (
  <ul className="chart-data-list">
    {data.length > 0 &&
      data.map(item => (
        <li>
          <span
            className="chart-data-circle"
            style={{ backgroundColor: item }}
          />
          <span className="chart-data-answer">{item.name}</span>
          <span className="chart-data-percent">{item.ratio}%</span>
          <span className="chart-data-users">{item.userCount} Users</span>
        </li>
      ))}
  </ul>
);

AnswerOptionsList.propTypes = {
  data: PropTypes.object,
};

export default AnswerOptionsList;
