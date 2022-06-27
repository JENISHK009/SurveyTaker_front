import React from 'react';
import PropTypes from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import AnswerOptionsList from './AnswerOptionsList';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: false,
  maintainAspectRatio: true,
  cutout: 70,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const DoughnutChart = ({ data, chartData, totalCount }) => (
  <div className="chart-block">
    <div className="chart-wrapper">
      <div className="chart-center-text">
        <div className="fw-bold">Total</div>
        <div className="text-bismark">{totalCount} answers</div>
      </div>
      <div className="doughnut-chart-block">
        {chartData && Object.keys(chartData).length > 0 && (
          <Doughnut
            data={chartData}
            height={225}
            width={225}
            options={options}
          />
        )}
      </div>
    </div>
    <AnswerOptionsList data={data} />
  </div>
);

DoughnutChart.propTypes = {
  data: PropTypes.object,
  chartData: PropTypes.object,
  totalCount: PropTypes.string,
};

export default DoughnutChart;
