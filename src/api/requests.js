import { config, User } from '../libs';
import routes from './routes';
import { authApi, api } from './instance';

const requestAccessToken = ({
    code,
    success,
    error
}) => {
    authApi.post(routes.auth.apiToken, new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: `${window.location.origin}${config.authUri}`
    })).then(res => {
        User.setAuth(JSON.stringify({...res.data, ts: ((Date.now()/1000) + 3600)}));
        api.defaults.headers.common['Authorization'] = `Bearer ${User.getAuth().access_token}`;
        success(res);
    }).catch(err => {
        error(err);
    })
}

const refreshToken = () => {
    const refreshingToken = authApi.post(routes.auth.apiToken, new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: User.getAuth().refresh_token
    })).then(res => {
        User.setAuth(JSON.stringify({ ...User.getAuth(), ...res.data, ts: ((Date.now()/1000) + 3600) }));
        return Promise.resolve(true);
    })
    return refreshingToken;
}

const getCurrentUserInformation = ({
    success,
    error
}) => {
    api.get(
        routes.api.usersProfile.currentUser
    ).then(res => success(res))
    .catch(err => error(err))
}

const getCurrentUserPlaylists = ({
    success,
    error
}) => {
    api.get(
        `${routes.api.playlists.currentUserPlayLists}?limit=50`
    ).then(res => success(res))
    .catch(err => error(err))
}

const getCurrentPlayingTrack = ({
    success,
    error
}) => {
    api.get(
        `${routes.api.player.currentTrackPlaying}`
    ).then(res => success(res))
    .catch(err => error(err))
}

const getUserCurrentPlayback = ({
    success,
    error
}) => {
    api.get(
        `${routes.api.player.playback}`
    ).then(res => success(res))
    .catch(err => error(err))
}

const transferUserPlayback = ({
    device_id,
    success,
    error
}) => {
    api.put(
        `${routes.api.player.playback}`,
        {
            device_ids: [device_id]
        }
    ).then(res => success(res))
    .catch(err => error(err))
}

const getUserRecentlyPlayed = ({
    success,
    error
}) => {
    api.get(
        `${routes.api.player.recentlyPlayed}`
    ).then(res => success(res))
    .catch(err => error(err))
}

const shufflePlayer = ({
    state,
    success,
    error
}) => {
    api.put(
        `${routes.api.player.shufflePlayer}?state=${state}`
    ).then(res => success && success(res))
    .catch(err => error && error(err))
}

const setRepeatMode = ({
    state,
    success,
    error
}) => {
    api.put(
        `${routes.api.player.repeatMode}?state=${state}`
    ).then(res => success(res))
    .catch(err => error(err))
}

const getPlaylist = ({
    id,
    success,
    error
}) => {
    api.get(
        `${routes.api.playlists.playlist}${id}?fields=name,uri,images,description,owner,tracks(total)`
    ).then(res => success(res))
    .catch(err => error(err))
}

const getPlaylistTracks = ({
    id,
    offset,
    success,
    error
}) => {
    api.get(
        `${routes.api.playlists.playlist}${id}${routes.api.playlists.tracks}?offset=${offset}&limit=20`
    ).then(res => success(res))
    .catch(err => error(err))
}

const addItemsToPlaylist = ({
    id,
    uris,
    success,
    error
}) => {
    api.post(
        `${routes.api.playlists.playlist}${id}${routes.api.playlists.tracks}`,
        {
            uris
        }
    ).then(res => success(res))
    .catch(err => error(err))
}

const removeItemsFromPlaylist = ({
    id,
    tracks,
    success,
    error
}) => {
    api.delete(
        `${routes.api.playlists.playlist}${id}${routes.api.playlists.tracks}`,
        {
            tracks
        }
    ).then(res => success(res))
    .catch(err => error(err))
}

const getLibraryTracks = ({
    offset,
    success,
    error
}) => {
    api.get(
        routes.api.library.tracks+`?offset=${offset}&limit=20`
    ).then(res => success(res))
    .catch(err => error(err));
}

const getLibraryAlbums = ({
    success,
    error
}) => {
    api.get(
        routes.api.library.albums
    ).then(res => success(res))
    .catch(err => error(err));
}

const getLibraryPodcasts = ({
    success,
    error
}) => {
    api.get(
        routes.api.library.podcasts
    ).then(res => success(res))
    .catch(err => error(err));
}

const playMusic = ({
    uris,
    context_uri,
    offset,
    device_id,
    success,
    error
}) => {

    let params = {};

    if(uris){
        params.uris = uris;
    }
    if(context_uri){
        params.context_uri = context_uri;
    }
    if(offset){
        params.offset = offset;
    }

    api.put(
        routes.api.player.play+"?device_id="+device_id,
        params
    ).then(res => success(res))
    .catch(err => error(err));
}

const pausePlayback = ({
    success,
    error
}) => {
    api.put(
        routes.api.player.pause,
    ).then(res => success(res))
    .catch(err => error(err))
}

const search = ({
    query,
    offset,
    type,
    success,
    error
}) => {
    api.get(
        `${routes.api.search}?q=${query}&type=${type}&offset=${offset}&limit=20`
    ).then(res => success(res))
    .catch(err => error(err))
}

const addToQueue = ({
    uri,
    success,
    error
}) => {
    api.post(
        `${routes.api.player.queue}?uri=${uri}`
    ).then(res => success(res))
    .catch(err => error(err))
}

export {
    requestAccessToken,
    refreshToken,
    getCurrentUserInformation,
    getCurrentUserPlaylists,
    getCurrentPlayingTrack,
    getUserCurrentPlayback,
    getUserRecentlyPlayed,
    transferUserPlayback,
    shufflePlayer,
    getPlaylist,
    getPlaylistTracks,
    getLibraryTracks,
    getLibraryAlbums,
    getLibraryPodcasts,
    playMusic,
    setRepeatMode,
    pausePlayback,
    search,
    addToQueue,
    addItemsToPlaylist,
    removeItemsFromPlaylist
}