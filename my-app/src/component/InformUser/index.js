import React from "react";
import axios from "axios";
import { getUser, updateUser } from "../../utils/APIRoutes";
import { useState, useEffect } from "react";
import { Input, DatePicker, Button, Image } from "antd";
import { ToastContainer, toast } from 'react-toastify';

import moment from 'moment';

export default function InformUser() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        date_of_birth: "",
        location: "",
        username: "",
        avatar: "",
        cover_photo: "null",
    });
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

    useEffect(() => {
        // Fetch user data when the component mounts
        axios.get(getUser, { headers })
            .then(response => {
                const userDataFromApi = response.data.result;
                setUserData(userDataFromApi);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleDateChange = (date, dateString) => {
        setUserData(prevData => ({
            ...prevData,
            date_of_birth: dateString
        }));
    };
    const handleValidation = () => {
        const { name, date_of_birth, location, username, avatar, cover_photo } = userData;
        const dob = new Date(date_of_birth);
        const currentDate = new Date();

        // Compare dob with current date

        if (name === "") {
            toast.error("Họ tên không được để trống", toastOptions);
            return false;
        }
        else if (name.length < 3) {
            toast.error("Họ tên không được ít hơn 3 ký tự", toastOptions);
            return false;
        }
        else if (date_of_birth === "") {
            toast.error("Ngày sinh không được để trống", toastOptions);
            return false;
        }
        if (dob > currentDate) {
            toast.error("Ngày sinh không thể ở tương lai", toastOptions);
            return false;
        }
        if (dob > currentDate) {
            toast.error("Ngày sinh không thể ở tương lai", toastOptions);
            return false;
        }
        else if (location === "") {
            toast.error("Nơi ở không được để trống", toastOptions);
            return false;
        }
        else if (username === "") {
            toast.error("Username không được để trống", toastOptions);
            return false;
        }
        else if (avatar === "") {
            toast.error("Avatar không được để trống.", toastOptions);
            return false;
        }
        else if (cover_photo === "") {
            toast.error("Cover photo không được để trống.", toastOptions);
            return false;
        }
        return true;
    };

    const handleSubmit = () => {
        // Make a request to update user information
        if (handleValidation()) {

            axios.patch(updateUser, userData, { headers })
                .then(response => {
                    console.log('User information updated successfully:', response.data);
                    // Optionally, you can show a success message or perform other actions
                })
                .catch(error => {
                    console.error('Error updating user information:', error);
                    // Optionally, you can show an error message or perform error handling
                    toast.error('Username đã tồn tại. Vui lòng thay đổi')
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
        <div>
            <h1 style={{ color: 'cornflowerblue' }}>Trang cá nhân</h1>
            <div>
                <Image width={400} src={userData.avatar} />

            </div>
            <div>
                <label>Tên người dùng:</label>
                <Input name="name" value={userData.name} onChange={handleChange} />
            </div>
            <div>
                <label>Email người dùng:</label>
                <Input type="email" name="email" value={userData.email} disabled />
            </div>
            <div style={{ padding: '10px' }}>
                <label style={{ marginRight: '10px' }}>Ngày sinh:</label>
                <DatePicker value={userData.date_of_birth ? moment(userData.date_of_birth, 'YYYY-MM-DD') : null} onChange={handleDateChange} />
            </div>
            <div>
                <label>Nơi ở:</label>
                <Input name="location" value={userData.location} onChange={handleChange} />
            </div>
            <div>
                <label>Username:</label>
                <Input name="username" value={userData.username} onChange={handleChange} />
            </div>
            <div>
                <label>Avatar:</label>
                <Input name="avatar" value={userData.avatar} onChange={handleChange} />
            </div>
            <div>
                <label>Cover Photo:</label>
                <Input name="cover_photo" value={userData.cover_photo} onChange={handleChange} />
            </div>
            <Button style={{ background: 'cornflowerblue', marginTop: '10px', borderRadius: '20px', color: 'white' }} onClick={handleSubmit}>Lưu</Button>
            <ToastContainer />
        </div>
    );
}