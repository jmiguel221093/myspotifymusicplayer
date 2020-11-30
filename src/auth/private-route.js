import React from 'react';
import { Redirect, Route } from 'react-router';
import { useAuth } from './auth-provider';

const PrivateRoute = ({
    component: Component,
    ...rest
}) => {
    const { authInfo } = useAuth();
    return (
        <Route
            {...rest}
            render = {(props)=>
                authInfo ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/login' />
                )
            }
        />
    )
}

export {
    PrivateRoute
}