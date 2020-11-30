import React, { useEffect, useState } from 'react'
import IconButton from './icon-button';
import { ListIcon } from './icons';
import { MusicPlayer } from './music-player-components';
import { setupPlayer, getRepeatMode } from './music-player-utils';
import { getUserCurrentPlayback, setRepeatMode, shufflePlayer } from '../api';
import VolumeControl from './music-player-components/volume-control';
import SpotifyPlayer from '../libs/spotify-player';
import { actionTypes, useStateValue } from './state-provider';
import { Track } from '../libs';
import { useHistory } from 'react-router';
import { types } from '../utils';

const spotifyPlayer = new SpotifyPlayer();

const Player = ({
    isFullScreen
}) => {

    const [playerProgress, setPlayerProgress] = useState(0);
    let [playerVolume, setPlayerVolume] = useState(100);

    const history = useHistory();

    const [{ currentTrack, isPlaying, shuffleMode, repeatMode, volume }, dispatch] = useStateValue();

    useEffect(()=>{
        SpotifyPlayer.init(()=>{
            setupPlayer(spotifyPlayer, state => {
                if(state){
                    const currentTrack = new Track(state.track_window.current_track, {imageSize: 2});
                    setPlayerProgress(state.position / 1000);
                    dispatch({
                        type: actionTypes.setPlayer,
                        data: {
                            currentTrack: {
                                image: currentTrack.image,
                                name: currentTrack.name,
                                artists: currentTrack.artists,
                                duration: currentTrack.duration,
                                uri: currentTrack.uri,
                                isPlayable: currentTrack.isPlayable,
                                hasPrevious: state.track_window.previous_tracks.length > 0
                            },
                            isPlaying: !state.paused,
                            shuffleMode: state.shuffle,
                            context: state.context.uri,
                            player: spotifyPlayer
                        }
                    });
                }
            },
            ()=>{
                getUserCurrentPlayback({
                    success(res){
                        updateRepeatMode(res.data.repeat_state);
                        dispatch({
                            type: actionTypes.volume,
                            data: {
                                volume: res.data.device.volume_percent
                            }
                        })
                    },
                    error(err){
                        console.error(err);
                    }
                });
            });
        });
    },[dispatch]);

    useEffect(()=>{
        let progressInterval = null;
        if(isPlaying){
            progressInterval = setInterval(()=>{
                setPlayerProgress(playerProgress+1)
            },1000);
        }
        return () => clearInterval(progressInterval);
    });

    const handlePlay = () => {
        spotifyPlayer.resume(()=>{
        });
    }
    const handlePause = () => {
        spotifyPlayer.pause();
    }
    const handleSkipForward = () => {
        spotifyPlayer.next();
    }
    const handleSkipBack = () => {
        if(playerProgress > 30 || !currentTrack.hasPrevious){
            spotifyPlayer.seek(0);
        }else{
            spotifyPlayer.previous();
        }
    }
    const handleShuffle = () => {
        shufflePlayer({
            state: !shuffleMode
        })
    }

    const handleRepeatModeChange = () => {
        setRepeatMode({
            state: getRepeatMode(repeatMode),
            success(){
                updateRepeatMode(getRepeatMode(repeatMode));
            },
            error(){}
        })
    }

    const updateRepeatMode = (mode) => {
        dispatch({
            type: actionTypes.repeatMode,
            data: {
                repeatMode: mode
            }
        })
    }

    const handleSeek = (pos) => {
        spotifyPlayer.seek(pos,()=>{
            setPlayerProgress(pos);
        });
    }

    const handleOnVolumeChange = (volume) => {
        spotifyPlayer.setVolume(volume,()=>{
            setPlayerVolume(volume);
            dispatch({
                type: actionTypes.volume,
                data: {
                    volume: volume
                }
            })
        })
    }

    const handleOnMute = () => {
        spotifyPlayer.setVolume(volume > 0 ? 0 : playerVolume,()=>{
            dispatch({
                type: actionTypes.volume,
                data: {
                    volume: volume > 0 ? 0 : playerVolume
                }
            })
        })
    }

    const handleSelectPlayer = () => {
        // document.documentElement.requestFullscreen();
        history.push(types.routes.player);
    }

    return (
        <MusicPlayer
            isFullScreen={isFullScreen}
        >
            {
                !isFullScreen &&
                <MusicPlayer.Element>
                    <MusicPlayer.CurrentTrack
                        image={currentTrack.image}
                        name={currentTrack.name}
                        artists={currentTrack.artists}
                    />
                </MusicPlayer.Element>
            }
            <MusicPlayer.Element isAutomatic>
                <MusicPlayer.Controls
                    duration={currentTrack.duration}
                    progress={playerProgress}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    isPlaying={isPlaying}
                    onSkipForward={handleSkipForward}
                    onSkipBack={handleSkipBack}
                    isShuffleMode={shuffleMode}
                    onShuffle={handleShuffle}
                    onRepeatModeChange={handleRepeatModeChange}
                    repeatMode={repeatMode}
                    onSeek={handleSeek}
                />
            </MusicPlayer.Element>
            <MusicPlayer.Element>
                <MusicPlayer.ExtraControls>
                    {
                        !isFullScreen &&
                        <IconButton
                            icon={ListIcon}
                            type="clean"
                            onClick={handleSelectPlayer}
                        />
                    }
                    <VolumeControl
                        volume={volume}
                        onChange={handleOnVolumeChange}
                        onMute={handleOnMute}
                    />
                </MusicPlayer.ExtraControls>
            </MusicPlayer.Element>
        </MusicPlayer>
    )
}

export default Player;