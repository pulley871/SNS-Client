import { createContext, useState } from "react"

export const NavContext = createContext()
export const NavProvider = (props) =>{
    const [open, isOpen] = useState(false)
    const [contacts, setContacts] = useState({})
    const setOpenState = (open)=>{
        
    }
    const render = () =>{
        return fetch('http://localhost:8000/contacts',
            {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("sns_token")}`
                }
            }
        ).then((res)=> res.json()).then((data)=> setContacts(data))
    }
    return(<NavContext.Provider value={{
        open, isOpen, contacts, render
    }}>{props.children}</NavContext.Provider>)
}