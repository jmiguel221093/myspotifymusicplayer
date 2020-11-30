import React, { useEffect, useState } from 'react';
import { Redirect, Switch, useLocation } from 'react-router';
import { getCurrentUserInformation } from '../api/requests';
import { Frame, Topbar, Player, Drawer } from '../components';
import Playlists from './playlists';
import Playlist from './playlist';
import Library from './library';
import PlayerScreen from './player';
import Search from './search';
import { types } from '../utils/types';
import { PrivateRoute, useAuth } from '../auth';
import { useStateValue } from '../components/state-provider';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AboutModal, ContactModal } from './global'
import { User } from '../libs';

const MasterView = () => {
    const [user, setUser] = useState(null);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openAboutModal, setOpenAboutModal] = useState(false);
    const [openContactModal, setOpenContactModal] = useState(false);

    const { authInfo, setAuthInfo } = useAuth();

    const [{appLanguage, currentTrack: {image}}] = useStateValue();

    const location = useLocation();

    const topBarMenu = [
        {
            url: '/playlists',
            content: types[appLanguage].menuLinks.playlists
        },
        {
            url: '/library',
            content: types[appLanguage].menuLinks.library
        },
        {
            url: '/search',
            content: types[appLanguage].menuLinks.search
        }
    ]

    const drawerMainItems = [
        {
            content: types[appLanguage].userMenu.account,
            onAction: () => window.open(types.routes.account, '_blank')
        },
        {
            content: types[appLanguage].userMenu.logout,
            onAction: () => User.logout()
        }
    ]

    const drawerSubItems = [
        {
            content: types[appLanguage].userMenu.about,
            onAction: () => {
                setOpenDrawer(false);
                setOpenAboutModal(true);
            }
        },
        {
            content: types[appLanguage].userMenu.contact,
            onAction: () => {
                setOpenDrawer(false);
                setOpenContactModal(true);
            }
        }
    ]

    const getSuccessUserInformation = (res) => {
        setAuthInfo({
            ...authInfo,
            ...res.data
        })
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

    const handleOnAvatarClick = () => {
        setOpenDrawer(true);
    }

    const handleCloseDrawer = () => {
        setOpenDrawer(false);
    }

    const frameTopbarMarkup = <Topbar
        menu={topBarMenu}
        username={user ? user.display_name : "Username"}
        userImage={(user && user.images.length) ? user.images[0].url : ''}
        onClickAvatar={handleOnAvatarClick}
    />


    const frameMusicPlayerMarkup = <Player
        isFullScreen={location.pathname.indexOf(types.routes.player)>-1}
    />

    const drawerMarkup = <Drawer
        mainMenu={drawerMainItems}
        subMenu={drawerSubItems}
        onClose={handleCloseDrawer}
    />

    const handleOnCloseAboutModal = () => {
        setOpenAboutModal(false);
    }
    
    const handleOnCloseContactModal = () => {
        setOpenContactModal(false);
    }

    return (
        <Frame
            topbar={location.pathname.indexOf(types.routes.player)>-1?null:frameTopbarMarkup}
            musicPlayer={frameMusicPlayerMarkup}
            backgroundImage={location.pathname.indexOf(types.routes.player)>-1 && image}
            isFullScreen={location.pathname.indexOf(types.routes.player)>-1}
            drawer={drawerMarkup}
            openDrawer={openDrawer}
        >
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    classNames="fade"
                    timeout={0}
                >
                    <Switch location={location}>
                        <PrivateRoute exact path='/'>
                            <Redirect to={types.routes.playlists} />
                        </PrivateRoute>
                        <PrivateRoute path={types.routes.playlists} exact component={Playlists} />
                        <PrivateRoute path={`${types.routes.playlist}:id`} exact component={Playlist} />
                        <PrivateRoute path={types.routes.library.baseUrl} component={Library} />
                        <PrivateRoute path={types.routes.player} component={PlayerScreen} />
                        <PrivateRoute path={types.routes.search} component={Search} />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
            <AboutModal
                open={openAboutModal}
                onClose={handleOnCloseAboutModal}
            />
            <ContactModal
                open={openContactModal}
                onClose={handleOnCloseContactModal}
            />
        </Frame>
    )
};

export {
    MasterView
}