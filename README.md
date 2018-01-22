# React-Vertical-Menu

Creates a vertical menu with children

```
import Menu from "react-vertical-menu";
require("/node_module/react-vertical-menu/dist/style.css");

const data = [
    {
        id: 1,
        label: "Home",
        slug: "home",
        icon: "glyphicon glyphicon-home"
    },
    {
        id: 2,
        label: "Settings",
        icon: "glyphicon glyphicon-cog",
        collapsed: true,
        children: [
            {
                id: 3,
                label: "Themes",
                slug: "home/themes",
                icon: "glyphicon glyphicon-th"
            }
        ]
    },
    {
        id: 4,
        label: "About",
        slug: "about",
        icon: "glyphicon glyphicon-book"
    }
];

<Menu data={data} selected="home" />
```
