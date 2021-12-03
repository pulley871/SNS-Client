export const AddContact = (contact) => {
    return fetch(`http://localhost:8000/contacts`,
            {   
                method: "POST",
                headers: {
                    "Authorization": `Token ${localStorage.getItem("sns_token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(contact)
            }
        )
}
export const GetContact = (contactId) => {
    return fetch(`http://localhost:8000/contacts/${contactId}`,
            {   
                
                headers: {
                    "Authorization": `Token ${localStorage.getItem("sns_token")}`,
                    "Content-Type": "application/json"
                }
            }
        ).then((res)=>res.json())
}
export const EditContact = (contact, id) => {
    return fetch(`http://localhost:8000/contacts/${id}`,
            {   
                method: "PUT",
                headers: {
                    "Authorization": `Token ${localStorage.getItem("sns_token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(contact)
            }
        )
}
export const DeleteContact = ( id) => {
    return fetch(`http://localhost:8000/contacts/${id}`,
            {   
                method: "DELETE",
                headers: {
                    "Authorization": `Token ${localStorage.getItem("sns_token")}`,
                    "Content-Type": "application/json"
                }
            }
        )
}
