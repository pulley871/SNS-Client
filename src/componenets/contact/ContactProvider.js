export const AddContact = (contact) => {
    return fetch(` https://sns-server-capstone.herokuapp.com/contacts`,
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
    return fetch(` https://sns-server-capstone.herokuapp.com/contacts/${contactId}`,
            {   
                
                headers: {
                    "Authorization": `Token ${localStorage.getItem("sns_token")}`,
                    "Content-Type": "application/json"
                }
            }
        ).then((res)=>res.json())
}
export const EditContact = (contact, id) => {
    return fetch(` https://sns-server-capstone.herokuapp.com/contacts/${id}`,
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
    return fetch(` https://sns-server-capstone.herokuapp.com/contacts/${id}`,
            {   
                method: "DELETE",
                headers: {
                    "Authorization": `Token ${localStorage.getItem("sns_token")}`,
                    "Content-Type": "application/json"
                }
            }
        )
}
