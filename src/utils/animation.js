import { Timeline } from "gsap/gsap-core";

function animationPage(pathname, node, appears){
    if(pathname !== "/"){
        const delay = appears ? 0 : 0.5;
        let timeline = new Timeline({ paused: true });
        timeline.from(node, 0, {display: 'none', autoAlpha: 0, delay});
        timeline.play();
    }
}

export {
    animationPage
}