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
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleValidation = () => {
        const { password, confirm_password, email, name, date_of_birth } = values;
        if (password !== confirm_password) {
            toast.error("password và confirmpassword phải giống nhau.", toastOptions);
            return false;
        }
        if (name.length < 3) {
            toast.error("Username không được ít hơn 3 ký tự.", toastOptions);
            return false;
        }
        else if (email === "") {
            toast.error("Email không được để trống.", toastOptions);
            return false;
        }

        else if (password.length < 6) {
            toast.error("Password không được ít hơn 6 ký tự", toastOptions);
            return false;
        }
        return true;
    };

    // const onButtonClick = async (e) => {
    //     e.preventDefault();
    //     if (handleValidation()) {
    //         console.log("in validtaion", registerRoute);
    //         const { password, confirm_password, email, name, date_of_birth } = values;
    //         const { data } = await axios.post(registerRoute, {
    //             name,
    //             email,
    //             password,
    //             confirm_password,
    //             date_of_birth,
    //         });
    //         console.log(values);
    //         if (data.status === false) {
    //             toast.error(data.msg, toastOptions);
    //         }
    //         if (data.message === "Register success") {
    //             localStorage.setItem("user", JSON.stringify(data.user));
    //             navigate("/user/verify")
    //         }
    //     }
    // }
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
                    localStorage.setItem("user", JSON.stringify(data.user));
                    navigate("/user/verify")
                }
            } catch (error) {
                console.error('Error registering user:', error);
                toast.error('An error occurred. Please try again later.');
            }
        }
    };


    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        date_of_birth: "",
    });

    return (
        <div className={'mainContainer'}>
            <div className='Register'>

                <div className={'titleContainer'}>
                    <div>Register</div>
                </div>
                <div className={'inputContainer'}>
                    <input
                        placeholder="Enter your Name here"
                        className={'inputBox'}
                        name="name"
                        onChange={(e) => handleOnChange(e)}

                    />
                </div>
                <br />

                <div className={'inputContainer'}>
                    <input
                        placeholder="Enter your email here"
                        className={'inputBox'}
                        name="email"
                        onChange={(e) => handleOnChange(e)}

                    />
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input
                        placeholder="Enter your password here"
                        className={'inputBox'}
                        name="password"
                        onChange={(e) => handleOnChange(e)}

                    />
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input
                        placeholder="Enter your confirm password here"
                        className={'inputBox'}
                        name="confirm_password"
                        onChange={(e) => handleOnChange(e)}

                    />
                </div>
                <br />

                <div className={'inputContainer'}>
                    <input
                        placeholder="Enter your date of birth here"
                        className={'inputBox'}
                        name="date_of_birth"
                        onChange={(e) => handleOnChange(e)}

                    />
                </div>
                <br />
                <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Register'} />
                <div className={'inputContainer'}>
                    <h4>Already have an account<NavLink className='NavLinkCss' style={{ color: 'cornflowerblue' }} to="/login">Login</NavLink></h4>
                </div>
            </div>
        </div>
    )

}