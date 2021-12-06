export const getContactAndMessages = (id) =>{
    return fetch(`https://sns-server-capstone.herokuapp.com/contacts/${id}`,
            {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("sns_token")}`
                },
                
            }
        ).then((res)=> res.json())
    
}

export const DeleteMessage = (id) =>{
    return fetch(`https://sns-server-capstone.herokuapp.com/messages/${id}`,
            {   
                method: "DELETE",
                headers: {
                    "Authorization": `Token ${localStorage.getItem("sns_token")}`
                }
            }
        )
    
}

export const AddMessage = (message) => {
    return fetch(`https://sns-server-capstone.herokuapp.com/messages`,
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
    return fetch(`https://sns-server-capstone.herokuapp.com/messages/${id}`,
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
    return fetch(`https://sns-server-capstone.herokuapp.com/tags`,
            {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("sns_token")}`,
                    
                }
            }
        ).then((res)=> res.json())
    
}