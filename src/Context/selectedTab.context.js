import React from "react";

const selectedTabContext = React.createContext();



export function TabContextProvider({ children }) {

    const [selectedTab, setSelectedTab] = React.useState("personalDetails");

    return (
        <selectedTabContext.Provider value={{ selectedTab, setSelectedTab }} >
            {children}
        </selectedTabContext.Provider>
    )
}

export function useSelectedTabContext() {
    return React.useContext(selectedTabContext);
}