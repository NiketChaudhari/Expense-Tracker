// Importing Packages :
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from "axios"


// Importing Files :
import '../Style.css'

const Already_Registered_User = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setUsername("");
        setPassword("");
    }, [])


    const username_changed = (e) => {
        // console.log("Username", e.target.value)
        setUsername(e.target.value)

    }

    const password_changed = (e) => {
        // console.log("Password", e.target.value)
        setPassword(e.target.value)
    }


    const ok_button_clicked = () => {

        try {
            if ((username !== "") && (password !== "")) {
                axios.get('http://127.0.0.1:5000/login', {
                    params: {
                        username: username,
                        password: password
                    }
                })
                    .then((response) => {
                        var res_data = response.data
                        res_data.toString()
                        if (res_data.toString() === "1001") {
                            NotificationManager.success('You have successfully logged in.', 'Congratulation', 3000);

                            setTimeout(() => {
                                localStorage.setItem('LOCALUSER', username);
                                localStorage.setItem('LOCALPASSWORD', password);
                                navigate('/Expense_List')
                            }, 3000);

                        }
                        else {
                            NotificationManager.warning('Wrong Username or Password.', 'Invalid Input', 5000);
                        }
                    })
                    .catch((err) => {
                        // console.log(err)
                        NotificationManager.error('Something went wrong.', 'Error', 5000);
                    })
            }
            else {
                NotificationManager.warning('All fields are mandatory.', 'Invalid Input', 5000);
            }
        }
        catch (err) {
            // console.log(err)
            NotificationManager.error('Something went wrong.', 'Error', 5000);
        }
    }




    return (
        <div className="Already_Registered_User_div">
            <div className="Already_Registered_User_div2">

                <div className="Already_Registered_User_div3">
                    <span className="Already_Registered_User_span">
                        Enter Username :
                    </span>
                    <input type='text' className="Already_Registered_User_input" value={username} onChange={username_changed} />
                </div>

                <div className="Already_Registered_User_div3">
                    <span className="Already_Registered_User_span">
                        Enter Password :
                    </span>
                    <input type='password' className="Already_Registered_User_input" value={password} onChange={password_changed} />
                </div>

                <div className="Already_Registered_User_div4">
                    <button className="Already_Registered_User_button" onClick={ok_button_clicked}>OK</button>
                </div>

            </div>
            <NotificationContainer />
        </div>
    )
}

export default Already_Registered_User;