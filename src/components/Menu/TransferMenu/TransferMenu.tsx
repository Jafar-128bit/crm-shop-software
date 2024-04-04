import './transferMenu.css';
import React, {JSX, useContext, useState} from "react";
import MenuListView from "../../MenuListView/MenuListView";
import {BatchDataList, InventoryDataList, ProductDataList, TransferContextProviderProps} from "../../../type/type";
import {createTransferDataContext} from "../../../Context/TransferDataContext";
import {batchData, inventoryData, productData} from "../../../data/data";

type BatchIdDataType = {
    batchId: string[];
    inventoryId: number | null;
};
type ProductDataType = {
    productId: number[];
    batchId: string | null;
};
type TransferBatchDataContextType = React.FC<TransferContextProviderProps<BatchIdDataType>>;
type TransferProductDataContextType = React.FC<TransferContextProviderProps<ProductDataType>>;

export const BatchDataContext = createTransferDataContext<BatchIdDataType>({batchId: [], inventoryId: null});
export const ProductDataContext = createTransferDataContext<ProductDataType>({productId: [], batchId: null});

const TransferBatchDataContext: TransferBatchDataContextType = ({children, initialState}) => {
    const [batchData, setBatchData] = useState<BatchIdDataType>(initialState);
    return <BatchDataContext.Provider value={{state: batchData, setState: setBatchData}}>
        {children}
    </BatchDataContext.Provider>
};
const TransferProductDataContext: TransferProductDataContextType = ({children, initialState}) => {
    const [productData, setProductData] = useState<ProductDataType>(initialState);
    return <ProductDataContext.Provider value={{state: productData, setState: setProductData}}>
        {children}
    </ProductDataContext.Provider>
};

/* TODO:
*   1. Add condition if no transfer data is selected
*   2. This Inventory should be called with current inventory Id and return only current inventory batches using filter method
*   3. Search Hook that can be use every where */

