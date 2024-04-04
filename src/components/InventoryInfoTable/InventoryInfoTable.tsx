import './inventoryInfoTable.css';

import ReactApexChart from 'react-apexcharts';
import {ApexOptions} from 'apexcharts';
import {motion} from 'framer-motion';
import {useEffect, useRef, useState} from "react";
import useWidth from "../../hooks/useWidth";

type ChartDataType = {
    series: { name: string, type: string, data: number[] }[],
    options: ApexOptions
};

type DataTime = {
    topSellingDataTime: "month" | "week";
    topSlowMovingDataTime: "month" | "week";
}

const InventoryInfoTable = () => {
    const [dataTime, setDataTime] = useState<DataTime>({
        topSellingDataTime: "month",
        topSlowMovingDataTime: "month"
    });

    const [topSellingData, setTopSellingData] = useState<number[]>([0, 0, 0, 0, 0]);
    const [topSlowMovingData, setTopSlowMovingData] = useState<number[]>([0, 0, 0, 0, 0]);

    const handleChangeSellingData = (flag: "month" | "week"): void => {
        setDataTime(prevDataTime => ({
            ...prevDataTime,
            topSellingDataTime: flag
        }));

        setTopSellingData(flag === "month" ? [150, 210, 352, 482, 652] : [37, 53, 176, 121, 163]);
    };

    const handleChangeSlowMovingData = (flag: "month" | "week"): void => {
        setDataTime(prevDataTime => ({
            ...prevDataTime,
            topSlowMovingDataTime: flag
        }));

        setTopSlowMovingData(flag === "month" ? [188, 262, 292, 356, 408] : [47, 65, 73, 89, 102]);
    };

    useEffect(() => {
        handleChangeSellingData("month");
        handleChangeSlowMovingData("month");
    }, []);

    const chartData: ChartDataType[] = [
        {
            series: [
                {
                    name: 'No. of Units',
                    type: 'bar',
                    data: topSellingData.sort((a: number, b: number) => a - b).reverse(),
                },
            ],
            options: {
                chart: {
                    height: 350,
                    type: "bar",
                    stacked: false
                },
                colors: ['var(--newColor05)'],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: "35%",
                        dataLabels: {
                            position: 'center',
                            orientation: "horizontal",
                        }
                    },
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        colors: ["var(--colorWhite)"],
                    }
                },
                xaxis: {
                    categories: [
                        'Product 01',
                        'Product 02',
                        'Product 03',
                        'Product 04',
                        'Product 05',
                    ]
                },
                yaxis: [
                    {
                        seriesName: 'Top Selling',
                        axisTicks: {
                            show: true
                        },
                        axisBorder: {
                            show: true,
                        },
                        title: {
                            text: 'Total Units Sold',
                        }
                    },
                ],
            },
        },
        {
            series: [
                {
                    name: 'No. of Units',
                    type: 'bar',
                    data: [14, 27, 42, 67, 102].sort((a: number, b: number) => a - b),
                },
            ],
            options: {
                chart: {
                    height: 350,
                    type: "bar",
                    stacked: false
                },
                stroke: {
                    width: [0]
                },
                colors: ['var(--newColor06)'],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: "35%",
                        dataLabels: {
                            position: 'center',
                            orientation: "horizontal",
                        }
                    },
                },
                dataLabels: {
                    enabled: true,
                },
                xaxis: {
                    categories: [
                        'Product 06',
                        'Product 03',
                        'Product 08',
                        'Product 10',
                        'Product 83',
                    ]
                },
                yaxis: [
                    {
                        seriesName: 'No. of Units',
                        axisTicks: {
                            show: true
                        },
                        axisBorder: {
                            show: true,
                        },
                        title: {
                            text: 'Total Units Left',
                        }
                    },
                ],
            },
        },
        {
            series: [
                {
                    name: 'No. of Units',
                    type: 'bar',
                    data: topSlowMovingData.sort((a: number, b: number) => a - b),
                },
            ],
            options: {
                chart: {
                    height: 350,
                    type: "bar",
                    stacked: false
                },
                stroke: {
                    width: [0]
                },
                colors: ['var(--color05)'],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: "35%",
                        dataLabels: {
                            position: 'center',
                            orientation: "horizontal",
                        }
                    },
                },
                dataLabels: {
                    enabled: true,
                },
                xaxis: {
                    categories: [
                        'Product 23',
                        'Product 43',
                        'Product 12',
                        'Product 76',
                        'Product 45',
                    ]
                },
                yaxis: [
                    {
                        seriesName: 'No. of Units',
                        axisTicks: {
                            show: true
                        },
                        axisBorder: {
                            show: true,
                        },
                        title: {
                            text: 'Total Units Sold',
                        }
                    },
                ],
            },
        },
    ];

    const {width, targetRef} = useWidth();

    return <section className="inventoryInfoTable">
        <div className="inventoryInfoTable__infoTableContainer">
            <p className="inventoryInfoTable__infoTableContainer__title">
                Top Selling Products
            </p>
            <div className="inventoryInfoTable__infoTableContainer__btnContainer">
                <motion.button
                    type="button"
                    className="inventoryInfoTable__infoTableContainer__btn"
                    onClick={() => handleChangeSellingData("week")}
                    animate={{background: dataTime.topSellingDataTime === "week" ? "var(--newColor04)" : ""}}
                >
                    This Week
                </motion.button>
                <motion.button
                    type="button"
                    className="inventoryInfoTable__infoTableContainer__btn"
                    onClick={() => handleChangeSellingData("month")}
                    animate={{background: dataTime.topSellingDataTime === "month" ? "var(--newColor04)" : ""}}
                >
                    This Month
                </motion.button>
            </div>
            <section className="inventoryInfoTable__infoTableContainer__chartContainer" ref={targetRef}>
                <ReactApexChart
                    options={chartData[0].options as ApexOptions}
                    series={chartData[0].series}
                    type="bar"
                    height={350}
                    width={width}
                />
            </section>
        </div>
        <div className="inventoryInfoTable__infoTableContainer">
            <p className="inventoryInfoTable__infoTableContainer__title">
                Top Low Stock Products
            </p>
            <div className="inventoryInfoTable__infoTableContainer__btnContainer"></div>
            <section className="inventoryInfoTable__infoTableContainer__chartContainer" ref={targetRef}>
                <ReactApexChart
                    options={chartData[1].options as ApexOptions}
                    series={chartData[1].series}
                    type="bar"
                    height={350}
                    width={width}
                />
            </section>
        </div>
        <div className="inventoryInfoTable__infoTableContainer">
            <p className="inventoryInfoTable__infoTableContainer__title">
                Top Slow Moving Products
            </p>
            <div className="inventoryInfoTable__infoTableContainer__btnContainer">
                <motion.button
                    type="button"
                    className="inventoryInfoTable__infoTableContainer__btn"
                    onClick={() => handleChangeSlowMovingData("week")}
                    animate={{background: dataTime.topSlowMovingDataTime === "week" ? "var(--newColor04)" : ""}}
                >
                    This Week
                </motion.button>
                <motion.button
                    type="button"
                    className="inventoryInfoTable__infoTableContainer__btn"
                    onClick={() => handleChangeSlowMovingData("month")}
                    animate={{background: dataTime.topSlowMovingDataTime === "month" ? "var(--newColor04)" : ""}}
                >
                    This Month
                </motion.button>
            </div>
            <section className="inventoryInfoTable__infoTableContainer__chartContainer" ref={targetRef}>
                <ReactApexChart
                    options={chartData[2].options as ApexOptions}
                    series={chartData[2].series}
                    type="bar"
                    height={350}
                    width={width}
                />
            </section>
        </div>
    </section>
};

export default InventoryInfoTable;