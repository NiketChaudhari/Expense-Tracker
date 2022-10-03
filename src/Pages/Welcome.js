// Importing Packages :
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

// Importing Files :
import '../Style.css'

const Welcome = () => {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(redirect_to_userSelection_page, 5000);
    },[])

    const redirect_to_userSelection_page = () => {
        navigate('/User_Selection')
    }

    return (
        <div className="welcome_div">
            <span className='welcome_span'>E</span>
            <span className='welcome_span'>x</span>
            <span className='welcome_span'>p</span>
            <span className='welcome_span'>e</span>
            <span className='welcome_span'>n</span>
            <span className='welcome_span'>s</span>
            <span className='welcome_span'>e</span>
            &nbsp;
            &nbsp;
            <span className='welcome_span'>T</span>
            <span className='welcome_span'>r</span>
            <span className='welcome_span'>a</span>
            <span className='welcome_span'>c</span>
            <span className='welcome_span'>k</span>
            <span className='welcome_span'>e</span>
            <span className='welcome_span'>r</span>
        </div>
    )
}

export default Welcome;