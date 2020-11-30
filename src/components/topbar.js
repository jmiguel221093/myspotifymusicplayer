import React from 'react';
import { NavLink } from 'react-router-dom';
import Grid from './grid';
import IconButton from './icon-button';
import { UserIcon } from './icons';
import Image from './image';
const Topbar = ({
    menu,
    username,
    userImage,
    extraActions,
    onClickAvatar
}) => {
    return (
        <div className="topbar">
            <Grid
                itemsAlignment="center"
            >
                <Grid.Column className="topbar-menu-actions">
                    {
                        menu &&
                        <ul className="top-bar-menu">
                        {
                            menu.map((menuItem, i) => 
                                <li key={`topbar-menu-item-${i}`} className="topbar-menu-item">
                                    <NavLink 
                                        exact
                                        to={menuItem.url}
                                        activeClassName="active"
                                        isActive={(match, location)=>{
                                            const {pathname} = location;
                                            return pathname.indexOf(menuItem.url) > -1
                                        }}
                                    >
                                        { menuItem.content }
                                    </NavLink>
                                </li>
                            )
                        }
                        </ul>
                    }
                    {
                        (extraActions && extraActions.length > 0) &&
                        <div className="top-bar-extra-actions">
                            {
                                extraActions.map((action,i)=>
                                    <IconButton
                                        icon={action.icon}
                                        type="clean"
                                        onClick={action.onAction}
                                        key={`top-bar-extra-action-icon-button-${i}`}
                                    />
                                )
                            }
                        </div>
                    }
                </Grid.Column>
                <Grid.Column
                    className="avatar-container"
                    size="auto"
                >
                    <div className="avatar" onClick={onClickAvatar}>
                        <span className="username">{username}</span>
                        {
                            userImage?
                            <Image
                                size="thumbnail"
                                url={userImage}
                                alt={username}
                            />:
                            <div className="avatar-icon">
                                <UserIcon />
                            </div>
                        }
                    </div>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default Topbar;