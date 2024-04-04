import './inventory.css';
import {useDispatch, useSelector} from "react-redux";
import Menu from "../../components/Menu/Menu";
import {JSX} from "react";
import NewInventoryForm from "../../components/Menu/NewInventoryForm/NewInventoryForm";
import NewBatchForm from "../../components/Menu/NewBatchForm/NewBatchForm";
import NewProductCategories from "../../components/Menu/NewProductCategories/NewProductCategories";
import NewSupplierForm from "../../components/Menu/NewSupplierForm/NewSupplierForm";
import {toggleMenuState} from "../../store/slices/menuSlices";
import {optionType} from "../../type/type";
import {Outlet} from "react-router-dom";
import TransferMenu from "../../components/Menu/TransferMenu/TransferMenu";

const Inventory = (): JSX.Element => {
    const dispatch = useDispatch();
    const menuStates = useSelector((state: any) => state.menuSlice);

    const handleCloseFunction = (optionName: optionType) => {
        dispatch(toggleMenuState({actionState: false, optionName}));
    };

    const isMenuListEmpty: boolean = menuStates.createInventoryMenu
        || menuStates.createBatchMenu
        || menuStates.createProductCategoryMenu
        || menuStates.createSupplierMenu
        || menuStates.viewProductCategoryMenu
        || menuStates.inventoryTransferMenu
        || menuStates.batchTransferMenu
        || menuStates.editInventoryMenu
        || menuStates.editBatchMenu
        || menuStates.editProductMenu
        || menuStates.editProductCategoryMenu
        || menuStates.deleteInventoryMenu
        || menuStates.deleteBatchMenu
        || menuStates.deleteProductMenu;


    return <section className="inventory">
        {isMenuListEmpty && <section className="inventory__menuList noScroll">
            {menuStates.createInventoryMenu && (
                <Menu closeFunction={() => handleCloseFunction("CREATE_INVENTORY")}
                      menuTitle="Create New Inventory"
                      menuHeight={35}
                >
                    <NewInventoryForm/>
                </Menu>
            )}
            {menuStates.createBatchMenu && (
                <Menu closeFunction={() => handleCloseFunction("CREATE_BATCH")}
                      menuTitle="Add New Batch"
                      menuHeight={35}
                >
                    <NewBatchForm/>
                </Menu>
            )}
            {menuStates.createProductCategoryMenu && (
                <Menu closeFunction={() => handleCloseFunction("CREATE_PRODUCT_CATEGORY")}
                      menuTitle="Create Product Category"
                      menuHeight={25}
                >
                    <NewProductCategories/>
                </Menu>
            )}
            {menuStates.createSupplierMenu && (
                <Menu closeFunction={() => handleCloseFunction("CREATE_SUPPLIER")}
                      menuTitle="Add New Supplier"
                      menuHeight={40}
                >
                    <NewSupplierForm/>
                </Menu>
            )}
            {menuStates.viewProductCategoryMenu && (
                <Menu closeFunction={() => handleCloseFunction("VIEW_PRODUCT_CATEGORIES")}
                      menuTitle="Product Categories List"
                      menuHeight={85}
                >
                    <div>List</div>
                </Menu>
            )}
            {menuStates.inventoryTransferMenu && (
                <Menu closeFunction={() => handleCloseFunction("TRANSFER_INVENTORY")}
                      menuTitle="Transfer Batch Menu"
                      menuHeight={95}
                >
                    <TransferMenu transferType="batchTransfer"/>
                </Menu>
            )}
            {menuStates.batchTransferMenu && (
                <Menu closeFunction={() => handleCloseFunction("TRANSFER_BATCH")}
                      menuTitle="Transfer Product Menu"
                      menuHeight={95}
                >
                    <TransferMenu transferType="productTransfer"/>
                </Menu>
            )}
            {menuStates.editInventoryMenu && (
                <Menu closeFunction={() => handleCloseFunction("EDIT_INVENTORY")}
                      menuTitle="Edit Inventory"
                      menuHeight={35}
                >
                    <div>Edit Inventory</div>
                </Menu>
            )}
            {menuStates.editBatchMenu && (
                <Menu closeFunction={() => handleCloseFunction("EDIT_BATCH")}
                      menuTitle="Edit Batch"
                      menuHeight={35}
                >
                    <div>Edit Batch</div>
                </Menu>
            )}
            {menuStates.editProductMenu && (
                <Menu closeFunction={() => handleCloseFunction("EDIT_PRODUCT")}
                      menuTitle="Edit Product"
                      menuHeight={35}
                >
                    <div>Edit Product</div>
                </Menu>
            )}
            {menuStates.editProductCategoryMenu && (
                <Menu closeFunction={() => handleCloseFunction("EDIT_PRODUCT_CATEGORIES")}
                      menuTitle="Edit Product Category"
                      menuHeight={35}
                >
                    <div>Edit Product Category</div>
                </Menu>
            )}
            {menuStates.deleteInventoryMenu && (
                <Menu closeFunction={() => handleCloseFunction("DELETE_INVENTORY")}
                      menuTitle="Delete Invetory"
                      menuHeight={35}
                >
                    <div>Delete Inventory</div>
                </Menu>
            )}
            {menuStates.deleteBatchMenu && (
                <Menu closeFunction={() => handleCloseFunction("DELETE_BATCH")}
                      menuTitle="Delete Batch"
                      menuHeight={35}
                >
                    <div>Delete Batch</div>
                </Menu>
            )}
            {menuStates.deleteProductMenu && (
                <Menu closeFunction={() => handleCloseFunction("DELETE_PRODUCT")}
                      menuTitle="Delete Product"
                      menuHeight={35}
                >
                    <div>Delete Product</div>
                </Menu>
            )}
        </section>}
        <Outlet/>
    </section>
}

export default Inventory;