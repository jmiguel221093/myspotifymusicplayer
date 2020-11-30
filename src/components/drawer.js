import React, { useRef } from 'react';
import { types } from '../utils';
import IconButton from './icon-button';
import { XIcon } from './icons';
import { useStateValue } from './state-provider';
const Drawer = ({
    mainMenu,
    subMenu,
    onClose
}) => {

    const drawer = useRef(null);
    const [{appLanguage}] = useStateValue();

    let animationDelay = 400;
    let animationDelaySub = 400;

    const handleClose = () => {
        drawer.current.classList.add("closing");
        setTimeout(()=>{
            drawer.current.classList.remove("closing");
            onClose &&
            onClose();
        },900);
    }

    return (
        <div className="drawer" ref={drawer}>
            <div className="drawer-content">
                <div className="content-container top-content">
                    <IconButton
                        icon={XIcon}
                        type="clean"
                        onClick={handleClose}
                        className="close-button"
                    />
                    {
                        mainMenu &&
                        <ul className="main">
                            {
                                mainMenu.map((item,i)=>{
                                    animationDelay += 100;
                                    return(
                                        <li key={`drawer-main-item-${i}`}
                                            style={{
                                                animationDelay: `${animationDelay}ms`
                                            }}
                                        >
                                            <button className="main-item" onClick={item.onAction}>{item.content}</button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    }
                </div>
                <div className="content-container bottom-content">
                    {
                        subMenu &&
                        <ul className="sub">
                            {
                                subMenu.map((item,i)=>{
                                    animationDelaySub += 50;
                                    return(
                                        <li key={`drawer-sub-item-${i}`}
                                        style={{
                                            animationDelay: `${animationDelaySub}ms`
                                        }}
                                        >
                                            <button className="sub-item" onClick={item.onAction}>{item.content}</button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    }
                    <div className="meta">
                        <p>{types[appLanguage].userMenu.mention}</p>
                        <p>{types[appLanguage].userMenu.rights}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Drawer;