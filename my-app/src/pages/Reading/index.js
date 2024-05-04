import { Space, Table, Typography, Col, Form, Row, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { deleteTest, getAllTestReading, addQuestion } from "../../utils/APIRoutes";
import Input from "antd/es/input/Input";
import axios from "axios";
import { PlusOutlined, DeleteOutlined, InfoOutlined } from '@ant-design/icons';

import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import '../../css/Reading.css'
const { TextArea } = Input;

export default function Reading() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalQuestionOpen, setIsModalQuestionOpen] = useState(false);

    const [values, setValues] = useState({
        num_quest: 0,
        content: "",
        description: "",
        test_id: "",
        score: 0,
        answers: [],
        correct_at: {},
    });


    // Modal
    const showModal = (record) => {
        // console.log("Clicked record:", record);
        // // setTestId(record._id);
        // console.log(record._id, '3232')
        // setIsModalOpen(true);

        console.log("Clicked record:", record);
        setValues({
            ...values,
            test_id: record._id // Update the source_id in the valuesTest state
        });
        console.log(record._id, '333');
        setIsModalOpen(true);

    };
    const showModalQuestion = (record) => {
        setIsModalQuestionOpen(true);
    }
    const handleQuestionCancel = () => {
        setIsModalQuestionOpen(false);
    }
    useEffect(() => {
        setLoading(true);
        getAllTest();
    }, [loading]);
    // Load data from db

    const handleOnChangeNumber = (e) => {
        setValues({ ...values, [e.target.name]: parseInt(e.target.value) });

    }
    const getAllTest = () => {
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




    const clickButton = (e) => {
        // code anh Minh huong dan
        // // setValues({ ...values, correct_at: values['answers'].find(item => item.order_answer == e.target.value) })
        // // console.log(values, 'duoi');

        console.log("Clicked value:", e.target.value);
        // console.log("Current answers:", values['answers']);
        // const correctAnswer = values['answers'].find(item => item.order_answer === e.target.value);
        // console.log("Found correct answer:", correctAnswer);

        // setValues({ ...values, correct_at: correctAnswer });

        // console.log("Updated values:", values);

        const order_answer = e.target.value; // Get the value of the clicked radio button
        const content_answer = e.target.nextElementSibling.value; // Get the content of the answer corresponding to the clicked radio button

        // Update correct_at with the selected answer
        setValues({
            ...values,
            correct_at: {
                order_answer,
                content_answer
            }
        });

        console.log("Clicked value:", order_answer);
        console.log("Content of the answer:", content_answer);
    }

    const token = localStorage.getItem("user").replace(/"/g, '');

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
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




    return (

        <div>
            <Space size={20} direction={"vertical"}>

                <Typography.Title level={4}>Danh sách bài Reading Test</Typography.Title>



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
                                        <InfoOutlined onClick={() => showModalQuestion(record)} style={{ color: "green", marginLeft: "12px" }} />
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
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Mã bài thi"
                                rules={[{ required: true, message: 'Mã bài thi không được để trống' }]}
                            >
                                <Input
                                    // type="text"
                                    // onChange={(e) => handleOnChange(e)}
                                    // value={testId}
                                    // name="test_id"
                                    // placeholder="Nhập mã test" 
                                    onChange={(e) => handleOnChange(e)}
                                    type="text"
                                    value={values.test_id}
                                    name="test_id"
                                    placeholder="Nhập mã test"
                                />
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
                            <div>
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
                            </div>
                        </Col>

                        <Col span={24} >
                            <label>Score</label> <br />
                            <input onChange={handleOnChangeNumber} type='number' name='score' placeholder="Nhập điểm câu hỏi"></input>
                        </Col>

                    </Row>

                </Form>
            </Modal>
            <Modal
                width={900}
                title="Thông tin chi tiết"
                open={isModalQuestionOpen} onOk={''} onCancel={handleQuestionCancel}>

            </Modal>
        </div >
    )
}
