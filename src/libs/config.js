const config = {
    appName: "MySpotifyMusic",
    authUri: "/login",
    appScope: [
        'user-modify-playback-state', 
        'user-read-recently-played', 
        'user-read-private',
        'user-read-email', 
        'playlist-read-private',
        'playlist-read-collaborative', 
        'user-read-currently-playing', 
        'user-read-playback-state',
        'streaming',
        'user-library-read',
        'playlist-modify-public',
        'playlist-modify-private'
    ]
}

export {
    config
}