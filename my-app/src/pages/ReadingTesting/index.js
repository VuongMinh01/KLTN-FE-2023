import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../css/PageQuanTri.css"
import Header from '../../component/LandingPageComponent/Header';
import '../../css/AddPart1.css';
import { Button, Input, Image } from "antd";
import { getQuestionList, submitTest, getTestId } from "../../utils/APIRoutes";
import { useLocation, useNavigate } from 'react-router-dom';
import StopPage from "../../component/StopPage";
import StartPage from "../../component/StartPage";
import Logo from '../../assets/ToeicTesting.png'
import axios from "axios";


export default function ReadingTesting() {

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
            setRemainingTime(prevTime => prevTime - 1);
            if (remainingTime === 0) {
                clearInterval(newTimer);
                handleSubmit();
            }
        }, 60000); // Interval of 1 minute
        setTimer(newTimer);
    };
    const stopTimerAndChangePage = () => {
        clearInterval(timer); // Clear the interval timer
        setCurrentPage('stop'); // Navigate to the StopPage
    };

    // Function to continue the test and resume the timer
    const continueTest = () => {
        setCurrentPage('part 5'); // Change page back to the first part of the test
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
        const host = window.location.origin;
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
    function showToast(message) {
        alert(message);
    }

    const handleSubmit = () => {
        // Ensure questions and modifiedDataSource have data
        console.log('Questions length:', questions.length);
        console.log('ModifiedDataSource length:', modifiedDataSource.length);
        if (questions.length === 0 || modifiedDataSource.length === 0) {
            console.error('Questions or modifiedDataSource is empty.');
            showToast('Ít nhất phải có một đáp án được chọn');
            return;
        }

        // Construct the testData object with selected answers
        const testData = {
            total_time: 111, // Example value, replace with actual total time
            test_id: getTestIdFromURL(location.pathname), // Use the test ID obtained from the URL
            questions: questions.map((question, index) => ({
                _id: question._id, // Add question ID
                test_id: question.test_id, // Add test ID
                num_quest: question.num_quest, // Add question number
                description: question.description, // Add question description
                content: question.content, // Add question content
                score: question.score, // Add question score
                created_at: question.created_at, // Add creation date
                updated_at: question.updated_at, // Add last update date
                answers: question.answers, // Add answer options
                correct_at: question.correct_at, // Add correct answer
                selected_at: modifiedDataSource[index] ? modifiedDataSource[index].selected_at : null // Add selected answer object or null
            }))
        };

        // Make a POST request to submit the test data
        axios.post(submitTest, testData, { headers })
            .then(response => {
                // Handle successful response
                const { total_marks } = response.data.result;
                const { total_correct } = response.data.result;
                setTotalCorrect(total_correct);
                setTotalMarks(total_marks); // Update totalMarks state
                setCurrentPage('finish');

            })
            .catch(error => {
                // Handle error
                console.error('Error submitting test:', error);
            });

    };


    return (
        <div className="App">
            <Header />

            <div className="sidebar">
                <ul>
                    <li><button onClick={() => changePage('part 5')}>Part 5</button></li>
                    <li><button onClick={() => changePage('part 6')}>Part 6</button></li>
                    <li><button onClick={() => changePage('part 7')}>Part 7</button></li>
                </ul>
            </div>
            <div className="main-content">
                {currentPage === 'start' && <StartPage onStart={handleStartTest} />}
                {currentPage === 'stop' && <StopPage onContinue={continueTest} />}
                {currentPage !== 'start' && currentPage !== 'stop' && (
                    <div>
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
                        {remainingTime > 0 && <h3 style={{ textAlign: 'center', color: 'cornflowerblue' }}>Time remaining: {remainingTime} minutes</h3>}
                    </div>
                )}
            </div>
            {currentPage === 'finish' && <Finish totalMarks={totalMarks} totalCorrect={totalCorrect} />}
            {currentPage !== 'stop' && currentPage !== 'finish' && currentPage !== 'start' && (
                <Button onClick={stopTimerAndChangePage} style={{
                    margin: '20px 20px 20px 20px',
                    background: 'cornflowerblue',
                    color: 'white',
                    borderRadius: '20px',
                    width: '90%',
                }}>Stop Test</Button>
            )}
            {currentPage !== 'stop' && currentPage !== 'finish' && currentPage !== 'start' && (
                <Button onClick={handleSubmit} style={{
                    margin: '10px 10px 10px 10px',
                    background: 'cornflowerblue',
                    color: 'white',
                    borderRadius: '20px',
                }}>Submit Test</Button>
            )}
        </div>
    );
}



