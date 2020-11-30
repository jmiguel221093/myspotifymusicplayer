import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import DisplayText from './display-text';
import Splitting from 'splitting';

const Page = ({
    children,
    className,
    id,
    title,
    pageMenu
}) => {

    let pageRef = useRef(null);

    let pageClassName = 'page pt-loose';
    if(className){
        pageClassName += ` ${className}`;
    }

    useEffect(()=>{
        const count = pageRef.current.querySelector(".display-text").textContent.length;
        new Splitting({
            target: pageRef.current.querySelector('.display-text')
        });
        pageRef.current.querySelectorAll(".display-text .word > .char").forEach((char, i)=>{
            char.style.animationDelay = `${(300/count)*i}ms`
        })
    })

    return (
        <div className={pageClassName} id={id} ref={pageRef}>
            {
                title &&
                <div className="page-header text-center mb-loose">
                    <DisplayText size="medium">{title}</DisplayText>
                    {
                        pageMenu &&
                        <ul className="page-menu">
                        {
                            pageMenu.items.map((item,i)=>
                                <li
                                    key={`page-menu-item-${i}`}
                                >
                                    <NavLink
                                        to={`${pageMenu.url}${item.url}`}
                                        activeClassName='active'
                                    >
                                        { item.content }
                                    </NavLink>
                                </li>
                            )
                        }
                        </ul>
                    }
                </div>
            }
            <div className="page-body">{children}</div>
        </div>
    )
}

const Container = ({
    children
}) => (
    <div className="page-container">
        { children }
    </div>
);

Page.Container = Container;

export default Page;