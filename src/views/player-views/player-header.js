import React from 'react';
import { Artists, DisplayText, Image } from '../../components';
const PlayerHeader = ({
    image,
    name,
    artists
}) => {
    return (
        <div className="player-header">
            <Image
                size="large"
                alt={name}
                fit="cover"
                url={image}
            />
            <div className="track-info">
                <DisplayText size="medium">{ name }</DisplayText>
                <div className="artists">
                    <Artists
                        artists={artists}
                    />
                </div>
            </div>
        </div>
    )
}
export default PlayerHeader;