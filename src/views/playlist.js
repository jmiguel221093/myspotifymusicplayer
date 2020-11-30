import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { addItemsToPlaylist, getCurrentUserPlaylists, getPlaylist, getPlaylistTracks, playMusic } from '../api/requests';
import { useAuth } from '../auth';
import { Page, ScrollView, Spinner, TracksTable } from '../components';
import { Header } from '../components/playlist';
import { useStateValue } from '../components/state-provider';
import { User } from '../libs';
import { types } from '../utils';

import { AddToPlaylistModal, TrackOptionModal } from './tracks-lists'

const Playlist = () => {
    const [ { player, context, isPlaying, currentTrack: { uri } } ] = useStateValue();
    const [hasNext, setHasNext] = useState(false);
    const {authInfo} = useAuth();
    const history = useHistory();
    const { id } = useParams();
    const [playlist, setPlaylist] = useState({});
    const [tracks, setTracks] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState("");
    const [openTrackOptions, setOpenTrackOptions] = useState(false);
    const [openAddToPlaylistModal, setOpenAddToPlaylistModal] = useState(false);
    const [playlists, setPlaylists] = useState([]);

    const handleGoBack = () => {
        history.replace(types.routes.home)
    }

    const handleGetPlaylistSuccess = (res) => {
        setPlaylist({
            uri: res.data.uri,
            name: res.data.name,
            image: res.data.images[0].url,
            descritpion: res.data.description,
            owner: res.data.owner,
            total: res.data.tracks.total,
        });
        getTracks(tracks.length);
    }
    
    const handleGetPlaylistFailed = (error) => {
        console.error(error);
    }

    const handleGetPlaylistTracksSuccess = (res) => {
        setHasNext(res.data.next);
        setTracks([...tracks, ...res.data.items]);
    }

    const handleGetPlaylistsTracksFailed = (error) => {

    }

    const getTracks = (offset) => {
        getPlaylistTracks({
            id,
            offset,
            success: handleGetPlaylistTracksSuccess,
            error: handleGetPlaylistsTracksFailed
        })
    }

    const handleScrollEnds = () => {
        if(hasNext)
            getTracks(tracks.length);
    }

    const handlePlayMusicSuccess = (res) => {
    }

    const handlePlayMusicError = (err) => {
        console.error(err);
    }

    const handlePlayTrack = (trackUri) => {
        playMusic({
            device_id: User.getDeviceId(),
            context_uri: playlist.uri,
            offset: {
                uri: trackUri
            },
            success: handlePlayMusicSuccess,
            error: handlePlayMusicError
        })
    }

    const handleOnActionItem = (trackUri) => {
        setSelectedTrack(trackUri);
        setOpenTrackOptions(true);
    }

    const handlePlayPlaylist = () => {
        if(context !== playlist.uri){
            playMusic({
                device_id: User.getDeviceId(),
                context_uri: playlist.uri,
                offset: {
                    position: 0
                },
                success: handlePlayMusicSuccess,
                error: handlePlayMusicError
            })
        }else{
            player.togglePlay();
        }
    }

    const handleCloseOptionsModal = () => {
        setOpenTrackOptions(false);
        setSelectedTrack("");
    }

    const handleGetPlaylistsSucess = (res) => {
        let playlistsArray = [];
        res.data.items.forEach((item)=>{
            if(item.owner.id === authInfo.id && item.id !== id)
                playlistsArray.push({
                    title: item.name,
                    image: item.images[0].url,
                    meta: item.owner.display_name,
                    id: item.id,
                    uri: item.uri
                });
        });
        setPlaylists(playlistsArray);
    }

    const handleGetPlaylistsFailed = (err) => {
        console.error(err);
    }

    const handleOnAddToPlaylist = () => {
        setOpenTrackOptions(false);
        setOpenAddToPlaylistModal(true);
        getCurrentUserPlaylists({
            success: handleGetPlaylistsSucess,
            error: handleGetPlaylistsFailed
        })
    }

    const handleAddToPlaylistSuccess = (res) => {
        setOpenAddToPlaylistModal(false);
        setSelectedTrack("");
        if(res.data.snapshot_id){
            console.log("Se ha agregado");
        }
    }

    const handleAddToPlaylistFailed = (err) => {
        console.error(err);
        setSelectedTrack("");
    }

    const handleOnSelectPlaylist = (id) => {
        addItemsToPlaylist({
            id,
            uris: [selectedTrack],
            success: handleAddToPlaylistSuccess,
            error: handleAddToPlaylistFailed
        })
    }

    const handleAddToPlaylistModalClose = () => {
        setOpenAddToPlaylistModal(false);
        setSelectedTrack("");
    }

    useEffect(()=>{
        getPlaylist({
            id,
            success: handleGetPlaylistSuccess,
            error: handleGetPlaylistFailed
        });
    },[]);

    return (
        <Page>
            <Page.Container>
                {
                    playlist.name && tracks.length ?
                    <>
                    <Header
                        name={playlist.name}
                        image={playlist.image}
                        description={playlist.description}
                        owner={playlist.owner && playlist.owner.display_name}
                        totalTracks={playlist.total}
                        onBack={handleGoBack}
                        onPlay={handlePlayPlaylist}
                        isPlaying={isPlaying && context === playlist.uri}
                    />
                    <ScrollView
                        onScrollEnds={handleScrollEnds}
                    >
                        <TracksTable
                            items={tracks}
                            onPlayTrack={handlePlayTrack}
                            currentPlayingUri={uri}
                            isPlaying={isPlaying}
                            onActionItem={handleOnActionItem}
                        />
                    </ScrollView>
                    </>:
                    <Spinner />
                }
            </Page.Container>
            <TrackOptionModal 
                trackUri={selectedTrack}
                playlistId={id}
                open={openTrackOptions}
                onClose={handleCloseOptionsModal}
                onAddToPlaylist={handleOnAddToPlaylist}
            />
            <AddToPlaylistModal 
                open={openAddToPlaylistModal}
                playlists={playlists}
                onSelectPlaylist={handleOnSelectPlaylist}
                onClose={handleAddToPlaylistModalClose}
            />
        </Page>
    )
}
export default Playlist;