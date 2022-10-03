// Importing Packages :
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from "axios"
import { GrLogout } from 'react-icons/gr';
import { TbCurrencyRupee } from 'react-icons/tb';


// Importing Files :
import Edit_Item from './Edit_Item';
import Remove_Item from './Remove_Item';
import Create_Item from './Create_Item';


const Expense_List = () => {
    const navigate = useNavigate()

    const [expenseList, setExpenseList] = useState([]);
    const [rotateList, setRotateList] = useState([]);

    const [anyNumber, setAnyNumber] = useState(null);

    const get_expense_list = async () => {

        try {

            var local_username = localStorage.getItem('LOCALUSER');
            var local_password = localStorage.getItem('LOCALPASSWORD');

            if (local_username !== "" && local_username !== null && local_password !== "" && local_password !== null) {

                const json_post = JSON.stringify(
                    {
                        USERNAME: local_username,
                        PASSWORD: local_password
                    }
                );

                const response = await axios.post('http://127.0.0.1:5000/get_expense_list', json_post, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                await setExpenseList(response.data)
            }
            else {
                NotificationManager.warning('Please, Login to continue.', 'Invalid Input', 3000);
                setExpenseList([])
                setTimeout(() => {
                    localStorage.setItem('LOCALUSER', "");
                    localStorage.setItem('LOCALPASSWORD', "");
                    navigate('/User_Selection')
                }, 3000);
            }
        } catch (error) {
            setExpenseList([])
        }
    }



    useEffect(() => {
        get_expense_list()
    }, [anyNumber])


    const parent_edit_button_clicked = (num_data) => {
        try {
            if (num_data !== 0) {
                setAnyNumber(num_data)
            }
        }
        catch (error) {
            console.error(error)
        }
    }


    const parent_remove_button_clicked = (num_data) => {
        try {
            if (num_data !== 0) {
                setAnyNumber(num_data)
            }
        }
        catch (error) {
            console.error(error)
        }
    }


    const parent_create_button_clicked = (num_data) => {
        try {
            if (num_data !== 0) {
                setAnyNumber(num_data)
            }
        }
        catch (error) {
            console.error(error)
        }
    }


    const each_item_front_button_clicked = (item) => {
        setRotateList([...rotateList, item])
    }

    const each_item_back_button_clicked = (item) => {
        setRotateList(
            (prevList) => {
                return prevList.filter((itm) => {
                    return itm !== item
                })
            }
        )
        // console.log(rotateList)
    }


    const get_total_amount_from_list = (num_list) => {
        var total_amount = 0
        try {
            for (let i = 0; i < num_list.length; i++) {
                total_amount = parseInt(num_list[i][3]) + parseInt(total_amount);
            }
            return `Total amount : ${total_amount} Rs`
        }
        catch (err) {
            return ""
        }
    }


    const logout_button_clicked = () => {
        localStorage.removeItem('LOCALUSER');
        localStorage.removeItem('LOCALPASSWORD');

        NotificationManager.success('You have successfully logged out.', 'Log-Out', 2800);
        setTimeout(() => {
            navigate('/User_Selection')
        }, 3000);
    }



    return (
        <div className="Expense_List_div">
            <div className="LogOut_Button_div">
                <button className="LogOut_Button" onClick={logout_button_clicked}><span className="LogOut_Button_Span"><GrLogout /></span>Logout</button>
            </div>



            {
                expenseList.length !== 0 ?

                    <>
                        <div className="Expense_List_div1">
                            Expense List
                        </div>

                        <div className="Expense_List_div2">
                            {
                                expenseList.map((item) => (

                                    rotateList.includes(item[0]) ?

                                        <div key={Math.random()} className="Expense_List_Item_main"
                                            onDoubleClick={() => { each_item_back_button_clicked(item[0]) }}
                                        >
                                            <Edit_Item item={item} child_edit_button_clicked={parent_edit_button_clicked} />
                                            <Remove_Item item={item} child_remove_button_clicked={parent_remove_button_clicked} />
                                        </div>

                                        :

                                        <button key={Math.random()} className="Expense_List_Item_main"
                                            onDoubleClick={() => { each_item_front_button_clicked(item[0]) }}
                                        >
                                            <div className="Expense_List_Item_main_row_1">
                                                <div className="Expense_List_Item_main_row_1_1">
                                                    {item[1]}
                                                </div>

                                                <div className="Expense_List_Item_main_row_1_2">
                                                    {item[0]}
                                                </div>

                                                <div className="Expense_List_Item_main_row_1_2">
                                                    {item[2]}
                                                </div>
                                            </div>

                                            <div className="Expense_List_Item_main_row_2">
                                                <span className="Expense_List_Item_main_row_2_2"><TbCurrencyRupee /></span>
                                                <span className="Expense_List_Item_main_row_2_2">
                                                    {item[3]}
                                                </span>
                                            </div>
                                        </button>
                                ))
                            }

                        </div>

                        <div className="Expense_List_div3">
                            <div className="Expense_List_div3_row_1">
                                {
                                    expenseList.length !== 0 ? get_total_amount_from_list(expenseList) : ""
                                }
                            </div>

                            <div className="Expense_List_div3_row_2">
                                <Create_Item child_create_button_clicked={parent_create_button_clicked} />
                            </div>

                        </div>
                    </>

                    :
                    <div className="Expense_List_div2_hide">
                        <h1>
                            No Data to Display
                        </h1>
                        <Create_Item child_create_button_clicked={parent_create_button_clicked} />
                    </div>
            }

            <NotificationContainer />
        </div>

    )
}

export default Expense_List;