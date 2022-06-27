import React from 'react';
import PropTypes from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import AnswerOptionsList from './AnswerOptionsList';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: false,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const PieChart = ({ data, chartData }) => (
  <div className="chart-block">
    <div className="chart-wrapper">
      <div className="pie-chart-block">
        <Pie data={chartData} options={options} height={225} width={225} />
      </div>
    </div>
    <AnswerOptionsList data={data} />
  </div>
);

PieChart.propTypes = {
  data: PropTypes.object,
  chartData: PropTypes.object,
};

export default PieChart;
