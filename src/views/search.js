import React from 'react';
import { useState } from 'react';
import { addItemsToPlaylist, getCurrentUserPlaylists, playMusic, search } from '../api';
import { useAuth } from '../auth';
import { DisplayText, InputField, Page, ScrollView, TracksTable } from '../components';
import { useStateValue } from '../components/state-provider';
import { User } from '../libs';
import { types } from '../utils';
import { AddToPlaylistModal, TrackOptionModal } from './tracks-lists';

const Search = () => {

    const [query, setQuery] = useState("");
    const [tracks, setTracks] = useState([]);
    const [queryTimeout, setQueryTimeout] = useState(null);
    const [selectedTrack, setSelectedTrack] = useState("");
    const [openTrackOptions, setOpenTrackOptions] = useState(false);
    const [openAddToPlaylistModal, setOpenAddToPlaylistModal] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const {authInfo} = useAuth();

    const [{appLanguage, currentTrack, isPlaying}] = useStateValue();

    const handleSearchSuccess = (res, offset) => {
        if(res.data.tracks){
            const items = res.data.tracks.items.map((item)=>({
                track: item
            }))
            if(offset)
                setTracks([...tracks, ...items]);
            else
                setTracks(items)
        }
    }

    const handleSearchError = (err) => {
        console.log(err);
    }

    const getTracks = (offset) => {
        search({
            query,
            offset,
            type: "track",
            success: (res) => handleSearchSuccess(res, offset),
            error: handleSearchError
        })
    }

    const handleSearchQueryChange = (query) => {
        clearTimeout(queryTimeout);
        setQueryTimeout(setTimeout(()=>{
            getTracks(0);
        },1000));
    }

    const handleChange = (value) => {
        setQuery(value);
    }

    const handlePlayTrack = (track_uri) => {
        playMusic({
            uris: [track_uri],
            device_id: User.getDeviceId(),
            success(res){},
            error(err){}
        })
    }

    const handleOnActionItem = (trackUri) => {
        setSelectedTrack(trackUri);
        setOpenTrackOptions(true);
    }

    const handleCloseOptionsModal = () => {
        setOpenTrackOptions(false);
        setSelectedTrack("");
    }

    const handleGetPlaylistsSucess = (res) => {
        let playlistsArray = [];
        res.data.items.forEach((item)=>{
            if(item.owner.id === authInfo.id)
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

    const handleScrollEnds = () => {
        getTracks(tracks.length);
    }

    return (
        <Page
            id="search"
        >
            <Page.Container>
                <InputField
                    placeholder={types[appLanguage].pages.search.title}
                    type="text"
                    isLarge
                    onChange={handleChange}
                    onKeyUp={handleSearchQueryChange}
                    value={query}
                />
                {
                    !query ?
                    <DisplayText>{types[appLanguage].pages.search.emptySearch}</DisplayText>:
                    tracks.length ?
                    <ScrollView
                        onScrollEnds={handleScrollEnds}
                    >
                        <TracksTable
                            items={tracks}
                            onPlayTrack={handlePlayTrack}
                            currentPlayingUri={currentTrack.uri}
                            isPlaying={isPlaying}
                            onActionItem={handleOnActionItem}
                        />
                    </ScrollView>:
                    <DisplayText>{types[appLanguage].pages.search.notFound}</DisplayText>
                }
            </Page.Container>
            <TrackOptionModal 
                trackUri={selectedTrack}
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
export default Search;