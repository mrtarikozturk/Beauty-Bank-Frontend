import { createContext, useState, useEffect } from 'react'

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState([]);
    const [token, setToken] = useState([]);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
    }, [])

    return (
        <AppContext.Provider value={{ user, setUser, userProfile, setUserProfile, token, setToken }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
