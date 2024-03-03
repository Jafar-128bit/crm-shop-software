import './TodoMenu/TodoMenu';
import TodoMenu from "./TodoMenu/TodoMenu";
import CalendarMenu from "./CalendarMenu/CalendarMenu";

import {JSX} from "react";

type Prop = {
    name: "todoMenu" | "dateMenu" | null;
    calendarData: any;
    taskData: any;
}

const Menu = (prop: Prop): JSX.Element => {
    switch (prop.name) {
        case "todoMenu":
            return <TodoMenu calendarData={prop.calendarData} taskData={prop.taskData}/>;
        case "dateMenu":
            return <CalendarMenu calendarData={prop.calendarData}/>;
        default:
            return <></>;
    }
}

export default Menu;