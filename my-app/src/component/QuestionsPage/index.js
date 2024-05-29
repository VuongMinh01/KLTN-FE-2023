import { Button, Col, Form, Input, Modal, Row, Select, Table, Radio, Image } from "antd";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { getListTest, addQuestionToTest, getListQuestionNew, uploadImageEndpoint, uploadAudioEndpoint, addQuestionNew, deleteQuestionNew, updateQuestionNew, getQuestionDetail } from "../../utils/APIRoutes";
import { ToastContainer, toast } from 'react-toastify';
import { PlusOutlined, DeleteOutlined, InfoOutlined, EditOutlined } from '@ant-design/icons';
import axios from "axios";
import * as XLSX from 'xlsx';
const { Option } = Select;
const { TextArea } = Input;
export default function QuestionsPage() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalInformOpen, setIsModalInformOpen] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [audioFile, setAudioFile] = useState(null);
    const [isModalExcelOpen, setIsModalExcelOpen] = useState(false);
    const [isModalQuestionGroup, setIsModalQuestionGroup] = useState(false);
    const [isModalQuestionGroupInfo, setIsModalQuestionGroupInfo] = useState(false);
    const [questionList, setQuestionList] = useState([]); // State variable to store the question list


    const [isModalAddQuestionToTestOpen, setIsModalAddQuestionToTestOpen] = useState(false);
    const [selectedPart, setSelectedPart] = useState(null);
    const [file, setFile] = useState(null);
    const [type, setType] = useState(0);
    const [tests, setTests] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handlePartChange = (value) => {
        setSelectedPart(value);
    };

    const handleSubmit = () => {
        if (selectedPart) {
            getAllQuestions(selectedPart);
        }
    };
    const [values, setValues] = useState({
        type: "",
        num_part: "",
        type_content: "",
        content: "",
        audio_content: "",
        image_content: "",
        description: "",
        score: "",
        answers: [],
        correct_at: {},
    });
    const [valuesQuestionGroup, setValuesQuestionGroup] = useState({
        type: "",
        num_part: "",
        type_content: "",
        content: "",
        audio_content: "",
        image_content: "",
        description: "",
        score: "",
        parent_id: "",
        answers: [],
        correct_at: {},
    });

    const [valuesAddQuestion, setValuesAddQuestion] = useState({
        test_id: "",
        question_id: ""
    })

    const token = localStorage.getItem("user").replace(/"/g, '');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        draggable: true,
        pauseOnHover: true,
        theme: "dark"
    };
    const updateTable = (data) => {
        setDataSource(previousState => {
            setLoading(false)
            return previousState
        });
    }

    const handleAudioUpload = (event) => {
        if (event.target.files && event.target.files[0]) {
            setAudioFile(event.target.files[0]);
        }
    };
    const handleImageUpload = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImageFile(event.target.files[0]);
        }
    };

    const showModal = (record) => {
        console.log("Clicked record:", record);
        setValues({
            ...values,
            type: record.type,
            type_content: record.type_content,
            audio_content: record.audio_content,
            image_content: record.image_content,
            question_id: record._id,
            num_part: record.num_part,
            score: record.score,
            content: record.content,
            description: record.description,
            answers: record.answers,
            correct_at: record.correct_at,
            parent_id: record.parent_id,
        });
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    }
    const showModalAdd = () => {
        setIsModalAddOpen(true);
    }
    const handleCancelAdd = () => {
        setIsModalAddOpen(false);
    }
    const showModalInform = (record) => {
        setValues({
            ...values,
            type: record.type,
            type_content: record.type_content,
            audio_content: record.audio_content,
            image_content: record.image_content,
            question_id: record._id,
            num_part: record.num_part,
            score: record.score,
            content: record.content,
            description: record.description,
            answers: record.answers,
            correct_at: record.correct_at,
        });
        setIsModalInformOpen(true);
    }
    const showModalAddQuestionToQuestion = (record) => {
        setValuesQuestionGroup({
            ...valuesQuestionGroup,
            parent_id: record._id,
        })
        setIsModalQuestionGroup(true);
    }
    const showModalExcel = (record) => {
        setIsModalExcelOpen(true);
    };
    const handleInformCancel = () => {
        setIsModalInformOpen(false);
    }
    const showModalAddQuestionToTest = (record) => {
        setValuesAddQuestion({
            ...valuesAddQuestion,
            question_id: record._id,
        })
        setIsModalAddQuestionToTestOpen(true);
    }
    const showQuestionGroupInform = (record) => {
        setIsModalQuestionGroupInfo(true);
        fetchQuestionList(record._id);
        console.log(record._id);// Fetch question list for the clicked test_id
    };

    // const handleOnChange = (e) => {
    //     setValues({ ...values, [e.target.name]: e.target.value });
    // }
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };
    const handleOnChangeQuestionGroup = (e) => {
        const { name, value } = e.target;
        setValuesQuestionGroup({
            ...valuesQuestionGroup,
            [name]: value,
        });
    };

    // const clickButton = (e) => {
    //     const { value } = e.target;
    //     setValues({
    //         ...values,
    //         correct_at: { [value]: true },
    //     });
    // };
    const handleOnChangeAddQuestionToTest = (e) => {
        setValuesAddQuestion({ ...valuesAddQuestion, [e.target.name]: e.target.value });
    }

    const handleOnChangeNumber = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            setValues({ ...values, [e.target.name]: value });
            if (e.target.name === 'type') {
                setType(value);
            }
        } else {
            setValues({ ...values, [e.target.name]: '' });
        }
    };
    const handleOnChangeNumber1 = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            setValuesQuestionGroup({ ...valuesQuestionGroup, [e.target.name]: value });
            if (e.target.name === 'type') {
                setType(value);
            }
        } else {
            setValuesQuestionGroup({ ...valuesQuestionGroup, [e.target.name]: '' });
        }
    };

    const handleTypeChange = (value) => {
        setValues({ ...values, type: value });
        setType(value);
    };
    const handleTypeChangeQuestionGroup = (value) => {
        setValuesQuestionGroup({ ...valuesQuestionGroup, type: value });
        setType(value);
    };
    const getAllQuestions = async (part) => {
        try {
            setLoading(true);
            const response = await axios.get(getListQuestionNew, {
                params: {
                    limit: 50,
                    page: 1,
                },
                headers: { ...headers }
            });

            const rawData = response.data.result.questions;

            // Check if rawData is an array before proceeding
            if (!Array.isArray(rawData)) {
                throw new Error("Expected an array but got something else");
            }

            setDataSource(rawData);
            setError(null); // Reset any previous errors
        } catch (error) {
            console.error("There was an error fetching the questions:", error);
            setError("Failed to fetch questions");
            toast.error("Failed to fetch questions", toastOptions);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        getAllQuestions();
    }, []);

    const clickButton = (e) => {
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
    const clickButton1 = (e) => {
        console.log("Clicked value:", e.target.value);
        const order_answer = e.target.value; // Get the value of the clicked radio button
        const content_answer = e.target.nextElementSibling.value; // Get the content of the answer corresponding to the clicked radio button
        // Update correct_at with the selected answer
        setValuesQuestionGroup({
            ...valuesQuestionGroup,
            correct_at: {
                order_answer,
                content_answer
            }
        });
        console.log("Clicked value:", order_answer);
        console.log("Content of the answer:", content_answer);
    }
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
                        setValues({ ...values, image_content: imageUrl });
                        showToast('Upload hình ảnh thành công');
                    } else {
                        console.error('Image URL not found in response data:', responseData);
                        showToast('Upload hình ảnh thất bại');
                    }
                })
                .catch(error => {
                    console.error('Error uploading image:', error);
                    showToast('Upload hình ảnh thất bại');
                });
        } else {
            console.warn('No image selected.');
        }
    };
    const handleClick1 = (e) => {
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
                        setValuesQuestionGroup({ ...valuesQuestionGroup, image_content: imageUrl });
                        showToast('Upload hình ảnh thành công');
                    } else {
                        console.error('Image URL not found in response data:', responseData);
                        showToast('Upload hình ảnh thất bại');
                    }
                })
                .catch(error => {
                    console.error('Error uploading image:', error);
                    showToast('Upload hình ảnh thất bại');
                });
        } else {
            console.warn('No image selected.');
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
                        setValues({ ...values, audio_content: audioUrl });
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
    const handleAudioClick1 = () => {
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
                        setValuesQuestionGroup({ ...valuesQuestionGroup, audio_content: audioUrl });
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
    const handleAddQuestion = async (e) => {
        if (e) {
            e.preventDefault(); // Prevent default form submission behavior if event object exists
        }

        const answers = [
            { order_answer: "A", content_answer: values.content_answer_1 },
            { order_answer: "B", content_answer: values.content_answer_2 },
            { order_answer: "C", content_answer: values.content_answer_3 },
            { order_answer: "D", content_answer: values.content_answer_4 }
        ];

        // Basic validations
        if (values.type === "") {
            toast.error('Vui lòng chọn type');
            return false;
        } else if (values.type_content === "") {
            toast.error('Vui lòng nhập type content');
            return false;
        } else if (values.num_part === "") {
            toast.error('Vui lòng chọn part');
            return false;
        } else if (values.content === "") {
            toast.error('Content không được để trống');
            return false;
        } else if (values.description === "") {
            toast.error('Description không được để trống');
            return false;
        }

        // Additional validations for types other than 0 and 1
        if ([2, 3, 4, 5].includes(values.type)) {
            if (!values.content_answer_1 || values.content_answer_1.trim() === "") {
                toast.error('Nội dung câu trả lời A không được để trống.');
                return false;
            } else if (!values.content_answer_2 || values.content_answer_2.trim() === "") {
                toast.error('Nội dung câu trả lời B không được để trống.');
                return false;
            } else if (!values.content_answer_3 || values.content_answer_3.trim() === "") {
                toast.error('Nội dung câu trả lời C không được để trống.');
                return false;
            } else if (!values.content_answer_4 || values.content_answer_4.trim() === "") {
                toast.error('Nội dung câu trả lời D không được để trống.');
                return false;
            } else if (values.score === "") {
                toast.error('Điểm không được để trống.');
                return false;
            } else if (Object.keys(values.correct_at).length === 0) {
                toast.error('Cần phải chọn một đáp án đúng.');
                return false;
            } else if (values.image_content === "") {
                toast.error('Ảnh không được để trống');
                return false;
            } else if (values.audio_content === "") {
                toast.error('Âm thanh không được để trống');
                return false;
            }
        }

        try {
            await axios.post(addQuestionNew, { ...values, answers }, { headers });
            getAllQuestions();
            toast.success("Thêm câu hỏi thành công.", toastOptions);
            setIsModalAddOpen(false);
        } catch (error) {
            console.error("Error adding question:", error);
        }
    };
    const handleAddQuestionGroup = async (e) => {
        if (e) {
            e.preventDefault(); // Prevent default form submission behavior if event object exists
        }

        const answers = [
            { order_answer: "A", content_answer: valuesQuestionGroup.content_answer_1 },
            { order_answer: "B", content_answer: valuesQuestionGroup.content_answer_2 },
            { order_answer: "C", content_answer: valuesQuestionGroup.content_answer_3 },
            { order_answer: "D", content_answer: valuesQuestionGroup.content_answer_4 }
        ];

        // Basic validations
        // if (valuesQuestionGroup.type === "") {
        //     toast.error('Vui lòng chọn type');
        //     return false;
        // } else if (valuesQuestionGroup.type_content === "") {
        //     toast.error('Vui lòng nhập type content');
        //     return false;
        // } else if (valuesQuestionGroup.num_part === "") {
        //     toast.error('Vui lòng chọn part');
        //     return false;
        // } else if (valuesQuestionGroup.content === "") {
        //     toast.error('Content không được để trống');
        //     return false;
        // } else if (valuesQuestionGroup.description === "") {
        //     toast.error('Description không được để trống');
        //     return false;
        // }

        // // Additional validations for types other than 0 and 1
        // if ([2, 3, 4, 5].includes(valuesQuestionGroup.type)) {
        //     if (!valuesQuestionGroup.content_answer_1 || valuesQuestionGroup.content_answer_1.trim() === "") {
        //         toast.error('Nội dung câu trả lời A không được để trống.');
        //         return false;
        //     } else if (!valuesQuestionGroup.content_answer_2 || valuesQuestionGroup.content_answer_2.trim() === "") {
        //         toast.error('Nội dung câu trả lời B không được để trống.');
        //         return false;
        //     } else if (!valuesQuestionGroup.content_answer_3 || valuesQuestionGroup.content_answer_3.trim() === "") {
        //         toast.error('Nội dung câu trả lời C không được để trống.');
        //         return false;
        //     } else if (!valuesQuestionGroup.content_answer_4 || valuesQuestionGroup.content_answer_4.trim() === "") {
        //         toast.error('Nội dung câu trả lời D không được để trống.');
        //         return false;
        //     } else if (valuesQuestionGroup.score === "") {
        //         toast.error('Điểm không được để trống.');
        //         return false;
        //     } else if (Object.keys(valuesQuestionGroup.correct_at).length === 0) {
        //         toast.error('Cần phải chọn một đáp án đúng.');
        //         return false;
        //     } else if (valuesQuestionGroup.image_content === "") {
        //         toast.error('Ảnh không được để trống');
        //         return false;
        //     } else if (valuesQuestionGroup.audio_content === "") {
        //         toast.error('Âm thanh không được để trống');
        //         return false;
        //     }
        // }

        try {
            await axios.post(addQuestionNew, { ...valuesQuestionGroup, answers }, { headers });
            getAllQuestions();
            toast.success("Thêm câu hỏi thành công.", toastOptions);
        } catch (error) {
            console.error("Error adding question:", error);
        }
    };

    const handleUpdateQuestion = async (e) => {
        if (e) {
            e.preventDefault(); // Prevent default form submission behavior if event object exists
        }
        const updatedAnswers = [
            { order_answer: "A", content_answer: values.content_answer_1 },
            { order_answer: "B", content_answer: values.content_answer_2 },
            { order_answer: "C", content_answer: values.content_answer_3 },
            { order_answer: "D", content_answer: values.content_answer_4 }
        ];
        if (values.type === "") {
            toast.error('Vui lòng chọn type');
            return false;
        }
        else if (values.type_content === "") {
            toast.error('Vui lòng nhập type content');
            return false;
        }
        else if (values.num_part === "") {
            toast.error('Vui lòng chọn part');
            return false;
        }
        else if (values.content === "") {
            toast.error('Content không được để trống');
            return false;
        }
        else if (values.description === "") {
            toast.error('Description không được để trống');
            return false;
        }
        else if (values.image_content === "") {
            toast.error('Ảnh không được để trống');
            return false;
        }
        else if (values.audio_content === "") {
            toast.error('Âm thanh không được để trống');
            return false;
        }
        else if (values.num_part === "") {
            toast.error('Vui lòng chọn part');
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
        if (Object.keys(values.correct_at).length === 0) {
            toast.error('Cần phải chọn một đáp án đúng.');
            return false;
        }
        try {
            const response = await axios.patch(updateQuestionNew, { ...values, answers: updatedAnswers }, { headers });
            toast.success("Cập nhật thành công")
            setIsModalOpen(false);

            getAllQuestions();
            // if (response.message === "Update question successfully") {
            //     showToast("Cập nhật câu hỏi thành công.");
            //     setIsModalOpen(false);
            //     // Optionally, you can update the data source to reflect the changes immediately
            //     getAllQuestions();
            // } else {
            //     toast.error('Cập nhật câu hỏi không thành công.')
            // }
        } catch (error) {
            console.error("Error updating question:", error);
            toast.error('Có lỗi xảy ra khi cập nhật câu hỏi.');
        }
    };

    const onDeleteQuestion = async (e) => {
        try {
            console.log(e._id, '1');
            await axios.delete(deleteQuestionNew, {
                data: {
                    question_id: e._id
                },
                headers
            });
            // Remove the deleted question from the data source
            setDataSource(dataSource.filter(question => question._id !== e._id));

            setLoading(false);
            console.log('deleted');
            toast.success('Xoá thành công', toastOptions);
        } catch (error) {
            console.error("Error deleting question:", error);
            setLoading(false);
            showToast('Failed to delete question');
        }
    };
    const handleInputChange = (e, field) => {
        const newValue = e.target.value;
        setValues(prevState => ({
            ...prevState,
            [field]: newValue
        }));
    };

    const handleAddQuestions = async (e) => {
        e.preventDefault();

        if (!file) {
            toast.error('Vui lòng tải lên tệp Excel.');
            return;
        }

        const reader = new FileReader();
        reader.onload = async (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            if (jsonData.length < 2) {
                toast.error('Tệp Excel không hợp lệ.');
                return;
            }

            // Iterate through each row of jsonData starting from index 1
            for (let i = 1; i < jsonData.length; i++) {
                const row = jsonData[i];
                const question = {
                    type: parseInt(row[0]),
                    type_content: row[1],
                    num_part: row[2],
                    content: row[3],
                    description: row[4],
                    image_content: row[5],
                    audio_content: row[6],
                    score: parseInt(row[7]),
                    answers: [
                        { order_answer: 'A', content_answer: row[8] },
                        { order_answer: 'B', content_answer: row[9] },
                        { order_answer: 'C', content_answer: row[10] },
                        { order_answer: 'D', content_answer: row[11] }
                    ],
                    correct_at: {
                        order_answer: row[12], // Correct answer key (A, B, C, or D)
                        content_answer: row[8] // Placeholder, this field is not needed for validation
                    },
                    parent_id: row[13],
                };

                try {
                    // Send a separate request for each question
                    const response = await axios.post(addQuestionNew, question, { headers });
                    if (response.status === 200) {
                        toast.success("Thêm câu hỏi thành công.");
                    } else {
                        toast.error('Thêm câu hỏi không thành công.');
                    }
                } catch (error) {
                    console.log(error);
                    toast.error('Thêm câu hỏi không thành công.');
                }
            }
            getAllQuestions();

            setIsModalExcelOpen(false);

        };
        reader.readAsArrayBuffer(file);
    };
    function showToast(message) {
        alert(message);
    }

    const handleNumPartChange = (value) => {
        setValues({ ...values, num_part: value });
    };

    const handleNumPartChange1 = (value) => {
        setValuesQuestionGroup({ ...valuesQuestionGroup, num_part: value });
    };

    const handleAddQuestionsToTest = async () => {
        try {
            const { test_id, question_id } = valuesAddQuestion;

            // Check if test_id and question_id are not empty
            if (!test_id || !question_id) {
                // Handle the case where either test_id or question_id is empty
                console.error('Test ID or Question ID is empty');
                toast.error('Test ID or Question ID is empty');
                return;
            }

            // Create the payload object to send to the backend
            const payload = {
                test_id,
                question_id
            };

            // Send the request to your backend API to add the question to the test
            const response = await axios.patch(addQuestionToTest, payload, {
                headers: { ...headers }
            });

            // Check the response status
            if (response.status === 200) {
                // Handle the success case
                console.log('Question added to test successfully!');
                toast.success('Question added to test successfully!');
            } else {
                // Handle the case where the response status is not 200
                console.error('Failed to add question to test');
                toast.error('Failed to add question to test');
            }
        } catch (error) {
            // Handle any errors that occur during the process
            console.error('Error adding question to test:', error);
            toast.error('Failed to add question to test');
        }
        setIsModalAddQuestionToTestOpen(false);
    };

    useEffect(() => {
        const fetchTests = async () => {
            setLoading(true);
            try {
                const response = await axios.get(getListTest, {
                    params: {
                        limit: 20,
                        page: 1,
                    },
                    headers: { ...headers } // Adjust headers as needed
                });
                setTests(response.data.result.tests); // Assuming response.data.result contains the list of tests
                setLoading(false);
            } catch (error) {
                console.error("Error fetching tests:", error);
                toast.error("Failed to fetch tests");
                setLoading(false);
            }
        };

        fetchTests();
    }, []);
    const handleTypeChangeAddQuestionToTest = (value) => {

        setValuesAddQuestion({ ...valuesAddQuestion, test_id: value });

        console.log("Selected test ID:", value);
    };
    const fetchQuestionList = async (questionId) => {
        try {
            const response = await axios.get(getQuestionDetail.replace(":question_id", questionId), {
                params: {
                    limit: 10,
                    page: 1,
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setQuestionList(response.data.result.child_questions); // Update questionList state with the fetched data
        } catch (error) {
            console.error("Error fetching question list:", error);
        }
    };
    return (
        <Container fluid>
            <Button
                style={{ margin: '10px 10px 10px 10px' }}
                type="primary"
                onClick={showModalAdd} icon={<PlusOutlined />}>
                Thêm câu hỏi
            </Button>
            <Button
                style={{ margin: '10px 10px 10px 10px' }}
                type="primary"
                onClick={showModalExcel} icon={<PlusOutlined />}>
                Thêm câu hỏi Excel
            </Button>
            <div style={{ marginBottom: '20px' }}>
                <Select
                    style={{ width: '200px', marginRight: '20px' }}
                    placeholder="Select Part"
                    onChange={handlePartChange}
                    value={selectedPart}
                >
                    {[...Array(7)].map((_, index) => (
                        <Option key={`part${index + 1}`} value={index + 1}>
                            Part {index + 1}
                        </Option>
                    ))}
                </Select>
                <Button type="primary" onClick={handleSubmit}>Gửi</Button>
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Table
                    scroll={{ y: "max-content" }}
                    columns={[
                        {
                            key: "1",
                            title: "Mã câu hỏi",
                            dataIndex: "_id",
                        },
                        {
                            key: "2",
                            title: "Loại",
                            dataIndex: "type",
                            width: 200,
                            render: (type) => {
                                switch (type) {
                                    case 0:
                                        return "Câu hỏi đơn";
                                    case 2:
                                        return "Câu hỏi đôi";
                                    case 3:
                                        return "Câu hỏi ba";
                                    case 4:
                                        return "Câu hỏi bốn";
                                    case 5:
                                        return "Câu hỏi năm";
                                    default:
                                        return "Không xác định";
                                }
                            }
                        },
                        {
                            key: "3",
                            title: "Type content",
                            width: 100,
                            dataIndex: "type_content",
                        },
                        {
                            key: "4",
                            title: "Part",
                            width: 100,

                            dataIndex: "num_part",
                        },
                        {
                            key: "5",
                            title: "Description",
                            dataIndex: "description",
                        },
                        {
                            key: "6",
                            title: "Actions",

                            render: (record) => (
                                <div>
                                    <PlusOutlined onClick={() => showModalAddQuestionToTest(record)}
                                    />
                                    <DeleteOutlined
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this service?")) {
                                                onDeleteQuestion(record);
                                            }
                                        }}
                                        style={{ color: "red", marginLeft: "15px" }}
                                    />
                                    <EditOutlined onClick={() => showModal(record)} style={{ color: "green", marginLeft: "15px" }} />
                                    <InfoOutlined onClick={() => showModalInform(record)} style={{ color: "green", marginLeft: "15px" }} />

                                    <PlusOutlined
                                        style={{ color: "red", marginLeft: "15px" }}
                                        onClick={() => showModalAddQuestionToQuestion(record)}
                                    />
                                    <InfoOutlined
                                        onClick={() => showQuestionGroupInform(record)}
                                        style={{ color: "green", marginLeft: "15px" }}
                                    />


                                </div>
                            ),
                        },
                    ]}
                    dataSource={dataSource}
                    rowKey="_id"
                    pagination={{ pageSize: 20 }}
                />
            )}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {/* Modal cập nhật câu hỏi */}
            <Modal
                width={900}
                title="Thông tin chi tiết"
                open={isModalOpen} onOk={handleUpdateQuestion} onCancel={handleCancel}>
                <Form>
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
                        <Col span={24}>
                            <Form.Item
                                label="Loại"
                                rules={[{ required: true, message: 'Loại bài thi không được để trống' }]}
                            >
                                {/* <Input
                                    onChange={(e) => handleOnChange(e)}
                                    type="text"
                                    value={values.type}
                                    name="type"
                                    placeholder="Nhập type"
                                /> */}
                                <Select
                                    onChange={handleTypeChange}
                                    name="type"
                                    placeholder="Chọn type"
                                    value={values.type}
                                    disabled
                                >
                                    <Option value={0}>Câu hỏi đơn</Option>
                                    <Option value={1}>Câu hỏi con</Option>
                                    <Option value={2}>Câu hỏi đôi</Option>
                                    <Option value={3}>Câu hỏi ba</Option>
                                    <Option value={4}>Câu hỏi bốn</Option>
                                    <Option value={5}>Câu hỏi năm</Option>

                                </Select>
                            </Form.Item>
                        </Col>
                        {type === 1 && (
                            <Col span={24}>
                                <Form.Item
                                    label="Parent id"
                                    rules={[{ required: true, message: 'Parent id không được để trống' }]}
                                >
                                    <Input
                                        onChange={handleOnChange}
                                        name="parent_id"
                                        type="text"
                                        placeholder="Nhập id"
                                    />
                                </Form.Item>
                            </Col>
                        )}
                        <Col span={24}>
                            <Form.Item
                                label="Type Content"
                                rules={[{ required: true, message: 'Loại bài thi không được để trống' }]}
                            >
                                <Input
                                    onChange={(e) => handleOnChange(e)}
                                    type="text"
                                    value={values.type_content}
                                    name="type_content"
                                    placeholder="Nhập type"
                                />

                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label="Num part"
                                rules={[{ required: true, message: 'Loại bài thi không được để trống' }]}
                            >
                                <Input
                                    onChange={(e) => handleOnChange(e)}
                                    type="text"
                                    value={values.num_part}
                                    name="num_part"
                                    placeholder="Nhập num part"
                                />
                            </Form.Item>
                        </Col>
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
                        <Col span={24}>
                            <Form.Item label="Điểm">
                                <Input
                                    onChange={(e) => handleOnChangeNumber(e)}
                                    type="number"
                                    value={values.score}
                                    name="score"
                                    placeholder="Nhập điểm cho câu hỏi"
                                />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item label="Image Content">
                                <Image
                                    width={300}
                                    src={values.image_content}
                                    alt="Question Image"
                                    fallback="https://via.placeholder.com/150"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Audio Content">
                                {values.audio_content && (
                                    <audio controls>
                                        <source src={values.audio_content} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Answers">
                                {values.answers.map((answer, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            marginBottom: '8px',
                                            padding: '8px',
                                            border: answer.order_answer === values.correct_at.order_answer ? '2px solid green' : '1px solid #ccc',
                                            borderRadius: '4px',
                                            backgroundColor: answer.order_answer === values.correct_at.order_answer ? '#f6ffed' : 'white',
                                        }}
                                    >
                                        <strong>{answer.order_answer}:</strong> {answer.content_answer}
                                    </div>
                                ))}
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Image Content">
                                <Input
                                    value={values.image_content}
                                    onChange={(e) => handleInputChange(e, 'image_content')}
                                    placeholder="Enter image URL"
                                />
                            </Form.Item>
                        </Col>
                        {/* Input field for updating audio */}
                        <Col span={24}>
                            <Form.Item label="Audio Content">
                                <Input
                                    value={values.audio_content}
                                    onChange={(e) => handleInputChange(e, 'audio_content')}
                                    placeholder="Enter audio URL"
                                />
                            </Form.Item>
                        </Col>
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
                    </Row>
                </Form>
            </Modal>
            {/* Modal Add câu hỏi */}
            <Modal
                width={900}
                title="Thông tin chi tiết"
                open={isModalAddOpen} onOk={handleAddQuestion} onCancel={handleCancelAdd}
            >
                <Form  >
                    <Row gutter={16}>
                        <Col span={24} >
                            <Form.Item
                                label="Type"
                                rules={[{ required: true, message: 'Type không được để trống' }]}
                            >
                                <Select
                                    onChange={handleTypeChange}
                                    name="type"
                                    placeholder="Chọn type"
                                    value={values.type}
                                >
                                    <Option value={0}>Câu hỏi đơn</Option>
                                    <Option value={1}>Câu hỏi con</Option>
                                    <Option value={2}>Câu hỏi đôi</Option>
                                    <Option value={3}>Câu hỏi ba</Option>
                                    <Option value={4}>Câu hỏi bốn</Option>
                                    <Option value={5}>Câu hỏi năm</Option>

                                </Select>
                            </Form.Item>
                        </Col>
                        {type === 1 && (
                            <Col span={24}>
                                <Form.Item
                                    label="Parent id"
                                    rules={[{ required: true, message: 'Parent id không được để trống' }]}
                                >
                                    <Input
                                        onChange={handleOnChange}
                                        name="parent_id"
                                        type="text"
                                        placeholder="Nhập id"
                                    />
                                </Form.Item>
                            </Col>
                        )}
                        <Col span={24} >
                            <Form.Item
                                label="Type content"
                                rules={[{ required: true, message: 'Type content không được để trống' }]}
                            >
                                <Input
                                    onChange={handleOnChangeNumber}
                                    name="type_content"
                                    type="number"
                                    placeholder="Nhập type content" />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label="Num part"
                                rules={[{ required: true, message: 'Num part không được để trống' }]}
                            >
                                <Select
                                    onChange={handleNumPartChange}
                                    name="num_part"
                                    placeholder="Chọn Part"
                                    value={values.num_part}
                                >
                                    {values.type === 0 ? (
                                        <>
                                            <Option value={1}>Part 1</Option>
                                            <Option value={2}>Part 2</Option>
                                            <Option value={5}>Part 5</Option>
                                        </>
                                    ) : (
                                        <>
                                            <Option value={3}>Part 3</Option>
                                            <Option value={4}>Part 4</Option>
                                            <Option value={6}>Part 6</Option>
                                            <Option value={7}>Part 7</Option>
                                        </>
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Nội dung"
                                rules={[{ required: true, message: 'Content cannot be empty' }]}
                            >
                                <TextArea
                                    rows={4}
                                    onChange={handleOnChange}
                                    name="content"
                                    placeholder="Nhập nội dung tại đây"
                                />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label="Mô tả"
                                rules={[{ required: true, message: 'Content cannot be empty' }]}
                            >
                                <TextArea
                                    rows={4}
                                    onChange={handleOnChange}
                                    name="description"
                                    placeholder="Nhập mô tả tại đây"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24} >
                            <Form.Item
                                label="Điểm"
                                rules={[{ required: true, message: 'Điểm không được để trống' }]}
                            >
                                <Input onChange={handleOnChangeNumber} type='number' name='score' placeholder="Nhập điểm câu hỏi" />
                            </Form.Item>
                        </Col>
                        {(values.type === 0 || values.type === 1) && (
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
                        {(values.type === 0 || values.type === 1) && (
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
                        {(values.type === 0 || values.type === 1) && (

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
                        )}
                    </Row>
                </Form>
            </Modal>
            {/* Modal thông tin câu hỏi */}
            <Modal
                width={900}
                title="Thông tin chi tiết câu hỏi."
                open={isModalInformOpen} onOk={handleInformCancel} onCancel={handleInformCancel}>
                <Form>
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
                        <Col span={24}>
                            <Form.Item
                                label="Loại"
                                rules={[{ required: true, message: 'Loại bài thi không được để trống' }]}
                            >
                                <Select
                                    onChange={handleTypeChange}
                                    name="type"
                                    placeholder="Chọn type"
                                    value={values.type}
                                    disabled
                                >
                                    <Option value={0}>Câu hỏi đơn</Option>
                                    <Option value={1}>Câu hỏi con</Option>
                                    <Option value={2}>Câu hỏi đôi</Option>
                                    <Option value={3}>Câu hỏi đôi</Option>
                                    <Option value={4}>Câu hỏi bốn</Option>
                                    <Option value={5}>Câu hỏi năm</Option>

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Type Content"
                                rules={[{ required: true, message: 'Loại bài thi không được để trống' }]}
                            >
                                <Input
                                    onChange={(e) => handleOnChange(e)}
                                    type="text"
                                    value={values.type_content}
                                    name="type_content"
                                    placeholder="Nhập type"
                                    disabled
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Num part"
                                rules={[{ required: true, message: 'Loại bài thi không được để trống' }]}
                            >
                                <Select
                                    onChange={handleNumPartChange}
                                    name="num_part"
                                    placeholder="Chọn Part"
                                    value={values.num_part}
                                    disabled
                                >
                                    <Option value={1}>Part 1</Option>
                                    <Option value={2}>Part 2</Option>
                                    <Option value={3}>Part 3</Option>
                                    <Option value={4}>Part 4</Option>
                                    <Option value={5}>Part 5</Option>
                                    <Option value={6}>Part 6</Option>
                                    <Option value={7}>Part 7</Option>

                                </Select>
                            </Form.Item>
                        </Col>

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
                                    disabled
                                />
                            </Form.Item>
                        </Col>
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
                                    disabled
                                />
                            </Form.Item>
                        </Col>
                        {(values.type === 0 || values.type === 1) && (

                            <Col span={24}>
                                <Form.Item label="Image Content">
                                    <Image
                                        width={300}
                                        src={values.image_content}
                                        alt="Question Image"
                                        fallback="https://via.placeholder.com/150"
                                    />
                                </Form.Item>
                            </Col>
                        )}
                        {(values.type === 0 || values.type === 1) && (
                            <Col span={24}>
                                <Form.Item label="Audio Content">
                                    {values.audio_content && (
                                        <audio controls>
                                            <source src={values.audio_content} type="audio/mpeg" />
                                            Your browser does not support the audio element.
                                        </audio>
                                    )}
                                </Form.Item>
                            </Col>
                        )}
                        {(values.type === 0 || values.type === 1) && (

                            <Col span={24}>
                                <Form.Item label="Answers">
                                    {values.answers.map((answer, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                marginBottom: '8px',
                                                padding: '8px',
                                                border: answer.order_answer === values.correct_at.order_answer ? '2px solid green' : '1px solid #ccc',
                                                borderRadius: '4px',
                                                backgroundColor: answer.order_answer === values.correct_at.order_answer ? '#f6ffed' : 'white',
                                            }}
                                        >
                                            <strong>{answer.order_answer}:</strong> {answer.content_answer}
                                        </div>
                                    ))}
                                </Form.Item>
                            </Col>
                        )}
                        <Col span={24}>
                            <Form.Item label="Điểm">
                                <Input
                                    onChange={(e) => handleOnChangeNumber(e)}
                                    type="number"
                                    value={values.score}
                                    name="score"
                                    placeholder="Nhập điểm cho câu hỏi"
                                    disabled
                                />

                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            {/* Modal add Excel */}
            <Modal
                title="Add Questions from Excel"
                onOk={handleAddQuestions}
                open={isModalExcelOpen}
                onCancel={() => setIsModalExcelOpen(false)}
            >
                <Form onSubmit={handleAddQuestions}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label="Upload Excel"
                                rules={[{ required: true, message: 'Please upload an Excel file' }]}
                            >
                                <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Button type="primary" onClick={handleAddQuestions}>
                        Add Questions
                    </Button>

                </Form>
            </Modal>
            {/* Modal Add Question to Test */}
            <Modal
                title="Add Questions to Test"
                onOk={handleAddQuestionsToTest}
                open={isModalAddQuestionToTestOpen}
                onCancel={() => setIsModalAddQuestionToTestOpen(false)}
            >
                <Form>
                    <Row gutter={16}>
                        <Col span={24} >
                            <Form.Item
                                label="Type"
                                rules={[{ required: true, message: 'Type không được để trống' }]}
                            >
                                <Select
                                    onChange={handleTypeChangeAddQuestionToTest}
                                    name="test_id"
                                    placeholder="Chọn test"
                                    loading={loading}
                                >
                                    {tests.map(test => (
                                        <Option key={test._id} value={test._id}>
                                            {test.title}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24} >
                            <Form.Item
                                label="Mã câu hỏi"
                                rules={[{ required: true, message: 'Mã câu hỏikhông được để trống' }]}
                            >
                                <Input
                                    onChange={handleOnChangeAddQuestionToTest}
                                    name="question_id"
                                    type="text"
                                    value={valuesAddQuestion.question_id}
                                    placeholder="Nhập id"
                                    disabled
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            {/* Modal Add Question Group */}
            <Modal
                width={900}
                title="Add Questions to Group"
                onOk={() => {
                    handleAddQuestionGroup();
                    setIsModalQuestionGroup(false);
                }}
                open={isModalQuestionGroup}
                onCancel={() => setIsModalQuestionGroup(false)}
            >
                <Form  >
                    <Row gutter={16}>
                        <Col span={24} >
                            <Form.Item
                                label="Type"
                                rules={[{ required: true, message: 'Type không được để trống' }]}
                            >
                                <Select
                                    onChange={handleTypeChangeQuestionGroup}
                                    name="type"
                                    placeholder="Chọn type"
                                    value={valuesQuestionGroup.type}
                                >
                                    <Option value={1}>Câu hỏi con</Option>


                                </Select>

                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Parent id"
                                rules={[{ required: true, message: 'Parent id không được để trống' }]}
                            >
                                <Input
                                    onChange={handleOnChangeQuestionGroup}
                                    name="parent_id"
                                    type="text"
                                    value={valuesQuestionGroup.parent_id}
                                    placeholder="Nhập id"
                                    disabled
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24} >
                            <Form.Item
                                label="Type content"
                                rules={[{ required: true, message: 'Type content không được để trống' }]}
                            >
                                <Input
                                    onChange={handleOnChangeNumber1}
                                    name="type_content"
                                    type="number"
                                    placeholder="Nhập type content" />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label="Num part"
                                rules={[{ required: true, message: 'Num part không được để trống' }]}
                            >
                                <Select
                                    onChange={handleNumPartChange1}
                                    name="num_part"
                                    placeholder="Chọn Part"
                                    value={valuesQuestionGroup.num_part}
                                >
                                    <>
                                        <Option value={3}>Part 3</Option>
                                        <Option value={4}>Part 4</Option>
                                        <Option value={6}>Part 6</Option>
                                        <Option value={7}>Part 7</Option>
                                    </>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Nội dung"
                                rules={[{ required: true, message: 'Content cannot be empty' }]}
                            >
                                <TextArea
                                    rows={4}
                                    onChange={handleOnChangeQuestionGroup}
                                    name="content"
                                    placeholder="Nhập nội dung tại đây"
                                />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label="Mô tả"
                                rules={[{ required: true, message: 'Content cannot be empty' }]}
                            >
                                <TextArea
                                    rows={4}
                                    onChange={handleOnChangeQuestionGroup}
                                    name="description"
                                    placeholder="Nhập mô tả tại đây"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24} >
                            <Form.Item
                                label="Điểm"
                                rules={[{ required: true, message: 'Điểm không được để trống' }]}
                            >
                                <Input onChange={handleOnChangeNumber1} type='number' name='score' placeholder="Nhập điểm câu hỏi" />
                            </Form.Item>
                        </Col>
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
                                        {imageFile && <button onClick={handleClick1}>Upload Image</button>}
                                    </div>
                                )}
                            </Form.Item>
                        </Col>

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
                                        <button onClick={handleAudioClick1}>Upload audio</button>
                                    </>
                                }
                            </Form.Item>
                        </Col>
                        <Col span={24} style={{ padding: '10px' }}>
                            <label>Answers:</label> <br />
                            <div>
                                <div className="divQuestion" >
                                    <input type="radio" id="A" onClick={clickButton1} name="order_answer" value="A" />
                                    <input onChange={handleOnChangeQuestionGroup} className="inputArea" type="text" name="content_answer_1" />
                                </div>
                                <div className="divQuestion">

                                    <input type="radio" onClick={clickButton1} id="B" name="order_answer" value="B" />
                                    <input onChange={handleOnChangeQuestionGroup} className="inputArea" type="text" name="content_answer_2" />
                                </div>

                                <div className="divQuestion">

                                    <input type="radio" onClick={clickButton1} id="C" name="order_answer" value="C" />
                                    <input onChange={handleOnChangeQuestionGroup} className="inputArea" type="text" name="content_answer_3" />
                                </div>
                                <div className="divQuestion">
                                    <input type="radio" onClick={clickButton1} id="D" name="order_answer" value="D" />
                                    <input onChange={handleOnChangeQuestionGroup} className="inputArea" type="text" name="content_answer_4" />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <Modal
                width={1500}
                title="Thông tin chi tiết"
                open={isModalQuestionGroupInfo}
                onCancel={() => setIsModalQuestionGroupInfo(false)}
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
                        },
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
            <ToastContainer />
        </Container>
    );
}
