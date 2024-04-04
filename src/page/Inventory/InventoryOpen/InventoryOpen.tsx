import './inventoryOpen.css';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';

import {Params, useParams, useNavigate} from 'react-router-dom';
import {type JSX, useState} from "react";
import BatchListBox from "../../../components/BatchListBox/BatchListBox";
import {BatchDataList, optionType, SortOptionType} from "../../../type/type";
import InventoryCharts from "../../../components/InventoryCharts/InventoryCharts";
import InventoryInfoTable from "../../../components/InventoryInfoTable/InventoryInfoTable";
import SortByMenu from "../../../components/SortByMenu/SortByMenu";
import {useDispatch} from "react-redux";
import {toggleMenuState} from "../../../store/slices/menuSlices";
import {batchData} from "../../../data/data";

interface InventoryDataType {
    title: string;
    data: number;
    type: "units" | "₹";
    color: "var(--color08)" | "var(--color09)" | "var(--colorBlack)"
}

const iconStyle = {
    fontSize: "18px",
    fontWeight: "500",
};
const inventoryData: InventoryDataType[] = [
    {title: "Batch Quantity", data: 23, type: "units", color: "var(--colorBlack)"},
    {title: "Product Quantity", data: 124, type: "units", color: "var(--colorBlack)"},
    {title: "Out Of Stock", data: 11, type: "units", color: "var(--color08)"},
    {title: "Product Sold", data: 115, type: "units", color: "var(--color09)"},
    {title: "Inventory Cost", data: 325, type: "₹", color: "var(--colorBlack)"},
];
const sortByData: SortOptionType[] = [
    {sortOption: "Batch Id", sortAction: null},
    {sortOption: "Product Quantity", sortAction: null},
    {sortOption: "Out Of Stock", sortAction: null},
];

const InventoryOpen = (): JSX.Element => {
    const param: Readonly<Params<string>> = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [view, setView] = useState<"batchListView" | "infoView">("batchListView");

    const handleNavigate = (url: '/inventory' | '/inventory/inventory-list') => {
        navigate(url);
    };
    const handleSelectView = (flag: "batchListView" | "infoView") => {
        setView(flag);
    }
    const handleActionMenu = (option: optionType) => {
        dispatch(toggleMenuState({actionState: true, optionName: option}));
        const optionsToDisable: optionType[] = ["TRANSFER_INVENTORY", "EDIT_INVENTORY", "DELETE_INVENTORY"];
        optionsToDisable
            .filter(optionName => optionName !== option)
            .forEach(optionName => dispatch(toggleMenuState({actionState: false, optionName})));
    };

    const HandleView = (): JSX.Element => {
        switch (view) {
            case "batchListView":
                return <section className="inventoryOpen__viewWrapper noScroll">
                    {batchData.map((value: BatchDataList, index: number) => <BatchListBox
                        key={index}
                        id={value.id}
                        batchId={value.batchId}
                        inventoryId={value.inventoryId}
                        productQty={value.productQty}
                        outOfStock={value.outOfStock}/>
                    )}
                </section>;
            case "infoView":
                return <section className="inventoryOpen__viewWrapper noScroll">
                    <InventoryCharts/>
                    <InventoryInfoTable/>
                </section>;
            default:
                return <></>;
        }
    }

    return <section className="inventoryOpen">
        <section className="inventoryOpen__infoContainer">
            <div className="inventoryOpen__searchBar">
                <button type="button" className="inventoryOpen__searchBarBtn">
                    <SearchIcon style={iconStyle}/>
                </button>
                <input type="text" placeholder="Search"/>
            </div>
            <div className="inventoryOpen__infoWidget">
                <h1 className="inventoryOpen__infoWidget__title">Inventory Name</h1>
                <div className="inventoryOpen__infoWidget__titleInfo">
                    <p>Type JIT</p>
                    <p>Location In house</p>
                </div>
                <div className="inventoryOpen__infoWidget__separator"/>
                {inventoryData.map((value: InventoryDataType, index: number) => <div
                    key={index}
                    className="inventoryOpen__infoWidget__infoText"
                >
                    <p>{value.title} <small>({value.type})</small></p>
                    <p>{value.data}</p>
                </div>)}
                <div className="inventoryOpen__infoWidget__separator"/>
                <div className="inventoryOpen__infoWidget__actionBtnContainer">
                    <button
                        type="button"
                        className="inventoryOpen__infoWidget__actionBtn"
                        style={{
                            background: "var(--color13)",
                            color: "var(--color12)",
                        }}
                        onClick={() => handleActionMenu("TRANSFER_INVENTORY")}
                    >
                        Transfer Batches
                    </button>
                    <button
                        type="button"
                        className="inventoryOpen__infoWidget__actionBtn"
                        style={{
                            background: "var(--color15)",
                            color: "var(--color14)",
                        }}
                        onClick={() => handleActionMenu("EDIT_INVENTORY")}
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        className="inventoryOpen__infoWidget__actionBtn"
                        style={{
                            background: "var(--color06)",
                            color: "var(--color08)",
                        }}
                        onClick={() => handleActionMenu("DELETE_INVENTORY")}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </section>
        <section className="inventoryOpen__viewContainer">
            <div className="inventoryOpen__btnContainer">
                <div className="inventoryOpen__viewActionBtn">
                    <button
                        type="button"
                        className="inventoryOpen__btn"
                        onClick={() => handleSelectView("infoView")}
                        style={{
                            background: view === "infoView" ? "var(--color11)" : "var(--colorWhite)",
                            color: view === "infoView" ? "var(--colorWhite)" : "var(--color11)"
                        }}
                    >
                        Inventory Info
                    </button>
                    <button
                        type="button"
                        className="inventoryOpen__btn"
                        onClick={() => handleSelectView("batchListView")}
                        style={{
                            background: view === "batchListView" ? "var(--color11)" : "var(--colorWhite)",
                            color: view === "batchListView" ? "var(--colorWhite)" : "var(--color11)"
                        }}
                    >
                        Batch List
                    </button>
                </div>
                <div className="inventoryOpen__navigateActionBtn">
                    <button type="button" className="inventoryOpen__btn" onClick={() => handleNavigate("/inventory")}>
                        <ArrowBackIcon style={iconStyle}/>
                        Back to Dashboard
                    </button>
                    <button type="button" className="inventoryOpen__btn"
                            onClick={() => handleNavigate("/inventory/inventory-list")}>
                        <ArrowBackIcon style={iconStyle}/>
                        Back to Inventory List
                    </button>
                    {view === "batchListView" && <SortByMenu sortOptionData={sortByData}/>}
                </div>
            </div>
            <HandleView/>
        </section>
    </section>
}

export default InventoryOpen;