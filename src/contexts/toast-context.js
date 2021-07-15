import { useContext, useEffect, useState, createContext } from "react";
import {Toast} from "../components";
const toastContext = createContext();


export function ToastProvider({children}) {
	const [toasts, setToasts] = useState([]);

	function showToast(
		toastTitle = "",
		toastContent = "",
		toastType = "info"
	) {
        setToasts((prev)=>[...prev, <Toast title={toastTitle} message={toastContent} type={toastType}/>]);
    }

    return(
        <toastContext.Provider value={{toasts, showToast}}>
            {children}
        </toastContext.Provider>
    )
}

export const useToast = () => useContext(toastContext);