const getRepeatMode = (mode) => {
    switch(mode){
        case "off":
            return "track";
        case "track":
            return "context";
        case "context":
            return "off";
        default:
            return "off";
    }
}

export default getRepeatMode;