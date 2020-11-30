import React from 'react';
import { useStateValue } from '../components/state-provider';

import { IconButton, Icons, Page } from '../components';
import PlayerHeader from './player-views/player-header';
import { useHistory } from 'react-router';

const Player = () => {

    const [{ currentTrack }] = useStateValue();
    const history = useHistory();

    const handleMinimizePlayer = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        history.goBack();
    }

    return (
        <Page
            id="player-screen"
        >
            <IconButton
                icon={ Icons.Minimize2Icon }
                type="clean"
                onClick={handleMinimizePlayer}
                className="minimize-player"
            />
            <Page.Container>
                <PlayerHeader
                    image={currentTrack.image}
                    name={currentTrack.name}
                    artists={currentTrack.artists}
                />
            </Page.Container>
        </Page>
)
}
export default Player;