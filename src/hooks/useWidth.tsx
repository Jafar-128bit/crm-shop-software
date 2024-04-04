import { useState, useEffect, useRef } from 'react';

const useWidth = () => {
    const [width, setWidth] = useState<number | undefined>(undefined);
    const targetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (targetRef.current === entry.target) {
                    timeout = setTimeout(() => {
                        setWidth(entry.contentRect.width);
                    }, 250);
                }
            }
        });

        if (targetRef.current) observer.observe(targetRef.current);
        return () => {
            observer.disconnect();
            clearTimeout(timeout);
        };
    }, []);

    return { width, targetRef };
};

export default useWidth;