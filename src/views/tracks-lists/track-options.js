import React from 'react';
import { addToQueue } from '../../api';
import { Modal } from '../../components';

const TrackOptions = ({
    trackUri,
    playlistId,
    open,
    onClose,
    onAddToPlaylist
}) => {

    const handleOnAddtoQueue = () => {
        addToQueue({
            uri: trackUri,
            success(res){
                onClose && onClose();
            },
            error(err){console.error(err)}
        })
    }

    const handleOnAddToPlaylist = () => {
        onAddToPlaylist && onAddToPlaylist();
    }

    // const handleDeleteItemFromPlaylist = () => {
    //     removeItemsFromPlaylist({
    //         id: playlistId,
    //         tracks: [{ uri: trackUri }],
    //         success(res){
    //             onClose && onClose();
    //         },
    //         error(err){console.error(err)}
    //     })
    // }

    const actions = [
        {
            content: "Añadir a la cola",
            onAction: handleOnAddtoQueue
        },
        {
            content: "Añadir a la playlist",
            onAction: handleOnAddToPlaylist,
        }
    ];

    return (
        <Modal
            topAlign
            open={open}
            onClose={onClose}
        >
            <Modal.ActionList
                items={actions}
            />
        </Modal>
)
}
export default TrackOptions;