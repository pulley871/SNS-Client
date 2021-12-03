import { Button } from "@mui/material"
import { useContext } from "react"
import { Route } from "react-router"
import { AddContactPage } from "./contact/AddContact"
import { EditContactPage } from "./contact/EditContact"
import { AddMessagePage } from "./messages/AddMessage"
import { ContactMessage } from "./messages/ContactMessage"
import { EditMessagePage } from "./messages/EditMessage"
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
        <Route exact path="/edit/contact/:contactId">
            <EditContactPage />
        </Route>
        <Route exact path ="/new/contact">
            <AddContactPage />
        </Route>
        <Route exact path ="/new/message/:contactId">
            <AddMessagePage />
        </Route>
        <Route exact path = "/editmessage/:contactId/:messageId">
            <EditMessagePage />
        </Route>
    </div>)
}