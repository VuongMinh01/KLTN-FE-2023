import { Space, Table, Typography, Button, Col, Drawer, Form, Row, Select, Modal, Segmented } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { getAllHocVien } from "../../utils/APIRoutes";
import Input from "antd/es/input/Input";
import axios from "axios";
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function HocVien() {
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])
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


    return (

        <Container>
            <Typography.Title level={4}>Danh sách courses</Typography.Title>

            <Table columns={[
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
        </Container>
    )
}