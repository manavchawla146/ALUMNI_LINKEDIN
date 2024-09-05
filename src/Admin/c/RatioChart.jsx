import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
);

const RatioChart = () => {
    const data = {
        labels: ['Students', 'Alumni', 'Teachers'],
        datasets: [{
            data: [10, 15, 8],
            backgroundColor: ['#4f46e5', '#10b981', '#f97316'],
            hoverBackgroundColor: ['#3730a3', '#059669', '#ea580c'],
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#6b7280',
                },
                grid: {
                    color: '#e5e7eb',
                }
            },
            x: {
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
                        return tooltipItem.raw + " people";
                    }
                }
            }
        }
    };

    return (
        <div className="w-full h-80">
            <Bar data={data} options={options} />
        </div>
    );
};

export default RatioChart;
