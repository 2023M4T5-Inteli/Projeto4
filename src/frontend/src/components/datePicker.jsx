import inputDateToMinutes from "../helpers/inputDateToMinutes"

const DateForm = (props) => {

    const handleChange = (e) => {
        props.updateDate(inputDateToMinutes(e.target.value));
    }

  return (
        <div style={{height:"100%", margin:"10px", marginTop:"0px", marginBottom:"0px", flexDirection:"column", display:"flex", alignItems:"center", borderStyle: "hidden", borderColor:"#C0C0C0", borderRadius:"2px", borderWidth:"1px"}}>
            <input onChange={handleChange} type="date" id="start" name="birthday" style={{paddingTop:"18.5%", color:"grey", border:"grey"}} />
        </div>
  )
}

export default DateForm
