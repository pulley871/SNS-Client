import { List, ListItemText, Paper, TextField, ListItemButton, ListItemIcon, Divider, Button } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useHistory, useParams } from "react-router"
import { EditMessage, getContactAndMessages, getTags } from "./MessageProvider"
import "./AddMessage.css"



export const EditMessagePage = () => {
    const [messageBody, setBody] = useState("")
    const [date, setDate] = useState("")
    const [mainMessage, setMainMessage] = useState({})
    const {contactId} = useParams()
    const {messageId} = useParams()
    const [contact, setContact] = useState({})
    const [tags, setTags] = useState([])
    const [chosenTags, setChosenTags] = useState([])
    const [catToggle, setTog] = useState(false)
    const [selected,setSelected] = useState(0)
    const history = useHistory()
    const [refresh, setRefresh] = useState(false)
    
    useEffect(()=>{
        getContactAndMessages(contactId).then((data)=>setContact(data))
        getTags().then((data) => setTags(data))
    },[contactId])
    const tagChecker = (value) =>{
        
        const copy = chosenTags
        if (copy.includes(parseInt(value))){
            const index = copy.indexOf(parseInt(value))
            copy.splice(index, 1)
            setChosenTags(copy)
        }else{
            copy.push(parseInt(value))
            setChosenTags(copy)
            
        }
    }
    useEffect(() => {
        const foundMessage = contact.messages?.find((message)=> message.id === parseInt(messageId))
        if (foundMessage !== undefined){
            for (const x of foundMessage.tags){
                const copy = chosenTags
                copy.push(x.id)
                setChosenTags(copy)
    
            }
            setMainMessage(foundMessage)

        }
    }, [contact])
    useEffect(() =>{
        setBody(mainMessage.message)
        setDate(mainMessage.message_date)
    },[mainMessage])
    useEffect(() => {
        
        if (parseInt(selected) > 0 ){
            
            tagChecker(selected)
            setRefresh(!refresh)
        }
    },[selected])
    return(
    <div id="add-message-container">
        <section id="add-message-form">
            <h1>Message for {contact.name}</h1>
            <fieldset>
                <TextField 
                    id="outlined-textarea"
                    label="Message Body"
                    placeholder= "Enter your Message here"
                    multiline
                    rows={8}
                    onChange={(event)=> setBody(event.target.value)}
                    value={messageBody}
                />
            </fieldset>
            <fieldset>
                <label htmlFor='name'>Date</label>
                <input id="add-message-date"type="date"name="date" value={date} onChange={(event)=>setDate(event.target.value)}/>
            </fieldset>
            <List id='cat-list'>
                <ListItemButton onClick={()=>{
                    setTog(!catToggle)
                }}>
                    <ListItemIcon>
                        <span class="material-icons">category</span>
                    </ListItemIcon>
                    <ListItemText primary="Categories"/>
                </ListItemButton>
                <Divider />
                {catToggle ? 
                    tags.map((tag)=>{
                        return( 
                            <ListItemButton 
                            key={`tag-${tag.id}`}
                            value = {tag.id}
                            onClick={(event)=>{
                                
                                setSelected(tag.id)

                            }}
                            >
                                {chosenTags.includes(parseInt(tag.id))? 
                                <ListItemIcon key={`selected-${tag.id}`}>
                                <span key={`selected-${tag.id}-icon`}class="material-icons">check_box</span>
                                </ListItemIcon>
                                :
                                <ListItemIcon key={`unselected-${tag.id}`}>
                                <span key={`selected-${tag.id}-icon`}class="material-icons">check_box_outline_blank</span>
                                </ListItemIcon>
                                }
                                <ListItemText key={`tag-text-${tag.id}`}primary={tag.label}/>
                            </ListItemButton>
                        )
                    })
                
                :""}
                
            </List>
            <Button id="add-message-button"variant="contained" color="success" onClick={()=>{
                const message = {
                    contact_id : contactId,
                    message : messageBody,
                    date : date,
                    tags : chosenTags 
                }
                EditMessage(message, messageId).then(()=> history.push(`/contacts/${contactId}`))
            }}>Submit!</Button>
        </section>
        <div id="tags-add-message-container">
            <label htmlFor="selectedTags">Selected Tags</label><br/>
            <Paper elevation={8} name="selectedTags">
                {tags.map((tag)=>{
                    return(chosenTags.includes(tag.id)? <p>{tag.label}</p>:"")
                    })
                }
            </Paper>
        </div>
    </div>)
}