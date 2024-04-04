import './inventoryDashboard.css';
import InventoryMetricsTab from "../../../components/InventoryMetricsTab/InventoryMetricsTab";
import InventoryInfoTable from "../../../components/InventoryInfoTable/InventoryInfoTable";
import InventoryCharts from "../../../components/InventoryCharts/InventoryCharts";

const InventoryDashboard = () => {

    return <section className="inventoryDashboard noScroll">
        <h1 className="inventoryDashboard__title">Dashboard</h1>
        <InventoryMetricsTab/>
        <InventoryInfoTable/>
        <InventoryCharts />
    </section>
}

export default InventoryDashboard;