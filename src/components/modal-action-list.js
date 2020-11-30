import React from 'react';
const ModalActionList = ({
    items
}) => {

    let animationDelay = 650;

    return (
        <ul className="modal-action-list">
            {
                items &&
                items.map((item, i)=>{
                    animationDelay += 100*i;
                    return (
                        <li
                            key={`modal-action-list-item-${i}`}
                            className={`modal-action-list-item${item.type?` ${item.type}`:''}`}
                            style={{
                                animationDelay: `${animationDelay}ms`
                            }}
                        >
                            <button
                                onClick={item.onAction}
                            >{item.content}</button>
                        </li>
                    )
                })
            }
        </ul>
    )
}
export default ModalActionList;