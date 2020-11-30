import React, { useEffect, useState } from 'react';
import { getLibraryTracks } from '../../api/requests';
import { Page, ScrollView, Spinner, TracksTable } from '../../components';

const Tracks = () => {
    const [tracks, setTracks] = useState([]);

    const getLibraryTracksSuccess = (res) => {
        setTracks([...tracks, ...res.data.items]);
    }
    const getLibraryTracksError = (error) => {
        console.error(error);
    }

    const getTracks = (offset) => {
        getLibraryTracks({
            offset,
            success: getLibraryTracksSuccess,
            error: getLibraryTracksError
        })
    }

    const handleScrollEnds = () => {
        getTracks(tracks.length);
    }

    useEffect(()=>{
        getTracks(0);
    },[])

    return (
        <Page.Container>
            {
                tracks.length ?
                <ScrollView
                    onScrollEnds={handleScrollEnds}
                >
                    <TracksTable
                        items={tracks}
                    />
                </ScrollView>:
                <Spinner />
            }
        </Page.Container>
    )
}
export default Tracks;