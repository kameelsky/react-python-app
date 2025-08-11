import React, { useState, useEffect } from "react";

export default function CountdownTimer({ initialSeconds }: { initialSeconds: number }): React.ReactNode {
    const [seconds, setSeconds] = useState<number>(initialSeconds);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    return <>{formatTime(seconds)}</>;
}
