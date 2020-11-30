import React from 'react';
import { DisplayText, Icons, List, Modal, Spinner } from '../../components';
const AddToPlaylistModal = ({
    playlists,
    open,
    onClose,
    onSelectPlaylist
}) => {
    return (
        <Modal
            bottomAlign
            open={open}
            onClose={onClose}
            className="modal-add-to-playlist"
        >
            <DisplayText
                size="medium"
            >Añadir a la playlist</DisplayText>
            {
                playlists.length > 0 ?
                <List>
                    {
                        playlists.map((item,i)=>
                            <List.Item
                                key={`modal-add-to-playlist-item-${item.id}-${i}`}
                                buttonIcon={Icons.PlusIcon}
                                image={item.image}
                                title={item.title}
                                meta={item.meta}
                                onAction={() => onSelectPlaylist && onSelectPlaylist(item.id)}
                                onClick={() => onSelectPlaylist && onSelectPlaylist(item.id)}
                            />
                        )
                    }
                </List>:
                <Spinner />
            }
        </Modal>
    )
}
export default AddToPlaylistModal;