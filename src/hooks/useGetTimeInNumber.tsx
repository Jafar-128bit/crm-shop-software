import { useEffect, useState, useMemo } from "react";
import { getTimeIn24HourFormat } from '../utils/utils';

const useGetTimeInNumber = () => {
    const [currentTime, setCurrentTime] = useState<string>(getTimeIn24HourFormat);

    // Memoize the getTimeInAMPMFormat function
    const memoizedGetTimeInAMPMFormat = useMemo(() => getTimeIn24HourFormat, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newTime = memoizedGetTimeInAMPMFormat();

            // Update the state only if the time has changed
            if (newTime !== currentTime) {
                setCurrentTime(newTime);
            }
        }, 60000);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [currentTime, memoizedGetTimeInAMPMFormat]);

    return currentTime;
};

export default useGetTimeInNumber;
