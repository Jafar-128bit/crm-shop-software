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
import Products from "./page/Products/Products";
import Billing from "./page/Billing/Billing";
import Orders from "./page/Orders/Orders";
import Analytics from "./page/Analytics/Analytics";
import Users from "./page/Users/Users";
import Reservation from "./page/Reservation/Reservation";
import Delivery from "./page/Delivery/Delivery";
import Shipping from "./page/Shipping/Shipping";
import HelpSupport from "./page/HelpSupport/HelpSupport";
import Setting from "./page/Setting/Setting";

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
                path: "/orders",
                element: <Orders/>,
            },
            {
                path: "/products",
                element: <Products/>,
            },
            {
                path: "/analytics",
                element: <Analytics/>,
            },
            {
                path: "/users",
                element: <Users/>,
            },
            {
                path: "/reservation",
                element: <Reservation/>,
            },
            {
                path: "/delivery",
                element: <Delivery/>,
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
