"use client";

import Button from "@app/lib/components/Button";
import CountdownTimer from "@app/lib/components/CountdownTimer";
import { cookieDuration, logOut, sessionRefresh } from "@app/lib/serverActions/authentication";
import { notification } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";

export default function SessionRefresher(): React.ReactElement {
    const [sessionTime, setSessionTime] = useState<number | null>(null);
    const NOTIFICATION_DURATION = 5 * 60; // notification in seconds before the end of session
    const [refreshCount, setRefreshCount] = useState<number>(0);
    const [notificationApi, notificationContextHolder] = notification.useNotification();
    const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const fetchSessionTime = async () => {
            const time = await cookieDuration(); // server action
            setSessionTime(time);
        };
        fetchSessionTime();
    }, [refreshCount]);

    const handleClick = useCallback(async () => {
        await sessionRefresh();
        setRefreshCount((count) => count + 1);
        if (logoutTimerRef.current) {
            clearTimeout(logoutTimerRef.current);
            logoutTimerRef.current = null;
        }
        notificationApi.destroy();
    }, [notificationApi]);

    useEffect(() => {
        if (sessionTime === null) return;
        const showNotificationAt = sessionTime - NOTIFICATION_DURATION;
        const timer = setTimeout(() => {
            notificationApi.open({
                type: "info",
                message: "Session time will end soon",
                duration: NOTIFICATION_DURATION,
                description: <span>You will be logged off after: {<CountdownTimer initialSeconds={NOTIFICATION_DURATION} />}</span>,
                actions: <Button onClick={handleClick}>I am still here!</Button>,
            });
            logoutTimerRef.current = setTimeout(() => {
                logOut();
            }, NOTIFICATION_DURATION * 1000);
        }, Math.max(showNotificationAt, 0) * 1000);
        return () => {
            clearTimeout(timer);
            if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
        };
    }, [sessionTime, refreshCount, handleClick, notificationApi, NOTIFICATION_DURATION]);
    return <>{notificationContextHolder}</>;
}
