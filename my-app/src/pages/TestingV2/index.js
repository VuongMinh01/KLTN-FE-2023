import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../css/PageQuanTri.css"
import Header from '../../component/LandingPageComponent/Header';
import '../../css/AddPart1.css';
import { Button, Input, Image } from "antd";
import { getTestDetail, submitTest2, getTestId, getScore } from "../../utils/APIRoutes";
import { useLocation, useNavigate } from 'react-router-dom';
import StopPage from "../../component/StopPage";
import StartPage from "../../component/StartPage";
import Logo from '../../assets/ToeicTesting.png'

import axios from "axios";

export default function TestingV2() {

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
        setCurrentPage('part 1'); // Change page to the first part of the test
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

        const selectedAnswer = dataSource[0]?.items[0]?.answers.find(answer => answer.order_answer === value);
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
        }).catch((error) => {
            console.error('Error fetching list of questions:', error);
            const errorMessage = error.response?.data?.message || ''; // Get the error message
            console.log(errorMessage, '1');
            if (errorMessage === "Test not found") {
                const confirmed = window.confirm("Bài kiểm tra này hiện chưa có câu hỏi. Nhấn OK để rời đi.");
                if (confirmed) {
                    navigate('/tests');
                }
            } else {
                const confirmed = window.confirm("Bạn cần phải đăng nhập với tài khoản đã xác minh để làm bài kiểm tra này. Nhấn OK để chuyển đến trang đăng nhập.");
                if (confirmed) {
                    navigate('/login');
                }
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


        const testData = {
            total_time: totalTime - remainingTime,
            test_id: getTestIdFromURL(location.pathname),
            questions: questions.map((question, index) => ({
                items: question.items.map((item, itemIndex) => {
                    if (item.child_questions && item.child_questions.length > 0) {
                        // If the item has child questions, map over them and set selected_at
                        const childItems = item.child_questions.map((child, childIndex) => ({
                            ...child,
                            selected_at: modifiedDataSource[String(index * 3 + childIndex)] ? modifiedDataSource[String(index * 3 + childIndex)].selected_at : null,
                        }));
                        return {
                            ...item,
                            child_questions: childItems,
                        };
                    } else {
                        // If no child questions, set selected_at for the item itself
                        return {
                            ...item,
                            selected_at: modifiedDataSource[String(index * 3 + itemIndex)] ? modifiedDataSource[String(index * 3 + itemIndex)].selected_at : null,
                        };
                    }
                }),
            })),
        };


        console.log(testData, 'test bug 1');

        // Make a POST request to submit the test data
        axios.post(submitTest2, testData, { headers })
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

                        {currentPage === 'part 1' && <Part1
                            changePage={changePage}
                            dataSource={dataSource}
                            selectedAnswers={selectedAnswersPart}
                            onRadioChange={handleRadioChangePart} />}
                        {currentPage === 'part 2' && <Part2
                            changePage={changePage}
                            dataSource={dataSource}
                            selectedAnswers={selectedAnswersPart}
                            onRadioChange={handleRadioChangePart} />}
                        {currentPage === 'part 3' && <Part5
                            changePage={changePage}
                            dataSource={dataSource}
                            selectedAnswers={selectedAnswersPart}
                            onRadioChange={handleRadioChangePart} />}
                        {currentPage === 'part 4' && <Part4
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

function Part1(props) {
    const handleClick = () => {
        // Call changePage function to change the page
        props.changePage('part 2');
        window.scrollTo(0, 0);

    };

    const handleRadioChangePart1 = (index, value) => {
        const updatedSelectedAnswers = [...props.selectedAnswers];
        updatedSelectedAnswers[index] = value;
        props.onRadioChange(index, value); // Call the parent component's handler
    };


    return (
        <Container fluid>
            <h1>Part 1: Mô tả tranh</h1>
            {Array.from({ length: 6 }).map((_, index) => (
                <Row gutter={24} key={index}>
                    <Col xs={12}>
                        <div style={{ border: '1px solid black', borderRadius: '20px', marginBottom: '10px' }}>
                            <h3 style={{ textAlign: 'left', marginLeft: '50px', marginTop: '10px' }}>Câu hỏi {index + 1}</h3>
                            <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                                <audio controls={true} src={props.dataSource[0]?.items[index]?.audio_content}></audio>
                            </div>
                            <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                                <Image alt="preview" src={props.dataSource[0]?.items[index]?.image_content} style={{ width: 300 }} />
                            </div>
                            <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                                <input
                                    type="radio"
                                    id={`A-${index}`}
                                    name={`Question-${index}`}
                                    value="A"
                                    checked={props.selectedAnswers[index] === "A"}
                                    onChange={() => handleRadioChangePart1(index, "A")}
                                />
                                <label htmlFor={`A-${index}`}>.A </label><br />
                                {/* <label htmlFor={`A-${index}`}>A. {props.dataSource[index].answers[0].content_answer}</label><br /> */}


                                <input
                                    type="radio"
                                    id={`B-${index}`}
                                    name={`Question-${index}`}
                                    value="B"
                                    checked={props.selectedAnswers[index] === "B"}
                                    onChange={() => handleRadioChangePart1(index, "B")}
                                />
                                <label htmlFor={`B-${index}`}>.B </label><br />
                                {/* <label htmlFor={`B-${index}`}>B. {props.dataSource[index].answers[1].content_answer}</label><br /> */}

                                <input
                                    type="radio"
                                    id={`C-${index}`}
                                    name={`Question-${index}`}
                                    value="C"
                                    checked={props.selectedAnswers[index] === "C"}
                                    onChange={() => handleRadioChangePart1(index, "C")}
                                />
                                <label htmlFor={`C-${index}`}>.C </label><br />
                                {/* <label htmlFor={`C-${index}`}>C. {props.dataSource[index].answers[2].content_answer}</label><br /> */}

                                <input
                                    type="radio"
                                    id={`D-${index}`}
                                    name={`Question-${index}`}
                                    value="D"
                                    checked={props.selectedAnswers[index] === "D"}
                                    onChange={() => handleRadioChangePart1(index, "D")}
                                />
                                <label htmlFor={`D-${index}`}>.D </label><br />
                                {/* <label htmlFor={`D-${index}`}>D. {props.dataSource[index].answers[3].content_answer}</label><br /> */}

                            </div>
                        </div>
                    </Col>
                </Row>
            ))}
            <Button onClick={handleClick}>Part kế tiếp</Button>
        </Container>
    );
}

function Part2(props) {
    const handleClick = () => {
        props.changePage('part 3');
        window.scrollTo(0, 0);

    };
    const handlePreviousClick = () => {
        props.changePage('part 1');
        window.scrollTo(0, 0);

    };
    const handleRadioChangePart2 = (index, value) => {
        const updatedSelectedAnswers = [...props.selectedAnswers];
        updatedSelectedAnswers[index + 6] = value; // Adjust index to match Part 2's data
        props.onRadioChange(index + 6, value); // Call the parent component's handler
    };

    const [selectedAnswers, setSelectedAnswers] = useState(props.selectedAnswers);

    const slicedDataSource = props.dataSource.length >= 25 ? props.dataSource.slice(6, 30) : Array.from({ length: 25 });

    return (
        <Container fluid>
            <h1>Part 2: Hỏi - Đáp</h1>
            {slicedDataSource.map((item, index) => (
                <Row gutter={24} key={index}>
                    <Col xs={12}>
                        <div style={{ border: '1px solid black', borderRadius: '20px', marginBottom: '10px' }}>
                            <h3 style={{ textAlign: 'left', marginLeft: '50px', marginTop: '10px' }}>Câu hỏi {index + 7}</h3>
                            <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                                <audio controls={true} src={props.dataSource[1]?.items[index]?.audio_content}></audio>
                            </div>
                            <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                                <input
                                    type="radio"
                                    id={`A-${index}`}
                                    name={`Question-${index}`}
                                    value="A"
                                    checked={props.selectedAnswers[index] === "A"}
                                    onChange={() => handleRadioChangePart2(index, "A")} />
                                <label htmlFor={`A-${index}`}>A</label><br />
                                <input
                                    type="radio"
                                    id={`B-${index}`}
                                    name={`Question-${index}`}
                                    value="B"
                                    checked={props.selectedAnswers[index] === "B"}
                                    onChange={() => handleRadioChangePart2(index, "B")}
                                />
                                <label htmlFor={`B-${index}`}>B</label><br />
                                <input
                                    type="radio"
                                    id={`C-${index}`}
                                    name={`Question-${index}`}
                                    value="C"
                                    checked={props.selectedAnswers[index] === "C"}
                                    onChange={() => handleRadioChangePart2(index, "C")} />
                                <label htmlFor={`C-${index}`}>C</label><br />
                                <input
                                    type="radio"
                                    id={`D-${index}`}
                                    name={`Question-${index}`}
                                    value="D"
                                    checked={props.selectedAnswers[index] === "D"}
                                    onChange={() => handleRadioChangePart2(index, "D")} />
                                <label htmlFor={`D-${index}`}>D</label><br />
                            </div>
                        </div>
                    </Col>
                </Row>
            ))}
            <Button onClick={handlePreviousClick}>Part trước</Button>
            <Button onClick={handleClick}>Part kế tiếp</Button>
        </Container>
    );
}




function Part5(props) {
    const handleClick = () => {
        // Call changePage function to change the page
        props.changePage('part 4');
        window.scrollTo(0, 0);

    };

    const handleRadioChangePart5 = (index, value) => {
        const updatedSelectedAnswers = [...props.selectedAnswers];
        updatedSelectedAnswers[index + 31] = value; // Adjust index to match Part 5's data
        props.onRadioChange(index + 31, value); // Call the parent component's handler
    };
    const [selectedAnswers, setSelectedAnswers] = useState(props.selectedAnswers);
    const slicedDataSource = props.dataSource.length >= 30 ? props.dataSource.slice(31, 59) : Array.from({ length: 30 });

    return (
        <Container fluid>
            <h1>Part 3: Hoàn thành câu</h1>
            {slicedDataSource.map((item, index) => (
                <Row gutter={24} key={index}>
                    <Col xs={12}>
                        <div style={{ border: '1px solid black', borderRadius: '20px', marginBottom: '10px' }}>

                            <h3 style={{ textAlign: 'left', marginLeft: '50px', marginTop: '10px' }}>Câu hỏi {index + 32}: {props.dataSource[2]?.items[index] && props.dataSource[2]?.items[index]?.content}</h3>

                            <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                                <input
                                    type="radio"
                                    id={`A-${index}`}
                                    name={`Question-${index}`}
                                    value="A"
                                    checked={props.selectedAnswers[index] === "A"}
                                    onChange={() => handleRadioChangePart5(index, "A")} />
                                <label htmlFor={`A-${index}`}>
                                    (A) {props.dataSource[2] && props.dataSource[2]?.items[index] && props.dataSource[2]?.items[index].answers[0] && props.dataSource[2]?.items[index].answers[0].content_answer}
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
                                    (B) {props.dataSource[2] && props.dataSource[2]?.items[index] && props.dataSource[2]?.items[index].answers[1] && props.dataSource[2]?.items[index].answers[1].content_answer}
                                </label><br />                                <input
                                    type="radio"
                                    id={`C-${index}`}
                                    name={`Question-${index}`}
                                    value="C"
                                    checked={props.selectedAnswers[index] === "C"}
                                    onChange={() => handleRadioChangePart5(index, "C")} />
                                <label htmlFor={`C-${index}`}>
                                    (C) {props.dataSource[2] && props.dataSource[2]?.items[index] && props.dataSource[2]?.items[index].answers[2] && props.dataSource[2]?.items[index].answers[2].content_answer}
                                </label><br />                                <input
                                    type="radio"
                                    id={`D-${index}`}
                                    name={`Question-${index}`}
                                    value="D"
                                    checked={props.selectedAnswers[index] === "D"}
                                    onChange={() => handleRadioChangePart5(index, "D")} />
                                <label htmlFor={`D-${index}`}>
                                    (D) {props.dataSource[2] && props.dataSource[2]?.items[index] && props.dataSource[2]?.items[index].answers[3] && props.dataSource[2]?.items[index].answers[3].content_answer}
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




function Part4(props) {
    const [selectedAnswersPart, setSelectedAnswersPart] = useState([]);
    const [modifiedDataSource, setModifiedDataSource] = useState([]);

    useEffect(() => {
        // Initialize modifiedDataSource based on dataSource
        const initialDataSource = props.dataSource[3]?.items.map(item => ({
            ...item,
            child_questions: item.child_questions.map(childQuestion => ({
                ...childQuestion,
                selected_at: null
            }))
        }));
        setModifiedDataSource(initialDataSource || []);
    }, [props.dataSource]);

    const handleClick = () => {
        props.changePage('part 3');
        window.scrollTo(0, 0);
    };

    const handleRadioChangePart = (index, value, parentIndex, childIndex) => {
        console.log("handleRadioChangePart called");
        const updatedSelectedAnswers = [...selectedAnswersPart];
        updatedSelectedAnswers[index] = value;
        setSelectedAnswersPart(updatedSelectedAnswers);

        const updatedDataSource = [...modifiedDataSource];

        const selectedAnswer = props.dataSource[3]?.items[parentIndex]?.child_questions[childIndex]?.answers.find(answer => answer.order_answer === value);
        if (selectedAnswer) {
            const { content_answer, order_answer } = selectedAnswer;

            if (!updatedDataSource[parentIndex]) {
                updatedDataSource[parentIndex] = { child_questions: [] };
            }

            if (!updatedDataSource[parentIndex].child_questions[childIndex]) {
                updatedDataSource[parentIndex].child_questions[childIndex] = {};
            }

            updatedDataSource[parentIndex].child_questions[childIndex] = {
                ...updatedDataSource[parentIndex].child_questions[childIndex],
                selected_at: {
                    content_answer,
                    order_answer
                }
            };

            setModifiedDataSource(updatedDataSource);
            console.log("Data at index ", index, updatedDataSource[parentIndex]);
        } else {
            console.log("Selected answer not found for index ", index, " with value ", value);
        }
    };

    const handleRadioChangePart4 = (index, value, parentIndex, childIndex) => {
        handleRadioChangePart(index, value, parentIndex, childIndex);
    };

    const slicedDataSource = props.dataSource[3]?.items.slice(0, 3) || [];

    const renderGroupedQuestions = () => {
        const groups = [];
        for (let i = 0; i < slicedDataSource.length; i++) {
            const item = slicedDataSource[i];

            groups.push(
                <div key={i} style={{ border: '1px solid black', borderRadius: '20px', marginBottom: '20px', padding: '10px' }}>
                    {item.child_questions[0]?.audio_content && (
                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                            <audio controls={true} src={item.child_questions[0].audio_content}></audio>
                        </div>
                    )}
                    {item.child_questions.map((childQuestion, index) => (
                        <Row gutter={24} key={index}>
                            <Col xs={12}>
                                <div style={{ marginBottom: '10px' }}>
                                    <h3 style={{ textAlign: 'left', marginLeft: '50px', marginTop: '10px' }}>
                                        Câu hỏi {index + i * 3 + 62}: {childQuestion.content}
                                    </h3>
                                    <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                                        {childQuestion.answers.map((answer, ansIndex) => (
                                            <div key={ansIndex}>
                                                <input
                                                    type="radio"
                                                    id={`${answer.order_answer}-${index + i * 3}`}
                                                    name={`Question-${index + i * 3}`}
                                                    value={answer.order_answer}
                                                    checked={selectedAnswersPart[index + i * 3] === answer.order_answer}
                                                    onChange={() => handleRadioChangePart4(index + i * 3, answer.order_answer, i, index)}
                                                />
                                                <label htmlFor={`${answer.order_answer}-${index + i * 3}`}>
                                                    ({answer.order_answer}) {answer.content_answer}
                                                </label><br />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    ))}
                </div>
            );
        }
        return groups;
    };

    return (
        <Container fluid>
            <h1>Part 4: Nghe hiểu</h1>
            {renderGroupedQuestions()}
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
