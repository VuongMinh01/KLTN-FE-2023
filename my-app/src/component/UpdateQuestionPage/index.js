import React, { useState, useEffect } from "react";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getQuestionList, deleteQuestion, uploadAudioEndpoint, uploadImageEndpoint, updateQuestion, getAllTestListening } from "../../utils/APIRoutes";
import { Table, Col, Form, Row, Modal, Radio, Input, Button } from "antd";
import { ToastContainer, toast } from 'react-toastify';
import { Select } from "antd";
const { Option } = Select;
const { TextArea } = Input;

const UpdateQuestionPage = () => {
    // State variables
    const [questionList, setQuestionList] = useState([]);
    const [testId, setTestId] = useState("");
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [testIds, setTestIds] = useState([]); // Initialize testIds state
    const [selectedTestId, setSelectedTestId] = useState('');
    const [values, setValues] = useState({
        num_quest: "",
        content: "",
        description: "",
        question_id: "",
        score: "",
        answers: [],
        correct_at: {},
    });
    const token = localStorage.getItem("user").replace(/"/g, '');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };



    useEffect(() => {
        // Fetch all test data
        axios.get(getAllTestListening, {
            params: {
                limit: 100,
                page: 1,
            },
            headers
        })
            .then(response => {
                const testData = response.data.result;
                if (testData && testData.tests && testData.tests.length > 0) {
                    // Extract test IDs from the tests array
                    const ids = testData.tests.map(test => ({ id: test._id, title: test.title }));
                    setTestIds(ids); // Update the testIds state with the extracted IDs
                }
            })
            .catch(error => {
                console.error("Error fetching test data:", error);
            });
    }, []);
    // Function to handle the form submission
    const handleSubmit = async (e) => {
        try {
            setLoading(true);
            // Make the API call to fetch the question list based on the test ID
            const response = await axios.get(`${getQuestionList}/${testId}`, {
                params: {
                    limit: 100,
                    page: 1, // Parse to integer
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            // Update the questionList state with the fetched data
            setQuestionList(response.data.result.questions);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching question list:", error);
            showToast('Nhập id test cần tìm')
            setLoading(false);
        }
    };

    // Modify the changePage and changePage1 functions to pass the updated page number to handleSubmit



    const onDeleteQuestion = async (e) => {
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


    function showToast(message) {
        // Replace this with your toast alert implementation
        // For example, if you're using react-toastify:
        // toast.error(message);
        alert(message);
    }
    const showModal = (record) => {
        console.log("Clicked record:", record);
        setValues({
            ...values,
            question_id: record._id,
            num_quest: record.num_quest,
            score: record.score,
            content: record.content,
            description: record.description,
            content_answer: record.content_answer, // Update the source_id in the valuesTest state
        });
        console.log(record._id, '333');
        setIsModalOpen(true);

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    }


    const [contentType, setContentType] = useState('text'); // State variable to manage selected content type
    const [imageFile, setImageFile] = useState(null);
    const [contentType1, setContentType1] = useState('text'); // State variable to manage selected content type


    const handleOnChangeNumber = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            setValues({ ...values, [e.target.name]: value });
        } else {
            // Handle case where input value is not a number (e.g., user deleted the content)
            setValues({ ...values, [e.target.name]: '' }); // Set the value to an empty string or any default value
        }
    };
    const handleOnChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleContentTypeChange = (e) => {
        setContentType(e.target.value);
    };
    const handleContentTypeChange1 = (e) => {
        setContentType1(e.target.value);
    };
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

    const handleUpdate = async (e) => {
        if (e) {
            e.preventDefault(); // Prevent default form submission behavior if event object exists
        }

        // Check if values object is defined
        if (!values || typeof values !== 'object') {
            console.log("Values object is undefined or not an object");
            showToast('Values object is undefined or not an object')

            return;
        }

        // Check if the content field is empty
        if (!values.content || typeof values.content !== 'string' || !values.content.trim()) {
            console.log("Content must not be empty");
            toast.error('Content must not be empty')
            return; // Prevent further execution if content is empty
        }

        // Check if the description field is empty
        if (!values.description || typeof values.description !== 'string' || !values.description.trim()) {
            console.log("Description must not be empty");
            showToast('Description must not be empty')

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
            const response = await axios.patch(updateQuestion, { ...values, answers }, { headers });

            // Check if the request was successful
            // if (response.status === 200) {
            //     // Extract the URL from the response data
            //     const responseData = response.data.data[0];
            //     let imageUrl, audioUrl;

            //     // Check the type to distinguish between image and audio URLs
            //     if (responseData.type === 'image') {
            //         imageUrl = responseData.url;
            //     } else if (responseData.type === 'audio') {
            //         audioUrl = responseData.url;
            //     }

            //     // Update values.content with the image URL if available
            //     // and values.description with the audio URL if available
            //     setValues({ ...values, content: imageUrl, description: audioUrl });
            //     showToast('thêm audio thành công');
            //     // Close the modal
            //     setIsModalOpen(false);
            // } else {
            //     // Handle other response statuses if needed
            //     console.log('loi');
            //     showToast('thêm audio không thành công')
            // }
        } catch (error) {
            console.log(error);
            // Handle error here, such as showing an error message to the user
        }
        setIsModalOpen(false)
    };





    const handleTestChange = (value) => {
        setTestId(value);
        console.log(value);
    };

    return (
        <div>
            {/* <Input
                placeholder="Nhập mã bài kiểm tra"
                value={testId}
                onChange={(e) => setTestId(e.target.value)}
                style={{ width: 200, marginRight: 16 }}
            /> */}
            <Select
                placeholder="Chọn bài test"
                onChange={handleTestChange}
                value={selectedTestId}
                style={{ width: '300px', marginRight: 16, color: 'black' }}
            >
                {testIds.map(test => (
                    <Option key={test.id} value={test.id}>{test.title}</Option>
                ))}
            </Select>
            <Button type="primary" onClick={handleSubmit}>
                Gửi
            </Button>


            {/* Table to display the list of questions */}
            <Table
                scroll={{ y: "max-content", }}
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
                        title: "Nội dung",
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
                        render: (record) => (
                            <div>
                                <DeleteOutlined
                                    onClick={() => {
                                        if (window.confirm("Bạn có xác nhận xoá câu hỏi này?")) {
                                            onDeleteQuestion(record);
                                        }
                                    }}
                                    style={{ color: "red", marginLeft: "12px" }}
                                />                                  <EditOutlined onClick={() => showModal(record)} style={{ color: "green", marginLeft: "12px" }} />
                            </div>
                        ),
                    },
                ]}
                dataSource={questionList}
                rowKey="_id"
                loading={loading}
                pagination={{ pageSize: 10 }}

            />



            <Modal
                width={900}
                title="Thông tin chi tiết"
                open={isModalOpen} onOk={handleUpdate} onCancel={handleCancel}
            >
                <Form  >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Mã câu hỏi"
                                rules={[{ required: true, message: 'Mã bài thi không được để trống' }]}
                            >
                                <Input
                                    onChange={(e) => handleOnChange(e)}
                                    type="text"
                                    value={values.question_id}
                                    name="question_id"
                                    placeholder="Nhập mã câu hỏi"
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
                                    value={values.num_quest}
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
                                        value={values.description}
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
                                    rules={[{ required: true, message: 'Nội dung không được trống' }]}
                                >
                                    <TextArea
                                        rows={4}
                                        onChange={handleOnChange}
                                        name="content"
                                        placeholder="Nhập nội dung tại đây"
                                        value={values.content}

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
                            <input onChange={handleOnChangeNumber} type='number' name='score' value={values.score} placeholder="Nhập điểm câu hỏi"></input>
                        </Col>

                    </Row>

                </Form>
            </Modal>
            <ToastContainer />
        </div>

    );
};

export default UpdateQuestionPage;
