import React from 'react';
const IconButton = ({
    className,
    icon,
    type,
    size,
    onClick
}) => {

    let iconButtonClassName = "icon-button";

    if(className){
        iconButtonClassName += ` ${className}`;
    }
    if(size){
        iconButtonClassName += ` ${size}`;
    }
    if(type){
        iconButtonClassName += ` ${type}`;
    }

    return (
        <button className={iconButtonClassName} onClick={onClick}>{React.createElement(icon)}</button>
    )
}
export default IconButton;