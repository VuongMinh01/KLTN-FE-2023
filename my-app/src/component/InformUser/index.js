import React from "react";
import axios from "axios";
import { getUser, updateUser } from "../../utils/APIRoutes";
import { useState, useEffect } from "react";
import { Input, DatePicker, Button } from "antd";
import moment from 'moment';

export default function InformUser() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        date_of_birth: "",
        location: "",
        username: "",
        avatar: "",
        cover_photo: ""
    });
    const token = localStorage.getItem("user").replace(/"/g, '');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
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

    const handleSubmit = () => {
        // Make a request to update user information
        axios.patch(updateUser, userData, { headers })
            .then(response => {
                console.log('User information updated successfully:', response.data);
                // Optionally, you can show a success message or perform other actions
            })
            .catch(error => {
                console.error('Error updating user information:', error);
                // Optionally, you can show an error message or perform error handling
            });
    };

    return (
        <div>
            <h1>User Profile</h1>
            <div>
                <label>Name:</label>
                <Input name="name" value={userData.name} onChange={handleChange} />
            </div>
            <div>
                <label>Email:</label>
                <Input type="email" name="email" value={userData.email} disabled />
            </div>
            <div>
                <label>Date of Birth:</label>
                <DatePicker value={userData.date_of_birth ? moment(userData.date_of_birth, 'YYYY-MM-DD') : null} onChange={handleDateChange} />
            </div>
            <div>
                <label>Location:</label>
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
            <Button onClick={handleSubmit}>Save Changes</Button>
        </div>
    );
}