// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import Menu from "./Menu.js";

const data = [
    {
        label: "Home",
        id: 1,
        icon: "test",
        collapsed: true,
        children: [
            {
                label: "Home Item 1",
                slug: "home/item-1",
                id: 2,
                icon: "test"
            }
        ]
    },
    {
        label: "About",
        slug: "about",
        id: 2,
        icon: ""
    }
];

const App = (
    <BrowserRouter>
        <div style={{ width: 200 }}>
            <Menu data={data} selected="about" />
        </div>
    </BrowserRouter>
);
ReactDOM.render(App, document.getElementById("react-root"));
