import React from 'react';
import { Icons } from '..';
import DisplayText from '../display-text';
import IconButton from '../icon-button';
import { LeftArrowIcon } from '../icons';
import Image from '../image';

const Header = ({
    onBack,
    onPlay,
    name,
    owner,
    totalTracks,
    description,
    image,
    isPlaying
}) => {

    const total = `${totalTracks} ${totalTracks !== 1 ? 'canciones' : 'canción'}`;

    return (
        <div className="playlist-header">
            <div className="back-button-container">
                <IconButton
                    icon={LeftArrowIcon}
                    type="clean"
                    onClick={onBack}
                />
            </div>
            <div className="playlist-info-container">
                <div className="playlist-image">
                    <Image
                        size="small"
                        fit="cover"
                        url={image}
                        alt={name}
                    />
                    <IconButton
                        size="large"
                        icon={isPlaying ? Icons.PauseIcon : Icons.PlayIcon}
                        onClick={onPlay}
                    />
                </div>
                <div className="playlist-info">
                    <DisplayText>{name}</DisplayText>
                    <p>
                        <strong className="meta-data-item">{owner}</strong>
                        <span className="meta-data-item">{ total }</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Header;