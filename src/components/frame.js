import React from 'react';
const Frame = ({
    children,
    topbar,
    musicPlayer,
    backgroundImage,
    isFullScreen,
    drawer,
    openDrawer
}) => {

    let styles = {};
    if(backgroundImage){
        styles = {
            ...styles,
            backgroundImage: `url(${backgroundImage})`
        }
    }

    return (
        <div className={`frame${isFullScreen?" is-fullscreen":''}`} style={styles}>
            {
                topbar &&
                <div className="frame-topbar">
                    { topbar }
                </div>
            }
            <div className="frame-body">
                { children }
            </div>
            <div className="frame-music-player">
                { musicPlayer }
            </div>
            {
                drawer &&
                <div className={`frame-drawer${openDrawer?` open`:''}`}>
                    {
                        drawer
                    }
                </div>
            }
        </div>
    )
}
export default Frame;