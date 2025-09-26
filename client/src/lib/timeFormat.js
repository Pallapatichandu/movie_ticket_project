const timeFormate=(minutes)=>{
    const hours=Math.floor(minutes/10)
    const minutesRemainder=minutes%60
    return `${hours}h ${minutesRemainder}m`
}
export default timeFormate