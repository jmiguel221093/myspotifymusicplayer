import actionTypes from "./actionTypes";

const reducer = (state, { type, data }) => {
    switch(type){
        case actionTypes.setPlayer:
            return {
                ...state,
                ...data
            }
        case actionTypes.currentTrack:
            return {
                ...state,
                currentTrack: data.currentTrack
            }
        case actionTypes.playerProgress:
            return {
                ...state,
                playerProgress: data.progress
            }
        case actionTypes.isPlaying:
            return {
                ...state,
                isPlaying: data.isPlaying
            }
        case actionTypes.shuffleMode:
            return {
                ...state,
                shuffleMode: data.shuffleMode
            }
        case actionTypes.context:
            return {
                ...state,
                context: data.context
            }
        case actionTypes.repeatMode:
            return {
                ...state,
                repeatMode: data.repeatMode
            }
        case actionTypes.volume:
            return {
                ...state,
                volume: data.volume
            }
        case actionTypes.player:
            return {
                ...state,
                player: data.player
            }
        default:
            console.error("Invalid action type")
    }
}

export default reducer;