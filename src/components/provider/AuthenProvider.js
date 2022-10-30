import React, { useEffect, useState } from "react";
import axiosAuthInstance from "../../api/API";

export const AuthenContext = React.createContext();

export default function AuthenProvider(props) {
    let [user, setUser] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("TOKEN"))
            loadUser()
    }, [])

    let logout = () => {
        setUser(null)
        localStorage.removeItem("TOKEN")
    }

    let login = (token) => {
        localStorage.setItem("TOKEN", JSON.stringify(token))
        loadUser()
    }

    let loadUser = async () => {
        try {
            let response = await axiosAuthInstance.get("/user/me")
            setUser(response.data)
        } catch { }
    }

    return <AuthenContext.Provider value={{ user, login, logout }} >
        {props.children}
    </AuthenContext.Provider>
}