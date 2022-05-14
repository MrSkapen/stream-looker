import {useCallback} from "react";

function debounce(func, timeInMs) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(()=> {
            func.apply(this,args)
        }, timeInMs)
    };
}

export default function useDebounce(func, timeInMs) {
    return useCallback(debounce(func, timeInMs),[func,timeInMs])
}