import getAppLanguage from "../../utils/getAppLanguage";

const initialState = {
    appLanguage: getAppLanguage(),
    context: "",
    currentTrack: {
        image: "",
        artists: [],
        duration: 0,
        is_playable: false,
        name: "",
        uri: "",
        hasPrevious: false
    },
    playerProgress: 0,
    isPlaying: false,
    shuffleMode: false,
    repeatMode: "off",
    volume: 0,
    player: null
}

export default initialState;