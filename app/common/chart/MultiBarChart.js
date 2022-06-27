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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  maintainAspectRatio: false,
  borderRadius: 4,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      display: false,
      grid: {
        display: false,
      },
      minBarLength: 7,
    },

    x: {
      minBarLength: 7,
      // display: false,
      //   ticks: {
      gridLines: [{ drawBorder: false, display: false }],
      //   },
      grid: {
        display: false,
        drawBorder: false,
      },
    },
  },
};

const MultiBarChart = ({ data }) => (
  <div style={{ height: '80px', width: '312px' }}>
    <Bar data={data} options={options} />
  </div>
);

MultiBarChart.propTypes = {
  data: PropTypes.object,
};
export default MultiBarChart;
