import React from 'react';
import Artists from '../artists';
import Image from '../image';
const CurrentTrack = ({
    image,
    name,
    artists
}) => {
    return (
        <div className="music-player-current-track">
            <Image
                alt={name}
                fit="cover"
                size="thumbnail"
                url={image}
            />
            <div className="track-info">
                <span className="track-name">{name}</span>
                <div className="artists">
                    <Artists
                        artists={artists}
                    />
                </div>
            </div>
        </div>
    )
}
export default CurrentTrack;