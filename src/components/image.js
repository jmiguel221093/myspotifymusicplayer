import React from 'react';
const Image = ({
    className,
    size,
    url,
    alt,
    fit
}) => {

    let imageClassName = 'image';
    if(className){
        imageClassName += ` ${className}`;
    }
    if(fit){
        imageClassName += ` fit-${fit}`;
    }
    if(size){
        imageClassName += ` size-${size}`;
    }else{
        imageClassName += ' size-medium'
    }

    return (
        <figure className={imageClassName}>
            <img src={url} alt={alt} />
        </figure>
    )
}
export default Image;