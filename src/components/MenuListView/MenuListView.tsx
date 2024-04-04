import './menuListView.css';

import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

import React, {JSX, useContext, useState} from "react";
import {BatchDataList, InventoryDataList, ProductDataList} from "../../type/type";
import {BatchDataContext, ProductDataContext} from "../Menu/TransferMenu/TransferMenu";

type ListViewType = {
    viewType: "inventory" | "batch" | "product";
    data: InventoryDataList | BatchDataList | ProductDataList;
    listType?: "transferList" | "destinationList";
}

const IconStyle = {
    padding: "0",
    margin: "0",
    fontSize: "28px",
}

const CheckBox = ({id, data, isChecked, addFunction, removeFunction}: {
    id: number,
    isChecked: boolean,
    data: any,
    addFunction: (data: any) => void,
    removeFunction: (data: any) => void
}): JSX.Element => {
    const handleCheckboxChange = () => {
        if (isChecked) removeFunction(data);
        else addFunction(data);
    };

    return <div className="checkBox">
        <input type="checkbox" id={`checkbox__${id}`} checked={isChecked} onChange={handleCheckboxChange}/>
        <label htmlFor={`checkbox__${id}`}>
            {isChecked && <CheckRoundedIcon style={IconStyle}/>}
        </label>
    </div>
};

const RadioButton = ({id, data, isRadioChecked, updateFunction}: {
    id: number,
    data: any,
    isRadioChecked: boolean,
    updateFunction: (data: any) => void
}): JSX.Element => {
    return <div className="checkBox">
        <input
            type="checkbox"
            id={`checkbox__${id}`}
            checked={isRadioChecked}
            onChange={() => updateFunction(data)}
        />
        <label htmlFor={`checkbox__${id}`}>
            {isRadioChecked && <CheckRoundedIcon style={IconStyle}/>}
        </label>
    </div>
};

const InventoryListView = ({inventoryData}: {
    inventoryData: InventoryDataList,
}): JSX.Element => {
    const batchDataState = useContext(BatchDataContext).state;
    const setBatchDataState = useContext(BatchDataContext).setState;
    const isRadioChecked: boolean = batchDataState.inventoryId === inventoryData.id;

    const updateInventoryId = (newValue: number) => {
        setBatchDataState(prevState => ({...prevState, inventoryId: newValue}));
    };

    return <div className="inventoryMenuListView">
        <RadioButton
            id={inventoryData.id}
            data={inventoryData.id}
            isRadioChecked={isRadioChecked}
            updateFunction={updateInventoryId}
        />
        <section className="inventoryMenuListView__infoContainer">
            <div className="inventoryMenuListView__infoContainer__title">
                <p>{inventoryData.inventoryName}</p>
                <section className="inventoryMenuListView__infoContainer__typeInfo">
                    <p>Type {inventoryData.type}</p>
                    <p>{inventoryData.location}</p>
                </section>
            </div>
            <p>Total Batch <strong>{inventoryData.batchQty}</strong></p>
            <p>Total Product <strong>{inventoryData.productQty}</strong></p>
        </section>
    </div>
};
const BatchListView = ({batchData, listType}: {
    batchData: BatchDataList,
    listType: "transferList" | "destinationList" | undefined
}): JSX.Element => {
    const batchDataState = useContext(BatchDataContext).state;
    const setBatchDataState = useContext(BatchDataContext).setState;
    const productDataState = useContext(ProductDataContext).state;
    const setBatchIdState = useContext(ProductDataContext).setState;

    const isChecked: boolean = batchDataState.batchId.some((batchId: string) => batchId === batchData.batchId);
    const isRadioChecked: boolean = productDataState.batchId === batchData.batchId;

    const addToBatchId = (value: string) => {
        const newBatchId = [...batchDataState.batchId, value];
        setBatchDataState(prevState => ({...prevState, batchId: newBatchId}));
    };
    const removeFromBatchId = (valueToRemove: string) => {
        const newBatchId = batchDataState.batchId.filter(value => value !== valueToRemove);
        setBatchDataState(prevState => ({...prevState, batchId: newBatchId}));
    };
    const updateBatchId = (newValue: string) => {
        setBatchIdState(prevState => ({...prevState, batchId: newValue}));
    };

    return <div className="batchMenuListView">
        {listType === "transferList" ?
            <CheckBox
                id={batchData.id}
                data={batchData.batchId}
                isChecked={isChecked}
                addFunction={addToBatchId}
                removeFunction={removeFromBatchId}
            /> :
            <RadioButton
                id={batchData.id}
                data={batchData.batchId}
                isRadioChecked={isRadioChecked}
                updateFunction={updateBatchId}
            />}
        <section className="batchMenuListView__infoContainer">
            <p>{batchData.batchId}</p>
            <p>Product Quantity <strong>{batchData.productQty}</strong></p>
            <p>Out Of Stock <strong>{batchData.outOfStock}</strong></p>
        </section>
    </div>
};
const ProductListView = ({productData}: {
    productData: ProductDataList,
}): JSX.Element => {
    const productDataState = useContext(ProductDataContext).state;
    const setProductDataState = useContext(ProductDataContext).setState;

    const isChecked: boolean = productDataState.productId.some((productId: number) => productId === productData.id);

    const addProductData = (value: number) => {
        const newProductData = [...productDataState.productId, value];
        setProductDataState(prevState => ({...prevState, productId: newProductData}));
    };
    const removeProductData = (valueToRemove: number) => {
        const newProductData = productDataState.productId.filter((productId: number) => productId !== valueToRemove);
        setProductDataState(prevState => ({...prevState, productId: newProductData}));
    };

    return <div className="productMenuListView">
        <CheckBox
            id={productData.id}
            data={productData.id}
            isChecked={isChecked}
            addFunction={addProductData}
            removeFunction={removeProductData}
        />
        <section className="productMenuListView__infoContainer">
            <p className="productMenuListView__productName">
                {productData.productName}
            </p>
            <div className="productMenuListView__variationDetails">
                <p>Variation Detail</p>
                <p>{productData.variationDetails}</p>
            </div>
            <p className="productMenuListView__productDataInfo">Price <strong>{productData.price}</strong></p>
            <p className="productMenuListView__productDataInfo">Quantity <strong>{productData.quantity}</strong></p>
        </section>
    </div>
};

const MenuListView = ({viewType, data, listType}: ListViewType): JSX.Element | null => {
    switch (viewType) {
        case "inventory":
            return <InventoryListView inventoryData={data as InventoryDataList}/>;
        case "batch":
            return <BatchListView batchData={data as BatchDataList} listType={listType}/>;
        case "product":
            return <ProductListView productData={data as ProductDataList}/>;
        default:
            return null;
    }
}


export default MenuListView;