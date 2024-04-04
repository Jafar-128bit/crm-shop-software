import './inventoryListBox.css';

import type {JSX} from "react";
import {useNavigate} from 'react-router-dom';
import {InventoryDataList} from "../../type/type";

interface InventoryDataType {
    title: string;
    data: number;
    type: "units" | "₹";
    color: "var(--color08)" | "var(--color09)" | "var(--colorBlack)"
}

const InventoryListBox = ({
                              id,
                              inventoryName,
                              type,
                              location,
                              batchQty,
                              productQty,
                              outOfStock,
                              productSold,
                              inventoryCost
                          }: InventoryDataList): JSX.Element => {
    const navigate = useNavigate();
    const inventoryData: InventoryDataType[] = [
        {title: "Batch Quantity", data: batchQty, type: "units", color: "var(--colorBlack)"},
        {title: "Product Quantity", data: productQty, type: "units", color: "var(--colorBlack)"},
        {title: "Out Of Stock", data: outOfStock, type: "units", color: "var(--color08)"},
        {title: "Product Sold", data: productSold, type: "units", color: "var(--color09)"},
        {title: "Inventory Cost", data: inventoryCost, type: "₹", color: "var(--colorBlack)"},
    ];

    const handleOpenInventory = () => {
        navigate(`${id}`);
    }

    return <div className="inventoryListBox">
        <section className="inventoryListBox__titleContainer">
            <p className="inventoryListBox__inventoryName">{inventoryName}</p>
            <div className="inventoryListBox__infoDataContainer">
                <p>Type {type}</p>
                <p>Location {location}</p>
            </div>
        </section>
        <section className="inventoryListBox__infoContainer">
            {inventoryData.map((value: InventoryDataType, index: number) => <div
                key={index}
                className="inventoryListBox__info"
            >
                <p className="inventoryListBox__info__title">{value.title}</p>
                <p
                    className="inventoryListBox__info__data"
                    style={{color: value.color}}
                >
                    {value.data} <small>{value.type}</small>
                </p>
            </div>)}
        </section>
        <section className="inventoryListBox__actionContainer">
            <button
                className="inventoryListBox__actionBtn"
                style={{background: "var(--color07)", color: "var(--color09)"}}
                onClick={handleOpenInventory}
            >
                Open
            </button>
        </section>
    </div>
}

export default InventoryListBox;