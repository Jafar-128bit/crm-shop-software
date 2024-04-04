import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persist} from './store/store';

import './index.css';
import App from './App';
import Login from "./page/Login/Login";
import Dashboard from "./page/Dashboard/Dashboard";
import Inventory from "./page/Inventory/Inventory";
import Billing from "./page/Billing/Billing";
import Employee from "./page/Employee/Employee";
import HelpSupport from "./page/HelpSupport/HelpSupport";
import Setting from "./page/Setting/Setting";
import Calendar from "./page/Calendar/CalendarPage";
import Accounting from "./page/Accounting/Accounting";
import DayView from "./page/Calendar/DayView/DayView";
import WeekView from "./page/Calendar/WeekView/WeekView";
import MonthView from "./page/Calendar/MonthView/MonthView";
import YearView from "./page/Calendar/YearView/YearView";
import InventoryList from "./page/Inventory/InventoryList/InventoryList";
import InventoryDashboard from "./page/Inventory/InventoryDashboard/InventoryDashboard";
import InventoryOpen from "./page/Inventory/InventoryOpen/InventoryOpen";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Dashboard/>,
            },
            {
                path: "/billing",
                element: <Billing/>,
            },
            {
                path: "/inventory",
                element: <Inventory/>,
                children: [
                    {
                        path: "",
                        element: <InventoryDashboard/>
                    },
                    {
                        path: "inventory-list",
                        children: [
                            {
                                path: "",
                                element: <InventoryList/>,
                            },
                            {
                                path: ":id",
                                element: <InventoryOpen/>,
                            },
                        ]
                    },
                    {
                        path: "batches",
                        element: <div className="inventory__view__inventoryList">
                            Batch List
                        </div>
                    },
                    {
                        path: "products",
                        element: <div className="inventory__view__inventoryList">
                            Product List
                        </div>
                    },
                    {
                        path: "add-products",
                        element: <div className="inventory__view__inventoryList">
                            Add Product List
                        </div>
                    },
                    {
                        path: "suppliers",
                        element: <div className="inventory__view__inventoryList">
                            Suppliers List
                        </div>
                    },
                    {
                        path: "purchase-order",
                        element: <div className="inventory__view__inventoryList">
                            Purchase List
                        </div>
                    },
                    {
                        path: "return-purchase-order",
                        element: <div className="inventory__view__inventoryList">
                            Return Purchase List
                        </div>
                    },
                    {
                        path: "create-purchase-order",
                        element: <div className="inventory__view__inventoryList">
                            Create Purchase List
                        </div>
                    },
                    {
                        path: "create-return-purchase-order",
                        element: <div className="inventory__view__inventoryList">
                            Create Return Purchase List
                        </div>
                    },
                ]
            },
            {
                path: "/employee",
                element: <Employee/>,
            },
            {
                path: "/accounting",
                element: <Accounting/>,
            },
            {
                path: "/calendar",
                element: <Calendar/>,
                children: [
                    {
                        path: "",
                        element: <DayView/>
                    },
                    {
                        path: "week",
                        element: <WeekView/>
                    },
                    {
                        path: "month",
                        element: <MonthView/>
                    },
                    {
                        path: "year",
                        element: <YearView/>
                    },
                ]
            },
            {
                path: "/help&support",
                element: <HelpSupport/>,
            },
            {
                path: "/setting",
                element: <Setting/>,
            },

        ]
    },
    {
        path: "/login",
        element: <Login/>,
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persist}>
                <RouterProvider router={router}/>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
