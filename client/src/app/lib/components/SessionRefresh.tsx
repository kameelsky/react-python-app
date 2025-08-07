"use client";

import { useEffect, useState } from "react";
import { notification } from "antd";

export default function SessionRefresher(): React.ReactNode {
    const [refreshCount, setRefreshCount] = useState<number>(0);
    const [notificationApi, notificationContextHolder] = notification.useNotification();

    useEffect(() => {
        const totalSessionSeconds = 3600; // 1h
        const showBeforeExpiry = 5 * 60; // 5 min
        // const showAt = totalSessionSeconds - showBeforeExpiry;
        const showAt = 10;

        const timer = setTimeout(() => {
            setRefreshCount(refreshCount + 1);
            // notificationApi.open({ message: "test" });
        }, showAt * 1000);

        return () => clearTimeout(timer);
    }, [refreshCount]);

    return <>{notificationContextHolder}</>;
}
