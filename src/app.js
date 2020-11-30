import React, { useState } from 'react';
import { Route, Switch } from 'react-router';
import { AuthProvider, PrivateRoute } from './auth';
import { User } from './libs';

import { Login, MasterView } from './views';

function App() {

	const auth = User.getAuth();
	const [ authInfo, setAuthInfo ] = useState(auth);

	const setAuth = (data) => {
		User.setAuth(JSON.stringify(data));
		setAuthInfo(data);
	}

	return (
		<AuthProvider
			authInfo={authInfo}
			setAuthInfo={setAuth}
		>
			<Switch>
				<Route exact path='/login' component={Login} />
				<PrivateRoute path='/' component={MasterView} />
			</Switch>
		</AuthProvider>
	);
}

export default App;
