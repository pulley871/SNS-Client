import { Alert, AlertTitle, Button, TextField } from "@mui/material"
import { useContext, useRef, useState } from "react"
import { useHistory } from "react-router"
import { NavContext } from "../NavProvider"
import "./contact.css"
import { AddContact } from "./ContactProvider"
export const AddContactPage = () =>{
    const name = useRef()
    const {render} = useContext(NavContext)
    const [alert, setAlert] = useState(Boolean)
    const history = useHistory()
    const contactCheck = () =>{
        if (name.current.value === "" || name.current.value === undefined){
            return false
        }else{
            return true
        }
    }
    return(<div>
            <h1>Add New Contact</h1>
            <fieldset>
                    
                    <TextField label="Contact Name"variant="outlined" inputRef={name} type="text" name="firstName" className="form-control" placeholder="Contact Name" required autoFocus />
            </fieldset>
            {alert ? <Alert severity="error"><AlertTitle>You Cant leave the contact blank</AlertTitle>Please fill out the <strong>Contact's Name</strong></Alert> : ""}
            <Button id="add-contact-button"variant="contained" color="success" onClick={()=>{
                const check = contactCheck()
                if (check){
                    setAlert(false)
                    const contact = {
                        name: name.current.value
                    }
                    AddContact(contact).then(()=>render()).then(()=> history.push("/"))

                }else{
                    setAlert(true)
                }
                
            }}>Add</Button>
            
    </div>)
}