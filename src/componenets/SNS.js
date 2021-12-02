import { Route, Routes, Redirect} from "react-router-dom"
import { ApplicationView } from "./ApplicationView"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { NavBar } from "./nav/NavBar"
import { NavProvider } from "./NavProvider"
import "./sns.css"

export const SNS = () => {
    
    return (
        <>
        
        
            <Route  render={()=>{
                if (localStorage.getItem("sns_token")){
                    return<>
                        <Route>
                        <div id="main-container">
                            <NavProvider>
                            <div id="nav">
                                
                                <NavBar /> 
                                
                            </div>
                            <div id="appview">
                                <ApplicationView />
                            </div>
                            </NavProvider>
                        </div>
                        </Route>
                    </>
                }else{
                    return <Redirect to="/login" /> 
                }
            }}/>
                
                
                
            <Route path="/login">
                <Login/>
            </Route>
                
            <Route path="/register">
                <Register />
            </Route>
        
            
        </>
    )
}