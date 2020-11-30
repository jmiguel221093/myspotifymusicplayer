import { refreshToken } from "../api/requests";
import { config } from "./config";
import { User } from "./user";

class SpotifyPlayer {
    constructor(){
        this.player = null;
    }

    // Config methods
    createPlayer(){
        this.player = new window.Spotify.Player({
            name: config.appName,
            getOAuthToken: cb => {
                if((Date.now() / 1000) > User.getAccessTokenExpirationDate()){
                    refreshToken().then(()=>{
                        cb(User.getAuth().access_token)
                    })
                }else{
                    cb(User.getAuth().access_token)
                }
            }
        })
    }

    static init(cb){
        let playerInterval = setInterval(()=>{
            if(window.Spotify){
                clearInterval(playerInterval);
                cb && cb();
            }
        },100);
    }

    // Events
    handlingEvents({
        onReady,
        onPlayerStateChanged
    }){
        this._onReady(onReady);
        this._onNotReady(onReady);
        this._initializationError();
        this._authenticationError();
        this._accountError();
        this._playbackError();
        this._onPlayerStateChanged(onPlayerStateChanged);
    }

    _onReady(cb){
        this.player.addListener('ready', ({ device_id }) => {
            console.log("READY")
            User.setDeviceId(device_id);
            cb && cb();
        });
    }
    
    _onNotReady(cb){
        this.player.addListener('not_ready', ({ device_id }) => {
            console.log("NOT READY")
            // User.setDeviceId(device_id);
            cb && cb();
        });
    }
    
    _initializationError(cb){
        this.player.addListener('initialization_error', ({ message }) => {
            console.error("INITIALIZATION ERROR", message)
            cb && cb();
        });
    }

    _authenticationError(cb){
        this.player.addListener('authentication_error', ({ message }) => {
            console.error("AUTHENTICATION ERROR", message);
            cb && cb();
        });
    }
    
    _accountError(cb){
        this.player.addListener('account_error', ({ message }) => {
            console.error("ACCOUNT ERROR", message);
            cb && cb();
        });
    }

    _playbackError(cb){
        this.player.addListener('playback_error', ({ message }) => {
            console.log("PLAYBACK ERROR", message);
            cb && cb();
        });
    }

    _onPlayerStateChanged(cb){
        this.player.addListener('player_state_changed', state => {
            cb && cb(state);
        });
    }

    // Api reference
    connect(cb){
        this.player.connect().then(success => {
            cb && cb();
        });
    }
    
    disconnect(cb){
        this.player.disconnect();
    }
    
    togglePlay(cb){
        this.player.togglePlay().then(cb);
    }
    
    resume(cb){
        this.player.resume().then(cb);
    }
    
    pause(cb){
        this.player.pause().then(cb);
    }
    
    previous(cb){
        this.player.previousTrack().then(cb);
    }
    
    next(cb){
        this.player.nextTrack().then(cb);
    }

    getCurrentState(cb){
        this.player.getCurrentState().then(state => {
            cb(state);
        });
    }

    seek(position, cb){
        this.player.seek(position * 1000).then(cb);
    }

    getVolume(cb){
        this.player.getVolume().then(volume => {
            let volume_percent = volume * 100;
            cb && cb(volume_percent);
        })
    }
    
    setVolume(volume, cb){
        this.player.setVolume(volume / 100).then(() => {
            cb && cb();
        })
    }

}

export default SpotifyPlayer;