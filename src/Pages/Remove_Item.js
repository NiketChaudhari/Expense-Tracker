// Importing Packages :
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from "axios"
import Modal from '@material-ui/core/Modal';

const Remove_Item = (props) => {
    const navigate = useNavigate()

    const [typeArg, setTypeArg] = useState(props.item[0]);
    const [nameArg, setNameArg] = useState(props.item[1]);
    const [dateArg, setDateArg] = useState(props.item[2]);
    const [amountArg, setAmountArg] = useState(props.item[3]);

    const [isModalOpen, setIsMoadalOpen] = useState(false);

    const open_modal = () => {
        setIsMoadalOpen(true);
    };

    const close_modal = () => {
        setIsMoadalOpen(false);
    };

    const type_state_onchanged = (e) => {
        setTypeArg(e.target.value)
    }

    const name_state_onchanged = (e) => {
        setNameArg(e.target.value)
    }

    const date_state_onchanged = (e) => {
        setDateArg(e.target.value)
    }

    const amount_state_onchanged = (e) => {
        setAmountArg(e.target.value)
    }


    const remove_button_clicked = async () => {
        try {

            var local_username = localStorage.getItem('LOCALUSER');
            var local_password = localStorage.getItem('LOCALPASSWORD');

            if (local_username !== "" && local_username !== null && local_password !== "" && local_password !== null) {
            
            if ((typeArg !== "") && (nameArg !== "") && (dateArg !== "") && (amountArg !== "")) {
                const json_post = JSON.stringify(
                    {
                        USERNAME: local_username,
                        PASSWORD: local_password,
                        TYPE: typeArg,
                        NAME: nameArg,
                        DATE: dateArg,
                        AMOUNT: amountArg
                    }
                );

                try {
                    const response = await axios.post('http://127.0.0.1:5000/remove_expense_list', json_post, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    var res_data = response.data
                    if (res_data.toString() === "1001") {
                        var any_num = Math.random();
                        props.child_remove_button_clicked(any_num)
                    }
                    else {
                        props.child_remove_button_clicked(0)
                    }

                    NotificationManager.success('Expense list is removed.', 'Congratulation', 3000);

                } catch (error) {
                    props.child_remove_button_clicked(0)
                    NotificationManager.error('Something went wrong.', 'Error', 3000);
                }
            }
            else {
                NotificationManager.warning('All fields are mandatory.', 'Invalid Input', 3000);
            }

        }




        else {
            NotificationManager.warning('Please, Login to continue.', 'Invalid Input', 3000);
            setTimeout(() => {
                localStorage.setItem('LOCALUSER', "");
                localStorage.setItem('LOCALPASSWORD', "");
                navigate('/User_Selection')
            }, 3000);
        }

        }
        catch (error) {
            NotificationManager.error('Something went wrong.', 'Error', 3000);
        }

        setTimeout(() => {
            setTypeArg("")
            setNameArg("")
            setDateArg("")
            setAmountArg("")
            setIsMoadalOpen(false)
        }, 4000);
    }




    return (
        <>
            <button onClick={open_modal} className='Expense_List_Item_main_back_button'>
                Remove Item
            </button>
            <Modal
                className='Expense_List_Item_main_back_modal'
                onClose={close_modal}
                open={isModalOpen}
            >
                <div className="Expense_List_Item_main_back_modal_div1">

                    <div className="Expense_List_Item_main_back_modal_div1_1">
                        <div className="Expense_List_Item_main_back_modal_div1_2">
                            Type :
                        </div>
                        <input type='text' className="Expense_List_Item_main_back_modal_div1_3" value={typeArg} onChange={type_state_onchanged} readOnly />
                    </div>

                    <div className="Expense_List_Item_main_back_modal_div1_1">
                        <div className="Expense_List_Item_main_back_modal_div1_2">
                            Name :
                        </div>
                        <input type='text' className="Expense_List_Item_main_back_modal_div1_3" value={nameArg} onChange={name_state_onchanged} readOnly />
                    </div>

                    <div className="Expense_List_Item_main_back_modal_div1_1">
                        <div className="Expense_List_Item_main_back_modal_div1_2">
                            Date :
                        </div>
                        <input type='date' className="Expense_List_Item_main_back_modal_div1_3" value={dateArg} onChange={date_state_onchanged} readOnly />
                    </div>

                    <div className="Expense_List_Item_main_back_modal_div1_1">
                        <div className="Expense_List_Item_main_back_modal_div1_2">
                            Amount :
                        </div>
                        <input type='number' min="0" className="Expense_List_Item_main_back_modal_div1_3" value={amountArg} onChange={amount_state_onchanged} readOnly />
                    </div>

                    <div className="Expense_List_Item_main_back_modal_div1_1">
                        <button className="Expense_List_Item_main_back_modal_div1_button" onClick={remove_button_clicked}>Remove</button>
                    </div>

                </div>
            </Modal>
            <NotificationContainer />
        </>
    )
}

export default Remove_Item;