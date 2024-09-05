import React, { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

const RatioChart2 = () => {
  useEffect(() => {
    const canvas = document.getElementById('jobFieldsChart');
    const ctx = canvas.getContext('2d');

    if (canvas.chart) {
      canvas.chart.destroy();
    }

    const jobData = {
      labels: ['IT', 'Management', 'Education'],
      datasets: [{
        data: [2, 1, 1],
        backgroundColor: ['#4f46e5', '#10b981', '#f97316'],
        hoverBackgroundColor: ['#3730a3', '#059669', '#ea580c'],
      }]
    };

    const chart = new Chart(ctx, {
      type: 'bar',
      data: jobData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Jobs',
              color: '#6b7280',
            },
            ticks: {
              color: '#6b7280',
            },
            grid: {
              color: '#e5e7eb',
            }
          },
          x: {
            title: {
              display: true,
              text: 'Job Fields',
              color: '#6b7280',
            },
            ticks: {
              color: '#6b7280',
            },
            grid: {
              color: '#e5e7eb',
            }
          }
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.raw + " jobs";
              }
            }
          }
        }
      }
    });

    canvas.chart = chart;

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="w-full h-80">
      <canvas id="jobFieldsChart"></canvas>
    </div>
  );
};

export default RatioChart2;
