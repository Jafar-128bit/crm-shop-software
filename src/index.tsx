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
import Analytics from "./page/Analytics/Analytics";
import Employee from "./page/Employee/Employee";
import Shipping from "./page/Shipping/Shipping";
import HelpSupport from "./page/HelpSupport/HelpSupport";
import Setting from "./page/Setting/Setting";
import Calendar from "./page/Calendar/Calendar";
import Payment from "./page/Payment/Payment";

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
            },
            {
                path: "/analytics",
                element: <Analytics/>,
            },
            {
                path: "/employee",
                element: <Employee/>,
            },
            {
                path: "/payment",
                element: <Payment/>,
            },
            {
                path: "/calendar",
                element: <Calendar/>,
            },
            {
                path: "/shipping",
                element: <Shipping/>,
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
