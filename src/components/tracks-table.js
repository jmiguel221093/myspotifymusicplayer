import React, {Suspense} from 'react';
import { Icons } from '.';
import { timeFormat } from '../utils';
import Artists from './artists';
import IconButton from './icon-button';
import { DiscIcon, MoreHorizontalIcon } from './icons';
import Image from './image';
const TracksTable = ({
    items,
    onPlayTrack,
    currentPlayingUri,
    isPlaying,
    onActionItem,
    context
}) => {

    const getTrackImage = (album) => {
        let image = "";
        if(album.images.length){
            image = album.images[2].url
        }
        return image;
    }

    return (
        <div className="tracks-table">
            {
                (items && items.length > 0) &&
                <div className="tracks-table-body">
                    <Suspense>
                    {
                        items.map((item, i) => {
                            if(item.track)
                                return(
                                    <Track
                                        key={`tracks-table-track-item-${i}`}
                                        index={i}
                                        name={item.track.name}
                                        image={getTrackImage(item.track.album)}
                                        artists={item.track.artists}
                                        album={item.track.album.name}
                                        duration={item.track.duration_ms}
                                        onPlay={()=>onPlayTrack && onPlayTrack(item.track.uri)}
                                        isPlaying={isPlaying && currentPlayingUri === item.track.uri}
                                        uri={item.track.uri}
                                        onAction={() => onActionItem && onActionItem(item.track.uri)}
                                        length={items.length}
                                    />
                                )
                            return <></>
                        })
                    }
                    </Suspense>
                </div>
            }
        </div>
    )
}

const Track = ({
    isPlaying,
    index,
    image,
    name,
    artists,
    album,
    duration,
    onPlay,
    onAction,
    length
}) => {
    return (
        <div 
            className={`tracks-table-item${isPlaying ? ' is-playing' : ''}`}
            style={{
                animationDelay: `${(1500/length)*index}ms`
            }}
        >
            <div 
                className="tracks-table-item-element track-index"
                onDoubleClick={(e) => {
                    e.stopPropagation();
                    onPlay && onPlay();
                }}
            >{index+1<10?`0${index+1}`:(index+1)}</div>
            <div className="tracks-table-item-element track-image">
                {
                    image ?
                    <Image
                        size="thumbnail"
                        alt={name}
                        fit="cover"
                        url={image}
                    />:
                    <div className="track-icon">
                        <DiscIcon />
                    </div>
                }
                <IconButton
                    icon={Icons.PlayIcon}
                    type="clean"
                    onClick={onPlay}
                />
            </div>
            <div 
                className="tracks-table-item-element track-name"
                onDoubleClick={(e) => {
                    e.stopPropagation();
                    onPlay && onPlay();
                }}
            >
                <span>{name}</span>
                {
                    artists &&
                    <Artists
                        artists={artists}
                    />
                }
            </div>
            {/* <div className="tracks-table-item-element track-artists">
                
            </div> */}
            <div 
                className="tracks-table-item-element track-album"
                onDoubleClick={(e) => {
                    e.stopPropagation();
                    onPlay && onPlay();
                }}
            >{album}</div>
            <div 
                className="tracks-table-item-element track-duration"
                onDoubleClick={(e) => {
                    e.stopPropagation();
                    onPlay && onPlay();
                }}
            >{timeFormat(duration/1000)}</div>
            <div 
                className="tracks-table-item-element track-action"
            >
                <IconButton
                    icon={MoreHorizontalIcon}
                    type="clean"
                    onClick={(e) => { e.stopPropagation(); onAction && onAction(); }}
                />
            </div>
        </div>
    )
}

export default TracksTable;