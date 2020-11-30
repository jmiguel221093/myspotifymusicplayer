import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getCurrentUserPlaylists, playMusic } from '../api/requests';
import { List, Page, Spinner } from '../components';
import { useStateValue } from '../components/state-provider';
import { User } from '../libs';
import { types } from '../utils/types';
const Playlists = () => {
    const history = useHistory();

    const [{appLanguage, context, player, isPlaying}] = useStateValue();

    const [playlists, setPlaylists] = useState([]);

    const getCurrentUserPlaylistsSuccess = (res) => {
        let playlistsArray = [];
        res.data.items.forEach((item)=>{
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
    
    const getCurrentUserPlaylistsFailed = (error) => {
        console.log(error);
    }

    useEffect(()=>{
        getCurrentUserPlaylists({
            success: getCurrentUserPlaylistsSuccess,
            error: getCurrentUserPlaylistsFailed
        });
    },[])

    const handleSelectPlaylist = (id) => {
        history.push(types.routes.playlist+id);
    }
    
    const handlePlayPlaylist = (uri) => {
        if(context !== uri){
            playMusic({
                device_id: User.getDeviceId(),
                context_uri: uri,
                offset: {
                    position: 0
                },
                success(){},
                error(){}
            })
        }else{
            player.togglePlay();
        }
    }

    return (
        <Page
            id="playlists"
            title={types[appLanguage].pages.playlists.title}
        >
            {
                playlists.length > 0 ?
                <List
                    items={playlists}
                    onSelectItem={handleSelectPlaylist}
                    onPlayItem={handlePlayPlaylist}
                    currentPlaylistPlaying={context}
                    isPlaying={isPlaying}
                />:
                <Spinner />
            }
        </Page>
    )
}
export default Playlists;