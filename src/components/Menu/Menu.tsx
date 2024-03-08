import {JSX} from "react";

type Prop = {
    name: "todoMenu" | "dateMenu" | null;
    calendarData: any;
    taskData: any;
}

const Menu = (prop: Prop): JSX.Element => {
    switch (prop.name) {
        default:
            return <></>;
    }
}

export default Menu;