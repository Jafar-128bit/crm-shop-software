import './batchListBox.css';
import {type JSX, useState} from "react";
import {motion} from 'framer-motion';
import ProductListBox from "../ProductListBox/ProductListBox";
import {BatchDataList, optionType, ProductDataList} from "../../type/type";
import {toggleMenuState} from "../../store/slices/menuSlices";
import {useDispatch} from "react-redux";
import {productData} from "../../data/data";

const BatchListBox = ({id, batchId, inventoryId, productQty, outOfStock}: BatchDataList): JSX.Element => {
    const dispatch = useDispatch();
    const [showProduct, setShowProduct] = useState<boolean>(false);

    const handleProductList = () => {
        setShowProduct(!showProduct);
    };
    const handleActionMenu = (option: optionType) => {
        dispatch(toggleMenuState({actionState: true, optionName: option}));
        const optionsToDisable: optionType[] = ["TRANSFER_BATCH", "EDIT_BATCH", "DELETE_BATCH"];
        optionsToDisable
            .filter(optionName => optionName !== option)
            .forEach(optionName => dispatch(toggleMenuState({actionState: false, optionName})));
    };

    return <>
        <div className="batchListBox">
            <h2 className="batchListBox__batchId">Batch {batchId}</h2>

            <section className="batchListBox__infoDataContainer">
                {[
                    {title: "Product Quantity", data: productQty},
                    {title: "Out Of Stock", data: outOfStock}
                ].map((value, index: number) => {
                    return <div key={index} className="batchListBox__infoDataWrapper">
                        <p className="batchListBox__infoDataWrapper__title">{value.title}</p>
                        <p className="batchListBox__infoDataWrapper__data">{value.data}</p>
                    </div>
                })}
            </section>

            <section className="batchListBox__batchActionContainer">
                <button
                    type="button"
                    className="batchListBox__batchActionBtn"
                    style={{
                        background: "var(--color15)",
                        color: "var(--color14)",
                    }}
                    onClick={() => handleActionMenu("EDIT_BATCH")}
                >
                    Edit
                </button>
                <button
                    type="button"
                    className="batchListBox__batchActionBtn"
                    style={{
                        background: "var(--color07)",
                        color: "var(--color09)",
                    }}
                    onClick={handleProductList}
                >
                    {showProduct ? "Hide Products" : "Show Products"}
                </button>
                <button
                    type="button"
                    className="batchListBox__batchActionBtn"
                    style={{
                        background: "var(--color13)",
                        color: "var(--color12)",
                    }}
                    onClick={() => handleActionMenu("TRANSFER_BATCH")}
                >
                    Transfer Products
                </button>
                <button
                    type="button"
                    className="batchListBox__batchActionBtn"
                    style={{
                        background: "var(--color06)",
                        color: "var(--color08)",
                    }}
                    onClick={() => handleActionMenu("DELETE_BATCH")}
                >
                    Delete
                </button>
            </section>
        </div>
        {
            showProduct &&
            <motion.div
                className="batchListBox__productList noScroll"
                initial={{opacity: 0, height: "0"}}
                animate={{opacity: 1, height: "500px"}}
                transition={{duration: 0.15}}
            >
                {productData.map((value: ProductDataList, index: number) => <ProductListBox
                    id={value.id}
                    batchId={value.batchId}
                    inventoryId={value.inventoryId}
                    productName={value.productName}
                    variationDetails={value.variationDetails}
                    price={value.price}
                    expiryDate={value.expiryDate}
                    quantity={value.quantity}
                    sold={value.sold}
                    isActive={value.isActive}
                />)}
            </motion.div>
        }
    </>
}

export default BatchListBox;