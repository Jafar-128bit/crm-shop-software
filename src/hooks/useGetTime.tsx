import {useEffect, useState} from "react";
import {getFormattedTime} from "../utils/utils";

const useGetTime = (): string => {
    const [currentTime, setCurrentTime] = useState<string>(getFormattedTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(getFormattedTime);
        }, 1000);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return currentTime;
};

export default useGetTime;