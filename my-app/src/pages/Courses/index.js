import { Space, Table, Typography, Button, Col, Drawer, Form, Row, Select, Modal, Segmented } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { addCourses, getAllCourses, addTest, deleteCourses, updateCourses } from "../../utils/APIRoutes";
import Input from "antd/es/input/Input";
import axios from "axios";
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useNavigate } from "react-router-dom";

export default function Courses() {
    const [form] = Form.useForm();


    const [loading, setLoading] = useState(false)

    const handleOnChangeNumber = (e) => {
        setValues({ ...values, [e.target.name]: parseInt(e.target.value) });

    }
    const handleOnChangeNumberTest = (e) => {
        setValuesTest({ ...valuesTest, [e.target.name]: parseInt(e.target.value) });

    }
    useEffect(() => {
        setLoading(true);
        getAllCourses1();
    }, [loading]);


    const getAllCourses1 = () => {
        axios.get(getAllCourses, {
            params: {
                limit: 10,
                page: 1,
            }
        }).then((response) => {
            setDataSource(response.data.result.courses);
        });
    }

    const Navigate = useNavigate();
    const [dataSource, setDataSource] = useState([])
    const [values, setValues] = useState({
        type: "",
        title: "",
        description: "",
        content: "",
        thumbnails: [],
    })
    // const [search, setSearch] = useState();
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Drawer
    const showModalUpdate = (record) => {
        console.log("Clicked record:", record);
        setValues({
            ...values,
            type: record.type,
            course_id: record._id // Update the source_id in the valuesTest state
        });
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const handleOnChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });

    }

    const handleOnChangeTest = (e) => {
        setValuesTest({ ...valuesTest, [e.target.name]: e.target.value });

    }

    const token = localStorage.getItem("user").replace(/"/g, '');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    //  Thêm courses
    const handleClick = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { type, title, description, content } = values;
            const { data } = await axios.post(addCourses, {
                type, title, description, content, thumbnails: [],
            }, config)

            if (data.message === 'Validation error') {
                console.log("Thêm thất bại");
                toast.error(data.message, toastOptions);

            }
            if (data.message === 'Course created successfully') {
                setOpen(false);
                setLoading(true)
                form.resetFields();
                updateTable();
            }
        }
    };
    const handleUpdateCourses = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { type, title, description, content, course_id } = values;
            try {
                const { data } = await axios.patch(updateCourses, {
                    course_id,
                    type,
                    title,
                    description,
                    content,
                    thumbnails: []
                }, config);
                console.log("Course updated successfully:", data);
                // Handle success response
            } catch (error) {
                console.error("Error updating course:", error);
                // Handle error response
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
            // previousState.push(data);
            setLoading(false)
            return previousState
        });
    }

    // Valid khi thêm
    const handleValidation = () => {
        const { type, title, description, content } = values;
        if (type === "") {
            toast.error("Id phải lớn hơn 5 kí tự", toastOptions);
            return false;
        }
        else if (title.length === "") {
            toast.error("Tên tiêu đề phải lớn hơn 5 kí tự", toastOptions);
            return false;
        }
        else if (description.length === "") {
            toast.error("Mô tả phải lớn hơn 5 ký tự", toastOptions);
            return false;
        }
        else if (content === "") {
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

    const [valuesTest, setValuesTest] = useState({
        source_id: "",
        title: "",
        description: "",
        timeline: "",
    })

    const handleAddTestValidation = () => {
        const { source_id, title, description, timeline } = valuesTest;
        if (source_id === "" || source_id.length <= 5) {
            toast.error("Id phải lớn hơn 5 kí tự", toastOptions);
            return false;
        } else if (title === "" || title.length <= 5) {
            toast.error("Tên tiêu đề phải lớn hơn 5 kí tự", toastOptions);
            return false;
        } else if (description === "" || description.length <= 5) {
            toast.error("Mô tả phải lớn hơn 5 ký tự", toastOptions);
            return false;
        } else if (isNaN(timeline) || timeline === "") {
            toast.error("Timeline phải là một số và không được để trống", toastOptions);
            return false;
        }
        return true;
    };

    const handleAddTest = async (e) => {
        e.preventDefault();
        if (handleAddTestValidation()) { // Validate input values
            const { source_id, title, description, timeline } = valuesTest;

            // Send a POST request to add the test
            const { dataTest } = await axios.post(addTest, {
                source_id, title, description, timeline,
            }, config);

            if (dataTest === 'Test created successfully') {
                setLoading(true);
                console.log("Thêm thành công");
            }
            setIsModalOpen(false); // Close the modal after adding the test
            setLoading(false); // Ensure loading state is set to false in case of error


        };

    }


    const onDeleteService = async (e) => {
        await axios.delete(`${deleteCourses}/${e._id}`, config,
        )
        setLoading(true)
        updateTable();
        console.log('deleted');
    }


    const showModal = (record) => {

        console.log("Clicked record:", record);
        setValuesTest({
            ...valuesTest,
            source_id: record._id // Update the source_id in the valuesTest state
        });
        console.log(record._id, '333');
        setIsModalOpen(true);
    };

    return (
        <div>
            <Space size={20} direction={"vertical"}>

                <Typography.Title level={4}>Danh sách khoá học</Typography.Title>

                {/* Nút chức năng  */}
                {/* <Space>
                    <Button
                        type="primary"
                        onClick={showDrawer} icon={<PlusOutlined />}>
                        Thêm Khoá học
                    </Button>

                </Space> */}

                {/* Table thông tin khách hàng */}
                <Table columns={[
                    {
                        key: '1',
                        title: "Loại",
                        dataIndex: "type",
                        render: (type) => {
                            switch (type) {
                                case 0:
                                    return "Listening";
                                case 1:
                                    return "Reading";
                                case 2:
                                    return "Full Test";
                                default:
                                    return "Unknown";
                            }
                        },
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
                        title: "Content làm bài",
                        dataIndex: "content",
                    },
                    {
                        key: '5',
                        title: "Ảnh",
                        dataIndex: "thumbnails",
                    },
                    {
                        key: '6',
                        title: "Mã khoá học",
                        dataIndex: "_id",
                    },
                    {
                        key: '7',
                        title: "Actions",
                        render: (record) => {
                            return (
                                <>
                                    <PlusOutlined onClick={() => showModal(record)} />

                                    {/* <DeleteOutlined
                                        onClick={() => {
                                            if (window.confirm("Bạn có chắc muốn xoá khoá học này?")) {
                                                onDeleteService(record);
                                            }
                                        }}
                                        style={{ color: "red", marginLeft: "12px" }}
                                    /> */}
                                    {/* <EditOutlined onClick={() => showModalUpdate(record)} style={{ color: "green", marginLeft: "12px" }}
                                    /> */}
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
            </Space>
            <ToastContainer />
            <Modal
                title="Tạo khoá học mới"
                width={720}
                onCancel={onClose}
                onOk={handleUpdateCourses}
                open={open}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form layout="vertical"
                    form={form}>
                    <Row gutter={16}>
                        <Col span={12}>

                            <Form.Item
                                label="Mã khoá học"
                                rules={[{ required: true, message: 'Type không được để trống' }]}
                            >
                                <Input
                                    onChange={(e) => handleOnChangeNumber(e)}
                                    name="course_id"
                                    placeholder="Nhập loại khoá học"
                                    value={values.course_id}
                                    disabled
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Type"
                                rules={[{ required: true, message: 'Type không được để trống' }]}
                            >
                                <Input
                                    onChange={(e) => handleOnChangeNumber(e)}
                                    name="type"
                                    placeholder="Nhập loại khoá học"
                                    value={values.type}
                                    disabled
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item

                                label="Title "
                                rules={[{ required: true, message: 'Title không được để trống' }]}
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

                                label="Content"
                                rules={[{ required: true, message: 'Nội dung không được để trống' }]}
                            >
                                <Input
                                    name="content"
                                    onChange={(e) => handleOnChange(e)}
                                    placeholder="Nhập nôi dụng"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item

                                label="Thumbnails"
                                rules={[{ required: true, message: 'Ảnh' }]}
                            >
                                <Input
                                    name="thumbnails"
                                    onChange={(e) => handleOnChange(e)}
                                    placeholder="Nhập hình ảnh"
                                />
                            </Form.Item>
                        </Col>

                    </Row>



                </Form>

            </Modal>

            <Modal
                width={900}
                title="Thông tin chi tiết"
                open={isModalOpen} onOk={handleAddTest} onCancel={handleCancel}
            >
                {isModalOpen}
                <Space>
                    <Form name="formThemTest" layout="verical">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Mã khoá học"
                                    rules={[{ required: true, message: 'Mã khoá học không được để trống' }]}
                                >
                                    <Input

                                        onChange={(e) => handleOnChangeTest(e)}
                                        type="text"
                                        value={valuesTest.source_id}
                                        name="source_id"
                                        placeholder="Nhập mã khoá học"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item

                                    label="Tiêu đề "
                                    rules={[{ required: true, message: 'Tiêu đề không được để trống' }]}
                                >
                                    <Input
                                        name="title"
                                        onChange={(e) => handleOnChangeTest(e)}
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
                                        onChange={(e) => handleOnChangeTest(e)}
                                        placeholder="Mô tả" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item

                                    label="Thời gian bài làm"
                                    rules={[{ required: true, message: 'Thời gian bài làm không được để trống' }]}
                                >
                                    <Input
                                        name="timeline"
                                        onChange={(e) => handleOnChangeNumberTest(e)}
                                        placeholder="Nhập thời gian làm bài"
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