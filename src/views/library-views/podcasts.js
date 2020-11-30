import React, { useEffect, useState } from 'react';
import { getLibraryPodcasts } from '../../api/requests';
import { List, ScrollView, Spinner } from '../../components';
const Podcasts = () => {
    
    const [podcasts, setPodcasts] = useState([]);

    const getPodcastsSuccess = (res) => {
        let podcastsArray = [];
        res.data.items.forEach((item)=>{
            podcastsArray.push({
                title: item.show.name,
                image: item.show.images[0].url,
                meta: item.show.publisher,
                id: item.show.id,
                uri: item.show.uri
            })
        });
        setPodcasts(podcastsArray);
    }

    const getPodcastsError = (err) => {
        console.error(err);
    }

    useEffect(()=>{
        getLibraryPodcasts({
            success: getPodcastsSuccess,
            error: getPodcastsError
        })
    },[]);
    
    return (
        <ScrollView>
        {
            podcasts.length ?
            <List 
                items={podcasts}
            />:
            <Spinner />
        }
        </ScrollView>
    )
}
export default Podcasts;