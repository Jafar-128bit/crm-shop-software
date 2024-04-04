import './infoText.css';
import {useState} from "react";

const InfoText = () => {
    const [position, setPosition] = useState<{ x: number, y: number }>({x: 0, y: 0});
    const [showComponent, setShowComponent] = useState<boolean>(false);
    const [optionName, setOptionName] = useState<string | null>(null);

    const handleShowOptionName = (name: string) => {
        setShowComponent(true);
        setOptionName(name);
    }

    const handleMouseEnter = (e: { clientX: number; clientY: number; }, name: string) => {
        setPosition({x: e.clientX, y: e.clientY});
        handleShowOptionName(name);
    };

    const handleMouseLeave = () => {
        setShowComponent(false);
        setOptionName(null);
    };

    return <p className="sidebar__optionNameBox" style={{
            top: `${position.y / 2}px`,
            left: `${position.x + 10}px`,
        }}
        >
            {optionName}
        </p>
}