import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router';
import { useAuth } from '../auth';
import { requestAuthorizationCode } from '../auth/request-auth';
import { requestAccessToken } from '../api';
import { config } from '../libs';

import { Icons } from '../components'
import { types } from '../utils';
import { useStateValue } from '../components/state-provider';

const clientId = process.env.REACT_APP_SPOTIFY_AUTH_CLIENT_ID;

const Login = () => {

    const location = useLocation();

    const authCode = new URLSearchParams(location.search).get("code");

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [error, setIsError] = useState(false);

    const { authInfo ,setAuthInfo } = useAuth();

    const [{appLanguage}] = useStateValue();

    const handleLogin = () => {
        requestAuthorizationCode(clientId, config.appScope.join(' '), `${window.location.origin}${config.authUri}`);
    }

    useEffect(()=>{
        if(authCode){
            
            requestAccessToken({
                code: authCode,
                success: (res) => {
                    if(res){
                        setAuthInfo({...res.data, ts: (Date.now()/1000)});
                        setIsUserLoggedIn(true);
                    }
                },
                error: (err) => {
                    setIsError(true);
                }
            })

        }
    },[authCode, setAuthInfo]);

    if(isUserLoggedIn || authInfo){
        return <Redirect
            to='/'
        />
    }

    if(error){
        alert("Error al iniciar sesión")
    }

    return (
        <main id="login-screen">
            <div className="content text-center">
                <h1 className="app-title text-display-large mb-loose">{config.appName}</h1>
                <p className="app-description text-secondary-light">{types[appLanguage].loginDescription}</p>
                <button className="button mt-x-loose shadow" onClick={handleLogin}>
                    <Icons.PlayIcon />
                </button>
            </div>
        </main>
    )
}

export {
    Login
}