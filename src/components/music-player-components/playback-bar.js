import React from 'react';
import { getPercentage, timeFormat } from '../../utils';
const PlaybackBar = ({
    duration,
    progress,
    isPlaying,
    onSeek
}) => {
    let playbackStyles = {
        width: `${getPercentage(progress, duration/1000)}%`
    }

    const handleMouseUp = (e) => {
        e.stopPropagation();
        onSeek &&
        onSeek(((((e.clientX - e.currentTarget.offsetLeft)*100)/e.currentTarget.offsetWidth)*(duration/1000))/100)
    }

    return (
        <div className="music-player-playback-bar">
            <span className="playback-progress">{timeFormat(progress)}</span>
            <div className="progress-bar"
                onMouseUp={handleMouseUp}
            >
                <div className="progress-bar-bg">
                    <div
                        className={`progress-bar-fg`}
                        style={playbackStyles}
                    ></div>
                </div>
            </div>
            <span className="playback-duration">{timeFormat(duration / 1000)}</span>
        </div>
    )
}
export default PlaybackBar;