import { useEffect, useState } from "react"
import { FetchHomeData } from "./UserProvider"
import "./User.css"

export const HomePage = () => {
    const [homeData, setHomeData] = useState({})
    const [slideNumber, setSlideNumber] = useState(1)
    useEffect(() => {
        FetchHomeData().then((data)=> setHomeData(data))
    },[])
    const dotChecker = (num) =>{
        
        const maxLength = homeData?.length
        if (num === maxLength){
            setSlideNumber(1)
        }else{
            let newNum = num + 1
            setSlideNumber(newNum)
        }
    }
    return (<>
            <div class="home-container"> 
            <div class="column-quote">
            {homeData.length > 0?
            homeData?.map((message)=>{
                return(<>
                    <div className={slideNumber === homeData.indexOf(message)+1 ? "mySlidesActive":"mySlidesNotActive"}>
                        <q class="quote" >{message.message}</q>
                        <p class="">{message.contact.name}</p>
                    </div></>)
            })
            :<div className="mySlidesActive">
            <q class="quote" >You have no Messages From Today</q>
            
        </div>}
            </div>
            <div class="dot-container">
                {homeData.length > 0 ? homeData.map((item)=>{
                    return(<span class= {slideNumber === homeData.indexOf(item)+1 ? "dot active":"dot"}onClick={()=>dotChecker(slideNumber)}></span> )
                }):""}
            
            </div>
            </div>
    
    </>)
}