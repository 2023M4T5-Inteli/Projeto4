import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const PaginaNaoEncontrada = () => {

    const [timer, updateTimer] = useState(5)
    let navigate = useNavigate()

    setTimeout(function() {
        navigate(-1);
      }, 5000);

    const segundo = 1000;

    useEffect(() => {
        const interval = setInterval(() => {
        updateTimer((oldTimer) => oldTimer - 1);
        }, segundo);

        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])

  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%", height:"80%"}}>
        <div style={{width:"80%", display:"flex", flexDirection:"column", alignItems:"center", marginTop:"2px"}}>
          <h1>Não encontramos a página que você estava procurando</h1>
          <h1>Redirecionando em</h1>
          <h1>{timer}</h1>
        </div>
      </div>
  )
}

export default PaginaNaoEncontrada
