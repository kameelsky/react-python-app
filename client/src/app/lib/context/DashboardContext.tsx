import { createContext } from "react";

type DashboardContextType = {
    isSidebarOpen: boolean;
    sidebarHandlers: {
        open: () => void;
        close: () => void;
        toggle: () => void;
    };
};

export const DashboardContext = createContext<DashboardContextType>({} as DashboardContextType);
