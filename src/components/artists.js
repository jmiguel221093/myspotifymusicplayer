import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
const Artists = ({
    artists
}) => {

    let artistsLinks = [];
    if(artists)
        artistsLinks = artists.map(({id, name},i)=>
            <Fragment key={`artist-item-${id}-${i}`}>
                <NavLink className="artist" to={`/artists/${id}`}>{name}</NavLink>
                {`${i<artists.length-1 ? ', ':''}`}
            </Fragment>
        )

    return (
        artistsLinks
    )
}
export default Artists;