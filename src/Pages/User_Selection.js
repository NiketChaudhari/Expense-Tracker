// Importing Packages :
import { useNavigate } from "react-router-dom"


const User_Selection = () => {
    const navigate = useNavigate()

    const new_user_button_clicked = () => {
        navigate('/New_User')
    }

    const already_registered_user_button_clicked = () => {
        navigate('/Already_Registered_User')
    }

    return (
        <div className="User_Selection_div">
            <button className="User_Selection_button" onClick={new_user_button_clicked}>New User</button>
            <button className="User_Selection_button" onClick={already_registered_user_button_clicked}>Already Registered User</button>
        </div>
    )
}

export default User_Selection;