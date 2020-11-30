function getPercentage(value, total, fixed = 2){
    return ((value*100) / total).toFixed(fixed);
}

export default getPercentage;