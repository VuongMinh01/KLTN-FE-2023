import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { changePassword, verifyPassword } from "../../utils/APIRoutes";
import { Button, Input } from "antd";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";
export default function ChangePassword() {
    const [values, setValues] = useState({
        old_password: "",
        password: "",
        confirm_password: "",
    });
    const handleOnChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const token = localStorage.getItem("user").replace(/"/g, '');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        draggable: true,
        pauseOnHover: true,
        theme: "dark"
    };

    const handleValidation = () => {
        const { old_password, password, confirm_password } = values;
        if (old_password === "") {
            toast.error("Mật khẩu cũ không được để trống.", toastOptions);
            return false;
        }
        else if (password === "") {
            toast.error("Mật khẩu mới không được để trống.", toastOptions);
            return false;
        }
        else if (password.length < 6) {
            toast.error("Mật khẩu mới không được ít hơn 6 ký tự.", toastOptions);
            return false;
        }
        else if (confirm_password === "") {
            toast.error("Mật khẩu xác nhận không được để trống.", toastOptions);
            return false;
        }
        else if (confirm_password !== password) {
            toast.error("Mật khẩu xác nhận phải trùng khớp với mật khẩu", toastOptions);
            return false;
        }
        return true;
    };

    const submit = (e) => {
        e.preventDefault();
        if (handleValidation()) {

            axios.put(changePassword, values, { headers })
                .then(response => {
                    // Clear input fields
                    setValues({
                        old_password: '',
                        password: '',
                        confirm_password: ''
                    });
                    // Show success toast
                    showToast('Thay đổi mật khẩu thành công');
                })
                .catch(error => {
                    // Handle error if needed
                    console.error('Error changing password:', error);
                    // Optionally, show an error toast
                    toast.error('Mật khẩu cũ không đúng');
                });
        }
    };
    function showToast(message) {
        // Replace this with your toast alert implementation
        // For example, if you're using react-toastify:
        // toast.error(message);
        alert(message);
    }
    return (
        <Container>
            <h1 style={{ color: 'cornflowerblue' }}>Thay đổi mật khẩu</h1>

            <Row>
                <Input
                    name="old_password"
                    onChange={handleOnChange}
                    placeholder="Nhập mật khẩu cũ"
                    type="password"
                    style={{ marginBottom: '10px' }}
                />
                <Input
                    name="password"
                    onChange={handleOnChange}
                    placeholder="Nhập mật khẩu mới"
                    type="password"

                    style={{ marginBottom: '10px' }}

                />
                <Input
                    name="confirm_password"
                    onChange={handleOnChange}
                    placeholder="Xác nhận mật khẩu mới"
                    type="password"

                    style={{ marginBottom: '10px' }}

                />
            </Row>
            <Button style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', background: 'cornflowerblue', color: 'white', borderRadius: '20px' }} onClick={submit}>Đổi mật khẩu</Button>
            <ToastContainer />
        </Container>
    )
}
