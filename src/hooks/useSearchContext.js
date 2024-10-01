import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

export const useSearchContext = () => {
    const context = useContext(SearchContext);

    if (!context) {
        throw Error('useSearchContext must be used inside an SearchContextProvider');
    }

    return context;
}