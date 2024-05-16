import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { changePassword, verifyPassword } from "../../utils/APIRoutes";
import { Button, Input } from "antd";
import { toast } from 'react-toastify';
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
    const submit = (e) => {
        e.preventDefault();
        axios.put(changePassword, values, { headers })
            .then(response => {
                // Clear input fields
                setValues({
                    old_password: '',
                    password: '',
                    confirm_password: ''
                });
                // Show success toast
                showToast('Password changed successfully');

            })
            .catch(error => {
                // Handle error if needed
                console.error('Error changing password:', error);
                // Optionally, show an error toast
                showToast('Có lỗi trong việc đổi mật khẩu');
            });
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
                    value={values.old_password}
                    onChange={handleOnChange}
                    placeholder="Nhập mật khẩu cũ"
                    style={{ marginBottom: '10px' }}
                />
                <Input
                    name="password"
                    value={values.password}
                    onChange={handleOnChange}
                    placeholder="Nhập mật khẩu mới"
                    style={{ marginBottom: '10px' }}

                />
                <Input
                    name="confirm_password"
                    value={values.confirm_password}
                    onChange={handleOnChange}
                    placeholder="Xác nhận mật khẩu mới"
                    style={{ marginBottom: '10px' }}

                />
            </Row>
            <Button style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', background: 'cornflowerblue', color: 'white', borderRadius: '20px' }} onClick={submit}>Đổi mật khẩu</Button>
        </Container>
    )
}
