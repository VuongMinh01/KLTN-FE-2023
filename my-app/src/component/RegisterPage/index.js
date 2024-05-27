import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import "../../css/LoginRegisterPage.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { registerRoute } from "../../utils/APIRoutes";
export default function RegisterPage() {

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        draggable: true,
        pauseOnHover: true,
        theme: "dark"
    };
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        date_of_birth: "",
    });
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

    const handleValidation = () => {
        const { password, confirm_password, email, name, date_of_birth } = values;
        if (name === "") {
            toast.error("Tên không được để trống.", toastOptions);
            return false;
        }
        else if (name.length < 3) {
            toast.error("Tên không được ít hơn 3 ký tự.", toastOptions);
            return false;
        }
        else if (email === "") {
            toast.error("Email không được để trống.", toastOptions);
            return false;
        }
        else if (!/@gmail/.test(email)) {
            toast.error("Email phải là địa chỉ gmail.", toastOptions);
            return false;
        }
        else if (password === "") {
            toast.error("Mật khẩu không được để trống", toastOptions);
            return false;
        }
        else if (password.length < 6) {
            toast.error("Mật khẩu không được ít hơn 6 ký tự", toastOptions);
            return false;
        }
        else if (confirm_password === "") {
            toast.error("Mật khẩu xác nhận không được để trống", toastOptions);
            return false;
        }
        else if (password !== confirm_password) {
            toast.error("Mật khẩu và mật khẩu xác nhận phải giống nhau.", toastOptions);
            return false;
        }
        else if (date_of_birth === "" || !dateRegex.test(date_of_birth)) {
            toast.error("Ngày sinh không được để trống và phải là dd/mm/yyyy", toastOptions);
            return false;
        }


        return true;
    };


    // code moi
    const onButtonClick = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        // Perform client-side validation
        if (handleValidation()) {
            // Parse the input date string and convert it to the desired format
            const dobParts = values.date_of_birth.split('/'); // Split the input by '/'
            const formattedDOB = `${dobParts[2]}-${dobParts[1]}-${dobParts[0]}`; // Format as "yyyy-mm-dd"
            const isoFormattedDOB = new Date(formattedDOB).toISOString(); // Convert to ISO string format

            // Make the POST request with the formatted date of birth
            try {
                const { data } = await axios.post(registerRoute, {
                    ...values,
                    date_of_birth: isoFormattedDOB, // Use the formatted date of birth
                });
                if (data.status === false) {
                    toast.error(data.msg);
                } else if (data.message === "Register success") {
                    navigate("/login")
                }
            } catch (error) {
                console.error('Error registering user:', error);
                toast.error('Thông tin nhập không hợp lệ.');
            }
        }
    };




    return (
        <div className={'mainContainer'}>
            <div className='Register'>

                <div className={'titleContainer'}>
                    <div>Register</div>
                </div>
                <div className={'inputContainer'}>
                    <input
                        placeholder="Nhập tên của bạn tại đây"
                        className={'inputBox'}
                        name="name"
                        onChange={(e) => handleOnChange(e)}

                    />
                </div>
                <br />

                <div className={'inputContainer'}>
                    <input
                        placeholder="Nhập Email tại đây"
                        className={'inputBox'}
                        name="email"
                        onChange={(e) => handleOnChange(e)}

                    />
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input
                        placeholder="Nhập mật khẩu tại đây"
                        className={'inputBox'}
                        name="password"
                        type='password'
                        onChange={(e) => handleOnChange(e)}

                    />
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input
                        placeholder="Nhập mật khẩu xác nhận tại đây"
                        className={'inputBox'}
                        name="confirm_password"
                        type='password'
                        onChange={(e) => handleOnChange(e)}

                    />
                </div>
                <br />

                <div className={'inputContainer'}>
                    <input
                        placeholder="Nhập ngày sinh của bạn tại đây"
                        className={'inputBox'}
                        name="date_of_birth"
                        onChange={(e) => handleOnChange(e)}

                    />
                </div>
                <br />
                <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Register'} />
                <div className={'inputContainer'}>
                    <h4>Đã có tài khoản?<NavLink className='NavLinkCss' style={{ color: 'cornflowerblue' }} to="/login">Đăng nhập</NavLink></h4>
                </div>
                <ToastContainer />

            </div>
        </div>
    )

}