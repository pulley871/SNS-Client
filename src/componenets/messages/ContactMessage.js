import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { DeleteMessage, getContactAndMessages } from "./MessageProvider"
import "./Message.css"
import { Modal, Paper, Button, Typography } from "@mui/material"
import { Box } from "@mui/system"


export const ContactMessage = () =>{
    const {contactId} = useParams()
    const [contact, setContact] = useState({})
    const [modal, setModalState] = useState(false)
    const [deleteId, setDeleteId] = useState(0)
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
    const history = useHistory()
    const render = () =>{
        getContactAndMessages(contactId).then((data)=>setContact(data))
    }
    const handleModal = () =>{
        setModalState(!modal)
    }
    useEffect(()=>{
       render()
    },[contactId])
    

    return(<>
        <Modal open={modal}
            onClose={handleModal} 
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Are You Sure You Want To Delete This Message?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                    **WARNING: Once the message is deleted you will not be able to get it back.
                </Typography>
                <div className="modal-buttons">
                    <Button variant="contained" onClick={()=>{
                        DeleteMessage(deleteId)
                        .then(render())
                        handleModal()
                    }} color="error">Delete</Button>
                    <Button variant="contained" onClick={handleModal} color="success">Cancel</Button>
                </div>
            </Box>
        </Modal>
        <h1> {contact?.name}<a onClick={()=>history.push(`/edit/contact/${contact.id}`)}><span class="material-icons">edit</span></a></h1>
        <div id="message-container" key="message-container">
            {contact.messages?.length > 0 ?
            contact.messages?.map((message)=>{
                return (
                        <div key={`message-${message.id}-container`}className="message-box">
                            <Paper elevation={5}>
                            <h4 key={`message-${message.id}-body`}>{message.message}</h4>
                            <div className="tag-container">
                                {message.tags?.length > 0 ?
                                message.tags.map(tag =>{
                                    return <p>{tag.label}</p>
                                })  
                                :
                                "" 
                            }
                            </div>
                            <div key={`message-${message.id}-footer`}className="message-footer">
                                <p key={`message-${message.message_date}-date`}>{message.message_date}</p>
                                

                                <div key={`message-${message.id}-buttons`}>
                                <a onClick={()=>{
                                    history.push(`/editmessage/${contact.id}/${message.id}`)
                                }}><span class="material-icons">edit</span></a>
                                <a onClick={()=>{
                                    handleModal()
                                    setDeleteId(message.id)    
                                }}><span class="material-icons">delete</span></a>
                                </div>
                            </div>
                            </Paper>
                        </div>
                )
            }): "You have no saved messages yet"}
        </div>
        <Button variant="contained"id="create-button" onClick={()=> history.push(`/new/message/${contact.id}`)}>Create Message</Button>
    </>)
}