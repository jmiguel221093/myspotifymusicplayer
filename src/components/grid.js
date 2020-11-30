import React from 'react';
const Grid = ({
    children,
    className,
    itemsAlignment,
    contentJustify
}) => {

    let gridClassName = 'grid';
    if(className){
        gridClassName += ` ${className}`;
    }
    if(itemsAlignment){
        gridClassName += ` align-items-${itemsAlignment}`;
    }
    if(contentJustify){
        gridClassName += ` justify-content-${contentJustify}`;
    }

    return (
        <div className={gridClassName}>
            {children}
        </div>
    )
}

const Column = ({
    children,
    className,
    size
}) => {

    let columnClassName = 'column';
    if(className){
        columnClassName += ` ${className}`;
    }
    if(size){
        columnClassName += ` size-${size}`;
    }

    return (
        <div className={columnClassName}>{children}</div>
    )
}

Grid.Column = Column;

export default Grid;