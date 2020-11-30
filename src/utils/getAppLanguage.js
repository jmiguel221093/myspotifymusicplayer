function getAppLanguage(){
    return navigator.language !== "es-MX" ? "en-US" : "es-MX"
}

export default getAppLanguage;