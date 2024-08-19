import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const InfoCard = ({ label, value, percentage, sevenDayValues }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const chart = chartRef.current;
            const ctx = chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
            gradient.addColorStop(0, 'rgba(75, 192, 192, 1)');
            gradient.addColorStop(1, 'rgba(98,52,152,1)');

            chart.data.datasets[0].borderColor = gradient;
            chart.update();
        }
    }, [sevenDayValues]);

    const data = {
        labels: Array.from({ length: 7 }, (_, i) => i + 1),
        datasets: [
            {
                label: '7 Day Trend',
                data: sevenDayValues,
                fill: false,
                borderColor: 'rgb(75, 192, 192)', // This will be overridden by the gradient
                tension: 0.1
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                display: false
            },
            y: {
                display: false
            }
        },
        maintainAspectRatio: false
    };

    return (
        <div style={{
            minWidth: '250px',
            width: "fit-content",
            minHeight: '108px',
            backgroundColor: '#212124',
            padding: '32px 34px',
            color: 'white',
            borderRadius: 12,
            display: "flex",
        }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 28, marginRight: 30 }}>
                <div style={{ fontSize: 15, fontWeight: "bold" }}>{label}</div>
                <div style={{ fontSize: 34 }}>{value}</div>
                <div>{percentage}%</div>
            </div>

            <div style={{ width: 170, height: 60 }}>
                <Line ref={chartRef} data={data} options={options} />
            </div>
        </div>
    );
};

export default InfoCard;
