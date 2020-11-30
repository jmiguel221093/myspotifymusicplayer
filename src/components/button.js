import React from 'react';

const Button = ({
    text,
    icon,
    iconOrientation,
    size,
    url,
    onClick
}) => {

    let buttonClassName = 'button';

    if(icon && iconOrientation){
        buttonClassName += ` icon-${iconOrientation}`
    }else if(icon && !iconOrientation){
        buttonClassName += ` icon-left`
    }

    if(size){
        buttonClassName += ` ${size}`
    }

    return (
        <button className={buttonClassName} onClick={onClick}>
            {
                (icon && (!iconOrientation || iconOrientation === "left")) && React.createElement(icon)
            }
            {text}
            {
                (icon && iconOrientation === "right") && React.createElement(icon)
            }
        </button>
    )
}
export default Button;