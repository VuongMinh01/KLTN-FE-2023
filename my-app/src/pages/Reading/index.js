import { Space, Table, Typography, Button, Col, Drawer, Form, Row, Select, Modal, Segmented } from "antd";
import React, { useState, useEffect } from "react";
import { addCustomer, getAllTestReading } from "../../utils/APIRoutes";
import Input from "antd/es/input/Input";
import axios from "axios";
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useNavigate } from "react-router-dom";

export default function Reading() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])


    // const [search, setSearch] = useState();
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Modal
    const showModal = () => {
        setIsModalOpen(true);
    };
    // Drawer
    const showDrawer = () => {
        // Navigate('/admin/minitest/add')
        setOpen(true);

    };
    const onClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        setLoading(true);
        getAllTest();
    }, [loading]);
    // Load data from db

    const getAllTest = () => {
        console.log('lan 1')
        axios.get(getAllTestReading, {
            params: {
                limit: 10,
                page: 1,
            }
        }).then((response) => {
            console.log(response.data.result.tests, '1');

            setDataSource(response.data.result.tests);


        });

    }


    // const handleOnChange = (e) => {
    //     setValues({ ...values, [e.target.name]: e.target.value });

    // }

    const token = localStorage.getItem("user").replace(/"/g, '');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };


    //  Thêm khách hàng
    // const handleClick = async (e) => {
    //     console.log(config);
    //     e.preventDefault();
    //     if (handleValidation()) {
    //         const { source_id, title, description, timeline } = values;
    //         const { data } = await axios.post(addCustomer, {
    //             source_id, title, description, timeline,

    //         }, config)
    //         if (data.status === false) {
    //             console.log("Thêm thất bại");
    //         }
    //         if (data.status === true) {
    //             setLoading(true)
    //             // updateTable(data.customer)
    //             console.log(dataSource);
    //             console.log("Thêm thành công");
    //             onClose();
    //         }
    //     }
    // };
    // Modal button
    const handleOk = async () => {
        setIsModalOpen(false);

    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }

    // const updateTable = (data) => {
    //     setDataSource(previousState => {
    //         console.log(data);
    //         // previousState.push(data);
    //         console.log(previousState);
    //         setLoading(false)
    //         return previousState
    //     });
    // }


    // Valid khi thêm
    // const handleValidation = () => {
    //     const { source_id, title, description, timeline } = values;
    //     if (source_id.length < 5 || source_id === "") {
    //         toast.error("Id phải lớn hơn 5 kí tự", toastOptions);
    //         return false;
    //     }
    //     else if (title.length < 5) {
    //         toast.error("Tên tiêu đề phải lớn hơn 5 kí tự", toastOptions);
    //         return false;
    //     }
    //     else if (description.length < 10) {
    //         toast.error("Mô tả phải lớn hơn 5 ký tự", toastOptions);
    //         return false;
    //     }
    //     else if (timeline === "") {
    //         toast.error("Timeline không được để trống", toastOptions);
    //         return false;
    //     }
    //     return true;
    // }
    // css thông báo
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        draggable: true,
        pauseOnHover: true,
        theme: "dark"
    };


    return (
        <div>
            <Space size={20} direction={"vertical"}>

                <Typography.Title level={4}>Danh sách bài Test</Typography.Title>

                {/* Nút chức năng  */}
                <Space>
                    <Button
                        type="primary"
                        onClick={showDrawer} icon={<PlusOutlined />}>
                        Thêm bài Test
                    </Button>



                </Space>

                {/* Table thông tin khách hàng */}
                <Table columns={[
                    {
                        key: "1",
                        title: "Mã bài test",
                        dataIndex: "_id",
                    },
                    {
                        key: "2",
                        title: "Tiêu dề",
                        dataIndex: "title",

                    },

                    {
                        key: "3",
                        title: "Mô tả",
                        dataIndex: "description",
                    },
                    {
                        key: "4",
                        title: "Thời gian làm bài",
                        dataIndex: "timeline",
                    },
                    {
                        key: "5",
                        title: "Actions",
                        render: () => {
                            return (
                                <>
                                    <PlusOutlined onClick={showModal}
                                    />
                                    <DeleteOutlined
                                    />
                                </>
                            )
                        }
                    },
                ]}
                    dataSource={dataSource}
                    rowKey="test_id"
                    pagination={
                        {
                            pageSize: 10,
                        }
                    }
                ></Table>
            </Space>
            <ToastContainer />

            {/* Thanh thêm khách hàng */}
            {/* <Drawer
                title="Create a new test"
                width={720}
                onClose={onClose}
                open={open}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Mã bài thi"
                                rules={[{ required: true, message: 'Mã bài thi không được để trống' }]}
                            >
                                <Input
                                    onChange={(e) => handleOnChange(e)}
                                    name="source_id"
                                    placeholder="Nhập mã bài thi" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item

                                label="Tiêu đề"
                                rules={[{ required: true, message: 'Tiêu đề không được để trống' }]}
                            >
                                <Input
                                    name="title"
                                    onChange={(e) => handleOnChange(e)}
                                    placeholder="Nhập tiêu đề" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item

                                label="Mô tả"
                                rules={[{ required: true, message: 'Mô tả không được để trống' }]}
                            >
                                <Input
                                    name="description"
                                    onChange={(e) => handleOnChange(e)}
                                    placeholder="Mô tả" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item

                                label="Thời gian"
                                rules={[{ required: true, message: 'Thời gian không được để trống' }]}
                            >
                                <Input
                                    name="timeline"
                                    onChange={(e) => handleOnChange(e)}
                                    placeholder="Nhập thời gian"
                                />
                            </Form.Item>
                        </Col>

                    </Row>



                </Form>
                <Space>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={(e) => handleClick(e)} type="primary">
                        Thêm
                    </Button>
                </Space>
            </Drawer> */}
            {/* Thông tin chi tiết khách hàng */}
            <Modal
                width={900}
                title="Thông tin chi tiết"
                open={isModalOpen} onOk={''} onCancel={handleCancel}
            >
                <Space>
                    <Form layout="verical">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Mã bài thi"
                                    rules={[{ required: true, message: 'Mã bài thi không được để trống' }]}
                                >
                                    <Input

                                        name="source_id"
                                        placeholder="Nhập mã bài thi" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item

                                    label="Title "
                                    rules={[{ required: true, message: 'Title không được để trống' }]}
                                >
                                    <Input
                                        name="title"
                                        placeholder="Nhập tiêu đề" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item

                                    label="Mô tả"
                                    rules={[{ required: true, message: 'Mô tả không được để trống' }]}
                                >
                                    <Input
                                        name="description"
                                        placeholder="Mô tả" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item

                                    label="Time line"
                                    rules={[{ required: true, message: 'Timeline không được để trống' }]}
                                >
                                    <Input
                                        name="timeline"
                                        placeholder="Nhập thời gian làm bài test"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>

                </Space>

            </Modal>
        </div>
    )
}