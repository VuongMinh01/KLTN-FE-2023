import { Space, Table, Typography, Button, Col, Drawer, Form, Row, Select, Modal, Segmented } from "antd";
import React, { useState, useEffect } from "react";
import { getAllTestListening, deleteTest, addQuestion } from "../../utils/APIRoutes";
import Input from "antd/es/input/Input";
import axios from "axios";
import { PlusOutlined, DeleteOutlined, InfoOutlined } from '@ant-design/icons';

import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useNavigate } from "react-router-dom";
const { TextArea } = Input;

export default function Listening() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [values, setValues] = useState({
        num_quest: 0,
        content: "",
        description: "",
        test_id: "",
        score: 0,
        answers: [],
        correct_at: {},
    });

    // const [search, setSearch] = useState();
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalQuestionOpen, setIsModalQuestionOpen] = useState(false);

    // Modal
    const showModal = () => {
        setIsModalOpen(true);
    };

    const showModalQuestion = (record) => {
        setIsModalQuestionOpen(true);
    }
    const handleQuestionCancel = () => {
        setIsModalQuestionOpen(false);
    }

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

    const clickButton = (e) => {
        setValues({ ...values, correct_at: values['answers'].find(item => item.order_answer == e.target.value) })
        console.log(values, 'duoi');
    }

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


    const handleOnChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleOnChangeNumber = (e) => {
        setValues({ ...values, [e.target.name]: parseInt(e.target.value) });

    }

    const token = localStorage.getItem("user").replace(/"/g, '');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    const updateTable = (data) => {
        setDataSource(previousState => {
            setLoading(false)
            return previousState
        });
    }


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

    const handleAddQuestion = async (e) => {
        e.preventDefault();
        values['answers'] = [{
            order_answer: "A",
            content_answer: values.content_answer_1,
        }, {
            order_answer: "B",
            content_answer: values.content_answer_2,
        }, {
            order_answer: "C",
            content_answer: values.content_answer_3,
        }, {
            order_answer: "D",
            content_answer: values.content_answer_4,
        }]

        try {
            const { data } = await axios.post(addQuestion, {
                ...values
            }, { headers })
            setIsModalOpen(false);

        } catch (error) {
            console.log(error);
        }

    }

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
    const onDeleteService = async (e) => {

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

                <Typography.Title level={4}>Danh sách bài Listening Test</Typography.Title>

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
                open={isModalOpen} onOk={handleAddQuestion} onCancel={handleCancel}
            >
                <Form  >
                    <Row vertical>
                        <Col span={12}>
                            <Form.Item
                                label="Mã bài thi"
                                rules={[{ required: true, message: 'Mã bài thi không được để trống' }]}
                            >
                                <Input
                                    type="text"
                                    onChange={(e) => handleOnChange(e)}
                                    // value={testId}
                                    name="test_id"
                                    placeholder="Nhập mã test" />
                            </Form.Item>
                        </Col>
                        <Col span={24} >
                            <Form.Item
                                label="Num quest"
                                rules={[{ required: true, message: 'Num quest không được để trống' }]}
                            >
                                <Input
                                    onChange={handleOnChangeNumber}
                                    name="num_quest"
                                    placeholder="Nhập num quest" />
                            </Form.Item>
                        </Col>

                        <Col span={24} >
                            <Form.Item

                                label="Mô tả"
                                rules={[{ required: true, message: 'Mô tả không được để trống' }]}
                            >
                                <TextArea rows={4}
                                    onChange={handleOnChange}
                                    name="description"
                                    placeholder="Mô tả" />
                            </Form.Item>
                        </Col>
                        <Col span={24} >
                            <Form.Item

                                label="Content"
                                rules={[{ required: true, message: 'Content không được để trống' }]}
                            >
                                <TextArea rows={4}
                                    onChange={handleOnChange}
                                    name="content"
                                    placeholder="Nhập content câu hỏi"
                                />

                            </Form.Item>
                        </Col>
                        <Col style={{ padding: '10px' }}>
                            <label>Question:</label> <br />
                            <div className="divQuestion" >
                                <input type="radio" id="A" onClick={clickButton} name="order_answer" value="A" />
                                <input onChange={handleOnChange} className="inputArea" type="text" name="content_answer_1" />
                            </div>
                            <div className="divQuestion">

                                <input type="radio" onClick={clickButton} id="B" name="order_answer" value="B" />
                                <input onChange={handleOnChange} className="inputArea" type="text" name="content_answer_2" />
                            </div>

                            <div className="divQuestion">

                                <input type="radio" onClick={clickButton} id="C" name="order_answer" value="C" />
                                <input onChange={handleOnChange} className="inputArea" type="text" name="content_answer_3" />
                            </div>
                            <div className="divQuestion">
                                <input type="radio" onClick={clickButton} id="D" name="order_answer" value="D" />
                                <input onChange={handleOnChange} className="inputArea" type="text" name="content_answer_4" />
                            </div>
                        </Col>
                        <Col span={24} >

                            <label>Audio:</label>
                            <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>

                                <input name='audio' type="file" onChange={onAudioChange} className="filetype" style={{ marginBottom: '10px' }} />
                                <audio controls="true" src={audio} ></audio>
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