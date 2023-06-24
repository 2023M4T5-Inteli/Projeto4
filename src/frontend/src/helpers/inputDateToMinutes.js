export default function inputDateToMinutes(date){
    return (parseInt(date.slice(0,4)) - 2002)*360*24*60 + (parseInt(date.slice(5, 7)) - 11)*30*24*60 + (parseInt(date.slice(8, 10))-12)*24*60;
}