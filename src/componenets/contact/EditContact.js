import { Button, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { NavContext } from "../NavProvider"
import "./contact.css"
import { DeleteContact, EditContact, GetContact } from "./ContactProvider"
import { Modal, Paper,  Typography } from "@mui/material"
import { Box } from "@mui/system"
export const EditContactPage = () =>{
    const [name, setName] = useState("")
    const {render} = useContext(NavContext)
    const history = useHistory()
    const {contactId} = useParams()
    const [modal, setModalState] = useState(false)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
    
      };
    const handleModal = () =>{
        setModalState(!modal)
    }
    useEffect(()=>{

        GetContact(contactId).then((data)=> setName(data.name))
        console.log(contactId)
    },[contactId])
    return(<div>
            <Modal open={modal}
            onClose={handleModal} 
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Are You Sure You Want To Delete This Contact?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                    **WARNING: Once the Contact is deleted you will not be able to get it back.
                </Typography>
                <div className="modal-buttons">
                    <Button variant="contained" onClick={()=>{
                        DeleteContact(contactId).then(()=> render()).then(()=> history.push(`/`))
                        handleModal()
                    }} color="error">Delete</Button>
                    <Button variant="contained" onClick={handleModal} color="success">Cancel</Button>
                </div>
            </Box>
        </Modal>
            <h1>Edit</h1>
            <fieldset>
                    
                    <TextField label="Contact Name"variant="outlined" onChange={(event)=>setName(event.target.value)}value={name} type="text" name="firstName" className="form-control" placeholder="Contact Name" required autoFocus />
            </fieldset>
            <Button id="add-contact-button"variant="contained" color="success" onClick={()=>{
                const contact = {
                    name: name
                }
                EditContact(contact, contactId).then(()=> render()).then(()=> history.push(`/contacts/${contactId}`))
                
            }}>Save</Button>
            <Button id="delete-contact-button"variant="contained" color="error"
            onClick={()=>{
                handleModal()
            }}
            >Delete Contact</Button>
            
    </div>)
}