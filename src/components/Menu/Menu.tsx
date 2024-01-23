import './TodoMenu/TodoMenu';
import TodoMenu from "./TodoMenu/TodoMenu";
import {ReactElement} from "react";

type Prop = {
    name: string | null;
}

const Menu = (prop: Prop): ReactElement => {
    switch (prop.name) {
        case "todoMenu":
            return <TodoMenu/>
        default:
            return <></>;
    }
}

export default Menu;