import { Button } from "@mui/material"
import { useContext } from "react"
import { Route } from "react-router"
import { ContactMessage } from "./messages/ContactMessage"
import { NavContext, NavProvider } from "./NavProvider"

export const ApplicationView = () => {
    const {open} = useContext(NavContext)
    const contentStyle = {
        marginLeft: open ? "2rem" : "-9rem", // arbitrary values
        transition: "margin 0.2s ease"
    };
    
    return(<div style={contentStyle}>
    
        <Route exact path ="/contacts/:contactId">
            <ContactMessage />
        </Route>
    
    </div>)
}