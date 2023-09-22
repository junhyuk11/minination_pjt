import React, { useRef, useEffect } from 'react';
import { createChart, PriceScaleMode } from 'lightweight-charts';

function BankChartRow({ data }) {
    const chartContainerRef = useRef();
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartContainerRef.current && data && !chartRef.current) {
            chartRef.current = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.width,
                height: 200,
            });

            const lineSeries = chartRef.current.addLineSeries();
            lineSeries.setData(data);

            // Configure the time scale
            const timeScale = chartRef.current.timeScale();
            timeScale.setVisibleRange({
                from: data[0].time,
                to: data[data.length - 1].time,
            });
            timeScale.fitContent();

            // Configure price scale
            chartRef.current.applyOptions({
                layout: {
                    backgroundColor: '#F9F9F9',
                    textColor: '#191919',
                },
                rightPriceScale: {
                    scaleMargins: {
                        top: 0.3,
                        bottom: 0.25,
                    },
                    mode: PriceScaleMode.Logarithmic,
                },
            });
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.remove();
                chartRef.current = null;
            }
        };
    }, [data]);

    return <div ref={chartContainerRef} />;
}

export default BankChartRow;
