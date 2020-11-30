import React from 'react';
const InputField = ({
    type,
    placeholder,
    value,
    onChange,
    onKeyPress,
    onKeyUp,
    isLarge
}) => {

    let className = "input-field";

    if(isLarge){
        className += " is-large";
    }

    return (
        <div className={className}>
            <input 
                type={type} 
                placeholder={placeholder}
                value={value}
                onChange={(e)=>onChange && onChange(e.target.value)}
                onKeyPress={(e)=>onKeyPress && onKeyPress(e.target.value)}
                onKeyUp={(e) => onKeyUp && onKeyUp(e.target.value)}
                spellCheck={false}
            />
        </div>
    )
}
export default InputField;