import React from 'react';
const DisplayText = ({
    size,
    children
}) => {
    return (
        <div className={`display-text${size?` text-display-${size}`:' text-display'}`}>{children}</div>
    )
}
export default DisplayText;