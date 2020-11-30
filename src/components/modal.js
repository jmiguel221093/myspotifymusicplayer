import React, { useRef } from 'react';
import { Icons } from '.';
import IconButton from './icon-button';
import ModalActionList from './modal-action-list';

const Modal = ({
    onClose,
    children,
    topAlign,
    bottomAlign,
    open,
    className
}) => {

    const modalRef = useRef(null);

    let modalClassName = "modal";

    if(className){
        modalClassName += " "+className;
    }

    if(open){
        modalClassName += " open";
    }

    const handleClose = () => {
        modalRef.current.classList.add("closing");
        setTimeout(()=>{
            modalRef.current.classList.remove('open','closing')
            onClose && onClose();
        },700)
    }

    return (
        <div className={modalClassName} ref={modalRef}>
            <div className="modal-body">
                {
                    (topAlign && !bottomAlign) &&
                    children
                }
                <IconButton
                    icon={Icons.XIcon}
                    size="large"
                    type="clean"
                    className="modal-close-icon"
                    onClick={handleClose}
                />
                {
                    bottomAlign &&
                    children
                }
            </div>
        </div>
    )
}

Modal.ActionList = ModalActionList;

export default Modal;