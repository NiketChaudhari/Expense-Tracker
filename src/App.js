// Importing Packages :
import { Routes, Route, Link } from "react-router-dom";


// Importing Files :
import Welcome from './Pages/Welcome'
import User_Selection from './Pages/User_Selection';
import New_User from './Pages/New_User';
import Already_Registered_User from './Pages/Already_Registered_User';
import Expense_List from './Pages/Expense_List';



const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        {/* <Route path="/" element={<Expense_List />} /> */}
        <Route path="/User_Selection" element={<User_Selection />} />
        <Route path="/New_User" element={<New_User />} />
        <Route path="/Already_Registered_User" element={<Already_Registered_User />} />
        <Route path="/Expense_List" element={<Expense_List />} />
      </Routes>
    </>
  )
}
export default App;

