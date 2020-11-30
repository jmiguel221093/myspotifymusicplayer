import React from 'react';
import IconButton from '../icon-button';
import { Volume1Icon, Volume2Icon, VolumeIcon, VolumeXIcon } from '../icons';
const VolumeControl = ({
    volume,
    onChange,
    onMute
}) => {

    const handleOnMouseOver = (e) => {
        const event = e.currentTarget;
        e.currentTarget.querySelector(".volume-bar-container").style.display = "block";
        setTimeout(()=>{
            event.querySelector(".volume-bar-container").classList.add("show");
        },100)
    }

    const handleOnMouseDown = (e) => {
        const event = e.currentTarget;
        e.currentTarget.querySelector(".volume-bar-container").classList.remove("show");
        setTimeout(()=>{
            event.querySelector(".volume-bar-container").style.display = "none";
        },400)
    }

    const getVolumeIcon = (volume) => {
        if(volume === 0){
            return VolumeXIcon;
        }
        else if(volume > 0 && volume < 34){
            return VolumeIcon;
        }
        else if(volume >= 34 && volume < 67){
            return Volume1Icon;
        }
        else
            return Volume2Icon;
    }

    return (
        <div className="volume-control" onMouseLeave={handleOnMouseDown} onMouseEnter={handleOnMouseOver}>
            <IconButton
                icon={getVolumeIcon(volume)}
                type="clean"
                onClick={onMute}
            />
            <VolumeBar
                volume={volume}
                onChange={onChange}
            />
        </div>
    )
}

const VolumeBar = ({
    volume,
    onChange
}) => {

    const handleOnMouseUp = (e) => {
        onChange && onChange(
            100 - (((e.clientY -
                ((e.currentTarget.closest(".volume-control").offsetTop - 
                e.currentTarget.closest(".volume-bar-container").offsetHeight) +
                e.currentTarget.offsetTop)) * 100) / e.currentTarget.offsetHeight)
        )
    }

    return (
        <div className={`volume-bar-container`}>
            <div className="volume-bar-control">
                <div className="volume-bar" onMouseUp={handleOnMouseUp}>
                    <div className="volume-bar-bg">
                        <div className="volume-bar-fg"
                            style={{
                                height: volume+"%"
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VolumeControl;