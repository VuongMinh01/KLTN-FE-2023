import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../css/PageQuanTri.css"
import Header from '../../component/LandingPageComponent/Header';
import '../../css/AddPart1.css';
import { Button, Input, Image } from "antd";
import { getTestDetail, submitTest, getTestId, getScore } from "../../utils/APIRoutes";
import { useLocation, useNavigate } from 'react-router-dom';
import StopPage from "../../component/StopPage";
import StartPage from "../../component/StartPage";
import Logo from '../../assets/ToeicTesting.png'

import axios from "axios";

export default function TestingV2Reading() {

    const [currentPage, setCurrentPage] = useState('start');
    const location = useLocation();
    const navigate = useNavigate();

    const changePage = (page) => {
        setCurrentPage(page);
    };
    const [dataSource, setDataSource] = useState([])
    const [selectedAnswersPart, setSelectedAnswersPart] = useState(Array.from({ length: 200 }).fill(null));


    const [questions, setQuestions] = useState([]); // State to store complete question data
    const [totalMarks, setTotalMarks] = useState(null); // Initialize totalMarks state
    const [totalCorrect, setTotalCorrect] = useState(null);
    const [totalTime1, setTotalTime1] = useState(null);

    // clock
    const [totalTime, setTotalTime] = useState(0); // State to store total time
    const [remainingTime, setRemainingTime] = useState(0);
    const [timer, setTimer] = useState(null);

    //clock
    const handleStartTest = () => {
        setCurrentPage('part 5'); // Change page to the first part of the test
        startTimer(); // Start the countdown timer
    };

    const startTimer = () => {
        const newTimer = setInterval(() => {
            setRemainingTime(prevTime => {
                if (prevTime === 0) {
                    clearInterval(newTimer); // Stop the timer
                    handleSubmit(); // Submit the test when time runs out
                    return 0;
                }
                return prevTime - 1;
            });
        }, 60000); // Interval of 1 second
        setTimer(newTimer);
    };
    const stopTimerAndChangePage = () => {
        clearInterval(timer); // Clear the interval timer
        setCurrentPage('stop'); // Navigate to the StopPage
    };

    // Function to continue the test and resume the timer
    const continueTest = () => {
        setCurrentPage('part 1'); // Change page back to the first part of the test
        startTimer(); // Resume the countdown timer
    };

    useEffect(() => {
        const test_id = getTestIdFromURL(location.pathname);
        console.log(test_id, '12312') // Extract test ID from URL
        getListQuestion(test_id); // Fetch list of questions when component mounts
        fetchTestTimeline(test_id); // Fetch test timeline when component mounts

    }, [location.pathname]);

    //clock
    const fetchTestTimeline = (test_id, headers) => {
        // Fetch test timeline using axios
        const testTimelineUrl = `${getTestDetail}/${test_id}`;
        axios.get(testTimelineUrl, { headers })
            .then(response => {
                const total_time = response.data.result.timeline; // Access total_time from response.data.result.timeline
                console.log(total_time, '1');
                setTotalTime(total_time); // Set total time from data
                setRemainingTime(total_time); // Initialize remaining time
            })
            .catch(error => {
                console.error('Error fetching test timeline:', error);
            });
    };

    const getTestIdFromURL = (pathname) => {
        const parts = pathname.split('/');
        return parts[parts.length - 1];
    }
    const token = localStorage.getItem("user") ? localStorage.getItem("user").replace(/"/g, '') : null; // Check if token exists
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    const [modifiedDataSource, setModifiedDataSource] = useState([]);
    const test_id = getTestIdFromURL(location.pathname);

    const handleRadioChangePart = (index, value) => {
        console.log("handleRadioChangePart called");
        const updatedSelectedAnswers = [...selectedAnswersPart];
        updatedSelectedAnswers[index] = value;
        setSelectedAnswersPart(updatedSelectedAnswers);

        const selectedAnswer = dataSource[index]?.items[0]?.answers.find(answer => answer.order_answer === value);
        if (selectedAnswer) {
            const { content_answer, order_answer } = selectedAnswer;
            const updatedDataSource = [...modifiedDataSource];

            if (!updatedDataSource[index]) {
                updatedDataSource[index] = {}; // Initialize object if it doesn't exist
            }

            updatedDataSource[index] = {
                ...updatedDataSource[index],
                selected_at: {
                    content_answer,
                    order_answer
                }
            };

            setModifiedDataSource(updatedDataSource);
            console.log("Data at index ", index, updatedDataSource[index]);
        }
    };



    const getListQuestion = (test_id) => {
        const getQuestionList1 = `${getTestDetail}/${test_id}`;
        axios.get(getQuestionList1, {
            params: {
                limit: 100,
                page: 1,
            }, headers
        }).then((response) => {
            const questions = response.data.result.questions;
            setDataSource(questions);
            setQuestions(questions); // Update questions state
            console.log(questions, 'data list');
            console.log(questions[0].items[0], 'du lieu');
        }).catch((error) => {
            console.error('Error fetching list of questions:', error);
            const confirmed = window.confirm("Bạn cần phải đăng nhập với tài khoản đã xác minh để làm bài kiểm tra này. Nhấn OK để chuyển đến trang đăng nhập.");
            if (confirmed) {
                navigate('/login');
            }
        });
    }


    function showToast(message) {
        alert(message);
    }

    const handleSubmit = () => {
        // Check if any question is unanswered
        const unansweredQuestions = modifiedDataSource.filter(data => !data || !data.selected_at);

        // If there are unanswered questions, show a toast message and return
        if (unansweredQuestions.length < modifiedDataSource.length) {
            const confirmed = window.confirm("Vẫn còn câu hỏi bạn chưa chọn, bạn có muốn nộp bài?");
            if (!confirmed) {
                return; // Don't proceed with submitting the test if not confirmed
            }
        }

        // Ensure questions and modifiedDataSource have data
        if (questions.length === 0 || modifiedDataSource.length === 0) {
            console.error('Questions or modifiedDataSource is empty.');
            showToast('Ít nhất phải có một đáp án được chọn');
            return;
        }

        // Construct the testData object with selected answers and total time
        const testData = {
            total_time: totalTime - remainingTime,
            test_id: getTestIdFromURL(location.pathname), // Make sure getTestIdFromURL is defined
            questions: questions.map((question, index) => ({
                // Map over each question object
                selected_at: modifiedDataSource[index] ? modifiedDataSource[index].selected_at : null,
                items: question.items.map(item => ({
                    // Map over each item in the items array
                    _id: item._id,
                    score: item.score,
                    content: item.content,
                    description: item.description,
                    num_part: item.num_part,
                    correct_at: item.correct_at,
                    answers: item.answers,
                    created_at: item.created_at,
                    updated_at: item.updated_at,
                    // Include only item-specific properties here
                    // Add other properties if needed
                })),
                // Add other properties if needed
            }))
        };

        // Make a POST request to submit the test data
        axios.post(submitTest, testData, { headers })
            .then(response => {
                // Handle successful response
                const { total_marks, total_correct, total_time } = response.data.result;
                console.log(response.data.result);
                console.log(total_time);
                setTotalCorrect(total_correct);
                setTotalMarks(total_marks);
                setTotalTime1(total_time);
                setCurrentPage('finish');
                // You can display a success message or perform any other actions here
            })
            .catch(error => {
                // Handle error
                console.error('Error submitting test:', error);
                // You can display an error message or perform any other error handling here
            });
    };



    return (
        <div className="App">
            <Header />

            <div className="main-content">
                {currentPage === 'start' && <StartPage onStart={handleStartTest} />}
                {currentPage === 'stop' && <StopPage onContinue={continueTest} />}
                {currentPage !== 'start' && (
                    <div>
                        {currentPage === 'part 5' && <Part5
                            changePage={changePage}
                            dataSource={dataSource}
                            selectedAnswers={selectedAnswersPart}
                            onRadioChange={handleRadioChangePart} />}

                        {currentPage !== 'finish' && currentPage !== 'xem' && remainingTime > 0 && (
                            <h3 style={{ textAlign: 'center', color: 'cornflowerblue' }}>
                                Thời gian còn lại: {remainingTime} minutes
                            </h3>
                        )}                    </div>
                )}

                {currentPage === 'finish' && <Finish totalMarks={totalMarks} totalCorrect={totalCorrect} totalTime1={totalTime1} changePage={changePage}
                />}
                {currentPage === 'xem' && <ScorecardDetail totalMarks={totalMarks} totalTime1={totalTime1} totalCorrect={totalCorrect} testId={test_id} />}

                {currentPage !== 'stop' && currentPage !== 'finish' && currentPage !== 'start' && currentPage !== 'xem' && (
                    <Button onClick={stopTimerAndChangePage} style={{
                        marginRight: '50px',
                        marginLeft: 'auto',
                        marginBottom: '20px',
                        background: 'cornflowerblue',
                        color: 'white',
                        borderRadius: '20px',
                        width: '80%'
                    }}>Tạm ngừng bài làm</Button>
                )}
            </div>

            {currentPage !== 'stop' && currentPage !== 'finish' && currentPage !== 'start' && currentPage !== 'xem' && (

                <Button onClick={handleSubmit} style={{
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    marginBottom: '20px',
                    background: 'cornflowerblue',
                    color: 'white',
                    borderRadius: '20px',
                    width: '80%'
                }}>Nộp bài</Button>
            )}
            <br />
        </div>
    );
}


function Part5(props) {
    const handleClick = () => {
        // Call changePage function to change the page
        props.changePage('part 6');
        window.scrollTo(0, 0);

    };

    const handleRadioChangePart5 = (index, value) => {
        const updatedSelectedAnswers = [...props.selectedAnswers];
        updatedSelectedAnswers[index] = value; // Adjust index to match Part 5's data
        props.onRadioChange(index, value); // Call the parent component's handler
    };

    return (
        <Container fluid>
            <h1>Part 5: Hoàn thành câu</h1>
            {Array.from({ length: 30 }).map((_, index) => (
                <Row gutter={24} key={index}>
                    <Col xs={12}>
                        <div style={{ border: '1px solid black', borderRadius: '20px', marginBottom: '10px' }}>

                            <h3 style={{ textAlign: 'left', marginLeft: '50px', marginTop: '10px' }}>Câu hỏi {index + 1}. {props.dataSource[index]?.items[0] && props.dataSource[index]?.items[0]?.content}</h3>

                            <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                                <input
                                    type="radio"
                                    id={`A-${index}`}
                                    name={`Question-${index}`}
                                    value="A"
                                    checked={props.selectedAnswers[index] === "A"}
                                    onChange={() => handleRadioChangePart5(index, "A")} />
                                <label htmlFor={`A-${index}`}>
                                    (A) {props.dataSource[index] && props.dataSource[index]?.items[0] && props.dataSource[index]?.items[0].answers[0] && props.dataSource[index]?.items[0].answers[0].content_answer}
                                </label><br />
                                <input
                                    type="radio"
                                    id={`B-${index}`}
                                    name={`Question-${index}`}
                                    value="B"
                                    checked={props.selectedAnswers[index] === "B"}
                                    onChange={() => handleRadioChangePart5(index, "B")}
                                />
                                <label htmlFor={`B-${index}`}>
                                    (B) {props.dataSource[index] && props.dataSource[index]?.items[0] && props.dataSource[index]?.items[0].answers[1] && props.dataSource[index]?.items[0].answers[1].content_answer}
                                </label><br />                                <input
                                    type="radio"
                                    id={`C-${index}`}
                                    name={`Question-${index}`}
                                    value="C"
                                    checked={props.selectedAnswers[index] === "C"}
                                    onChange={() => handleRadioChangePart5(index, "C")} />
                                <label htmlFor={`C-${index}`}>
                                    (C) {props.dataSource[index] && props.dataSource[index]?.items[0] && props.dataSource[index]?.items[0].answers[2] && props.dataSource[index]?.items[0].answers[2].content_answer}
                                </label><br />                                <input
                                    type="radio"
                                    id={`D-${index}`}
                                    name={`Question-${index}`}
                                    value="D"
                                    checked={props.selectedAnswers[index] === "D"}
                                    onChange={() => handleRadioChangePart5(index, "D")} />
                                <label htmlFor={`D-${index}`}>
                                    (D) {props.dataSource[index] && props.dataSource[index]?.items[0] && props.dataSource[index]?.items[0].answers[3] && props.dataSource[index]?.items[0].answers[3].content_answer}
                                </label><br />
                            </div>
                        </div>
                    </Col>
                </Row>
            ))}
            <Button onClick={handleClick}>Part kế</Button>
        </Container>
    );
}


function Finish({ totalMarks, totalCorrect, changePage, totalTime1 }) {
    const changePageHandler = () => {
        changePage('xem');
    };

    return (
        <Container fluid>
            <Row style={{ backgroundColor: 'cornflowerblue', color: 'white', border: '1px solid ', borderRadius: '10px', width: '70vw', height: '70vh', marginLeft: 'auto', marginRight: 'auto' }}>
                <Col>
                    <h1 style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>Test Submitted Successfully</h1>
                    <h3>Bạn đã hoàn thành bài kiểm tra</h3>
                    <h3>Tổng số câu đúng: {totalCorrect}/200</h3>
                    <h3>Tổng số điểm: {totalMarks}</h3>
                    <h3>Thời gian làm bài: {parseInt(totalTime1)} minutes</h3>
                </Col>
                <Col xs={12} style={{ textAlign: 'center' }}>
                    <Image src={Logo} preview={false} />
                </Col>
                <Button
                    style={{ border: '1px solid black', borderRadius: '15px', width: '90%', marginLeft: 'auto', marginRight: 'auto' }}
                    value='Xem thông tin bài làm' onClick={changePageHandler}>Xem thông tin bài làm</Button>
            </Row>
        </Container>
    );
}

function ScorecardDetail({ totalMarks, totalCorrect, totalTime1, testId }) {
    const [scorecardDetail, setScorecardDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState(testId); // Set initial value of id to testId
    const [submittedId, setSubmittedId] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${getScore}/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("user").replace(/"/g, '')}`, 'Content-Type': 'application/json' } }
                );
                setScorecardDetail(response.data.result);
                setLoading(false);
                console.log(response.data.result);
            } catch (error) {
                console.error("Error fetching scorecard detail:", error);
                setLoading(false);
                showToast("Mã kiểm tra không hợp lệ");
            }
        };

        fetchData();
    }, [id]);

    function showToast(message) {
        alert(message);
    }

    return (
        <div style={{ background: 'white' }}>
            {loading && <p>Loading...</p>}
            {scorecardDetail && (
                <>
                    <div style={{ border: '1px solid black', borderRadius: '15px', padding: '10px', backgroundColor: 'antiquewhite' }}>
                        <h1 style={{ textAlign: 'center', color: 'cornflowerblue' }}>Thông tin bài làm</h1>
                        <h3>Tổng số câu đúng: {totalCorrect}</h3>
                        <h3>Tổng số điểm: {totalMarks}</h3>
                        <h3>Thời gian làm bài: {totalTime1}  phút</h3>
                    </div>
                    <h2 style={{ color: 'cornflowerblue' }}>Câu hỏi:</h2>

                    {scorecardDetail.questions.map((question, index) => (
                        <ul>
                            <li key={question.id}>
                                <div style={{ border: '1px solid black', listStyle: 'none', padding: '10px', marginBottom: '10px', backgroundColor: 'antiquewhite' }}>
                                    <h3 style={{ color: 'cornflowerblue' }}>Câu {question.num_quest}</h3>
                                    <p>Mô tả: {question.description}</p>
                                    <h4>Đáp án đúng: {getAnswer(question)}</h4>
                                    <h4>Đáp án đã chọn: {question.selected_at ? question.selected_at.content_answer : "Chưa chọn"}</h4>
                                    <h4>Điểm: {question.score}</h4>
                                </div>
                            </li>
                        </ul>
                    ))}
                </>
            )}
        </div>
    );

    function getAnswer(question) {
        if (question.correct_at) {
            return question.correct_at.content_answer;
        } else if (question.selected_at) {
            return question.selected_at.content_answer;
        } else {
            return "Chưa xác định";
        }
    }
}
