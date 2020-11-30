import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Page } from '../components';
import { useStateValue } from '../components/state-provider';
import { types } from '../utils';

import { AlbumsView, PodcastsView, TracksView } from './library-views';

const Library = () => {

    const [{appLanguage}] = useStateValue();

    const pageMenu = {
        url: types.routes.library.baseUrl,
        items: [
            {
                content: types[appLanguage].pages.library.menu.tracks,
                url: types.routes.library.tracks
            },
            {
                content: types[appLanguage].pages.library.menu.albums,
                url: types.routes.library.albums
            },
            {
                content: types[appLanguage].pages.library.menu.podcasts,
                url: types.routes.library.podcasts
            }
        ]
    }
        
    return (
        <Page
            title={types[appLanguage].pages.library.title}
            pageMenu={pageMenu}
            id="library-page"
        >
            <Switch>
                <Redirect exact from={types.routes.library.baseUrl} to={types.routes.library.baseUrl+types.routes.library.tracks} />
                <Route exact path={types.routes.library.baseUrl+types.routes.library.tracks} component={TracksView} />
                <Route exact path={types.routes.library.baseUrl+types.routes.library.albums} component={AlbumsView} />
                <Route exact path={types.routes.library.baseUrl+types.routes.library.podcasts} component={PodcastsView} />
            </Switch>
        </Page>
    )
}
export default Library;