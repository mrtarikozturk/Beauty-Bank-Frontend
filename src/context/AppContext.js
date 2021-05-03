import { createContext, useState, useEffect } from 'react'
import storage from '../services/storageService';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

    const navigatorLang = navigator.language.split(/[-_]/)[0];
    const supportedLangs = ['EN', 'NL'];

    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState([]);
    const [token, setToken] = useState([]);

    const [lang, setLanguage] = useState(storage?.get('language') || (supportedLangs.includes(navigatorLang.toUpperCase()) ? navigatorLang : 'nl'));

    const setLang = (language) => {
        storage?.set("language", language);
        setLanguage(language);
    };

    useEffect(() => {
        setUser(storage.get('user'));
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