const TransferMenu = ({transferType}: { transferType: "batchTransfer" | "productTransfer" }): JSX.Element | null => {
    const [showDestinationList, setShowDestinationList] = useState<boolean>(false);
    const [isGlobalInventory, setIsGlobalInventory] = useState<boolean>(false);

    const handleShowDestinationList = (): void => {
        setShowDestinationList(true);
    };
    const handleShowTransferList = (): void => {
        setShowDestinationList(false);
    };
    const handleShowGlobalInventory = (): void => {
        setIsGlobalInventory(true);
    };
    const handleHideGlobalInventory = (): void => {
        setIsGlobalInventory(false);
    };

    switch (transferType) {
        case "batchTransfer":
            const BatchTransferList = (): JSX.Element => {
                return <>
                    <section className="transferMenu__heading">
                        <p className="transferMenu__titleInfo">Select Batches</p>
                        <input className="transferMenu__searchInput" type="text" placeholder="Search batch..."/>
                    </section>
                    <section className="transferMenu__listContainer batchDestinationMenu noScroll">
                        {batchData.map((value: BatchDataList, index: number) => <MenuListView
                            key={index}
                            viewType="batch"
                            data={value}
                            listType="transferList"
                        />)}
                    </section>
                    <section className="transferMenu__btnContainer">
                        <button
                            type="button"
                            className="transferMenu__btn nextBtn"
                            onClick={handleShowDestinationList}
                        >
                            Next
                        </button>
                    </section>
                </>
            };
            const BatchDestinationList = (): JSX.Element => {
                return <>
                    <section className="transferMenu__heading">
                        <p className="transferMenu__titleInfo">Select an Inventory</p>
                        <input className="transferMenu__searchInput" type="text" placeholder="Search inventory..."/>
                    </section>
                    <section className="transferMenu__listContainer batchDestinationMenu noScroll">
                        {inventoryData.map((value: InventoryDataList, index: number) => <MenuListView
                            key={index}
                            viewType="inventory"
                            data={value}
                        />)}
                    </section>
                    <section className="transferMenu__btnContainer">
                        <button
                            type="button"
                            className="transferMenu__btn backBtn"
                            onClick={handleShowTransferList}
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            className="transferMenu__btn confirmBtn"
                        >
                            Confirm
                        </button>
                    </section>
                </>
            };

            return <TransferBatchDataContext initialState={{batchId: [], inventoryId: null}}>
                <div className="transferMenu">
                    {showDestinationList ? <BatchDestinationList/> : <BatchTransferList/>}
                </div>
            </TransferBatchDataContext>

        case "productTransfer":
            const ProductTransferList = (): JSX.Element => {
                return <>
                    <section className="transferMenu__heading">
                        <p className="transferMenu__titleInfo">Select Products</p>
                        <input className="transferMenu__searchInput" type="text" placeholder="Search product..."/>
                    </section>
                    <section className="transferMenu__listContainer batchDestinationMenu noScroll">
                        {productData.map((value: ProductDataList, index: number) => <MenuListView
                            key={index}
                            viewType="product"
                            data={value}
                        />)}
                    </section>
                    <section className="transferMenu__btnContainer">
                        <button
                            type="button"
                            className="transferMenu__btn nextBtn"
                            onClick={handleShowDestinationList}
                        >
                            Next
                        </button>
                    </section>
                </>
            };
            const ProductDestinationList = (): JSX.Element => {
                return <>
                    <section className="transferMenu__heading">
                        <p className="transferMenu__titleInfo">Select an Inventory</p>
                        <div className="transferMenu__inventoryBtnContainer">
                            <button
                                type="button"
                                className="transferMenu__btn thisInventoryBtn"
                                onClick={handleHideGlobalInventory}
                                style={{
                                    background: isGlobalInventory ? "" : "var(--colorBlack)",
                                    color: isGlobalInventory ? "" : "var(--colorWhite)",
                                }}
                            >
                                This Inventory
                            </button>
                            <button
                                type="button"
                                className="transferMenu__btn globalInventoryBtn"
                                onClick={handleShowGlobalInventory}
                                style={{
                                    background: isGlobalInventory ? "var(--colorBlack)" : "",
                                    color: isGlobalInventory ? "var(--colorWhite)" : "",
                                }}
                            >
                                Global Inventory
                            </button>
                        </div>
                    </section>
                    <section className="transferMenu__heading">
                        <p className="transferMenu__titleInfo">Select a Batch</p>
                        <input className="transferMenu__searchInput" type="text" placeholder="Search batch..."/>
                    </section>
                    {isGlobalInventory
                        ? <section className="transferMenu__listContainer productDestinationMenu noScroll">
                            {inventoryData.map((inventory: InventoryDataList, index: number) => <div
                                key={index}
                                className="transferMenu__globalInventoryList"
                            >
                                <section className="transferMenu__globalInventoryList__heading">
                                    <p>Inventory #{inventory.id}</p>
                                    <section className="transferMenu__globalInventoryList__info">
                                        <p>Type <strong>{inventory.type}</strong></p>
                                        <p>Location <strong>{inventory.location}</strong></p>
                                    </section>
                                </section>
                                <section className="transferMenu__globalInventoryList__batchList">
                                    {batchData.filter((batch: BatchDataList, index: number) => batch.inventoryId === inventory.id)
                                        .map((value: BatchDataList, index: number) => <MenuListView
                                            key={index}
                                            viewType="batch"
                                            data={value}
                                            listType="destinationList"
                                        />)}
                                </section>
                            </div>)}
                        </section>
                        : <section className="transferMenu__listContainer productDestinationMenu noScroll">
                            {batchData.map((value: BatchDataList, index: number) => <MenuListView
                                key={index}
                                viewType="batch"
                                data={value}
                                listType="destinationList"
                            />)}
                        </section>
                    }
                    <section className="transferMenu__btnContainer">
                        <button
                            type="button"
                            className="transferMenu__btn backBtn"
                            onClick={handleShowTransferList}
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            className="transferMenu__btn confirmBtn"
                        >
                            Confirm
                        </button>
                    </section>
                </>
            };

            return <TransferProductDataContext initialState={{productId: [], batchId: null}}>
                <div className="transferMenu">
                    {showDestinationList ? <ProductDestinationList/> : <ProductTransferList/>}
                </div>
            </TransferProductDataContext>
        default:
            return null
    }
}

export default TransferMenu;