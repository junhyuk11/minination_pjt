import React, { useRef, useEffect, useState } from 'react';
import { createChart, PriceScaleMode } from 'lightweight-charts';

function EconomyRow({ data }) {
    const emptyStyle = {
        height: '355px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const chartContainerRef = useRef();
    const chartRef = useRef(null);
    const [chartWidth, setChartWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            if (chartContainerRef.current) {
                const width = chartContainerRef.current.offsetWidth;
                if (width !== chartWidth) {
                    setChartWidth(width);
                }
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [chartWidth]);

    useEffect(() => {
        if (chartContainerRef.current && data && data.length > 0) {
            chartRef.current = createChart(chartContainerRef.current, {
                width: chartWidth,
                height: 350,
            });

            const lineSeries = chartRef.current.addLineSeries();
            lineSeries.setData(data);

            // 가로축
            const timeScale = chartRef.current.timeScale();
            timeScale.setVisibleRange({
                from: data[0].time,
                to: data[data.length - 1].time,
            });
            timeScale.fitContent();

            // 세로축
            chartRef.current.applyOptions({
                rightPriceScale: {
                    scaleMargins: {
                        top: 0.3,
                        bottom: 0.25,
                    },
                    mode: PriceScaleMode.Logarithmic,
                },
            });

            return () => {
                if (chartRef.current) {
                    if (typeof chartRef.current.destroy === 'function') {
                        chartRef.current.destroy();
                    }
                    chartRef.current.remove();
                    chartRef.current = null;
                }
            };
        }
    }, [chartWidth, data]);

    if (data.length === 0) {
        return (
            <div style={emptyStyle}>
                <p>내일부터 표시됩니다 :)</p>
            </div>
        );
    }
    return <div ref={chartContainerRef}></div>;
}

export default EconomyRow;
