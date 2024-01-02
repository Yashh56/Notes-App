import { createContext, useEffect, useState } from "react";
import { URL } from "../URL";
import axios from "axios";

export const UserContext = createContext({});


export function UserContextProvider({ children }: any) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const res = await axios.get(URL + '/api/auth/refetch', { withCredentials: true });
            console.log(res);
            setUser(res.data.user);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}