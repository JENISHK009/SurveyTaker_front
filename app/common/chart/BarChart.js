import React from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import AnswerOptionsList from './AnswerOptionsList';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BarChart = ({ data, chartType, chartData, totalCount }) => {
  const options = {
    borderRadius: 4,
    indexAxis:
      chartType === 'stacked_vertical_bar' || chartType === 'vertical_bar'
        ? 'x'
        : 'y',
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        stacked: chartType === 'stacked_vertical_bar',
        ticks: {
          callback(value) {
            return `${value}%`;
          },
        },
      },
      x: {
        stacked: chartType === 'stacked_horizontal_bar',
      },
    },
  };
  return (
    <div className="chart-block">
      <div className="chart-wrapper">
        <div className="bar-chart-text">
          <div className="fw-bold">Total</div>
          <div className="text-bismark">{totalCount}</div>
        </div>
        <div className="bar-chart-block">
          <Bar data={chartData} options={options} />
        </div>
      </div>
      <AnswerOptionsList data={data} />
    </div>
  );
};

BarChart.propTypes = {
  chartType: PropTypes.string,
  data: PropTypes.object,
  chartData: PropTypes.object,
  totalCount: PropTypes.string,
};

export default BarChart;
