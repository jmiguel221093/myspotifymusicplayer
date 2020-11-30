class Track{
    constructor(track,{
        imageSize
    }){
        this.image = track.album.images[imageSize?imageSize:0].url;
        this.artists = track.artists;
        this.isPlayable = track.is_playable;
        this.name = track.name;
        this.duration = track.duration_ms;
        this.uri = track.linked_from_uri ? track.linked_from_uri : track.uri
    }
}

export {Track};