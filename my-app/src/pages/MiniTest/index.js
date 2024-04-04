import { Space, Table, Typography, Button, Col, Drawer, Form, Row, Select, Modal, Segmented } from "antd";
import React, { useState, useEffect } from "react";
import { addCustomer } from "../../utils/APIRoutes";
import Input from "antd/es/input/Input";
import axios from "axios";
import { PlusOutlined, InfoOutlined } from '@ant-design/icons';

import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useNavigate } from "react-router-dom";

export default function MiniTest() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const { Option } = Select;
    const [input, setInput] = useState('');
    const [values, setValues] = useState({
        source_id: "",
        title: "",
        description: "",
        timeline: "",
    })
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
    // Load data from db
    // useEffect(() => {
    //     setLoading(true);
    //     getAllCustomer().then((res) => {
    //         setDataSource(res.data);

    //     });
    // }, [loading]);


    const handleOnChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });

    }

    const token = localStorage.getItem("user").replace(/"/g, '');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    // axios.get(getUser
    //     ,
    //     config
    // ).then((response) => {
    //     const checkToken = response.data.result.name;
    //     console.log(checkToken);
    //     name1 = checkToken;
    //     console.log(response.data);
    // });

    //  Thêm khách hàng
    const handleClick = async (e) => {
        console.log(config);
        e.preventDefault();
        if (handleValidation()) {
            const { source_id, title, description, timeline } = values;
            const { data } = await axios.post(addCustomer, {
                source_id, title, description, timeline,

            }, config)
            if (data.status === false) {
                console.log("Thêm thất bại");
            }
            if (data.status === true) {
                setLoading(true)
                // updateTable(data.customer)
                console.log(dataSource);
                console.log("Thêm thành công");
                onClose();
            }
        }
    };
    // Modal button
    const handleOk = async () => {
        setIsModalOpen(false);

    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const updateTable = (data) => {
        setDataSource(previousState => {
            console.log(data);
            // previousState.push(data);
            console.log(previousState);
            setLoading(false)
            return previousState
        });
    }
    const handleRefresh = (e) => {
        updateTable();
        clearInput();
        console.log('refresh');
    }
    const clearInput = () => {
        setInput('');
    }
    // Tìm 
    // const handleSearch = async (e) => {
    //     const { data } = await axios.get(getCustomerById + '/' + search);
    //     let dataTemp = []
    //     dataTemp.push(data.resultCustomer)
    //     setDataSource(dataTemp);

    // }

    // const handleOnChangeSearch = (e) => {
    //     setSearch(e.target.value)
    // }

    // Valid khi thêm
    const handleValidation = () => {
        const { source_id, title, description, timeline } = values;
        if (source_id.length < 5 || source_id === "") {
            toast.error("Id phải lớn hơn 5 kí tự", toastOptions);
            return false;
        }
        else if (title.length < 5) {
            toast.error("Tên tiêu đề phải lớn hơn 5 kí tự", toastOptions);
            return false;
        }
        else if (description.length < 10) {
            toast.error("Mô tả phải lớn hơn 5 ký tự", toastOptions);
            return false;
        }
        else if (timeline === "") {
            toast.error("Timeline không được để trống", toastOptions);
            return false;
        }
        return true;
    }
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
                        dataIndex: "source_id",
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
                                    <InfoOutlined onClick={showModal}
                                    />
                                </>
                            )
                        }
                    },
                ]}
                    dataSource={dataSource}
                    pagination={
                        {
                            pageSize: 10,
                        }
                    }
                ></Table>
            </Space>
            <ToastContainer />

            {/* Thanh thêm khách hàng */}
            <Drawer
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
            </Drawer>
            {/* Thông tin chi tiết khách hàng */}
            <Modal
                width={900}
                title="Thông tin chi tiết"
                open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
            >
                <Space>
                    <Segmented options={['Thông tin chi tiết', 'Kho xe', 'Lịch sử mua']} />

                </Space>
            </Modal>
        </div>
    )
}