function Part5(props) {
    const handleClick = () => {
        // Call changePage function to change the page
        props.changePage('part 6');
    };

    const handleRadioChangePart5 = (index, value) => {
        const updatedSelectedAnswers = [...props.selectedAnswers];
        updatedSelectedAnswers[index] = value; // Adjust index to match Part 5's data
        props.onRadioChange(index, value); // Call the parent component's handler
    };

    return (
        <Container fluid>
            <h1>Part 5</h1>
            {Array.from({ length: 30 }).map((_, index) => (
                <Row gutter={24} key={index}>
                    <Col xs={12}>
                        <div style={{ border: '1px solid black', borderRadius: '20px', marginBottom: '10px' }}>
                            <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu {index + 1}. {props.dataSource[index] && props.dataSource[index].content}</h3>

                            <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                                <input
                                    type="radio"
                                    id={`A-${index}`}
                                    name={`Question-${index}`}
                                    value="A"
                                    checked={props.selectedAnswers[index] === "A"}
                                    onChange={() => handleRadioChangePart5(index, "A")} />
                                <label htmlFor={`A-${index}`}>
                                    (A) {props.dataSource[index] && props.dataSource[index].answers && props.dataSource[index].answers[0] && props.dataSource[index].answers[0].content_answer}
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
                                    (B) {props.dataSource[index] && props.dataSource[index].answers && props.dataSource[index].answers[1] && props.dataSource[index].answers[1].content_answer}
                                </label><br />                                <input
                                    type="radio"
                                    id={`C-${index}`}
                                    name={`Question-${index}`}
                                    value="C"
                                    checked={props.selectedAnswers[index] === "C"}
                                    onChange={() => handleRadioChangePart5(index, "C")} />
                                <label htmlFor={`C-${index}`}>
                                    (C) {props.dataSource[index] && props.dataSource[index].answers && props.dataSource[index].answers[2] && props.dataSource[index].answers[2].content_answer}
                                </label><br />                                <input
                                    type="radio"
                                    id={`D-${index}`}
                                    name={`Question-${index}`}
                                    value="D"
                                    checked={props.selectedAnswers[index] === "D"}
                                    onChange={() => handleRadioChangePart5(index, "D")} />
                                <label htmlFor={`D-${index}`}>
                                    (D) {props.dataSource[index] && props.dataSource[index].answers && props.dataSource[index].answers[3] && props.dataSource[index].answers[3].content_answer}
                                </label><br />
                            </div>
                        </div>
                    </Col>
                </Row>
            ))}
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

    const slicedDataSource = props.dataSource.length >= 16 ? props.dataSource.slice(30, 46) : Array.from({ length: 16 });

    const renderItemsInGroupsOfFour = () => {
        const groups = [];
        for (let i = 0; i < slicedDataSource.length; i += 4) {
            const groupItems = slicedDataSource.slice(i, i + 4);
            const groupElements = groupItems.map((item, index) => {
                const dataIndex = i + index + 30;
                return (
                    <div key={index} style={{ marginRight: '20px' }}>
                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                            {props.dataSource[index + i + 30]?.description && isUrl(props.dataSource[index + i + 30]?.description) ? (
                                <Image alt="preview" src={props.dataSource[index + i + 30]?.description} style={{ width: 300 }} />
                            ) : (
                                <span>{props.dataSource[index + i + 30]?.description}</span>
                            )}
                        </div>
                        <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu {index + i + 31}. {props.dataSource[index + i + 30] && props.dataSource[index + i + 30].content}</h3>
                        <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                            <input
                                type="radio"
                                id={`A-${index}`}
                                name={`Question-${index}`}
                                value="A"
                                checked={props.selectedAnswers[i + index + 30] === "A"}
                                onChange={() => handleRadioChangePart6(i + index + 30, "A")} />
                            <label htmlFor={`A-${index}`}>
                                .A {props.dataSource[index + i + 30] && props.dataSource[index + i + 30].answers && props.dataSource[index + i + 30].answers[0] && props.dataSource[index + i + 30].answers[0].content_answer}
                            </label><br />
                            <input
                                type="radio"
                                id={`B-${index}`}
                                name={`Question-${index}`}
                                value="B"
                                checked={props.selectedAnswers[i + index + 30] === "B"}
                                onChange={() => handleRadioChangePart6(i + index + 30, "B")}
                            />
                            <label htmlFor={`B-${index}`}>
                                .B {props.dataSource[index + i + 30] && props.dataSource[index + i + 30].answers && props.dataSource[index + i + 30].answers[1] && props.dataSource[index + i + 30].answers[1].content_answer}
                            </label><br />
                            <input
                                type="radio"
                                id={`C-${index}`}
                                name={`Question-${index}`}
                                value="C"
                                checked={props.selectedAnswers[i + index + 30] === "C"}
                                onChange={() => handleRadioChangePart6(i + index + 30, "C")} />
                            <label htmlFor={`C-${index}`}>
                                .C {props.dataSource[index + i + 30] && props.dataSource[index + i + 30].answers && props.dataSource[index + i + 30].answers[2] && props.dataSource[index + i + 30].answers[2].content_answer}
                            </label><br />
                            <input
                                type="radio"
                                id={`D-${index}`}
                                name={`Question-${index}`}
                                value="D"
                                checked={props.selectedAnswers[i + index + 30] === "D"}
                                onChange={() => handleRadioChangePart6(i + index + 30, "D")} />
                            <label htmlFor={`D-${index}`}>
                                .D {props.dataSource[index + i + 30] && props.dataSource[index + i + 30].answers && props.dataSource[index + i + 30].answers[3] && props.dataSource[index + i + 30].answers[3].content_answer}
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

    const slicedDataSourceTwo = props.dataSource.length >= 10 ? props.dataSource.slice(46, 56) : Array.from({ length: 10 });
    const slicedDataSourceFour = props.dataSource.length >= 56 ? props.dataSource.slice(56) : [];

    const renderItemsInGroupsOfTwo = () => {
        const groups = [];
        for (let i = 0; i < slicedDataSourceTwo.length; i += 2) {
            groups.push(
                <div key={i / 2} style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', border: '1px solid black', borderRadius: '20px', padding: '10px' }}>
                    <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                        {props.dataSource[i + 46]?.description && isUrl(props.dataSource[i + 46]?.description) ? (
                            <Image alt="preview" src={props.dataSource[i + 46]?.description} style={{ width: 300 }} />
                        ) : (
                            <span>{props.dataSource[i + 46]?.description}</span>
                        )}
                    </div>
                    <div style={{ display: 'grid' }}>
                        {slicedDataSourceTwo.slice(i, i + 2).map((item, index) => (
                            <div key={index} style={{ marginRight: '20px' }}>
                                <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu {index + i + 47}. {props.dataSource[index + i + 46] && props.dataSource[index + i + 46].content}</h3>
                                <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                                    <input
                                        type="radio"
                                        id={`A-${index}`}
                                        name={`Question-${index}`}
                                        value="A"
                                        checked={props.selectedAnswers[i + index + 46] === "A"}
                                        onChange={() => handleRadioChangePart7(i + index + 46, "A")} />
                                    <label htmlFor={`A-${index}`}>
                                        .A {props.dataSource[index + i + 46] && props.dataSource[index + i + 46].answers && props.dataSource[index + i + 46].answers[0] && props.dataSource[index + i + 46].answers[0].content_answer}
                                    </label><br />
                                    {/* Repeat input elements for options B, C, D */}
                                    <input
                                        type="radio"
                                        id={`B-${index}`}
                                        name={`Question-${index}`}
                                        value="B"
                                        checked={props.selectedAnswers[i + index + 46] === "B"}
                                        onChange={() => handleRadioChangePart7(i + index + 46, "B")} />
                                    <label htmlFor={`B-${index}`}>
                                        .B {props.dataSource[index + i + 46] && props.dataSource[index + i + 46].answers && props.dataSource[index + i + 46].answers[1] && props.dataSource[index + i + 46].answers[1].content_answer}
                                    </label><br />
                                    <input
                                        type="radio"
                                        id={`C-${index}`}
                                        name={`Question-${index}`}
                                        value="C"
                                        checked={props.selectedAnswers[i + index + 46] === "C"}
                                        onChange={() => handleRadioChangePart7(i + index + 46, "C")} />
                                    <label htmlFor={`C-${index}`}>
                                        .C {props.dataSource[index + i + 46] && props.dataSource[index + i + 46].answers && props.dataSource[index + i + 46].answers[2] && props.dataSource[index + i + 46].answers[2].content_answer}
                                    </label><br />
                                    <input
                                        type="radio"
                                        id={`D-${index}`}
                                        name={`Question-${index}`}
                                        value="D"
                                        checked={props.selectedAnswers[i + index + 46] === "D"}
                                        onChange={() => handleRadioChangePart7(i + index + 46, "D")} />
                                    <label htmlFor={`D-${index}`}>
                                        .D {props.dataSource[index + i + 46] && props.dataSource[index + i + 46].answers && props.dataSource[index + i + 46].answers[3] && props.dataSource[index + i + 46].answers[3].content_answer}
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
                        {props.dataSource[i + 56]?.description && isUrl(props.dataSource[i + 56]?.description) ? (
                            <Image alt="preview" src={props.dataSource[i + 56]?.description} style={{ width: 300 }} />
                        ) : (
                            <span>{props.dataSource[i + 56]?.description}</span>
                        )}
                    </div>
                    <div style={{ display: 'grid' }}>
                        {slicedDataSourceFour.slice(i, i + 4).map((item, index) => (
                            <div key={index} style={{ marginRight: '20px' }}>
                                <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu {index + i + 57}. {props.dataSource[index + i + 56] && props.dataSource[index + i + 56].content}</h3>
                                <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                                    <input
                                        type="radio"
                                        id={`A-${index}`}
                                        name={`Question-${index}`}
                                        value="A"
                                        checked={props.selectedAnswers[i + index + 56] === "A"}
                                        onChange={() => handleRadioChangePart7(i + index + 56, "A")} />
                                    <label htmlFor={`A-${index}`}>
                                        .A {props.dataSource[index + i + 56] && props.dataSource[index + i + 56].answers && props.dataSource[index + i + 56].answers[0] && props.dataSource[index + i + 56].answers[0].content_answer}
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
                                        .B {props.dataSource[index + i + 56] && props.dataSource[index + i + 56].answers && props.dataSource[index + i + 56].answers[1] && props.dataSource[index + i + 56].answers[1].content_answer}
                                    </label><br />
                                    <input
                                        type="radio"
                                        id={`C-${index}`}
                                        name={`Question-${index}`}
                                        value="C"
                                        checked={props.selectedAnswers[i + index + 56] === "C"}
                                        onChange={() => handleRadioChangePart7(i + index + 56, "C")} />
                                    <label htmlFor={`C-${index}`}>
                                        .C {props.dataSource[index + i + 56] && props.dataSource[index + i + 56].answers && props.dataSource[index + i + 56].answers[2] && props.dataSource[index + i + 56].answers[2].content_answer}
                                    </label><br />
                                    <input
                                        type="radio"
                                        id={`D-${index}`}
                                        name={`Question-${index}`}
                                        value="D"
                                        checked={props.selectedAnswers[i + index + 56] === "D"}
                                        onChange={() => handleRadioChangePart7(i + index + 56, "D")} />
                                    <label htmlFor={`D-${index}`}>
                                        .D {props.dataSource[index + i + 56] && props.dataSource[index + i + 56].answers && props.dataSource[index + i + 56].answers[3] && props.dataSource[index + i + 56].answers[3].content_answer}
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

function Finish({ totalMarks, totalCorrect }) {
    return (
        <Container fluid>
            <Row style={{ backgroundColor: 'cornflowerblue', color: 'white', border: '1px solid ', borderRadius: '10px', width: '70vw', height: '70vh', marginLeft: 'auto', marginRight: 'auto' }}>
                <Col>
                    <h1 style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>Test Submitted Successfully</h1>
                    <h3>Thank you for completing the test.</h3>
                    <h3>Total correct: {totalCorrect}/200</h3>
                    <h3>Total Marks: {totalMarks}</h3>
                </Col>
                <Col xs={12} style={{ textAlign: 'center' }}>
                    <Image src={Logo} preview={false} />
                </Col>
            </Row>
        </Container>
    );
}
