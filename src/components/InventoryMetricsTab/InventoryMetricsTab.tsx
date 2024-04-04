import './inventoryMetricsTab.css';
/* Icon Imports */
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import CategoryIcon from '@mui/icons-material/Category';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
/* Library */
import {useState} from "react";
import {motion} from 'framer-motion';
import type {JSX} from "react";

/* Types */
interface IconStyle {
    color: string;
    fontSize: string;
}

interface ProductSoldState {
    data: number,
    dataTime: "day" | "week" | "month";
}

interface MetricData {
    icon?: JSX.Element;
    title: string;
    metricData: number;
    showDateBtn?: boolean;
}

interface PropMetricData extends MetricData {

}

/* Icon Style */
const iconStyle: IconStyle = {
    color: "var(--newColor03)",
    fontSize: "28px",
}

/* Micro Components */
const MetricContainer = ({title, metricData, showDateBtn}: MetricData): JSX.Element => {

    const [metricDate, setMetricDate] = useState<"day" | "week" | "month">("month");

    return <motion.div
        className="inventoryMetricsTab__metricsContainer bigContainer"
        initial={{scale: 0.85, opacity: 0}}
        animate={{scale: 1, opacity: 1}}
        transition={{duration: 0.15,}}
    >
        <p className="inventoryMetricsTab__metricsContainer__title">{title}</p>
        {showDateBtn && <div className="inventoryMetricsTab__btnContainer">
            <motion.button
                type="button"
                className="inventoryMetricsTab__btnContainer__btn"
                onClick={() => setMetricDate("day")}
                animate={{background: metricDate === "day" ? "var(--newColor04)" : ""}}
            >
                Today
            </motion.button>
            <motion.button
                type="button"
                className="inventoryMetricsTab__btnContainer__btn"
                onClick={() => setMetricDate("week")}
                animate={{background: metricDate === "week" ? "var(--newColor04)" : ""}}
            >
                Week
            </motion.button>
            <motion.button
                type="button"
                className="inventoryMetricsTab__btnContainer__btn"
                onClick={() => setMetricDate("month")}
                animate={{background: metricDate === "month" ? "var(--newColor04)" : ""}}
            >
                Month
            </motion.button>
        </div>}
        <p className="inventoryMetricsTab__metricsContainer__metricData">{metricData}+</p>
    </motion.div>
}

const InventoryMetricsTab = (): JSX.Element => {
    const handleMetricsData = (flag: "static" | "dynamic"): MetricData[] => {
        if (flag === "static") {
            return [
                {icon: <Inventory2Icon style={iconStyle}/>, title: "Inventories", metricData: 15},
                {icon: <AutoAwesomeMotionIcon style={iconStyle}/>, title: "Batches", metricData: 150},
                {icon: <CategoryIcon style={iconStyle}/>, title: "Products", metricData: 4512},
                {icon: <SwitchAccountIcon style={iconStyle}/>, title: "Suppliers", metricData: 12},
            ];
        } else {
            return [
                {title: "Sold Products", metricData: 2513, showDateBtn: true},
                {title: "Returned Products", metricData: 150, showDateBtn: true},
                {title: "Purchased Products", metricData: 852, showDateBtn: true},
                {title: "Out Of Stock Products", metricData: 110, showDateBtn: false},
            ];
        }
    };

    return <section className="inventoryMetricsTab">
        {handleMetricsData("static").map((value: MetricData, index: number) => <motion.div
            key={index}
            className="inventoryMetricsTab__metricsContainer smallContainer"
            initial={{scale: 0.85, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            transition={{duration: 0.15,}}
        >
            {value.icon !== undefined && <div className="inventoryMetricsTab__metricsContainer__iconContainer">
                {value.icon}
            </div>}
            <p className="inventoryMetricsTab__metricsContainer__title smallMetricTitle">{value.title}</p>
            <p className="inventoryMetricsTab__metricsContainer__metricData smallMetricData">{value.metricData}</p>
        </motion.div>)}

        {handleMetricsData("dynamic").map((value: MetricData, index: number) => <MetricContainer
            key={index}
            title={value.title}
            metricData={value.metricData}
            showDateBtn={value.showDateBtn}
        />)}
    </section>
}

export default InventoryMetricsTab;