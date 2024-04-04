import './inventoryList.css';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {useNavigate} from 'react-router-dom';
import type {JSX} from "react";
import InventoryListBox from "../../../components/InventoryListBox/InventoryListBox";
import {InventoryDataList, SortOptionType} from "../../../type/type";
import SortByMenu from "../../../components/SortByMenu/SortByMenu";
import {inventoryData} from "../../../data/data";

const iconStyle = {
    fontSize: "18px",
    fontWeight: "500",
};

const sortByData: SortOptionType[] = [
    {sortOption: "Batch Quantity", sortAction: null},
    {sortOption: "Product Quantity", sortAction: null},
    {sortOption: "Out Of Stock", sortAction: null},
    {sortOption: "Product Sold", sortAction: null},
    {sortOption: "Inventory Cost", sortAction: null},
];

const InventoryList = (): JSX.Element => {
    const navigate = useNavigate();

    const handleBackToDashboard = () => {
        navigate('/inventory');
    };

    return <section className="inventoryList">
        <section className="inventoryList__headingContainer">
            <h1 className="inventoryList__title">Inventory List</h1>
            <h4 className="inventoryList__inventoryInfo">Total Inventory <span>{inventoryData.length}</span></h4>
            <h4 className="inventoryList__inventoryInfo">Total Batches <span>{inventoryData.reduce((acc: number, cur: InventoryDataList) => acc + cur.batchQty, 0)}</span></h4>
            <h4 className="inventoryList__inventoryInfo">Total Products <span>{inventoryData.reduce((acc: number, cur: InventoryDataList) => acc + cur.productQty, 0)}</span></h4>

            <div className="inventoryList__headingActionContainer">
                <button type="button" className="inventoryList__backBtn" onClick={handleBackToDashboard}>
                    <ArrowBackIcon style={iconStyle}/>
                    Back to Dashboard
                </button>
                <SortByMenu sortOptionData={sortByData}/>
            </div>
        </section>
        <section className="inventoryList__ListContainer noScroll">

            {inventoryData.map((value: InventoryDataList, index: number,) => <InventoryListBox
                key={index}
                id={value.id}
                inventoryName={value.inventoryName}
                type={value.type}
                location={value.location}
                batchQty={value.batchQty}
                productQty={value.productQty}
                outOfStock={value.outOfStock}
                productSold={value.productSold}
                inventoryCost={value.inventoryCost}
            />)}
        </section>
    </section>
}

export default InventoryList;