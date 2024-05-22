import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../css/PageQuanTri.css"
import Header from '../../component/LandingPageComponent/Header';
import '../../css/AddPart1.css';
import { Button, Input, Image } from "antd";
import { getQuestionList, submitTest, getTestId, getScore } from "../../utils/APIRoutes";
import { useLocation, useNavigate } from 'react-router-dom';
import StartPage from "../../component/StartPage";
import axios from "axios";
import StopPage from "../../component/StopPage";
import Logo from '../../assets/ToeicTesting.png'
export default function FullTesting() {

    const [currentPage, setCurrentPage] = useState('start');
    const location = useLocation();
    const navigate = useNavigate();
    // clock
    const [totalTime, setTotalTime] = useState(0); // State to store total time
    const [remainingTime, setRemainingTime] = useState(0);
    const [timer, setTimer] = useState(null);

    const changePage = (page) => {
        setCurrentPage(page);
    };
    const [dataSource, setDataSource] = useState([])
    const [selectedAnswersPart, setSelectedAnswersPart] = useState(Array.from({ length: 200 }).fill(null));


    const [questions, setQuestions] = useState([]); // State to store complete question data
    const [totalMarks, setTotalMarks] = useState(null); // Initialize totalMarks state
    const [totalCorrect, setTotalCorrect] = useState(null);
    const [totalTime1, setTotalTime1] = useState(null);

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
        getListQuestion(test_id);
        fetchTestTimeline(test_id); // Fetch test timeline when component mounts
    }, [location.pathname]);

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

    const handleRadioChangePart = (index, value) => {
        console.log("handleRadioChangePart called");
        const updatedSelectedAnswers = [...selectedAnswersPart];
        updatedSelectedAnswers[index] = value;
        setSelectedAnswersPart(updatedSelectedAnswers);

        const selectedAnswer = dataSource[index]?.answers.find(answer => answer.order_answer === value);
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
        const getQuestionList1 = `${getQuestionList}/${test_id}`;
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
            const confirmed = window.confirm("Bạn cần phải đăng nhập để làm bài này. Nhấn OK để chuyển đến trang đăng nhập.");
            if (confirmed) {
                navigate('/login');
            }
        });
    }

    //clock
    const fetchTestTimeline = (test_id, headers) => {
        // Fetch test timeline using axios
        const testTimelineUrl = `${getTestId}/${test_id}`;
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
    const test_id = getTestIdFromURL(location.pathname);

    function showToast(message) {
        // Replace this with your toast alert implementation
        // For example, if you're using react-toastify:
        // toast.error(message);
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

        // Calculate the total time taken by the test
        const total_time = totalTime - remainingTime;

        // Construct the testData object with selected answers and total time
        const testData = {
            total_time: totalTime - remainingTime,
            test_id: getTestIdFromURL(location.pathname),
            questions: questions.map((question, index) => ({
                _id: question._id,
                test_id: question.test_id,
                num_quest: question.num_quest,
                description: question.description,
                content: question.content,
                score: question.score,
                created_at: question.created_at,
                updated_at: question.updated_at,
                answers: question.answers,
                correct_at: question.correct_at,
                selected_at: modifiedDataSource[index] ? modifiedDataSource[index].selected_at : null
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



            {/* <div className="sidebar">
                <ul>
                    <li><button onClick={() => changePage('part 1')}>Part 1</button></li>
                    <li><button onClick={() => changePage('part 2')}>Part 2</button></li>
                    <li><button onClick={() => changePage('part 3')}>Part 3</button></li>
                    <li><button onClick={() => changePage('part 4')}>Part 4</button></li>
                    <li><button onClick={() => changePage('part 5')}>Part 5</button></li>
                    <li><button onClick={() => changePage('part 6')}>Part 6</button></li>
                    <li><button onClick={() => changePage('part 7')}>Part 7</button></li>
                </ul>
            </div> */}
            <div className="main-content">
                {currentPage === 'start' && <StartPage onStart={handleStartTest} />}
                {currentPage === 'stop' && <StopPage onContinue={continueTest} />}

                {currentPage !== 'start' && currentPage !== 'stop' && (
                    <div>
                        {/* Render test questions based on currentPage */}
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
                        {currentPage === 'part 3' && <Part3
                            changePage={changePage}
                            dataSource={dataSource}
                            selectedAnswers={selectedAnswersPart}
                            onRadioChange={handleRadioChangePart} />}
                        {currentPage === 'part 4' && <Part4
                            changePage={changePage}
                            dataSource={dataSource}
                            selectedAnswers={selectedAnswersPart}
                            onRadioChange={handleRadioChangePart} />}
                        {currentPage === 'part 5' && <Part5
                            changePage={changePage}
                            dataSource={dataSource}
                            selectedAnswers={selectedAnswersPart}
                            onRadioChange={handleRadioChangePart} />}
                        {currentPage === 'part 6' && <Part6
                            changePage={changePage}
                            dataSource={dataSource}
                            selectedAnswers={selectedAnswersPart}
                            onRadioChange={handleRadioChangePart} />}
                        {currentPage === 'part 7' && <Part7
                            changePage={changePage}
                            dataSource={dataSource}
                            selectedAnswers={selectedAnswersPart}
                            onRadioChange={handleRadioChangePart} />}

                        {currentPage !== 'finish' && currentPage !== 'xem' && remainingTime > 0 && (
                            <h3 style={{ textAlign: 'center', color: 'cornflowerblue' }}>
                                Thời gian còn lại: {remainingTime} minutes
                            </h3>
                        )}
                    </div>

                )}


                {currentPage === 'finish' && <Finish totalMarks={totalMarks} totalCorrect={totalCorrect} totalTime1={totalTime1} changePage={changePage}
                />}
                {currentPage === 'xem' && <ScorecardDetail totalMarks={totalMarks} totalTime1={totalTime1} totalCorrect={totalCorrect} testId={test_id} />}

                {currentPage !== 'stop' && currentPage !== 'finish' && currentPage !== 'start' && currentPage !== 'xem' && (
                    <Button onClick={stopTimerAndChangePage} style={{
                        margin: '20px 20px 20px 20px',
                        background: 'cornflowerblue',
                        color: 'white',
                        borderRadius: '20px',
                        width: '90%',
                    }}>Tạm ngừng bài làm</Button>
                )}
            </div>
            {currentPage !== 'stop' && currentPage !== 'finish' && currentPage !== 'start' && currentPage !== 'xem' && (

                <Button onClick={handleSubmit} style={{
                    margin: '10px 10px 10px 10px',
                    background: 'cornflowerblue',
                    color: 'white',
                    borderRadius: '20px',
                }}>Nộp bài</Button>
            )}

        </div>
    );
}

function Part1(props) {
    const handleClick = () => {
        // Call changePage function to change the page
        props.changePage('part 2');
    };

    const handleRadioChangePart1 = (index, value) => {
        const updatedSelectedAnswers = [...props.selectedAnswers];
        updatedSelectedAnswers[index] = value;
        props.onRadioChange(index, value); // Call the parent component's handler
    };


    return (
        <Container fluid>
            <h1 style={{ textAlign: 'center', color: 'cornflowerblue' }}>Part 1</h1>
            {Array.from({ length: 6 }).map((_, index) => (
                <Row gutter={24} key={index}>
                    <Col xs={12}>
                        <div style={{
                            border: '1px solid black',
                            borderRadius: '20px', marginBottom: '10px'
                        }}>
                            <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu {index + 1}</h3>
                            <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                                <audio controls={true} src={props.dataSource[index]?.description}></audio>
                            </div>
                            <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                                <Image alt="preview" src={props.dataSource[index]?.content} style={{ width: 300 }} />
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
            ))
            }
            <Button onClick={handleClick}>Next Part</Button>
        </Container >
    );
}

function Part2(props) {
    const handleClick = () => {
        // Call changePage function to change the page
        props.changePage('part 3');
    };
    const handlePreviousClick = () => {
        props.changePage('part 1');
    };
    const handleRadioChangePart2 = (index, value) => {
        const updatedSelectedAnswers = [...props.selectedAnswers];
        updatedSelectedAnswers[index + 6] = value; // Adjust index to match Part 2's data
        props.onRadioChange(index + 6, value); // Call the parent component's handler
    };

    const [selectedAnswers, setSelectedAnswers] = useState(props.selectedAnswers);

    // Ensure that the dataSource has at least 25 items, otherwise, fill it with dummy items
    const slicedDataSource = props.dataSource.length >= 25 ? props.dataSource.slice(6, 30) : Array.from({ length: 25 });

    return (
        <Container fluid>
            <h1 style={{ textAlign: 'center', color: 'cornflowerblue' }}>Part 2</h1>
            {slicedDataSource.map((item, index) => (
                <Row gutter={24} key={index}>
                    <Col xs={12}>
                        <div style={{ border: '1px solid black', borderRadius: '20px', marginBottom: '10px' }}>
                            <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu {index + 7}</h3>
                            <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                                <audio controls={true} src={props.dataSource[index + 6]?.description}></audio>
                            </div>

                            <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                                <input
                                    type="radio"
                                    id={`A-${index}`}
                                    name={`Question-${index}`}
                                    value="A"
                                    checked={props.selectedAnswers[index + 6] === "A"}
                                    onChange={() => handleRadioChangePart2(index, "A")} />
                                <label htmlFor={`A-${index}`}>A</label><br />
                                <input
                                    type="radio"
                                    id={`B-${index}`}
                                    name={`Question-${index}`}
                                    value="B"
                                    checked={props.selectedAnswers[index + 6] === "B"}
                                    onChange={() => handleRadioChangePart2(index, "B")}
                                />
                                <label htmlFor={`B-${index}`}>B</label><br />
                                <input
                                    type="radio"
                                    id={`C-${index}`}
                                    name={`Question-${index}`}
                                    value="C"
                                    checked={props.selectedAnswers[index + 6] === "C"}
                                    onChange={() => handleRadioChangePart2(index, "C")} />
                                <label htmlFor={`C-${index}`}>C</label><br />
                                <input
                                    type="radio"
                                    id={`D-${index}`}
                                    name={`Question-${index}`}
                                    value="D"
                                    checked={props.selectedAnswers[index + 6] === "D"}
                                    onChange={() => handleRadioChangePart2(index, "D")} />
                                <label htmlFor={`D-${index}`}>D</label><br />
                            </div>
                        </div>
                    </Col>
                </Row>
            ))}
            <Button onClick={handlePreviousClick}>Previous Part</Button>
            <Button onClick={handleClick}>Next Part</Button>
        </Container>
    );
}

function Part3(props) {
    const handleClick = () => {
        // Call changePage function to change the page
        props.changePage('part 4');
    };
    const handlePreviousClick = () => {
        props.changePage('part 2');
    };

    const handleRadioChangePart3 = (index, value) => {
        const updatedSelectedAnswers = [...props.selectedAnswers];
        updatedSelectedAnswers[index] = value; // Adjust index to match Part 4's data
        props.onRadioChange(index, value); // Call the parent component's handler
    };

    const slicedDataSource = props.dataSource.length >= 39 ? props.dataSource.slice(31, 69) : Array.from({ length: 39 });


    //     

    const renderItemsInGroupsOfThree = () => {
        const groups = [];
        const { dataSource, selectedAnswers } = props;

        for (let i = 0; i < dataSource.length; i += 3) {
            groups.push(
                <div key={i / 3} style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', border: '1px solid black', borderRadius: '20px', padding: '10px' }}>
                    <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                        {dataSource[i + 31] && <audio controls={true} src={dataSource[i + 31].description}></audio>}
                    </div>
                    <div style={{ display: 'grid' }}>
                        {dataSource.slice(i, i + 3).map((item, index) => (
                            <div key={index} style={{ marginRight: '20px' }}>
                                <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu {index + i + 32}. {dataSource[index + i + 31] && dataSource[index + i + 31].content}</h3>
                                <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                                    <input
                                        type="radio"
                                        id={`A-${index}`}
                                        name={`Question-${index}`}
                                        value="A"
                                        checked={selectedAnswers[i + index + 31] === "A"}
                                        onChange={() => handleRadioChangePart3(i + index + 31, "A")} />
                                    <label htmlFor={`A-${index}`}>
                                        .A {dataSource[index + i + 31] && dataSource[index + i + 31].answers && dataSource[index + i + 31].answers[0] && dataSource[index + i + 31].answers[0].content_answer}
                                    </label><br />
                                    <input
                                        type="radio"
                                        id={`B-${index}`}
                                        name={`Question-${index}`}
                                        value="B"
                                        checked={selectedAnswers[i + index + 31] === "B"}
                                        onChange={() => handleRadioChangePart3(i + index + 31, "B")}
                                    />
                                    <label htmlFor={`B-${index}`}>
                                        .B {dataSource[index + i + 31] && dataSource[index + i + 31].answers && dataSource[index + i + 31].answers[1] && dataSource[index + i + 31].answers[1].content_answer}
                                    </label><br />
                                    <input
                                        type="radio"
                                        id={`C-${index}`}
                                        name={`Question-${index}`}
                                        value="C"
                                        checked={selectedAnswers[i + index + 31] === "C"}
                                        onChange={() => handleRadioChangePart3(i + index + 31, "C")} />
                                    <label htmlFor={`C-${index}`}>
                                        .C {dataSource[index + i + 31] && dataSource[index + i + 31].answers && dataSource[index + i + 31].answers[2] && dataSource[index + i + 31].answers[2].content_answer}
                                    </label><br />
                                    <input
                                        type="radio"
                                        id={`D-${index}`}
                                        name={`Question-${index}`}
                                        value="D"
                                        checked={selectedAnswers[i + index + 31] === "D"}
                                        onChange={() => handleRadioChangePart3(i + index + 31, "D")} />
                                    <label htmlFor={`D-${index}`}>
                                        .D {dataSource[index + i + 31] && dataSource[index + i + 31].answers && dataSource[index + i + 31].answers[3] && dataSource[index + i + 31].answers[3].content_answer}
                                    </label><br />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return groups;
    };




    return (
        <Container fluid>
            <h1 style={{ textAlign: 'center', color: 'cornflowerblue' }}>Part 3</h1>
            {renderItemsInGroupsOfThree()}
            <Button onClick={handlePreviousClick}>Previous Part</Button>
            <Button onClick={handleClick}>Next Part</Button>
        </Container>
    );
}

function Part4(props) {

    const handlePreviousClick = () => {
        props.changePage('part 3');
    };

    const handleRadioChangePart4 = (index, value) => {
        const updatedSelectedAnswers = [...props.selectedAnswers];
        updatedSelectedAnswers[index] = value; // Adjust index to match Part 4's data
        props.onRadioChange(index, value); // Call the parent component's handler
    };

    const slicedDataSource = props.dataSource.length >= 30 ? props.dataSource.slice(70, 99) : Array.from({ length: 30 });


    const renderItemsInGroupsOfThree = () => {
        const groups = [];
        for (let i = 0; i < slicedDataSource.length; i += 3) {
            groups.push(
                <div key={i / 3} style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', border: '1px solid black', borderRadius: '20px', padding: '10px' }}>
                    <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                        {props.dataSource[i + 70] && <audio controls={true} src={props.dataSource[i + 70].description}></audio>}
                    </div>
                    <div style={{ display: 'grid' }}>
                        {props.dataSource.slice(i, i + 3).map((item, index) => (
                            <div key={index} style={{ marginRight: '20px' }}>
                                <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu {index + i + 71}. {props.dataSource[index + i + 70] && props.dataSource[index + i + 70].content}</h3>
                                <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                                    <input
                                        type="radio"
                                        id={`A-${index}`}
                                        name={`Question-${index}`}
                                        value="A"
                                        checked={props.selectedAnswers[i + index + 70] === "A"}
                                        onChange={() => handleRadioChangePart4(i + index + 70, "A")} />
                                    <label htmlFor={`A-${index}`}>
                                        .A {props.dataSource[index + i + 70] && props.dataSource[index + i + 70].answers && props.dataSource[index + i + 70].answers[0] && props.dataSource[index + i + 70].answers[0].content_answer}
                                    </label><br />                                      <input
                                        type="radio"
                                        id={`B-${index}`}
                                        name={`Question-${index}`}
                                        value="B"
                                        checked={props.selectedAnswers[i + index + 70] === "B"}
                                        onChange={() => handleRadioChangePart4(i + index + 70, "B")}
                                    />
                                    <label htmlFor={`B-${index}`}>
                                        .B {props.dataSource[index + i + 70] && props.dataSource[index + i + 70].answers && props.dataSource[index + i + 70].answers[1] && props.dataSource[index + i + 70].answers[1].content_answer}
                                    </label><br />                                        <input
                                        type="radio"
                                        id={`C-${index}`}
                                        name={`Question-${index}`}
                                        value="C"
                                        checked={props.selectedAnswers[i + index + 70] === "C"}
                                        onChange={() => handleRadioChangePart4(i + index + 70, "C")} />
                                    <label htmlFor={`C-${index}`}>
                                        .C {props.dataSource[index + i + 70] && props.dataSource[index + i + 70].answers && props.dataSource[index + i + 70].answers[2] && props.dataSource[index + i + 70].answers[2].content_answer}
                                    </label><br />                                        <input
                                        type="radio"
                                        id={`D-${index}`}
                                        name={`Question-${index}`}
                                        value="D"
                                        checked={props.selectedAnswers[i + index + 70] === "D"}
                                        onChange={() => handleRadioChangePart4(i + index + 70, "D")} />
                                    <label htmlFor={`D-${index}`}>
                                        .D {props.dataSource[index + i + 70] && props.dataSource[index + i + 70].answers && props.dataSource[index + i + 70].answers[3] && props.dataSource[index + i + 70].answers[3].content_answer}
                                    </label><br />                                    </div>
                            </div>
                        ))}
                    </div>

                </div>
            );
        }
        return groups;
    };


    return (
        <Container fluid>
            <h1>Part 4</h1>
            {renderItemsInGroupsOfThree()}
            <Button onClick={handlePreviousClick}>Previous Part</Button>
        </Container>
    );
}


function Part5(props) {
    const handleClick = () => {
        // Call changePage function to change the page
        props.changePage('part 6');
    };
    const handlePreviousClick = () => {
        props.changePage('part 4');
    };

    const handleRadioChangePart5 = (index, value) => {
        const updatedSelectedAnswers = [...props.selectedAnswers];
        updatedSelectedAnswers[index] = value; // Adjust index to match Part 5's data
        props.onRadioChange(index, value); // Call the parent component's handler
    };

    // Ensure that the dataSource has at least 39 items, otherwise, fill it with dummy items
    const slicedDataSource = props.dataSource.length >= 30 ? props.dataSource.slice(100, 129) : Array.from({ length: 30 });

    return (
        <Container fluid>
            <h1 style={{ textAlign: 'center', color: 'cornflowerblue' }}>Part 5</h1>
            {slicedDataSource.map((item, index) => (
                <Row gutter={24} key={index}>
                    <Col xs={12}>
                        <div style={{ border: '1px solid black', borderRadius: '20px', marginBottom: '10px' }}>
                            <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu {index + 101}. {props.dataSource[index + 100] && props.dataSource[index + 100].content}</h3>
                            <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                                <input
                                    type="radio"
                                    id={`A-${index}`}
                                    name={`Question-${index}`}
                                    value="A"
                                    checked={props.selectedAnswers[index + 100] === "A"}
                                    onChange={() => handleRadioChangePart5(index, "A")} />
                                <label htmlFor={`D-${index}`}>
                                    (A) {props.dataSource[index + 100] && props.dataSource[index + 100].answers && props.dataSource[index + 100].answers[0] && props.dataSource[index + 100].answers[0].content_answer}
                                </label><br />
                                <input
                                    type="radio"
                                    id={`B-${index}`}
                                    name={`Question-${index}`}
                                    value="B"
                                    checked={props.selectedAnswers[index + 100] === "B"}
                                    onChange={() => handleRadioChangePart5(index, "B")}
                                />
                                <label htmlFor={`D-${index}`}>
                                    (B) {props.dataSource[index + 100] && props.dataSource[index + 100].answers && props.dataSource[index + 100].answers[1] && props.dataSource[index + 100].answers[1].content_answer}
                                </label><br />                                <input
                                    type="radio"
                                    id={`C-${index}`}
                                    name={`Question-${index}`}
                                    value="C"
                                    checked={props.selectedAnswers[index + 100] === "C"}
                                    onChange={() => handleRadioChangePart5(index, "C")} />
                                <label htmlFor={`D-${index}`}>
                                    (C) {props.dataSource[index + 100] && props.dataSource[index + 100].answers && props.dataSource[index + 100].answers[2] && props.dataSource[index + 100].answers[2].content_answer}
                                </label><br />                                <input
                                    type="radio"
                                    id={`D-${index}`}
                                    name={`Question-${index}`}
                                    value="D"
                                    checked={props.selectedAnswers[index + 100] === "D"}
                                    onChange={() => handleRadioChangePart5(index, "D")} />
                                <label htmlFor={`D-${index}`}>
                                    (D) {props.dataSource[index + 100] && props.dataSource[index + 100].answers && props.dataSource[index + 100].answers[3] && props.dataSource[index + 100].answers[3].content_answer}
                                </label><br />
                            </div>
                        </div>
                    </Col>
                </Row>
            ))}
            <Button onClick={handlePreviousClick}>Previous Part</Button>
            <Button onClick={handleClick}>Next Part</Button>
        </Container>
    );
}


function Part6(props) {
    const isUrl = (str) => {
        try {
            new URL(str);
            return true;
        } catch {
            return false;
        }
    };

    const handleClick = () => {
        props.changePage('part 7');
    };

    const handlePreviousClick = () => {
        props.changePage('part 5');
    };

    const handleRadioChangePart6 = (index, value) => {
        const updatedSelectedAnswers = [...props.selectedAnswers];
        updatedSelectedAnswers[index] = value;
        props.onRadioChange(index, value);
    };

    const slicedDataSource = props.dataSource.length >= 16 ? props.dataSource.slice(130, 145) : Array.from({ length: 16 });

    const renderItemsInGroupsOfFour = () => {
        const groups = [];
        for (let i = 0; i < slicedDataSource.length; i += 4) {
            const groupItems = slicedDataSource.slice(i, i + 4);
            const groupElements = groupItems.map((item, index) => {
                const dataIndex = i + index + 130;
                return (
                    <div key={index} style={{ marginRight: '20px' }}>
                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                            {props.dataSource[index + i + 130]?.description && isUrl(props.dataSource[index + i + 130]?.description) ? (
                                <Image alt="preview" src={props.dataSource[index + i + 130]?.description} style={{ width: 300 }} />
                            ) : (
                                <span>{props.dataSource[index + i + 130]?.description}</span>
                            )}
                        </div>
                        <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu {index + i + 131}. {props.dataSource[index + i + 130] && props.dataSource[index + i + 130].content}</h3>
                        <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                            <input
                                type="radio"
                                id={`A-${index}`}
                                name={`Question-${index}`}
                                value="A"
                                checked={props.selectedAnswers[i + index + 130] === "A"}
                                onChange={() => handleRadioChangePart6(i + index + 130, "A")} />
                            <label htmlFor={`A-${index}`}>
                                .A {props.dataSource[index + i + 130] && props.dataSource[index + i + 130].answers && props.dataSource[index + i + 130].answers[0] && props.dataSource[index + i + 130].answers[0].content_answer}
                            </label><br />
                            <input
                                type="radio"
                                id={`B-${index}`}
                                name={`Question-${index}`}
                                value="B"
                                checked={props.selectedAnswers[i + index + 130] === "B"}
                                onChange={() => handleRadioChangePart6(i + index + 130, "B")}
                            />
                            <label htmlFor={`B-${index}`}>
                                .B {props.dataSource[index + i + 130] && props.dataSource[index + i + 130].answers && props.dataSource[index + i + 130].answers[1] && props.dataSource[index + i + 30].answers[1].content_answer}
                            </label><br />
                            <input
                                type="radio"
                                id={`C-${index}`}
                                name={`Question-${index}`}
                                value="C"
                                checked={props.selectedAnswers[i + index + 130] === "C"}
                                onChange={() => handleRadioChangePart6(i + index + 130, "C")} />
                            <label htmlFor={`C-${index}`}>
                                .C {props.dataSource[index + i + 130] && props.dataSource[index + i + 130].answers && props.dataSource[index + i + 130].answers[2] && props.dataSource[index + i + 30].answers[2].content_answer}
                            </label><br />
                            <input
                                type="radio"
                                id={`D-${index}`}
                                name={`Question-${index}`}
                                value="D"
                                checked={props.selectedAnswers[i + index + 130] === "D"}
                                onChange={() => handleRadioChangePart6(i + index + 130, "D")} />
                            <label htmlFor={`D-${index}`}>
                                .D {props.dataSource[index + i + 130] && props.dataSource[index + i + 130].answers && props.dataSource[index + i + 130].answers[3] && props.dataSource[index + i + 30].answers[3].content_answer}
                            </label><br />
                        </div>
                    </div>
                );
            });
            groups.push(
                <div key={i / 4} style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', border: '1px solid black', borderRadius: '20px', padding: '10px' }}>
                    {groupElements}
                </div>
            );
        }
        return groups;
    };

    return (
        <Container fluid>
            <h1>Part 6</h1>
            {renderItemsInGroupsOfFour()}
            <Button onClick={handlePreviousClick}>Previous Part</Button>
            <Button onClick={handleClick}>Submit</Button>
        </Container>
    );
}




function Part7(props) {
    const isUrl = (str) => {
        try {
            new URL(str);
            return true;
        } catch {
            return false;
        }
    };

    const handlePreviousClick = () => {
        props.changePage('part 6');
    };

    const handleClick = () => {
        // Handle submit logic here
    };

    const handleRadioChangePart7 = (index, value) => {
        const updatedSelectedAnswers = [...props.selectedAnswers];
        updatedSelectedAnswers[index] = value; // Adjusted index for part 7
        props.onRadioChange(index, value); // Adjusted index for part 7
    };

    const slicedDataSourceTwo = props.dataSource.length >= 10 ? props.dataSource.slice(146, 156) : Array.from({ length: 10 });
    const slicedDataSourceFour = props.dataSource.length >= 56 ? props.dataSource.slice(156) : [];

    const renderItemsInGroupsOfTwo = () => {
        const groups = [];
        for (let i = 0; i < slicedDataSourceTwo.length; i += 2) {
            groups.push(
                <div key={i / 2} style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', border: '1px solid black', borderRadius: '20px', padding: '10px' }}>
                    <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                        {props.dataSource[i + 146]?.description && isUrl(props.dataSource[i + 146]?.description) ? (
                            <Image alt="preview" src={props.dataSource[i + 146]?.description} style={{ width: 300 }} />
                        ) : (
                            <span>{props.dataSource[i + 146]?.description}</span>
                        )}
                    </div>
                    <div style={{ display: 'grid' }}>
                        {slicedDataSourceTwo.slice(i, i + 2).map((item, index) => (
                            <div key={index} style={{ marginRight: '20px' }}>
                                <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu {index + i + 147}. {props.dataSource[index + i + 146] && props.dataSource[index + i + 146].content}</h3>
                                <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                                    <input
                                        type="radio"
                                        id={`A-${index}`}
                                        name={`Question-${index}`}
                                        value="A"
                                        checked={props.selectedAnswers[i + index + 46] === "A"}
                                        onChange={() => handleRadioChangePart7(i + index + 46, "A")} />
                                    <label htmlFor={`A-${index}`}>
                                        .A {props.dataSource[index + i + 146] && props.dataSource[index + i + 146].answers && props.dataSource[index + i + 146].answers[0] && props.dataSource[index + i + 146].answers[0].content_answer}
                                    </label><br />
                                    {/* Repeat input elements for options B, C, D */}
                                    <input
                                        type="radio"
                                        id={`B-${index}`}
                                        name={`Question-${index}`}
                                        value="B"
                                        checked={props.selectedAnswers[i + index + 146] === "B"}
                                        onChange={() => handleRadioChangePart7(i + index + 146, "B")} />
                                    <label htmlFor={`B-${index}`}>
                                        .B {props.dataSource[index + i + 146] && props.dataSource[index + i + 146].answers && props.dataSource[index + i + 146].answers[1] && props.dataSource[index + i + 146].answers[1].content_answer}
                                    </label><br />
                                    <input
                                        type="radio"
                                        id={`C-${index}`}
                                        name={`Question-${index}`}
                                        value="C"
                                        checked={props.selectedAnswers[i + index + 146] === "C"}
                                        onChange={() => handleRadioChangePart7(i + index + 146, "C")} />
                                    <label htmlFor={`C-${index}`}>
                                        .C {props.dataSource[index + i + 146] && props.dataSource[index + i + 146].answers && props.dataSource[index + i + 146].answers[2] && props.dataSource[index + i + 146].answers[2].content_answer}
                                    </label><br />
                                    <input
                                        type="radio"
                                        id={`D-${index}`}
                                        name={`Question-${index}`}
                                        value="D"
                                        checked={props.selectedAnswers[i + index + 146] === "D"}
                                        onChange={() => handleRadioChangePart7(i + index + 146, "D")} />
                                    <label htmlFor={`D-${index}`}>
                                        .D {props.dataSource[index + i + 146] && props.dataSource[index + i + 146].answers && props.dataSource[index + i + 146].answers[3] && props.dataSource[index + i + 146].answers[3].content_answer}
                                    </label><br />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return groups;
    };

    const renderItemsInGroupsOfFour = () => {
        const groups = [];
        for (let i = 0; i < slicedDataSourceFour.length; i += 4) {
            groups.push(
                <div key={i / 4} style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', border: '1px solid black', borderRadius: '20px', padding: '10px' }}>
                    <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                        {props.dataSource[i + 156]?.description && isUrl(props.dataSource[i + 156]?.description) ? (
                            <Image alt="preview" src={props.dataSource[i + 56]?.description} style={{ width: 300 }} />
                        ) : (
                            <span>{props.dataSource[i + 156]?.description}</span>
                        )}
                    </div>
                    <div style={{ display: 'grid' }}>
                        {slicedDataSourceFour.slice(i, i + 4).map((item, index) => (
                            <div key={index} style={{ marginRight: '20px' }}>
                                <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu {index + i + 157}. {props.dataSource[index + i + 156] && props.dataSource[index + i + 156].content}</h3>
                                <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                                    <input
                                        type="radio"
                                        id={`A-${index}`}
                                        name={`Question-${index}`}
                                        value="A"
                                        checked={props.selectedAnswers[i + index + 156] === "A"}
                                        onChange={() => handleRadioChangePart7(i + index + 156, "A")} />
                                    <label htmlFor={`A-${index}`}>
                                        .A {props.dataSource[index + i + 56] && props.dataSource[index + i + 56].answers && props.dataSource[index + i + 156].answers[0] && props.dataSource[index + i + 156].answers[0].content_answer}
                                    </label><br />
                                    {/* Repeat input elements for options B, C, D */}
                                    <input
                                        type="radio"
                                        id={`B-${index}`}
                                        name={`Question-${index}`}
                                        value="B"
                                        checked={props.selectedAnswers[i + index + 56] === "B"}
                                        onChange={() => handleRadioChangePart7(i + index + 56, "B")} />
                                    <label htmlFor={`B-${index}`}>
                                        .B {props.dataSource[index + i + 156] && props.dataSource[index + i + 156].answers && props.dataSource[index + i + 156].answers[1] && props.dataSource[index + i + 156].answers[1].content_answer}
                                    </label><br />
                                    <input
                                        type="radio"
                                        id={`C-${index}`}
                                        name={`Question-${index}`}
                                        value="C"
                                        checked={props.selectedAnswers[i + index + 156] === "A"}
                                        onChange={() => handleRadioChangePart7(i + index + 156, "A")} />
                                    <label htmlFor={`C-${index}`}>
                                        .C {props.dataSource[index + i + 156] && props.dataSource[index + i + 156].answers && props.dataSource[index + i + 156].answers[2] && props.dataSource[index + i + 156].answers[2].content_answer}
                                    </label><br />
                                    <input
                                        type="radio"
                                        id={`D-${index}`}
                                        name={`Question-${index}`}
                                        value="D"
                                        checked={props.selectedAnswers[i + index + 156] === "A"}
                                        onChange={() => handleRadioChangePart7(i + index + 156, "A")} />
                                    <label htmlFor={`D-${index}`}>
                                        .D {props.dataSource[index + i + 156] && props.dataSource[index + i + 156].answers && props.dataSource[index + i + 156].answers[3] && props.dataSource[index + i + 156].answers[3].content_answer}
                                    </label><br />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return groups;
    };
    return (
        <Container fluid>
            <h1>Part 7</h1>
            {renderItemsInGroupsOfTwo()}
            {renderItemsInGroupsOfFour()}
            <Button onClick={handlePreviousClick}>Previous Part</Button>
            <Button onClick={handleClick}>Submit</Button>
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

    const token = localStorage.getItem("user").replace(/"/g, '');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${getScore}/${id}`, { headers });
                setScorecardDetail(response.data.result);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching scorecard detail:", error);
                setLoading(false);
                showToast("Mã kiểm tra không hợp lệ");
            }
        };

        fetchData();
    }, []);

    function showToast(message) {

        alert(message);
    }

    return (
        <div style={{ background: 'white' }}>

            {scorecardDetail && (
                <>
                    <div style={{
                        border: '1px solid black', borderRadius: '15px', padding: '10px', backgroundColor: 'antiquewhite'
                    }}>
                        <h1 style={{ textAlign: 'center', color: 'cornflowerblue' }}>Thông tin bài làm</h1>
                        <h3>Tổng số câu đúng: {totalCorrect}</h3>
                        <h3>Tổng số điểm: {totalMarks}</h3>
                        <h3>Thời gian làm bài: {totalTime1}  </h3>
                    </div>
                    <h2 style={{ color: 'cornflowerblue' }}>Câu hỏi:</h2>

                    <ul>
                        {scorecardDetail.questions.map((question, index) => (
                            <div style={{ border: '1px solid black', listStyle: 'none', padding: '10px', marginBottom: '10px', backgroundColor: 'antiquewhite' }}>
                                <li key={index}>
                                    <h3 style={{ color: 'cornflowerblue' }}>Câu {index + 1}</h3>
                                    <p>Mô tả: {question.description}</p>
                                    <h4>Đáp án đúng: {question.correct_at && question.correct_at.content_answer ? question.correct_at.content_answer : "null"}</h4>
                                    <h4>Đáp án đã chọn: {question.selected_at ? question.selected_at.content_answer : "null"}</h4>
                                    <h4>Điểm: {question.score}</h4>
                                </li>
                            </div>
                        ))}
                    </ul>
                </>
            )
            }
        </div >
    );

}

