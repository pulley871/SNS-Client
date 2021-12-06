export const FetchHomeData = () => {
    return fetch(`https://sns-server-capstone.herokuapp.com/home`,
            {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("sns_token")}`
                },
                
            }
        ).then((res)=> res.json())
    

}