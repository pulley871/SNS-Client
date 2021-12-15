import { List, ListItemText, Paper, TextField, ListItemButton, ListItemIcon, Divider, Button, Alert, AlertTitle } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useHistory, useParams } from "react-router"
import { AddMessage, getContactAndMessages, getTags } from "./MessageProvider"
import "./AddMessage.css"

import { Stepper, Box, Step, StepLabel, Typography } from "@mui/material"

export const AddMessagePage = () => {
    const [messageBody, setMessageBody] = useState("")
    const [date, setDate] = useState("")
    const {contactId} = useParams()
    const [contact, setContact] = useState({})
    const [tags, setTags] = useState([])
    const [chosenTags, setChosenTags] = useState([])
    const [catToggle, setTog] = useState(false)
    const [selected,setSelected] = useState(0)
    const history = useHistory()
    const [refresh, setRefresh] = useState(false)
    const [activeStep, setActiveStep] = useState(0)
    const steps = ["Message Boy and Date", "Message Tags", "Review"]
    const [alert, setAlert] = useState(Boolean)
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
        
        if (parseInt(selected) > 0 ){
            
            tagChecker(selected)
            setRefresh(!refresh)
        }
    },[selected])
    const stepperFunc = (value) =>{
        if (value === "Next"){
            const  num = activeStep + 1
            setActiveStep(num)
        }else if (value === "Back"){
            const num = activeStep - 1
            setActiveStep(num)
        }
    }
    const messageIsFilled = () =>{
        if (messageBody === "" && date === ""){
            return false
        }else{
            return true
        }
    }
    return(
    <div id="add-message-container">
        <Box sx={{ width: "100%"}}>
            <Stepper activeStep={activeStep} id="stepper">
                    {steps.map((label, index)=>{
                        const stepProps = {}
                        const labelProps = {}
                        return (
                            <Step key={label}{...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        )
                    })}
            </Stepper>
            {activeStep === steps.length ? <>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick="">Reset</Button>
          </Box>
            </>:
            <>{activeStep === 0 ? <Typography sx={{ mt: 2, mb: 1 }}>

            <section id="add-message-form">
            <h1>Message for {contact.name}</h1>
            <fieldset>
                <TextField 
                    id="outlined-textarea"
                    label="Message Body"
                    value={messageBody}
                    placeholder= "Enter your Message here"
                    multiline
                    rows={8}
                    onChange={(event)=> setMessageBody(event.target.value)}
                />
            </fieldset>
            <fieldset>
                <label htmlFor='name'>Date</label>
                <input id="add-message-date"type="date" value={date}onChange={(event)=>setDate(event.target.value)} name="date" />
            </fieldset>
            </section>


            </Typography>
            :
            <>{activeStep === 1  ? 
            <Typography sx={{ mt: 2, mb: 1 }}>
                <div id="cat-list-step">
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
            <div id="tags-add-message-container">
            <label htmlFor="selectedTags">Selected Tags</label><br/>
            <Paper elevation={8} name="selectedTags">
                {tags.map((tag)=>{
                    return(chosenTags.includes(tag.id)? <p>{tag.label}</p>:"")
                    })
                }
            </Paper>
            </div>
            </div>
            </Typography>
            :
            <Typography sx={{ mt: 2, mb: 1 }}>
            <div id="review-container">
                <label htmlFor="messageBody">Message</label><br/>
                <Paper elevation={8} id="review-paper" name="messageBody">
                    <p>{messageBody}</p>
                </Paper>
            </div>
            <div id="review-container">
                <label htmlFor="datesel">Date</label><br/>
                <Paper elevation={8}  name="datesel">
                    <p>{date}</p>
                </Paper>
            </div>
            <div id="review-container">
                <label htmlFor="selectedTags">Selected Tags</label><br/>
                <Paper elevation={8}  name="selectedTags">
                    {tags.map((tag)=>{
                        return(chosenTags.includes(tag.id)? <p>{tag.label}</p>:"")
                        })
                    }
                </Paper>
            </div>


            </Typography>
            
            
            
            
            }</>
            
            }</>}
            {activeStep > 0 ? <Button onClick={(event)=>{
                stepperFunc(event.target.value)
            }} value="Back" variant="outlined">
              Back
            </Button>:""}
            {alert ? <Alert severity="error"><AlertTitle>Message Needs Some Work</AlertTitle>Please fill out the <strong>Message Body</strong> and <strong>Message Date</strong></Alert> : ""}
            <Button onClick={(event)=>{
                let check = messageIsFilled()
                if (check){
                    setAlert(false)
                    if (activeStep === steps.length -1){
                        const message = {
                            contact_id : contactId,
                            message : messageBody,
                            date : date,
                            tags : chosenTags 
                        }
                        AddMessage(message).then(()=> history.push(`/contacts/${contactId}`))
                    }else{
                    stepperFunc(event.target.value)
                    }

                }else{
                    setAlert(true)
                }
            }} value={activeStep === steps.length - 1 ? 'Finish' : 'Next'} variant={activeStep === steps.length - 1 ? 'contained' : 'outlined'}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
        </Box>
        
    </div>)
}