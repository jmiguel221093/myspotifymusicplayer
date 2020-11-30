import React, { useEffect, useRef } from 'react';
import { getPercentage } from '../utils';
const ScrollView = ({
    children,
    onScrollEnds
}) => {
    const scrollView = useRef(null);

    let thumbTimeout = null;

    const getContainers = () => {
        const scrollHeightContainer = scrollView.current.querySelector(".scroll-view-height-container");
        const content = scrollView.current.querySelector(".scroll-view-content");
        const scrollContainer = scrollView.current.querySelector(".scroll-view-scroll-screen");
        const thumbContainer = scrollView.current.querySelector(".scroll-view-thumb-container");
        const thumb = scrollView.current.querySelector(".scroll-view-thumb-container > .scroll-view-thumb");
        return {scrollHeightContainer, content, scrollContainer, thumbContainer, thumb}
    }

    const setUpScrollView = () => {
        const { scrollContainer, content, scrollHeightContainer, thumb, thumbContainer } = getContainers();
        if(scrollContainer.scrollHeight > scrollView.current.offsetHeight){
            scrollHeightContainer.style.height = `${content.offsetHeight}px`;
            scrollContainer.style.width = `${scrollView.current.offsetWidth + (scrollContainer.offsetWidth - scrollContainer.clientWidth)}px`
            thumb.style.height = `${getPercentage(thumbContainer.offsetHeight,scrollContainer.scrollHeight)}%`
            content.style.position = "absolute";
        }
    }

    useEffect(()=>{
        setUpScrollView();
        window.addEventListener("resize",setUpScrollView)
        return () => window.removeEventListener("resize",setUpScrollView)
    });

    const handleScroll = (e) => {
        if(scrollView.current){
            const { content, thumb } = getContainers();
            content.style.top = `${e.target.scrollTop}px`
            content.style.transform = `translate3d(0,-${e.target.scrollTop}px,0)`;
            thumb.style.top = `${getPercentage(e.target.scrollTop, content.offsetHeight)}%`
            thumb.classList.add("show");
            clearTimeout(thumbTimeout);
            thumbTimeout = setTimeout(()=>{
                thumb.classList.remove("show");
            },1700);
            if(Math.ceil(e.target.scrollTop + scrollView.current.offsetHeight) >= content.offsetHeight - 1){
                onScrollEnds &&
                onScrollEnds();
            }
        }
    }

    return (
        <div className="scroll-view" ref={ scrollView }>
            <div className="scroll-view-screen">
                <div className="scroll-view-scroll-screen" onScroll={handleScroll}>
                    <div className="scroll-view-height-container">
                        <div className="scroll-view-content">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <div className="scroll-view-thumb-container">
                <div className="scroll-view-thumb"></div>
            </div>
        </div>
    )
}
export default ScrollView;