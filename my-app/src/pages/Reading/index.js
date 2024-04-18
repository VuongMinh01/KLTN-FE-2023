import { Space, Table, Typography, Button, Col, Drawer, Form, Row, Select, Modal, Segmented } from "antd";
import React, { useState, useEffect } from "react";
import { deleteTest, getAllTestReading, addQuestion } from "../../utils/APIRoutes";
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
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [values, setValues] = useState({
        num_quest: "",
        content: "",
        description: "",
        test_id: "",
        answers: [],
        score: "",
        correct_at: [],
    });

    const [answers, setAnswers] = useState({
        order_answer: [],
        content_answer: [],
    })
    const [correctat, setCorrectat] = useState({
        order_answer: "",
        content_answer: "",
    })
    const handleAnswers = async (e) => {
        setAnswers({ ...answers, [e.target.name]: e.target.value })

    }
    const handleCorrectat = async (e) => {
        setCorrectat({ ...correctat, [e.target.name]: e.target.value })
    }
    // Modal
    const showModal = async (e) => {
        setIsModalOpen(true);
        setTestId(e._id);
        setLoading(true);
        console.log(testId, '3232')
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
            setDataSource(response.data.result.tests);
        });

    }
    const handleOnChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });

    }

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
    const updateTable = (data) => {
        setDataSource(previousState => {
            setLoading(false)
            return previousState
        });
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
    const [image, setImage] = useState(null);
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    const onDeleteService = async (e) => {
        console.log(e._id, '1');
        console.log(e.source_id, '2');
        // const test_id = e._id;
        // const source_id = e.source_id;
        axios.delete(deleteTest, {
            data: {
                test_id: e._id, source_id: e.source_id
            }
        }, config).then((res) => console.log(res.data))
        setLoading(true)
        updateTable();
        console.log('deleted');
    }
    const handleAddQuestion = async (e) => {
        e.preventDefault();
        const { num_quest, content, description, test_id, answers: [], correct_at, score } = values;
        const { data } = await axios.post(addQuestion, {
            num_quest, content, description, test_id, answers: [], correct_at, score
        }, config)
    }
    const [testId, setTestId] = useState('');



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
                            title: "Mã courses",
                            dataIndex: "source_id",
                        },
                        {
                            key: "6",
                            title: "Actions",

                            render: (record) => {
                                return (
                                    <div>

                                        <PlusOutlined onClick={() => showModal(record)}
                                        />

                                        <DeleteOutlined onClick={() => onDeleteService(record)} style={{ color: "red", marginLeft: "12px" }} />
                                    </div>
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
                                    onChange={handleOnChange}
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
                                    onChange={handleOnChange}
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
                                <Input
                                    onChange={handleOnChange}
                                    name="content"
                                    placeholder="Nhập content câu hỏi"
                                />

                            </Form.Item>
                            <Col span={24} >

                                <label>Image:</label>
                                <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>

                                    <input type="file" onChange={onImageChange} className="filetype" style={{ marginBottom: '10px' }} />
                                    <img alt="preview " src={image} style={{ width: 300 }} />
                                </div>
                            </Col>
                        </Col>
                        <Col span={24} style={{ padding: '10px' }}>

                            <label>Answers:</label> <br />
                            {/* answers gửi order va content , gửi cả 4 */}
                            {/* correct gửi 1 */}
                            {/* 
                            // Khi radio button đc chọn, set correct at order_answer , content_answer ??
                            // answer gửi thẳng 4 order_answer , content_answer gửi input 
                            */}
                            <div name="answers">


                                <div className="divQuestion" >
                                    <input type="radio" id="A" name="order_answer" value="A" onSelect={handleCorrectat} on />
                                    <input className="inputArea" type="text" name="content_answer" onChange={handleAnswers} />
                                </div>
                                <div className="divQuestion">

                                    <input type="radio" id="B" name="order_answer" value="B" />
                                    <input className="inputArea" type="text" name="content_answer" onChange={handleAnswers} />
                                </div>

                                <div className="divQuestion">

                                    <input type="radio" id="C" name="order_answer" value="C" />
                                    <input className="inputArea" type="text" name="content_answer" onChange={handleAnswers} />
                                </div>
                                <div className="divQuestion">
                                    <input type="radio" id="D" name="order_answer" value="D" />
                                    <input className="inputArea" type="text" name="content_answer" onChange={handleAnswers} />
                                </div>
                            </div>
                        </Col>
                        <Col span={24} >
                            <label>Correct Answer</label> <br />
                            <input onChange={handleOnChange} type='text' name='correct_at' placeholder="Nhập kết quả đúng"></input>
                        </Col>
                        <Col span={24} >
                            <label>Score</label> <br />
                            <input onChange={handleOnChange} type='text' name='score' placeholder="Nhập điểm câu hỏi"></input>
                        </Col>

                    </Row>

                </Form>


            </Modal>
        </div >
    )
}