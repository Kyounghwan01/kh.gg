import React, { useEffect } from 'react';
import styled from 'styled-components';
// import { BorderWidth, Chart, Point, ChartColor } from 'chart.js';
import { Chart } from 'chart.js';

interface PieChartProps {
  isData: boolean;
  wins: number;
  losses: number;
}

export default function PieChart({ isData, wins, losses }: PieChartProps) {
  useEffect(() => {
    if (!isData) return;

    const canvas = document.getElementById('doughnut') as HTMLCanvasElement;
    const options = {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [wins, losses],
            backgroundColor: ['red', 'yellow'],
          },
        ],
        labels: ['wins', 'losses'],
      },
      options: {
        legend: {
          display: false,
        },
      },
    };
    new Chart(canvas, options);
  }, [isData, losses, wins]);

  return <DoughnutChart id="doughnut" />;
}

const DoughnutChart = styled.canvas`
  width: 200px !important;
  height: 100px !important;
  display: inline-block !important;
`;
