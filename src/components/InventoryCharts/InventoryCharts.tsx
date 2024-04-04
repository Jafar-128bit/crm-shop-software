import './inventoryCharts.css';
import ReactApexChart from 'react-apexcharts';
import {ApexOptions} from 'apexcharts';
import {useEffect, useRef, useState} from "react";
import useWidth from "../../hooks/useWidth";

type ChartDataType = {
    series: { name: string, type: string, data: number[] }[],
    options: ApexOptions
};

const InventoryCharts = () => {
    const salesData = [
        654, 655, 780, 592, 547, 717, 613, 611, 571, 580,
        572, 715, 464, 493, 546, 619, 726, 578, 703, 570,
        621, 660, 497, 739, 630, 718, 781, 629, 692, 768
    ];
    const inventoryData = [
        592, 591, 718, 530, 485, 656, 552, 550, 510, 520,
        512, 655, 414, 443, 496, 569, 676, 528, 653, 510,
        561, 600, 437, 679, 570, 658, 721, 569, 632, 708
    ];

    const inventoryTurnoverRatio: number[] = salesData.map((cogs: number, index: number) => parseFloat((cogs / inventoryData[index]).toFixed(2)));
    const sumOfInventoryTurnover: number = inventoryTurnoverRatio.reduce((acc: number, cur: number) => acc + cur, 0);
    const averageInventoryTurnover: number = parseFloat((sumOfInventoryTurnover / inventoryTurnoverRatio.length).toFixed(2));

    const chartData: ChartDataType = {
        series: [
            {
                name: 'Sale',
                type: 'bar',
                data: salesData,
            },
            {
                name: 'Inventory',
                type: 'bar',
                data: inventoryData,
            },
            {
                name: 'Inventory Turnover',
                type: 'line',
                data: inventoryTurnoverRatio,
            },
        ],
        options: {
            chart: {
                height: 350,
                type: "line",
                stacked: false,
                toolbar: {
                    show: true,
                },
                zoom: {
                    enabled: true,
                },
            },
            stroke: {
                width: [0, 0, 2]
            },
            colors: ['var(--newColor04)', 'var(--newColor03)', 'var(--color05)'],
            plotOptions: {
                bar: {
                    horizontal: false,
                    dataLabels: {
                        position: 'bottom',
                        orientation: "vertical",
                    }
                },
            },
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    colors: ["var(--colorBlack)"]
                },
                background: {
                    enabled: false,
                    borderRadius: 0,
                    borderWidth: 0,
                    opacity: 1,
                    dropShadow: {
                        enabled: false,
                    }
                },
            },
            xaxis: {
                categories: [
                    '01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan',
                    '06 Jan', '07 Jan', '08 Jan', '09 Jan', '10 Jan',
                    '11 Jan', '12 Jan', '13 Jan', '14 Jan', '15 Jan',
                    '16 Jan', '17 Jan', '18 Jan', '19 Jan', '20 Jan',
                    '21 Jan', '22 Jan', '23 Jan', '24 Jan', '25 Jan',
                    '26 Jan', '27 Jan', '28 Jan', '29 Jan', '30 Jan'
                ]
            },
            yaxis: [
                {
                    seriesName: 'Sale',
                    axisTicks: {
                        show: true
                    },
                    axisBorder: {
                        show: true,
                    },
                    title: {
                        text: 'Total Cost',
                    },
                    min: 0,
                    max: 1000,
                },
                {
                    seriesName: 'Inventory',
                    show: false
                },
                {
                    opposite: true,
                    seriesName: 'Inventory Turnover',
                    axisTicks: {
                        show: true
                    },
                    axisBorder: {
                        show: true,
                    },
                    title: {
                        text: 'Inventory Turnover Ratio',
                    },
                    min: Math.min(...inventoryTurnoverRatio, 1),
                    max: Math.max(...inventoryTurnoverRatio),
                },
            ],
        },
    };

    const { width, targetRef } = useWidth();

    return <section className="inventoryCharts" ref={targetRef}>
        <p className="inventoryCharts__chartTitle">Sales and Inventory Turnover</p>
        <div className="inventoryCharts__chartInfoContainer">
            <p className="inventoryCharts__chartInfo">Average Inventory Turnover <span>{averageInventoryTurnover}</span></p>
            <p className="inventoryCharts__chartInfo">Current Inventory Turnover <span>{inventoryTurnoverRatio[inventoryTurnoverRatio.length - 1]}</span></p>
        </div>
        <ReactApexChart
            options={chartData.options as ApexOptions}
            series={chartData.series}
            type='line'
            height={350}
            width={width}
        />
    </section>
}

export default InventoryCharts;