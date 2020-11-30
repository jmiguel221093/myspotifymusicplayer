import * as authRoutes from './auth-routes';

const requestAuthorizationCode = (clientId, scope, redirectUri) => {
    window.location.href = `${authRoutes.baseUrl}${authRoutes.authorizationCode}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;
}

export {
    requestAuthorizationCode
}