import React, { useEffect, useState } from 'react';
import { useStateValue } from '../../libs';
import actionTypes from '../../libs/actionTypes';

import { getPercentage } from '../../utils'

const ProgressControl = ({
    isPlayerPlaying,
    trackDuration
}) => {
    let trackInterval = null;
    const duration = trackDuration / 1000;

    const [{ playerPosition }, dispatch] = useStateValue();

    useEffect(()=>{
        if(isPlayerPlaying){
            trackInterval = setInterval(()=>{
                if(playerPosition < duration){
                    dispatch({
                        type: actionTypes.playerPosition,
                        data: playerPosition + 1
                    });
                }else{
                    dispatch({
                        type: actionTypes.playerPosition,
                        data: 0
                    });
                }
            },1000);
            return () => clearInterval(trackInterval);
        }
    })

    return (
        <div className="progress-control">
            <div className="progress-bar"></div>
            <div 
                className="progress"
                style={{
                    width: `${getPercentage(playerPosition, duration)}%`
                }}
            >
                <div className="progress-thumb"></div>
            </div>
        </div>
    )
}

export default ProgressControl;