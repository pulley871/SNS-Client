export const getContactAndMessages = (id) =>{
    return fetch(`http://localhost:8000/contacts/${id}`,
            {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("sns_token")}`
                }
            }
        ).then((res)=> res.json())
    
}

export const DeleteMessage = (id) =>{
    return fetch(`http://localhost:8000/messages/${id}`,
            {   
                method: "DELETE",
                headers: {
                    "Authorization": `Token ${localStorage.getItem("sns_token")}`
                }
            }
        )
    
}

export const AddMessage = (message) => {
    return fetch(`http://localhost:8000/messages`,
            {   
                method: "POST",
                headers: {
                    "Authorization": `Token ${localStorage.getItem("sns_token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(message)
            }
        )
}
export const EditMessage = (message, id) => {
    return fetch(`http://localhost:8000/messages/${id}`,
            {   
                method: "PUT",
                headers: {
                    "Authorization": `Token ${localStorage.getItem("sns_token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(message)
            }
        )
}

export const getTags = () =>{
    return fetch(`http://localhost:8000/tags`,
            {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("sns_token")}`,
                    
                }
            }
        ).then((res)=> res.json())
    
}