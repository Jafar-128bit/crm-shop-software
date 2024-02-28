import {JSX} from "react";
import CalenderPropertyTab from "./CalenderPropertyTab/CalenderPropertyTab";

type PropType = {
    tabName: string;
}

const Tabs = ({tabName}: PropType): JSX.Element | null => {
    switch (tabName) {
        case "calenderPropertyTab":
            return <CalenderPropertyTab/>;
        default:
            return null;
    }
}

export default Tabs;