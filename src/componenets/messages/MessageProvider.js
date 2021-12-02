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