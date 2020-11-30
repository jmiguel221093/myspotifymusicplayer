import React from 'react';
import IconButton from '../icon-button';
import { PauseIcon, PlayIcon, RefreshCWIcon, ShuffleIcon, SkipBackIcon, SkipForwardIcon } from '../icons';
import PlaybackBar from './playback-bar';
const PlayerControls = ({
    duration,
    progress,
    repeatMode,
    isPlaying,
    isShuffleMode,
    onShuffle,
    onSkipBack,
    onPlay,
    onPause,
    onSkipForward,
    onRepeatModeChange,
    onProgressChange,
    onSeek
}) => {

    const playerControls = [
        {
            icon: ShuffleIcon,
            onClick: ()=> onShuffle && onShuffle(),
            active: isShuffleMode
        },
        {
            icon: SkipBackIcon,
            onClick: ()=>onSkipBack && onSkipBack()
        },
        {
            icon: isPlaying ? PauseIcon : PlayIcon,
            onClick: ()=> {
                if(isPlaying){
                    onPause && onPause();
                }else{
                    onPlay && onPlay();
                }
            }
        },
        {
            icon: SkipForwardIcon,
            onClick: ()=> onSkipForward && onSkipForward()
        }
    ]

    return (
        <div className="music-player-controls">
            <div className="player-controls">
                {
                    playerControls.map((control,i)=>
                        <IconButton
                            key={`music-player-controls-control-${i}`}
                            icon={control.icon}
                            onClick={control.onClick}
                            type="clean"
                            className={control.active?'active':''}
                        />
                    )
                }
                <RepeatControl
                    onChange={onRepeatModeChange}
                    type={repeatMode}
                />
            </div>
            <div className="playback-bar-container">
                <PlaybackBar
                    duration={duration}
                    isPlaying={isPlaying}
                    progress={progress}
                    onProgressChange={onProgressChange}
                    onSeek={onSeek}
                />
            </div>
        </div>
    )
}

const RepeatControl = ({
    onChange,
    type
}) => {
    return (
        <div className="repeat-control">
            <IconButton
                icon={RefreshCWIcon}
                type="clean"
                onClick={()=>onChange && onChange(type)}
                className={type==="track" || type==="context"?`active`:''}
            />
            {
                type === "track" &&
                <span className="repeat-mode-track"></span>
            }
        </div>
    )
}

export default PlayerControls;