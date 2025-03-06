import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from "axios";
import { useRouter } from "next/navigation";

const GlobalContext = createContext();

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export const GlobalContextProvider = ({children}) => {

    const router = useRouter();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [auth0User, setAuth0User] = useState(null);
    const [userProfile, setUserProfile] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
          setLoading(true);
          try {
            const res = await axios.get("/api/v1/check-auth");
            setIsAuthenticated(res.data.isAuthenticated);
            setAuth0User(res.data.user);
            setLoading(false);

        } catch (error) {
            console.log("Error checking auth", error);
          } finally {
            setLoading(false);
          }
        };
    
        checkAuth();


      }, []);
    

    return (
        <GlobalContext.Provider value={"hello from text"}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};