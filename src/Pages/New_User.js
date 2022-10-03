// Importing Packages :
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from "axios"

const New_User = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");

    useEffect(() => {
        setUsername("");
        setPassword("");
        setCpassword("");
    }, [])

    const username_changed = (e) => {
        // console.log("Username", e.target.value)
        setUsername(e.target.value)
    }

    const password_changed = (e) => {
        // console.log("Password", e.target.value)
        setPassword(e.target.value)
    }

    const cpassword_changed = (e) => {
        // console.log("Cpassword", e.target.value)
        setCpassword(e.target.value)
    }

    const CheckPassword = (inputtxt) => {
        var match_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        return inputtxt.match(match_pattern)
    }

    const add_button_clicked = () => {

        try {
            if ((username !== "") && (password !== "") && (cpassword !== "")) {
                if (password === cpassword) {

                    if(CheckPassword(password)) {
                        axios.get('http://127.0.0.1:5000/validation', {
                            params: {
                                username: username,
                                password: password
                            }
                        })
                            .then((response) => {
                                var res_data = response.data
                                res_data.toString()
                                if (res_data.toString() === "1001") {
                                    NotificationManager.success('New user is created.', 'Congratulation', 3000);
                                    
                                    setTimeout(() => {
                                        localStorage.setItem('LOCALUSER', username);
                                        localStorage.setItem('LOCALPASSWORD', password);
                                        navigate('/Expense_List')
                                    }, 3000);

                                }
                                else {
                                    NotificationManager.warning('Username is already present.', 'Invalid Input', 5000);
                                }
                            })
                            .catch((err) => {
                                NotificationManager.error('Something went wrong.', 'Error', 5000);
                            })
                    }
                    else {
                        NotificationManager.warning('Passward contains 8-15 characters, at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.', 'Invalid Input', 5000);
                    }
                }
                else {
                    NotificationManager.warning('Passward and confirm password should be same.', 'Invalid Input', 5000);
                }
            }
            else {
                NotificationManager.warning('All fields are mandatory.', 'Invalid Input', 5000);
            }
        }
        catch (err) {
            NotificationManager.error('Something went wrong.', 'Error', 5000);
        }

    }




    return (
        <div className="New_User_div">
            <div className="New_User_div2">

                <div className="New_User_div3">
                    <span className="New_User_span">
                        Enter Username :
                    </span>
                    <input type='text' className="New_User_input" value={username} onChange={username_changed} />
                </div>

                <div className="New_User_div3">
                    <span className="New_User_span">
                        Enter Password :
                    </span>
                    <input type='password' className="New_User_input" value={password} onChange={password_changed} />
                </div>

                <div className="New_User_div3">
                    <span className="New_User_span">
                        Confirm Password :
                    </span>
                    <input type='password' className="New_User_input" value={cpassword} onChange={cpassword_changed} />
                </div>

                <div className="New_User_div4">
                    <button className="New_User_button" onClick={add_button_clicked}>Add User</button>
                </div>

            </div>
            <NotificationContainer />
        </div>
    )
}

export default New_User;