import { createContext, useState, useEffect } from 'react'

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

    const navigatorLang = navigator.language.split(/[-_]/)[0];
    const supportedLangs = ['EN', 'NL'];

    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState([]);
    const [token, setToken] = useState([]);

    const [lang, setLang] = useState(supportedLangs.includes(navigatorLang.toUpperCase()) ? 'nl' : 'nl');

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
    }, [])

    return (
        <AppContext.Provider value={{
            user,
            setUser,
            userProfile,
            setUserProfile,
            token,
            setToken,
            lang,
            setLang,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
