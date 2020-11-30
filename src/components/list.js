import React, { useEffect, useRef, useState } from 'react';
import { Icons } from '.';
import Caption from './caption';
import IconButton from './icon-button';
import Image from './image';

const List = ({
    children,
    items,
    onSelectItem,
    onPlayItem,
    currentPlaylistPlaying,
    isPlaying
}) => {


    const [wrapperSize, setWrapperSize] = useState(0);
    const [wrapperPosition, setWrapperPosition] = useState(0);

    let list = useRef(null);

    useEffect(()=>{
        handleWrapperSize(list);
    });

    const handleWrapperSize = (list) => {
        const elementSize = list.current.querySelector(".list-item").offsetWidth;
        const itemsLength = items ? items.length : list.current.querySelectorAll(".list-item").length
        setWrapperSize(elementSize * itemsLength);
    }

    const onListWheel = (event) => {
        const offset = event.deltaY;
        let position = wrapperPosition + offset;
        let scrollSize = list.current.querySelector(".list-items-wrapper").offsetWidth - list.current.offsetWidth;
        if(position > scrollSize){
        position = scrollSize;
        }
        if(position < 0){
            position = 0;
        }
        setWrapperPosition(position);
    }

    return (
        <div className="list" ref={list} onWheel={onListWheel}>
            <div className="list-items-wrapper" style={{ 
                width: `${wrapperSize}px`, 
                transform: `translate3d(-${wrapperPosition}px, 0, 0)` 
            }}>
                {
                    items &&
                    items.map((item,i)=>
                        <ListItem 
                            key={`list-item-${item.id}`}
                            image={item.image}
                            title={item.title}
                            meta={item.meta}
                            id={item.id}
                            onClick={()=>onSelectItem && onSelectItem(item.id)}
                            onAction={()=>onPlayItem && onPlayItem(item.uri)}
                            buttonIcon={
                                (isPlaying && currentPlaylistPlaying === item.uri) ?
                                Icons.PauseIcon : Icons.PlayIcon
                            }
                            index={i}
                            length={items.length}
                        />
                    )
                }
                {
                    !items &&
                    children
                }
            </div>
        </div>
    )
}

const ListItem = ({
    image,
    title,
    meta,
    onClick,
    onAction,
    buttonIcon,
    index,
    length
}) => {

    const handleAction = (e) => {
        e.stopPropagation();
        onAction && onAction();
    }

    const handleClick = onClick;

    return (
        <div 
            className="list-item" 
            onClick={handleClick}
            style={{
                animationDelay: `${(1000/length)*index}ms`
            }}
        >
            <div className="list-item-container">
                <div className="image-container">
                    <Image
                        url={image}
                        size="large"
                        alt={title}
                        fit="cover"
                    />
                    <IconButton
                        icon={buttonIcon}
                        size="large"
                        onClick={handleAction}
                    />
                </div>
                <h3 className="list-item-title mt-normal">{title}</h3>
                <Caption>{meta}</Caption>
            </div>
        </div>
    )
}

List.Item = ListItem;

export default List;