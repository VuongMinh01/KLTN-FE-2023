import { Space, Table, Typography, Col, Form, Row, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { deleteTest, getAllTestListening } from "../../utils/APIRoutes";
import Input from "antd/es/input/Input";
import axios from "axios";
import { PlusOutlined, DeleteOutlined, InfoOutlined } from '@ant-design/icons';

import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useNavigate } from "react-router-dom";

export default function FullTest() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])


    // const [search, setSearch] = useState();
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalQuestionOpen, setIsModalQuestionOpen] = useState(false);


    const showModalQuestion = (record) => {
        setIsModalQuestionOpen(true);
    }
    const handleQuestionCancel = () => {
        setIsModalQuestionOpen(false);
    }

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
        axios.get(getAllTestListening, {
            params: {
                limit: 10,
                page: 1,
            }
        }).then((response) => {
            console.log(response.data.result.tests, '1');

            setDataSource(response.data.result.tests);


        });

    }
    const updateTable = (data) => {
        setDataSource(previousState => {
            setLoading(false)
            return previousState
        });
    }

    // const handleOnChange = (e) => {
    //     setValues({ ...values, [e.target.name]: e.target.value });

    // }

    const token = localStorage.getItem("user").replace(/"/g, '');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

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

    const [audio, setAudio] = useState();
    const onAudioChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setAudio(URL.createObjectURL(event.target.files[0]));
        }
    }
    const [image, setImage] = useState(null);
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }
    const onDeleteService = async (e) => {
        console.log(e._id, '1');
        console.log(e.source_id, '2');

        axios.delete(deleteTest, {
            data: {
                test_id: e._id, source_id: e.source_id
            }
            , headers
        }).then((res) => console.log(res.data))
        setLoading(true)
        updateTable();
        console.log('deleted');
    }
    return (
        <div>
            <Space size={20} direction={"vertical"}>

                <Typography.Title level={4}>Danh sách bài Full Test</Typography.Title>

                {/* Nút chức năng  */}

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
                            title: "Thời gian",
                            dataIndex: "timeline",
                        },
                        {
                            key: "5",
                            title: "Actions",
                            render: (record) => {
                                return (
                                    <>
                                        <PlusOutlined onClick={() => showModal(record)}
                                        />

                                        <DeleteOutlined onClick={() => onDeleteService(record)} style={{ color: "red", marginLeft: "12px" }} />
                                        <InfoOutlined onClick={() => showModalQuestion(record)} style={{ color: "green", marginLeft: "12px" }} />

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

                            <label>Audio:</label>
                            <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>

                                <input name='audio' type="file" onChange={onAudioChange} className="filetype" style={{ marginBottom: '10px' }} />
                                <audio controls="true" src={audio} ></audio>
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
            <Modal
                width={900}
                title="Thông tin chi tiết"
                open={isModalQuestionOpen} onOk={''} onCancel={handleQuestionCancel}>



            </Modal>
        </div>
    )
}