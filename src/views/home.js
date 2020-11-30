import React, { useEffect, useState } from 'react';
import { getCurrentUserInformation } from '../api';
import { PrivateRoute } from '../auth';
import { Topbar, Player, Frame } from '../components';
import { types } from '../utils';
import Library from './library';
import Playlist from './playlist';
import Playlists from './playlists';

const Home = () => {
    const topBarMenu = [
        {
            url: '/playlists',
            content: 'Playlists'
        },
        {
            url: '/library',
            content: 'Mi música',
            includes: []
        }
    ]

    const [user, setUser] = useState(null);

    const getSuccessUserInformation = (res) => {
        setUser(res.data);
    }
    const getErrorUserInformation = (err) => {
        console.log(err);
    }

    useEffect(()=>{
        getCurrentUserInformation({
            success: getSuccessUserInformation,
            error: getErrorUserInformation
        });
    },[]);

    const frameTopbarMarkup = <Topbar
        menu={topBarMenu}
        username={user ? user.display_name : "Username"}
        userImage={(user && user.images.length) ? user.images[0].url : ''}
    />

    const frameMusicPlayerMarkup = <Player />


    return (
        <Frame
            topbar={frameTopbarMarkup}
            musicPlayer={frameMusicPlayerMarkup}
        >
            <PrivateRoute path={types.routes.playlists} exact component={Playlists} />
            <PrivateRoute path={`${types.routes.playlist}:id`} exact component={Playlist} />
            <PrivateRoute path={`${types.routes.library.baseUrl}`} component={Library} />
        </Frame>
    )
}

export default Home;