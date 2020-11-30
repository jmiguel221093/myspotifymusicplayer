const routes = {
    auth: {
        authorize: '/authorize',
        apiToken: '/api/token'
    },
    api: {
        usersProfile: {
            currentUser: '/me'
        },
        playlists: {
            currentUserPlayLists: '/me/playlists',
            playlist: '/playlists/',
            tracks: '/tracks'
        },
        player: {
            playback: '/me/player',
            shufflePlayer: '/me/player/shuffle',
            currentTrackPlaying: '/me/player/currently-playing',
            recentlyPlayed: '/me/player/recently-played',
            play: '/me/player/play',
            pause: '/v1/me/player/pause',
            repeatMode: '/me/player/repeat',
            queue: '/me/player/queue'
        },
        playback: {
            play: '/me/player/play'
        },
        library: {
            tracks: '/me/tracks',
            albums: '/me/albums',
            podcasts: '/me/shows'
        },
        search: '/search'
    }
}
export default routes;