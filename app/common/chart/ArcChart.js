import React from 'react';
import PropTypes from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import AnswerOptionsList from './AnswerOptionsList';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: false,
  maintainAspectRatio: true,
  circumference: 180,
  rotation: -90,
  cutout: 70,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const ArcChart = ({ data, chartData }) => (
  <div className="chart-block">
    <div className="chart-wrapper">
      <div className="doughnut-chart-block">
        <Doughnut data={chartData} height={225} width={225} options={options} />
      </div>
    </div>
    <AnswerOptionsList data={data} />
  </div>
);

ArcChart.propTypes = {
  data: PropTypes.object,
  chartData: PropTypes.object,
};

export default ArcChart;
