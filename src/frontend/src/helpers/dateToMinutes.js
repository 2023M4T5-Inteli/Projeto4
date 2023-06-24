// A data inicial que eu estou usando 12/11/2002, 00:00

export default function dateToSeconds(date){
    return (parseInt(date.slice(0,4)) - 2002) *360*24*60 + (parseInt(date.slice(5, 7)) - 11) *30*24*60 + (parseInt(date.slice(8, 10))-12)*24*60 + parseInt(date.slice(11,13))*60 + parseInt(date.slice(14,16))
}