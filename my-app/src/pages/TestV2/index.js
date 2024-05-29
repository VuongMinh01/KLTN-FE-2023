import { Space, Table, Typography, Button, Col, Drawer, Form, Row, Select, Modal, Image } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { updateTestV2, createTest, getListTest, deleteTests, getTestDetailForDelete, deleteQuestionFromTests } from "../../utils/APIRoutes";
import Input from "antd/es/input/Input";
import axios from "axios";
import { PlusOutlined, DeleteOutlined, EditOutlined, InfoOutlined } from '@ant-design/icons';

import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useNavigate } from "react-router-dom";

export default function TestV2() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);
    const [questionList, setQuestionList] = useState([]); // State variable to store the question list
    const [dataSource, setDataSource] = useState([])
    const [values, setValues] = useState({
        title: "",
        description: "",
        timeline: "",
    })
    // const [search, setSearch] = useState();
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalQuestionOpen, setIsModalQuestionOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const [currentTestId, setCurrentTestId] = useState(null);




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

    const getAllTests = async () => {
        try {
            setLoading(true);

            // Ensure the URL for the axios GET request is defined correctly
            const response = await axios.get(getListTest, {
                params: {
                    limit: 20,
                    page: 1,
                },
                headers: { ...headers }
            });

            const rawData = response.data.result.tests;

            // Check if rawData is an array before proceeding
            if (!Array.isArray(rawData)) {
                throw new Error("Expected an array but got something else");
            }

            setDataSource(rawData);
            setError(null); // Reset any previous errors
        } catch (error) {
            console.error("There was an error fetching the tests:", error);
            setError("Failed to fetch tests");
            toast.error("Failed to fetch tests", toastOptions);
        } finally {
            setLoading(false);
        }
    };

    // Call the function to load data initially
    useEffect(() => {
        getAllTests();
    }, []);

    const showModalAdd = () => {
        setIsModalAddOpen(true);
    }

    const handleCancel = () => {
        setIsModalAddOpen(false);
    }
    const showModalUpdate = (record) => {
        setValues({
            ...values,
            test_id: record._id,
            title: record.title,
            description: record.description,
            timeline: record.timeline
        });
        console.log(record._id);
        setIsModalUpdateOpen(true);
    }

    const handleCancelUpdate = () => {
        setIsModalUpdateOpen(false);
    }
    const showModalQuestion = async (testId) => {
        setCurrentTestId(testId);
        setIsModalQuestionOpen(true);
        await fetchQuestionList(testId);

    };


    const updateTable = (data) => {
        setDataSource(previousState => {
            // previousState.push(data);
            setLoading(false)
            return previousState
        });
    }

    // Valid khi thêm
    const handleValidation = () => {
        const { title, description, timeline } = values;

        if (title.length === "") {
            toast.error("Tên tiêu đề không được để trống", toastOptions);
            return false;
        }
        else if (title.length < 5) {
            toast.error("Tên tiêu đề không được ít hơn 5 ký tự", toastOptions);
            return false;
        }
        else if (description.length === "") {
            toast.error("Mô tả không được để trống", toastOptions);
            return false;
        }

        else if (description.length < 5) {
            toast.error("Mô tả phải lớn hơn 5 ký tự", toastOptions);
            return false;
        }
        else if (timeline === null || timeline === 0 || isNaN(timeline) || timeline === "") {
            toast.error("Timeline không được để trống và phải là số", toastOptions);
            return false;
        }
        return true;
    }
    const handleAddTest = async (e) => {
        e.preventDefault();

        if (handleValidation()) {
            try {
                const { title, description, timeline } = values;
                const response = await axios.post(createTest, {
                    title,
                    description,
                    timeline
                }, { headers });

                if (response.status === 200) {
                    toast.success('Thêm Test thành công.');
                    // Reset form or perform any other necessary actions
                } else {
                    toast.error('Failed to create test');
                }
            } catch (error) {
                console.error('Error creating test:', error);
                toast.error('Xảy ra lỗi trong lúc thêm.');
            }
        }
    };
    const handleUpdateTest = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            try {
                const { test_id, title, description, timeline } = values;
                const response = await axios.patch(updateTestV2, {
                    test_id,
                    title,
                    description,
                    timeline
                }, { headers });

                if (response.status === 200) {
                    toast.success('Cập nhật test thành công');
                    // Reset form or perform any other necessary actions
                } else {
                    toast.error('Có lỗi trong việc cập nhật');
                }
            } catch (error) {
                console.error('Error creating test:', error);
                toast.error('Xảy ra lỗi trong lúc cập nhật');
            }
        }
        updateTable();
        setIsModalUpdateOpen(false);
    };


    const onDeleteTest = async (e) => {
        try {
            setLoading(true); // Set loading state to true
            console.log(e._id, '1');

            await axios.delete(deleteTests, {
                data: {
                    test_id: e._id
                },
                headers
            });

            // Remove the deleted question from the data source
            setDataSource(dataSource.filter(test => test._id !== e._id));

            console.log('deleted');
            toast.success('Xoá thành công', toastOptions);
        } catch (error) {
            console.error("Error deleting question:", error);
            toast.error('Failed to delete question', toastOptions);
        } finally {
            setLoading(false); // Ensure loading state is reset
        }
    };


    function showToast(message) {
        alert(message);
    }
    // css thông báo
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        draggable: true,
        pauseOnHover: true,
        theme: "dark"
    };

    const fetchQuestionList = async (testId) => {
        try {
            const response = await axios.get(getTestDetailForDelete.replace(":test_id", testId), {
                params: {
                    limit: 10,
                    page: 1,
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            // Extract items from all questions
            const allItems = response.data.result.questions.flatMap(question => question.items);

            // Set the questionList state to allItems
            setQuestionList(allItems);

            // Log details of the first item for debugging
            console.log(allItems[0]);

        } catch (error) {
            console.error("Error fetching question list:", error);
        }
    };

    const onDeleteQuestion = async (question, testId) => {
        try {
            console.log(question._id, '1');

            await axios.delete(deleteQuestionFromTests, {
                data: {
                    test_id: testId,
                    question_id: question._id
                },
                headers
            });
            // Remove the deleted question from the data source
            setQuestionList(questionList.filter(q => q._id !== question._id));

            setLoading(false);
            console.log('deleted');
            toast.success('Xoá thành công', toastOptions);
        } catch (error) {
            console.error("Error deleting question:", error);
            setLoading(false);
            showToast('Failed to delete question');
        }
    };


    return (
        <div>
            <Space size={20} direction={"vertical"}>

                <Typography.Title level={4}>Danh sách bài kiểm tra</Typography.Title>

                <Space>
                    <Button
                        style={{ margin: '10px 10px 10px 10px' }}
                        type="primary"
                        onClick={showModalAdd} >
                        Thêm Khoá học
                    </Button>

                </Space>

                {/* Table thông tin khách hàng */}
                <Table
                    scroll={{ y: 'max-content', x: 'max-content' }}
                    columns={[
                        {
                            key: '1',
                            title: "Mã bài kiểm tra",
                            dataIndex: "_id",
                        },
                        {
                            key: '2',
                            title: "Tiêu dề",
                            dataIndex: "title",

                        },
                        {
                            key: '3',
                            title: "Mô tả",
                            dataIndex: "description",
                        },
                        {
                            key: '4',
                            title: "Thời gian",
                            dataIndex: "timeline",
                        },
                        {
                            key: '5',
                            title: "Actions",
                            render: (record) => {
                                return (
                                    <div>

                                        <DeleteOutlined
                                            onClick={() => {
                                                if (window.confirm("Are you sure you want to delete this test?")) {
                                                    onDeleteTest(record);
                                                }
                                            }}
                                            style={{ color: "red", marginLeft: "12px" }}
                                        />
                                        <InfoOutlined onClick={() => showModalQuestion(record._id)} style={{ color: "green", marginLeft: "12px" }} />
                                        <EditOutlined onClick={() => showModalUpdate(record)} style={{ color: "green", marginLeft: "15px" }} />
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
            <Modal
                width={900}
                title="Thông tin chi tiết"
                open={isModalAddOpen} onOk={handleAddTest} onCancel={handleCancel}
            >
                <Form>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label="Title"
                                rules={[{ required: true, message: 'Title không được để trống' }]}
                            >
                                <Input
                                    onChange={handleOnChange}
                                    name="title"
                                    type="text"
                                    placeholder="Nhập tiêu đề"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Description"
                                rules={[{ required: true, message: 'Descriptionkhông được để trống' }]}
                            >
                                <Input
                                    onChange={handleOnChange}
                                    name="description"
                                    type="text"
                                    placeholder="Nhập mô tả"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Timeline"
                                rules={[{ required: true, message: 'Timeline không được để trống' }]}
                            >
                                <Input
                                    onChange={handleOnChangeNumber}
                                    name="timeline"
                                    type="number"
                                    placeholder="Nhập thời gian làm bài"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>

            <Modal
                width={1500}
                title="Thông tin chi tiết"
                open={isModalQuestionOpen}
                onCancel={() => setIsModalQuestionOpen(false)}
                footer={null}
            >
                <Table
                    scroll={{ y: 'max-content' }}
                    columns={[
                        {
                            key: '1',
                            title: "Mã câu hỏi",
                            dataIndex: "_id",
                        },

                        {
                            key: '2',
                            title: "Loại câu",
                            dataIndex: "type",

                        },
                        {
                            key: '3',
                            title: "Num part",
                            dataIndex: "num_part",
                        },
                        {
                            key: '4',
                            title: "Mô tả",
                            dataIndex: "description",
                        },
                        {
                            key: '5',
                            title: "Tiêu đề",
                            dataIndex: "content",
                        },
                        {
                            key: '6',
                            title: "Ảnh",
                            dataIndex: "image_content",
                            render: (imageContent) => (
                                <Image src={imageContent} width={100} />
                            )
                        }
                        ,
                        {
                            key: '7',
                            title: "Âm thanh",
                            dataIndex: "audio_content",
                        },
                        {
                            key: "8",
                            title: "Actions",

                            render: (record) => {
                                return (
                                    <div>
                                        <DeleteOutlined
                                            onClick={() => {
                                                if (window.confirm("Bạn có xác nhận xoá câu hỏi này không?")) {
                                                    onDeleteQuestion(record, currentTestId); // Pass both the question object and the currentTestId
                                                }
                                            }}
                                            style={{ color: "red", marginLeft: "12px" }}
                                        />

                                    </div>
                                )
                            }
                        },
                    ]}
                    dataSource={questionList}
                    rowKey="_id"
                    pagination={
                        {
                            pageSize: 10,
                        }
                    }
                ></Table>

            </Modal>
            <Modal
                width={900}
                title="Thông tin chi tiết"
                open={isModalUpdateOpen} onOk={handleUpdateTest} onCancel={handleCancelUpdate}
            >
                <Form>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label="Mã bài test"
                                rules={[{ required: true, message: 'Id không được để trống' }]}
                            >
                                <Input
                                    onChange={handleOnChange}
                                    name="title"
                                    type="text"
                                    disabled
                                    value={values.test_id}
                                    placeholder="Nhập mẫ bài kiểm tra"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Nội dung"
                                rules={[{ required: true, message: 'Title không được để trống' }]}
                            >
                                <Input
                                    onChange={handleOnChange}
                                    name="title"
                                    type="text"
                                    value={values.title}
                                    placeholder="Nhập tiêu đề"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Mô tả"
                                rules={[{ required: true, message: 'Descriptionkhông được để trống' }]}
                            >
                                <Input
                                    onChange={handleOnChange}
                                    name="description"
                                    type="text"
                                    value={values.description}

                                    placeholder="Nhập mô tả"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Thời gian"
                                rules={[{ required: true, message: 'Timeline không được để trống' }]}
                            >
                                <Input
                                    onChange={handleOnChangeNumber}
                                    name="timeline"
                                    type="number"
                                    value={values.timeline}

                                    placeholder="Nhập thời gian làm bài"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <ToastContainer />
        </div>
    )
}