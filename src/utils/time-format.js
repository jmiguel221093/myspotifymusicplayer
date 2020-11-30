function timeFormat(time){
    if(time>0){
        let tTime = time/60;
        let minutes = parseInt(tTime);
        let seconds = parseInt((tTime - minutes)*60);
        return `${minutes<10?`0${minutes}`:minutes}:${seconds<10?`0${seconds}`:seconds}`;
    }else{
        return '00:00'
    }
}

export default timeFormat;