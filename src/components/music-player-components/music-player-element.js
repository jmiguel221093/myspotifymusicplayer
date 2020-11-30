import React from 'react';
const MusicPlayerElement = ({
    children,
    isAutomatic
}) => {

    let elementClassName = "music-player-element";
    if(isAutomatic){
        elementClassName += " automatic"
    }

    return (
        <div className={elementClassName}>
            {children}
        </div>
    )
}
export default MusicPlayerElement;