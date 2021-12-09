import { createContext, useState } from "react"

export const NavContext = createContext()
export const NavProvider = (props) =>{
    const [open, isOpen] = useState(false)
    const [contacts, setContacts] = useState({})
    const [backEndTrigger, setTrigger] = useState(true)
    const test = ()=>{
        
        setTrigger(!backEndTrigger)
    }
    const render = () =>{
        return fetch(' https://sns-server-capstone.herokuapp.com/contacts',
            {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("sns_token")}`
                }
            }
        ).then((res)=> res.json()).then((data)=> setContacts(data))
    }
    return(<NavContext.Provider value={{
        open, isOpen, contacts, render, setTrigger, backEndTrigger, test
    }}>{props.children}</NavContext.Provider>)
}