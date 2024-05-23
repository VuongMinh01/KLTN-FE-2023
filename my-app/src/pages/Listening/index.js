import { Space, Table, Typography, Col, Form, Row, Modal, Radio } from "antd";
import React, { useState, useEffect } from "react";
import { deleteTest, getAllTestListening, getQuestionListId, addQuestion, uploadImageEndpoint, uploadAudioEndpoint, updateTest, deleteQuestion } from "../../utils/APIRoutes";
import Input from "antd/es/input/Input";
import axios from "axios";
import { PlusOutlined, DeleteOutlined, InfoOutlined, EditOutlined } from '@ant-design/icons';

import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import '../../css/Reading.css'

const { TextArea } = Input;

export default function Listening() {

    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalQuestionOpen, setIsModalQuestionOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const [contentType, setContentType] = useState('text'); // State variable to manage selected content type
    const [imageFile, setImageFile] = useState(null);
    const [contentType1, setContentType1] = useState('text'); // State variable to manage selected content type

    const [values, setValues] = useState({
        num_quest: "",
        content: "",
        description: "",
        test_id: "",
        score: "",
        answers: [],
        correct_at: {},
    });
    const [valuesTest, setValuesTest] = useState({
        test_id: "",
        source_id: "",
        title: "",
        description: "",
        timeline: 0,
    })
    const [questionList, setQuestionList] = useState([]); // State variable to store the question list


    const handleOnChangeTest = (e) => {
        setValuesTest({ ...valuesTest, [e.target.name]: e.target.value });

    }
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        draggable: true,
        pauseOnHover: true,
        theme: "dark"
    };

    // Modal
    const showModal = (record) => {
        console.log("Clicked record:", record);
        setValues({
            ...values,
            test_id: record._id // Update the source_id in the valuesTest state
        });
        console.log(record._id, '333');
        setIsModalOpen(true);

    };
    const showModalUpdate = (record) => {
        console.log("Clicked record:", record);
        setValuesTest({
            ...valuesTest,
            source_id: record.source_id,
            test_id: record._id,
            title: record.title,
            description: record.description, // Update the source_id in the valuesTest state
        });
        console.log(record.source_id, '44');
        console.log(record._id, '333');
        setIsModalUpdateOpen(true);

    };

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
        axios.get(getAllTestListening, {
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


    const handleContentTypeChange = (e) => {
        setContentType(e.target.value);
    };
    const handleContentTypeChange1 = (e) => {
        setContentType1(e.target.value);
    };
    // Function to handle image upload




    const clickButton = (e) => {
        // code huong dan
        // // setValues({ ...values, correct_at: values['answers'].find(item => item.order_answer == e.target.value) })
        // // console.log(values, 'duoi');

        console.log("Clicked value:", e.target.value);

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
    const headersForImage = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data' // Update content type for file upload
    };

    // Modal button
    const handleOk = async () => {
        setIsModalOpen(false);

    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }
    const handleCancelUpdate = async () => {
        setIsModalUpdateOpen(false);
    }

    const updateTable = (data) => {
        setDataSource(previousState => {
            setLoading(false)
            return previousState
        });
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
        showToast('Xoá thành công')
    }


    const handleAddQuestion = async (e) => {
        if (e) {
            e.preventDefault(); // Prevent default form submission behavior if event object exists
        }
        // Check if values object is defined
        if (!values || typeof values !== 'object') {
            console.log("Values object is undefined or not an object");
            toast.error('Values object is undefined or not an object')

            return;
        }

        // Check if the content field is empty
        if (!values.content || typeof values.content !== 'string' || !values.content.trim()) {
            console.log("Content must not be empty");
            toast.error('Content không được để trống')
            return; // Prevent further execution if content is empty
        }

        // Check if the description field is empty
        if (!values.description || typeof values.description !== 'string' || !values.description.trim()) {
            console.log("Description must not be empty");
            toast.error('Mô tả không được để trống')

            return; // Prevent further execution if description is empty
        }

        // Construct the answers array
        const answers = [
            { order_answer: "A", content_answer: values.content_answer_1 },
            { order_answer: "B", content_answer: values.content_answer_2 },
            { order_answer: "C", content_answer: values.content_answer_3 },
            { order_answer: "D", content_answer: values.content_answer_4 }
        ];
        if (values.num_quest === "") {
            toast.error('Numquest không được để trống');
            return false;
        }
        if (isNaN(values.num_quest)) {
            toast.error('Numquest phải là một số');
            return false;
        }
        if (Object.keys(values.correct_at).length === 0) {
            toast.error('Cần phải chọn một đáp án đúng.');
            return false;
        }
        if (!values.content_answer_1 || values.content_answer_1.trim() === "") {
            toast.error('Nội dung câu trả lời A không được để trống.');
            return false;
        }
        if (!values.content_answer_2 || values.content_answer_2.trim() === "") {
            toast.error('Nội dung câu trả lời B không được để trống.');
            return false;
        }
        if (!values.content_answer_3 || values.content_answer_3.trim() === "") {
            toast.error('Nội dung câu trả lời C không được để trống.');
            return false;
        }
        if (!values.content_answer_4 || values.content_answer_4.trim() === "") {
            toast.error('Nội dung câu trả lời D không được để trống.');
            return false;
        }
        if (values.score === "") {
            toast.error('Điểm không được để trống.');
            return false;
        }
        if (isNaN(values.score)) {
            toast.error('Điểm phải là một số');
            return false;
        }
        try {
            // Make the POST request to add the question
            const response = await axios.post(addQuestion, { ...values, answers }, { headers });

            // Check if the request was successful
            if (response.status === 200) {
                // Extract the URL from the response data
                const responseData = response.data.data[0];
                let imageUrl, audioUrl;

                // Check the type to distinguish between image and audio URLs
                if (responseData.type === 'image') {
                    imageUrl = responseData.url;
                } else if (responseData.type === 'audio') {
                    audioUrl = responseData.url;
                }

                // Update values.content with the image URL if available
                // and values.description with the audio URL if available
                setValues({ ...values, content: imageUrl, description: audioUrl });
                showToast('Thêm âm thanh thành công');
                // Close the modal
                setIsModalOpen(false);
            } else {
                // Handle other response statuses if needed
                toast.error('Thêm âm thanh không thành công')
            }
        } catch (error) {
            console.log(error);
            // Handle error here, such as showing an error message to the user
        }
        showToast("Thêm câu hỏi thành công.")
        setIsModalOpen(false)
    };

    const handleOnChangeNumberTest = (e) => {
        setValuesTest({ ...valuesTest, [e.target.name]: parseInt(e.target.value) });

    }


    const handleUpdateTestValidation = () => {
        const { source_id, test_id, title, description, timeline } = valuesTest;
        if (source_id === "" || source_id.length <= 5) {
            toast.error("Mã khoá học phải lớn hơn 5 kí tự", toastOptions);
            return false;
        } else if (title === "" || title.length <= 5) {
            toast.error("Tên tiêu đề phải lớn hơn 5 kí tự", toastOptions);
            return false;
        } else if (description === "" || description.length <= 5) {
            toast.error("Mô tả phải lớn hơn 5 ký tự", toastOptions);
            return false;
        } else if (timeline === null || timeline === 0 || isNaN(timeline) || timeline === "") {
            toast.error("Timeline phải là một số và không được để trống", toastOptions);
            return false;
        }
        if (test_id === "" || test_id.length <= 5) {
            toast.error("Mã bài kiểm tra phải lớn hơn 5 kí tự", toastOptions);
            return false;
        }
        return true;
    };


    const handleImageUpload = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImageFile(event.target.files[0]);
        }
    };




    const [audioFile, setAudioFile] = useState(null);

    const handleAudioUpload = (event) => {
        if (event.target.files && event.target.files[0]) {
            setAudioFile(event.target.files[0]);
        }
    };



    const fetchQuestionList = async (testId) => {
        try {
            const response = await axios.get(getQuestionListId.replace(":test_id", testId), {
                params: {
                    limit: 10,
                    page: 1,
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setQuestionList(response.data.result.questions); // Update questionList state with the fetched data
        } catch (error) {
            console.error("Error fetching question list:", error);
        }
    };
    const showModalQuestion = (record) => {
        setIsModalQuestionOpen(true);
        fetchQuestionList(record._id); // Fetch question list for the clicked test_id
    };

    const handleClick = (e) => {
        if (imageFile) {
            const formData = new FormData(); // Create FormData object to send the file
            formData.append('image', imageFile); // Append the image file to the FormData object

            axios.post(uploadImageEndpoint, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data' // Update content type for file upload
                }
            }) // Send the POST request with the FormData and headers
                .then(response => {
                    console.log('Image upload response:', response);
                    const responseData = response?.data;
                    if (responseData && responseData.data && responseData.data.length > 0) {
                        const imageUrl = responseData.data[0].url;
                        console.log('Image URL:', imageUrl);
                        // Update values.content with the image URL
                        setValues({ ...values, content: imageUrl });
                        showToast('Upload hình ảnh thành công');

                    } else {
                        console.error('Image URL not found in response data:', responseData);
                        showToast('Upload hình ảnh thất bại');

                    }
                })
                .catch(error => {
                    console.error('Error uploading image:', error);
                    showToast('Upload hình ảnh thất bại');

                    // Handle error response here
                });
        } else {
            console.warn('No image selected.');
            // Handle case where no image is selected
        }
    };

    const handleAudioClick = () => {
        if (audioFile) {
            const formData = new FormData(); // Create FormData object to send the file
            formData.append('audio', audioFile); // Append the audio file to the FormData object

            axios.post(uploadAudioEndpoint, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data' // Update content type for file upload
                }
            }) // Send the POST request with the FormData and headers
                .then(response => {
                    console.log('Audio upload response:', response);
                    const responseData = response?.data;
                    if (responseData && responseData.data && responseData.data.length > 0) {
                        const audioUrl = responseData.data[0].url;
                        console.log('Audio URL:', audioUrl);
                        // Update values.description with the audio URL
                        setValues({ ...values, description: audioUrl });
                        showToast('Upload audio thành công');

                    } else {
                        console.error('Audio URL not found in response data:', responseData);
                        showToast('Upload audio thất bại');

                    }
                })
                .catch(error => {
                    console.error('Error uploading audio:', error);
                    showToast('Upload audio thất bại');

                    // Handle error response here
                });
        } else {
            console.warn('No audio selected.');
            // Handle case where no audio is selected
        }
    };

    function showToast(message) {
        alert(message);
    }
    const handleUpdateTest = async (e) => {
        e.preventDefault();
        if (handleUpdateTestValidation()) { // Validate input values
            try {
                const { source_id, test_id, title, description, timeline } = valuesTest;
                const { dataTest } = await axios.patch(updateTest, {
                    source_id, test_id, title, description, timeline
                }, { headers })
                showToast("Update thành công");
                setLoading(true)
                updateTable();
                setIsModalUpdateOpen(false);
            } catch (error) {
                // Handle the error here
                console.error("Error adding test:", error);
                showToast('Có lỗi trong việc update')
                setLoading(false); // Ensure loading state is set to false in case of error
                // Optionally, you can display an error message or perform other actions
            }
        };
    }
    const onDeleteQuestion = async (e) => {
        console.log(e._id, '1');
        console.log(e.test_id, '2');

        axios.delete(deleteQuestion, {
            data: {
                question_id: e._id, test_id: e.test_id
            }
            , headers
        }).then((res) => console.log(res.data))
        setLoading(true)
        console.log('deleted');
        showToast('Xoá thành công')
    }

    return (

        <div>
            <Space size={20} direction={"vertical"}>

                <Typography.Title level={4}>Danh sách bài Full Test</Typography.Title>



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
                            title: "Mã khoá học",
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

                                        <DeleteOutlined
                                            onClick={() => {
                                                if (window.confirm("Are you sure you want to delete this service?")) {
                                                    onDeleteService(record);
                                                }
                                            }}
                                            style={{ color: "red", marginLeft: "12px" }}
                                        />                                          <InfoOutlined onClick={() => showModalQuestion(record)} style={{ color: "green", marginLeft: "12px" }} />
                                        <EditOutlined onClick={() => showModalUpdate(record)} style={{ color: "green", marginLeft: "12px" }} />

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
                                    onChange={(e) => handleOnChange(e)}
                                    type="text"
                                    value={values.test_id}
                                    name="test_id"
                                    placeholder="Nhập mã test"
                                    disabled
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


                        {/* // test */}


                        <Col span={24}>
                            <Form.Item
                                label="Content Type"
                                rules={[{ required: true, message: 'Please select content type' }]}
                            >
                                <Radio.Group onChange={handleContentTypeChange1} value={contentType1}>
                                    <Radio value="text">Type Content</Radio>
                                    <Radio value="audio">Upload Audio</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        {contentType1 === 'text' && (
                            <Col span={24}>
                                <Form.Item
                                    label="Mô tả"
                                    rules={[{ required: true, message: 'Mô tả không được để trống' }]}
                                >
                                    <TextArea
                                        rows={4}
                                        onChange={handleOnChange}
                                        name="description"
                                        placeholder="Mô tả"
                                    />
                                </Form.Item>
                            </Col>
                        )}
                        {contentType1 === 'audio' && (
                            <Col span={24}>
                                <Form.Item
                                    label="Upload Audio"
                                    rules={[{ required: true, message: 'Please upload an audio file' }]}
                                >
                                    <input
                                        type="file"
                                        onChange={handleAudioUpload}
                                        className="filetype"
                                        style={{ marginBottom: "10px" }}
                                    />
                                    <br />
                                    {audioFile &&
                                        <>
                                            <audio controls>
                                                <source src={URL.createObjectURL(audioFile)} type="audio/mp3" />
                                            </audio>
                                            <button onClick={handleAudioClick}>Upload audio</button>
                                        </>
                                    }
                                </Form.Item>
                            </Col>
                        )}

                        <Col span={24}>
                            <Form.Item
                                label="Content Type"
                                rules={[{ required: true, message: 'Please select content type' }]}
                            >
                                <Radio.Group onChange={handleContentTypeChange} value={contentType}>
                                    <Radio value="text">Type Content</Radio>
                                    <Radio value="image">Upload Image</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        {contentType === 'text' && (
                            <Col span={24}>
                                <Form.Item
                                    label="Content"
                                    rules={[{ required: true, message: 'Content cannot be empty' }]}
                                >
                                    <TextArea
                                        rows={4}
                                        onChange={handleOnChange}
                                        name="content"
                                        placeholder="Type content here"
                                    />
                                </Form.Item>
                            </Col>
                        )}
                        {contentType === 'image' && (
                            <Col span={24}>
                                <Form.Item
                                    label="Upload Image"
                                    rules={[{ required: true, message: 'Please upload an image' }]}
                                >
                                    <input type="file" accept="image/*" onChange={handleImageUpload} />

                                    {imageFile && (
                                        <div>
                                            <img alt="preview" src={URL.createObjectURL(imageFile)} style={{ width: 300 }} />
                                            {/* Render the button only if an image file is selected */}
                                            {imageFile && <button onClick={handleClick}>Upload Image</button>}
                                        </div>
                                    )}
                                </Form.Item>
                            </Col>
                        )}


                        <Col span={24} style={{ padding: '10px' }}>
                            <label>Answers:</label> <br />
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
                            <label>Điểm</label> <br />
                            <input onChange={handleOnChangeNumber} type='number' name='score' placeholder="Nhập điểm câu hỏi"></input>
                        </Col>

                    </Row>

                </Form>
            </Modal>
            <Modal
                width={900}
                title="Thông tin chi tiết"
                open={isModalQuestionOpen}
                onCancel={() => setIsModalQuestionOpen(false)}
                footer={null}
            >
                <Table
                    scroll={{ y: 'max-content' }}
                    columns={[
                        {
                            key: "1",
                            title: "Mã câu hỏi",
                            dataIndex: "_id",
                        },

                        {
                            key: "2",
                            title: "Mô tả",
                            dataIndex: "description",
                        },

                        {
                            key: "3",
                            title: "Tiêu đề",
                            dataIndex: "content",
                        },
                        {
                            key: "4",
                            title: "Điểm",
                            dataIndex: "score",
                        },
                        {
                            key: "6",
                            title: "Actions",

                            render: (record) => {
                                return (
                                    <div>
                                        <DeleteOutlined
                                            onClick={() => {
                                                if (window.confirm("Bạn có xác nhận xoá câu hỏi này không?")) {
                                                    onDeleteQuestion(record);
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
                {isModalUpdateOpen}
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
                                        disabled
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Mã bài thi"
                                    rules={[{ required: true, message: 'Mã bài thi không được để trống' }]}
                                >
                                    <Input

                                        onChange={(e) => handleOnChangeTest(e)}
                                        type="text"
                                        value={valuesTest.test_id}
                                        name="test_id"
                                        placeholder="Nhập mã bài thi"
                                        disabled
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item

                                    label="Tiêu đề "
                                    rules={[{ required: true, message: 'Title không được để trống' }]}
                                >
                                    <Input
                                        name="title"
                                        onChange={(e) => handleOnChangeTest(e)}
                                        value={valuesTest.title}

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
                                        value={valuesTest.description}

                                        placeholder="Nhập mô tả" />
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
                                        placeholder="Nhập thời gian bài làm"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>

                </Space>

            </Modal>
            <ToastContainer />
        </div >
    )
}
