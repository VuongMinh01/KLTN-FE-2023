import { Space, Table, Typography, Button, Col, Drawer, Form, Row, Select, Modal, Segmented } from "antd";
import React, { useState, useEffect } from "react";
import { getAllTestReading } from "../../utils/APIRoutes";
import Input from "antd/es/input/Input";
import axios from "axios";
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import '../../css/Reading.css'
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
    // const showDrawer = () => {
    //     // Navigate('/admin/minitest/add')
    //     setOpen(true);

    // };
    // const onClose = () => {
    //     setOpen(false);
    // };
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
    const [image, setImage] = useState(null);
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    return (
        <div>
            <Space size={20} direction={"vertical"}>

                <Typography.Title level={4}>Danh sách bài Test</Typography.Title>



                {/* Table thông tin khách hàng */}
                <Table
                    scroll={{ y: 'max-content', x: 'max-content' }}
                    columns={[
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
                                    <div>

                                        <PlusOutlined
                                            style={{ marginRight: '5px' }}
                                            onClick={showModal}
                                        />

                                        <DeleteOutlined
                                            style={{ marginLeft: '5px' }}

                                        />
                                    </div>
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
                <Form  >
                    <Row vertical>
                        <Col span={24} >
                            <Form.Item
                                label="Num quest"
                                rules={[{ required: true, message: 'Num quest không được để trống' }]}
                            >
                                <Input

                                    name="num_quest"
                                    placeholder="Nhập num quest" />
                            </Form.Item>
                        </Col>

                        <Col span={24} >
                            <Form.Item

                                label="Mô tả"
                                rules={[{ required: true, message: 'Mô tả không được để trống' }]}
                            >
                                <Input
                                    name="description"
                                    placeholder="Mô tả" />
                            </Form.Item>
                        </Col>
                        <Col span={24} >
                            <Form.Item

                                label="Content"
                                rules={[{ required: true, message: 'Content không được để trống' }]}
                            >
                                <Input
                                    name="content"
                                    placeholder="Nhập content câu hỏi"
                                />
                            </Form.Item>
                        </Col>
                        <Col style={{ padding: '10px' }}>
                            <label>Question:</label> <br />
                            <div className="divQuestion">
                                <input type="radio" id="A" name="order_answer" value="A" />
                                <input className="inputArea" type="text" name="content_answer" />
                            </div>
                            <div className="divQuestion">

                                <input type="radio" id="B" name="order_answer" value="B" />
                                <input className="inputArea" type="text" name="content_answer" />
                            </div>

                            <div className="divQuestion">

                                <input type="radio" id="C" name="order_answer" value="C" />
                                <input className="inputArea" type="text" name="content_answer" />
                            </div>
                            <div className="divQuestion">
                                <input type="radio" id="D" name="order_answer" value="D" />
                                <input className="inputArea" type="text" name="content_answer" />
                            </div>
                        </Col>
                        <Col span={24} >

                            <label>Image:</label>
                            <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>

                                <input type="file" onChange={onImageChange} className="filetype" style={{ marginBottom: '10px' }} />
                                <img alt="preview " src={image} style={{ width: 300 }} />
                            </div>
                        </Col>
                    </Row>

                </Form>


            </Modal>
        </div>
    )
}