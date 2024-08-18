import AdminRegistrationForm from "../Authentication/AdminReg"
import CustomerRegistrationForm from "../Authentication/CustomerReg";
import StaffRegistrationForm from "../Authentication/StaffReg"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {
  return (
    <div>Users
        <AdminRegistrationForm/>
       <br />
       <br />
       <br />
        <StaffRegistrationForm/>
        <br />
        <br />
        <br />
        <CustomerRegistrationForm/>
        <ToastContainer />
    </div>
  )
}

export default Users