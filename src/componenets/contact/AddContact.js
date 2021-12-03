import { Button, TextField } from "@mui/material"
import { useContext, useRef } from "react"
import { useHistory } from "react-router"
import { NavContext } from "../NavProvider"
import "./contact.css"
import { AddContact } from "./ContactProvider"
export const AddContactPage = () =>{
    const name = useRef()
    const {render} = useContext(NavContext)
    const history = useHistory()
    return(<div>
            <h1>Add New Contact</h1>
            <fieldset>
                    
                    <TextField label="Contact Name"variant="outlined" inputRef={name} type="text" name="firstName" className="form-control" placeholder="Contact Name" required autoFocus />
            </fieldset>
            <Button id="add-contact-button"variant="contained" color="success" onClick={()=>{
                const contact = {
                    name: name.current.value
                }
                AddContact(contact).then(()=>render()).then(()=> history.push("/"))
                
            }}>Add</Button>
            
    </div>)
}