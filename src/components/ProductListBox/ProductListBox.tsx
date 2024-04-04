import './productListBox.css';
import type {JSX} from "react";
import {optionType, ProductDataList} from "../../type/type";
import {toggleMenuState} from "../../store/slices/menuSlices";
import {useDispatch} from "react-redux";

const ProductListBox = ({
                            id,
                            batchId,
                            inventoryId,
                            productName,
                            variationDetails,
                            price,
                            expiryDate,
                            quantity,
                            sold,
                            isActive
                        }: ProductDataList): JSX.Element => {

    const dispatch = useDispatch();
    const handleActionMenu = (option: optionType) => {
        dispatch(toggleMenuState({actionState: true, optionName: option}));
        const optionsToDisable: optionType[] = ["EDIT_PRODUCT", "DELETE_PRODUCT"];
        optionsToDisable
            .filter(optionName => optionName !== option)
            .forEach(optionName => dispatch(toggleMenuState({actionState: false, optionName})));
    };

    return <div className="productListBox">

        <section className="productListBox__productInfoContainer">
            <p className="productListBox__productName">{productName}</p>
            <div className="productListBox__productInfo">
                <p>Batch Id {batchId}</p>
                <p>Inventory Id {inventoryId}</p>
            </div>
        </section>

        <section className="productListBox__variationDetailContainer">
            <p>Variation Details</p>
            <p>{variationDetails}</p>
        </section>

        <section className="productListBox__productDataContainer">
            {[
                {title: "Price", data: price},
                {title: "Expiry Date", data: expiryDate},
                {title: "Quantity", data: quantity},
                {title: "Sold", data: sold},
            ].map((value, index: number) => {
                return <div className="productListBox__productData">
                    <p className="batchListBox__productData__title">{value.title}</p>
                    <p className="batchListBox__productData__data">{value.data}</p>
                </div>
            })}
        </section>

        <section className="productListBox__productActionContainer">
            <button
                type="button"
                className="productListBox__productActionBtn"
                style={{
                    background: "var(--color15)",
                    color: "var(--color14)",
                }}
                onClick={() => handleActionMenu("EDIT_PRODUCT")}
            >
                Edit
            </button>
            <button
                type="button"
                className="productListBox__productActionBtn"
                style={{
                    background: "var(--color13)",
                    color: "var(--color12)",
                }}
            >
                {isActive ? "Deactivate" : "Activate"}
            </button>
            <button
                type="button"
                className="productListBox__productActionBtn"
                style={{
                    background: "var(--color06)",
                    color: "var(--color08)",
                }}
                onClick={() => handleActionMenu("DELETE_PRODUCT")}
            >
                Delete
            </button>
        </section>
    </div>
};

export default ProductListBox;