import { transferUserPlayback } from "../../api";
import { User } from "../../libs";

function setupPlayer(player, onPlayerStateChanged, ready) {
    player.createPlayer();
    player.connect();
    player.handlingEvents({
        onReady: ()=>{
            transferUserPlayback({
                device_id: User.getDeviceId(),
                success(){
                    ready && ready();
                },
                error(){}
            });
        },
        onPlayerStateChanged: state => {
            onPlayerStateChanged && onPlayerStateChanged(state);
        }
    })
}

export default setupPlayer;