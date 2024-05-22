import { Space, Table, Typography, Col, Drawer, Form, Row, Select, Modal, Segmented } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { getAllHocVien, searchUser } from "../../utils/APIRoutes";
import Input from "antd/es/input/Input";
import axios from "axios";
import { InfoOutlined } from '@ant-design/icons';

import { Container } from "react-bootstrap";
import { DatePicker, Button, Image } from "antd";
import moment from 'moment';
import { limit } from "firebase/firestore";

export default function HocVien() {
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);

    const token = localStorage.getItem("user").replace(/"/g, '');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    const getAllHocVien1 = () => {
        axios.get(getAllHocVien, {
            params: {
                page: 1,
                limit: 10
            }, headers
        }).then((response) => {
            console.log(response.data.result, '1');
            setDataSource(response.data.result.users);
        });
    }
    useEffect(() => {
        setLoading(true);
        getAllHocVien1();
    }, [loading]);
    const updateTable = (data) => {
        setDataSource(previousState => {
            // previousState.push(data);
            setLoading(false)
            return previousState
        });
    }


        ; const [userData, setUserData] = useState({
            name: "",
            email: "",
            date_of_birth: "",
            location: "",
            username: "",
            avatar: "",
            cover_photo: ""
        });

    const showModal = (username) => {
        // Fetch user data using the username
        axios.get(`${searchUser}`, {
            params: {
                name_email: username, // Use the username as the parameter
                limit: 1, // Limit to 1 result since you're expecting a single user
                page: 1 // Assuming you always want the first page of results
            },
            headers: headers
        })
            .then(response => {
                const userDataFromApi = response.data.result.users[0]; // Assuming username is unique, so we take the first user
                setUserData(userDataFromApi);
                setIsModalOpen(true); // Open the modal after fetching user data
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    };



    return (

        <Container fluid>
            <Typography.Title level={4}>Danh sách học viên</Typography.Title>

            <Table


                columns={[
                    {
                        key: '1',
                        title: "Id",
                        dataIndex: "_id",
                    },
                    {
                        key: '2',
                        title: "Tên",
                        dataIndex: "name",

                    },

                    {
                        key: '3',
                        title: "Email",
                        dataIndex: "email",
                    },
                    {
                        key: '3',
                        title: "Xác nhận tài khoản",
                        dataIndex: "verify",
                        render: (verify) => {
                            return verify === 0 ? 'No' : 'Yes';
                        },
                    },
                    {
                        key: '4',
                        title: "Actions",
                        render: (record) => {
                            return (
                                <>
                                    <InfoOutlined onClick={() => showModal(record.username)} style={{ color: "green", marginLeft: "12px" }} />


                                </>
                            )
                        }
                    },
                ]}
                dataSource={dataSource}
                rowKey="_id"
                pagination={
                    {
                        pageSize: 10,
                    }
                }
            ></Table>
            <Modal
                width={900}
                title="Thông tin chi tiết"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}>
                <h1>Thông tin học viên</h1>
                <div>
                    <label>Avatar:</label>
                    {userData.avatar ? (
                        <Image name="avatar" src={userData.avatar} disabled />
                    ) : (
                        <img
                            src={`https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg`}
                            alt="Random Avatar"
                            style={{ borderRadius: '50%', width: '150px', height: '150px' }}
                        />
                    )}
                </div>
                <div>
                    <label>Tên người dùng:</label>
                    <Input name="name" value={userData.name} disabled />
                </div>
                <div>
                    <label>Email người dùng:</label>
                    <Input type="email" name="email" value={userData.email} disabled />
                </div>
                <div style={{ padding: '10px' }}>
                    <label style={{ marginRight: '10px' }}>Ngày sinh:</label>
                    <DatePicker value={userData.date_of_birth ? moment(userData.date_of_birth, 'YYYY-MM-DD') : null} disabled />
                </div>
                <div>
                    <label>Nơi ở:</label>
                    <Input name="location" value={userData.location} disabled />
                </div>
                <div>
                    <label>Username:</label>
                    <Input name="username" value={userData.username} disabled />
                </div>
                <div>
                    <label>Avatar:</label>
                    <Input name="avatar" value={userData.avatar} disabled />
                </div>
                <div>
                    <label>Cover Photo:</label>
                    <Input name="cover_photo" value={userData.cover_photo} disabled />
                </div>
            </Modal>
        </Container>
    )
}