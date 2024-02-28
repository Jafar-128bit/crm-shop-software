import { useEffect, useState, useMemo } from "react";
import { getFormattedTime } from "../utils/utils";

const useGetTime = (): string => {
    const [currentTime, setCurrentTime] = useState<string>(getFormattedTime);

    // Memoize the getFormattedTime function
    const memoizedGetFormattedTime = useMemo(() => getFormattedTime, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newTime = memoizedGetFormattedTime();

            // Update the state only if the time has changed
            if (newTime !== currentTime) {
                setCurrentTime(newTime);
            }
        }, 1000);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [currentTime, memoizedGetFormattedTime]);

    return currentTime;
};

export default useGetTime;
