
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { useContext, useEffect, useState } from "react";
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import "./Nav.css"
import { useHistory } from 'react-router';
import { NavContext } from '../NavProvider';
export const NavBar = () => {
    const [contacts, setContacts] = useState({})
    const [selected, setSelected] = useState(0)
    const history = useHistory()
    const {isOpen, open} = useContext(NavContext)
    const render = () =>{
        return fetch('http://localhost:8000/contacts',
            {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("sns_token")}`
                }
            }
        ).then((res)=> res.json()).then((data)=> setContacts(data))
    }
    useEffect(()=>{
        render()
    },[])
    return (<>
         <SideNav id="color"
    onSelect={(selected) => {
        setSelected(selected)
        history.push(`/contacts/${selected}`)
    }} onToggle={()=>isOpen(!open)}
>
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected="home" style={{
         
          
        }} >
        <NavItem eventKey="home">
            <NavIcon>
            <span class="material-icons">home</span>
            </NavIcon>
            <NavText>
                Home
            </NavText>
        </NavItem>
        
        <NavItem eventKey="contacts">
        <NavIcon>
        <span class="material-icons">mood</span>
        </NavIcon>
        <NavText>
            Contacts
        </NavText>
                {contacts.length > 0 ?contacts?.map((contact)=> 
                <NavItem key={`contact-${contact.id}-navitem`}eventKey={`${contact.id}`}>
                    <NavText key={`contact-${contact.id}-navtext`}>
                        {contact?.name}
                    </NavText>
                </NavItem>
                ):""}
        </NavItem> 
        
    </SideNav.Nav>
</SideNav>
    </>)
}