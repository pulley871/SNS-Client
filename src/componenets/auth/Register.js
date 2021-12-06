import { Button, TextField } from "@mui/material"
import MuiPhoneNumber from "material-ui-phone-number"
import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
// import "./Auth.css"

export const Register = () => {
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const [phoneNumber, setNum] = useState(0)
    const history = useHistory()
    function handleOnChange(value) {
        var result = value.replace(/[- )(]/g,'')
        setNum(result)
     }
    const handleRegister = (e) => {
        e.preventDefault()
        debugger
        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "email": email.current.value,
                "password": password.current.value,
                "phone_number": phoneNumber
            }

            return fetch("https://sns-server-capstone.herokuapp.com/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("sns_token", res.token)
                        history.push("/")
                    }else{
                        window.alert(res.Message)
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <TextField variant="outlined" inputRef={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <TextField variant="outlined" inputRef={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="username">Username</label>
                    <TextField variant="outlined" inputRef={username} type="text" name="username" className="form-control" placeholder="Username" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email </label>
                    <TextField inputRef={email} name="email" className="form-control"  />
                </fieldset>
                
                <fieldset>
                    <label htmlFor="password"> Password </label>
                    <TextField variant="outlined" inputRef={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <TextField variant="outlined" inputRef={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </fieldset>
                <h3>For texting Please Input Your Phone Number</h3>
                <fieldset>
                    <label htmlFor="Phone"> Phone Number</label><br/>
                    
                    <MuiPhoneNumber defaultCountry={'us'}  name="Phone" id="outlined" onChange={handleOnChange}/>
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <Button  variant="contained" className="btn btn-1 btn-sep icon-send" type="submit">Register</Button >
                </fieldset>
            </form>
            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    )
}