import TabletMacTwoToneIcon from '@mui/icons-material/TabletMacTwoTone';

const Kpi = (props) => {
  return (
    <div style={{width:"100%", height:"100%", display:"flex", flexDirection:"row", alignItems: "center", justifyContent: "center"}}>
        <div style={{width:"20%", height:"50%"}}>
            <div style={{ width: "120%", height: "200%", borderRadius: "50%", backgroundColor: props.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {props.icon}
            </div>
        </div>
        <div style={{width:"80%", height:"100%", display:"flex", flexDirection:"column", marginLeft:"5%"}}>
            <div style={{width:"100%", height:"500%", display:"flex", flexDirection:"row", alignItems: "flex-end", justifyContent: "flex-start"}}>
                <h2 style={{margin:"0%"}}>{props.ammount}</h2>
            </div>
            <div style={{width:"80%", height:"500%", display:"flex", flexDirection:"row", alignItems: "flex-start", justifyContent: "flex-start", marginLeft:"3%"}}>
                <p style={{margin:"0%"}}>{props.text}</p>
            </div>
        </div>
    </div>
  )
}

export default Kpi
