import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { DeleteMessage, filterByDate, filterBySearchTerm, filterByTag, getContactAndMessages, getTags } from "./MessageProvider"
import "./Message.css"
import { Modal, Paper, Button, Typography, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material"
import { Box } from "@mui/system"


export const ContactMessage = () =>{
    const {contactId} = useParams()
    const [contact, setContact] = useState({})
    const [messages, setMessages] = useState([])
    const [modal, setModalState] = useState(false)
    const [deleteId, setDeleteId] = useState(0)
    const [tags, setTags] = useState([])
    const [selectedTag, setSelectedTag] = useState({})
    const [searchTerm, setSearchTerm] = useState("")
    const [date, setDate] = useState("")
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
        getContactAndMessages(contactId).then((data)=>{
            setContact(data)
            setMessages(data.messages)
        })
        getTags().then((data)=> setTags(data))
    }
    const handleModal = () =>{
        setModalState(!modal)
    }
    const tagFilter = (event) =>{
        setSelectedTag({"tagId": event.target.value.id, "label": event.target.value.label, "contact_id": contactId})

    }
    useEffect(()=>{
       render()
    },[contactId])
    useEffect(() =>{
        
        if (selectedTag.contact_id !== undefined){

            filterByTag(selectedTag).then((data)=>setMessages(data))
        }else if (searchTerm !== ""){
            filterBySearchTerm(searchTerm, contactId).then((data)=> setMessages(data))
        }else if (date !== ""){
            filterByDate(date, contactId).then((data)=>setMessages(data))
        }else{
            setMessages(contact.messages)
        }
    },[selectedTag, searchTerm, date])

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
        <FormControl id="tag-select">
            <InputLabel id="demo-simple-select-label">Filter By Tag</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedTag.label}
                label="Filter By Tag"
                onChange={tagFilter}
            >
                {tags?.map((tag)=> <MenuItem value={tag}>{tag.label}</MenuItem>)}
            </Select>
        </FormControl>
        <FormControl id = "search-term-box">
        <TextField
            
            value={searchTerm}
            label="Search By Message Text"
            onChange={(event)=> setSearchTerm(event.target.value)}
            />
        </FormControl>
        <FormControl id="filter-date">
        
                
                <TextField 
                    type="date"
                    labelId="date-select-filter-label"
                    label= "Filter By Date"
                    InputLabelProps = {{shrink:true}}
                    value={date}
                    onChange={(event)=> setDate(event.target.value)}    
                />
        </FormControl>
        <a id="filter-reset"
            onClick={()=>{
                setDate("")
                setSearchTerm("")
                setSelectedTag({}) 
                render()}}><span class="material-icons">restart_alt</span></a>
        <div id="message-container" key="message-container">
            {messages?.length > 0 ?
            messages?.map((message)=>{
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