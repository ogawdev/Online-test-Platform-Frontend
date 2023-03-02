import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';


const authContext = createContext();


export default function AuthContext({ children }) {

    const [auth, setAuth] = useState('');

    useEffect(() => {
        setAuth({ user: JSON.parse(localStorage.getItem('user')), token: JSON.parse(localStorage.getItem('token')) })
    }, [])
    axios.defaults.baseURL = process.env.REACT_APP_API;
    axios.defaults.headers.common["Authorization"] = auth?.token;



    return (
        <authContext.Provider value={[auth, setAuth]}>
            {children}
        </authContext.Provider>
    )
}

const useAuth = () => useContext(authContext);

export { useAuth };