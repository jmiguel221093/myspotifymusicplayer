import React from 'react';
import MusicPlayerElement from './music-player-element';
import CurrentTrack from './current-track';
import ExtraControls from './extra-controls';
import PlayerControls from './player-controls';

const MusicPlayer = ({
    children,
    isFullScreen
}) => {
    return (
        <div className={`music-player ${isFullScreen?' is-fullscreen':''}`}>
            {children}
        </div>
    )
}

MusicPlayer.Element = MusicPlayerElement;
MusicPlayer.CurrentTrack = CurrentTrack;
MusicPlayer.ExtraControls = ExtraControls;
MusicPlayer.Controls = PlayerControls;

export default MusicPlayer;