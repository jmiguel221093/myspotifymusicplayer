import React, { useEffect, useState } from 'react';
import { getLibraryAlbums } from '../../api/requests';
import { List, ScrollView, Spinner } from '../../components';
const Albums = () => {

    const [albums, setAlbums] = useState([]);

    const getAlbumsSuccess = (res) => {
        let albumsArray = [];
        res.data.items.forEach((item)=>{
            albumsArray.push({
                title: item.album.label,
                image: item.album.images[0].url,
                meta: item.album.name,
                id: item.album.id,
                uri: item.album.uri
            })
        });
        setAlbums(albumsArray);
    }

    const getAlbumsError = (err) => {
        console.log(err);
    }

    useEffect(()=>{
        getLibraryAlbums({
            success: getAlbumsSuccess,
            error: getAlbumsError
        })
    },[])

    return (
        <ScrollView>
        {
            albums.length ?
            <List
                items={albums}
            />:
            <Spinner />
        }
        </ScrollView>
    )
}
export default Albums;