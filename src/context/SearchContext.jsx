import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const location = useLocation();

    useEffect(() => {
        setSearchQuery("");
    }, [location.pathname])

    return (
        <SearchContext.Provider value={{searchQuery, setSearchQuery}}>
            {children}
        </SearchContext.Provider>
    )
}