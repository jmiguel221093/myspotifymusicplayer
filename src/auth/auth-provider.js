import React, { createContext, useContext } from 'react';

export const AuthContext = createContext({
    authInfo: null,
    setAuthInfo: null
});

export const AuthProvider = ({
    children,
    authInfo,
    setAuthInfo
}) => (
    <AuthContext.Provider value={{ authInfo, setAuthInfo }}>
        {children}
    </AuthContext.Provider>
)

export const useAuth = () => useContext(AuthContext);