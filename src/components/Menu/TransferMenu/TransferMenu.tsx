import './transferMenu.css';

import MenuListView from "../../MenuListView/MenuListView";
import {BatchDataList, InventoryDataList, ProductDataList, TransferContextProviderProps} from "../../../type/type";
import {createTransferDataContext} from "../../../Context/TransferDataContext";
import {batchData, inventoryData, productData} from "../../../data/data";

import React, {JSX, useContext, useEffect, useState} from "react";
import {Params, useParams} from "react-router-dom";
import {showPromiseNotification, showWarningNotification} from "../../../utils/utils";

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

/* TODO: Search Hook that can be use every where :  */

const TransferMenu = ({transferType}: { transferType: "batchTransfer" | "productTransfer" }): JSX.Element | null => {
    const param: Readonly<Params<string>> = useParams();
    const currentInventoryId: number = parseInt(param.id as string);

    const [showDestinationList, setShowDestinationList] = useState<boolean>(false);
    const [isGlobalInventory, setIsGlobalInventory] = useState<boolean>(false);

    const [isBatchIdEmpty, setIsBatchIdEmpty] = useState<boolean>(true);
    const [isProductIdEmpty, setIsProductIdEmpty] = useState<boolean>(true);
    const [isBatchIdSelected, setIsBatchIdSelected] = useState<boolean>(true);
    const [isInventoryIdSelected, setIsInventoryIdSelected] = useState<boolean>(true);

    const handleNextAction = (action: string, transferType?: "batch" | "product"): void => {
        switch (action) {
            case "showDestinationList":
                switch (transferType) {
                    case "batch":
                        if (isBatchIdEmpty) showWarningNotification("Select Batches To Transfer!");
                        else setShowDestinationList(true);
                        break;
                    case "product":
                        if (isProductIdEmpty) showWarningNotification("Select Products To Transfer!");
                        else setShowDestinationList(true);
                        break;
                    default:
                        break;
                }
                break;
            case "showTransferList":
                setShowDestinationList(false);
                break;
            case "showGlobalInventory":
                setIsGlobalInventory(true);
                break;
            case "hideGlobalInventory":
                setIsGlobalInventory(false);
                break;
            default:
                break;
        }
    };
    const handleConfirmAction = (action: string) => {

        const confirmPromise: Promise<void> = new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });

        switch (action) {
            case "confirmBatchTransfer":
                if (isInventoryIdSelected) showWarningNotification("Select an Inventory!");
                else showPromiseNotification(confirmPromise, "Transferring Batches", "Transferring Failed", "Batches Transferred Successfully");
                break;
            case "confirmProductTransfer":
                if (isBatchIdSelected) showWarningNotification("Select a Batch!");
                else showPromiseNotification(confirmPromise, "Transferring Products", "Transferring Failed", "Products Transferred Successfully");
                break;
            default:
                break;
        }
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
                        {batchData.filter((batch: BatchDataList, index: number) => batch.inventoryId === currentInventoryId)
                            .map((value: BatchDataList, index: number) => <MenuListView
                                key={index}
                                viewType="batch"
                                data={value}
                                listType="transferList"
                                setIsBatchIdEmpty={setIsBatchIdEmpty}
                            />)}
                    </section>
                    <section className="transferMenu__btnContainer">
                        <button
                            type="button"
                            className="transferMenu__btn nextBtn"
                            onClick={() => handleNextAction("showDestinationList", "batch")}
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
                            setIsInventoryIdSelected={setIsInventoryIdSelected}
                        />)}
                    </section>
                    <section className="transferMenu__btnContainer">
                        <button
                            type="button"
                            className="transferMenu__btn backBtn"
                            onClick={() => handleNextAction("showTransferList")}
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            className="transferMenu__btn confirmBtn"
                            onClick={() => handleConfirmAction("confirmBatchTransfer")}
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
                            setIsProductIdEmpty={setIsProductIdEmpty}
                        />)}
                    </section>
                    <section className="transferMenu__btnContainer">
                        <button
                            type="button"
                            className="transferMenu__btn nextBtn"
                            onClick={() => handleNextAction("showDestinationList", "product")}
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
                                onClick={() => handleNextAction("hideGlobalInventory")}
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
                                onClick={() => handleNextAction("showGlobalInventory")}
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
                                            setIsBatchIdSelected={setIsBatchIdSelected}
                                        />)}
                                </section>
                            </div>)}
                        </section>
                        : <section className="transferMenu__listContainer productDestinationMenu noScroll">
                            {batchData.filter((batch: BatchDataList, index: number) => batch.inventoryId === currentInventoryId)
                                .map((value: BatchDataList, index: number) => <MenuListView
                                    key={index}
                                    viewType="batch"
                                    data={value}
                                    listType="destinationList"
                                    setIsBatchIdSelected={setIsBatchIdSelected}
                                />)}
                        </section>
                    }
                    <section className="transferMenu__btnContainer">
                        <button
                            type="button"
                            className="transferMenu__btn backBtn"
                            onClick={() => handleNextAction("showTransferList")}
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            className="transferMenu__btn confirmBtn"
                            onClick={() => handleConfirmAction("confirmProductTransfer")}
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