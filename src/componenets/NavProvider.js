import { createContext, useState } from "react"

export const NavContext = createContext()
export const NavProvider = (props) =>{
    const [open, isOpen] = useState(false)
    const setOpenState = (open)=>{
        
    }
    return(<NavContext.Provider value={{
        open, isOpen
    }}>{props.children}</NavContext.Provider>)
}