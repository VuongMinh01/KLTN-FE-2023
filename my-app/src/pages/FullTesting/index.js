import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../css/PageQuanTri.css"
import Header from '../../component/LandingPageComponent/Header';
import '../../css/AddPart1.css';
import { Button, Input } from "antd";
import { getQuestionList, submitTest } from "../../utils/APIRoutes";
import { useLocation } from 'react-router-dom';

import axios from "axios";
import { click } from "@testing-library/user-event/dist/click";

export default function FullTesting() {

    const [currentPage, setCurrentPage] = useState('part 1');
    const location = useLocation();
    const changePage = (page) => {
        setCurrentPage(page);
    };
    const [dataSource, setDataSource] = useState([])
    const [selectedAnswersPart, setSelectedAnswersPart] = useState(Array.from({ length: 200 }).fill(null));


    const [questions, setQuestions] = useState([]); // State to store complete question data
    const [totalMarks, setTotalMarks] = useState(null); // Initialize totalMarks state
    const [totalCorrect, setTotalCorrect] = useState(null);



    useEffect(() => {
        const test_id = getTestIdFromURL(location.pathname);
        console.log(test_id, '12312') // Extract test ID from URL
        getListQuestion(test_id); // Fetch list of questions when component mounts
    }, [location.pathname]);

    const getTestIdFromURL = (pathname) => {
        const parts = pathname.split('/');
        return parts[parts.length - 1];
    }
    const token = localStorage.getItem("user").replace(/"/g, '');
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
        });
    }



    const handleSubmit = () => {
        // Ensure questions and modifiedDataSource have data
        console.log('Questions length:', questions.length);
        console.log('ModifiedDataSource length:', modifiedDataSource.length);
        if (questions.length === 0 || modifiedDataSource.length === 0) {
            console.error('Questions or modifiedDataSource is empty.');
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



            <div className="sidebar">
                <ul>
                    <li><button onClick={() => changePage('part 1')}>Part 1</button></li>
                    <li><button onClick={() => changePage('part 2')}>Part 2</button></li>
                    <li><button onClick={() => changePage('part 3')}>Part 3</button></li>
                    <li><button onClick={() => changePage('part 4')}>Part 4</button></li>
                    <li><button onClick={() => changePage('part 5')}>Part 5</button></li>
                    <li><button onClick={() => changePage('part 6')}>Part 6</button></li>
                    <li><button onClick={() => changePage('part 7')}>Part 7</button></li>
                </ul>
            </div>
            <div className="main-content">
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
                {currentPage === 'finish' && <Finish totalMarks={totalMarks} totalCorrect={totalCorrect} />}

            </div>

            <Button onClick={handleSubmit}>Submit Test</Button>

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
            <h1>Part 1</h1>
            {Array.from({ length: 6 }).map((_, index) => (
                <Row gutter={24} key={index}>
                    <Col xs={12}>
                        <div style={{ border: '1px solid black', borderRadius: '20px', marginBottom: '10px' }}>
                            <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu {index + 1}</h3>
                            {/* <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu {index + 1}. {props.dataSource[index] && props.dataSource[index].content}</h3> */}


                            <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                                <audio controls={true} src={'audio'}></audio>
                            </div>
                            <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                                <img alt="preview " src={'image'} style={{ width: 300 }} />
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
                                <label htmlFor={`A-${index}`}>.B </label><br />
                                {/* <label htmlFor={`B-${index}`}>B. {props.dataSource[index].answers[1].content_answer}</label><br /> */}

                                <input
                                    type="radio"
                                    id={`C-${index}`}
                                    name={`Question-${index}`}
                                    value="C"
                                    checked={props.selectedAnswers[index] === "C"}
                                    onChange={() => handleRadioChangePart1(index, "C")}
                                />
                                <label htmlFor={`A-${index}`}>.C </label><br />
                                {/* <label htmlFor={`C-${index}`}>C. {props.dataSource[index].answers[2].content_answer}</label><br /> */}

                                <input
                                    type="radio"
                                    id={`D-${index}`}
                                    name={`Question-${index}`}
                                    value="D"
                                    checked={props.selectedAnswers[index] === "D"}
                                    onChange={() => handleRadioChangePart1(index, "D")}
                                />
                                <label htmlFor={`A-${index}`}>.D </label><br />
                                {/* <label htmlFor={`D-${index}`}>D. {props.dataSource[index].answers[3].content_answer}</label><br /> */}

                            </div>
                        </div>
                    </Col>
                </Row>
            ))}
            <Button onClick={handleClick}>Next Part</Button>
        </Container>
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
            <h1>Part 2</h1>
            {slicedDataSource.map((item, index) => (
                <Row gutter={24} key={index}>
                    <Col xs={12}>
                        <div style={{ border: '1px solid black', borderRadius: '20px', marginBottom: '10px' }}>
                            <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu {index + 7}</h3>

                            <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                                <audio controls={true} src={'audio'}></audio>
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
        updatedSelectedAnswers[index + 31] = value; // Adjust index to match Part 3's data
        props.onRadioChange(index + 31, value); // Call the parent component's handler
    };

    // Ensure that the dataSource has at least 39 items, otherwise, fill it with dummy items
    const slicedDataSource = props.dataSource.length >= 39 ? props.dataSource.slice(31, 69) : Array.from({ length: 39 });

    return (
        <Container fluid>
            <h1>Part 3</h1>
            {slicedDataSource.map((item, index) => (
                <Row gutter={24} key={index}>
                    <Col xs={12}>
                        <div style={{ border: '1px solid black', borderRadius: '20px', marginBottom: '10px' }}>
                            {/* <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu {index + 31}</h3> */}
                            <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu {index + 32}. {props.dataSource[index + 31] && props.dataSource[index + 31].content}</h3>

                            <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                                <audio controls={true} src={'audio'}></audio>
                            </div>

                            <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                                <input
                                    type="radio"
                                    id={`A-${index}`}
                                    name={`Question-${index}`}
                                    value="A"
                                    checked={props.selectedAnswers[index + 31] === "A"}
                                    onChange={() => handleRadioChangePart3(index, "A")} />
                                <label htmlFor={`D-${index}`}>
                                    .A {props.dataSource[index + 31] && props.dataSource[index + 31].answers && props.dataSource[index + 31].answers[0] && props.dataSource[index + 31].answers[0].content_answer}
                                </label><br />
                                <input
                                    type="radio"
                                    id={`B-${index}`}
                                    name={`Question-${index}`}
                                    value="B"
                                    checked={props.selectedAnswers[index + 31] === "B"}
                                    onChange={() => handleRadioChangePart3(index, "B")}
                                />
                                <label htmlFor={`D-${index}`}>
                                    .B {props.dataSource[index + 31] && props.dataSource[index + 31].answers && props.dataSource[index + 31].answers[1] && props.dataSource[index + 31].answers[1].content_answer}
                                </label><br />                                <input
                                    type="radio"
                                    id={`C-${index}`}
                                    name={`Question-${index}`}
                                    value="C"
                                    checked={props.selectedAnswers[index + 31] === "C"}
                                    onChange={() => handleRadioChangePart3(index, "C")} />
                                <label htmlFor={`D-${index}`}>
                                    .C {props.dataSource[index + 31] && props.dataSource[index + 31].answers && props.dataSource[index + 31].answers[2] && props.dataSource[index + 31].answers[2].content_answer}
                                </label><br />                                <input
                                    type="radio"
                                    id={`D-${index}`}
                                    name={`Question-${index}`}
                                    value="D"
                                    checked={props.selectedAnswers[index + 31] === "D"}
                                    onChange={() => handleRadioChangePart3(index, "D")} />
                                <label htmlFor={`D-${index}`}>
                                    .D {props.dataSource[index + 31] && props.dataSource[index + 31].answers && props.dataSource[index + 31].answers[3] && props.dataSource[index + 31].answers[3].content_answer}
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



function Part4(props) {
    const handleClick = () => {
        // Call changePage function to change the page
        props.changePage('part 5');
    };
    const handlePreviousClick = () => {
        props.changePage('part 3');
    };

    const handleRadioChangePart4 = (index, value) => {
        const updatedSelectedAnswers = [...props.selectedAnswers];
        updatedSelectedAnswers[index + 70] = value; // Adjust index to match Part 4's data
        props.onRadioChange(index + 70, value); // Call the parent component's handler
    };

    const slicedDataSource = props.dataSource.length >= 30 ? props.dataSource.slice(70, 99) : Array.from({ length: 30 });


    const renderItemsInGroupsOfThree = () => {
        const groups = [];
        for (let i = 0; i < slicedDataSource.length; i += 3) {
            groups.push(
                <div key={i / 3} style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', border: '1px solid black', borderRadius: '20px', padding: '10px' }}>
                    <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                        <audio controls={true} src="dummy_audio_url.mp3"></audio>
                    </div>
                    <div style={{ display: 'grid' }}>
                        {slicedDataSource.slice(i, i + 3).map((item, index) => (
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
                                    <label htmlFor={`D-${index}`}>
                                        .A {props.dataSource[index + i + 70] && props.dataSource[index + i + 70].answers && props.dataSource[index + i + 70].answers[0] && props.dataSource[index + i + 70].answers[0].content_answer}
                                    </label><br />                                      <input
                                        type="radio"
                                        id={`B-${index}`}
                                        name={`Question-${index}`}
                                        value="B"
                                        checked={props.selectedAnswers[i + index + 70] === "B"}
                                        onChange={() => handleRadioChangePart4(i + index + 70, "B")}
                                    />
                                    <label htmlFor={`D-${index}`}>
                                        .B {props.dataSource[index + i + 70] && props.dataSource[index + i + 70].answers && props.dataSource[index + i + 70].answers[1] && props.dataSource[index + i + 70].answers[1].content_answer}
                                    </label><br />                                        <input
                                        type="radio"
                                        id={`C-${index}`}
                                        name={`Question-${index}`}
                                        value="C"
                                        checked={props.selectedAnswers[i + index + 70] === "C"}
                                        onChange={() => handleRadioChangePart4(i + index + 70, "C")} />
                                    <label htmlFor={`D-${index}`}>
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
            <Button onClick={handleClick}>Next Part</Button>
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
        updatedSelectedAnswers[index + 100] = value; // Adjust index to match Part 5's data
        props.onRadioChange(index + 100, value); // Call the parent component's handler
    };

    // Ensure that the dataSource has at least 39 items, otherwise, fill it with dummy items
    const slicedDataSource = props.dataSource.length >= 30 ? props.dataSource.slice(100, 129) : Array.from({ length: 30 });

    return (
        <Container fluid>
            <h1>Part 5</h1>
            {slicedDataSource.map((item, index) => (
                <Row gutter={24} key={index}>
                    <Col xs={12}>
                        <div style={{ border: '1px solid black', borderRadius: '20px', marginBottom: '10px' }}>
                            <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu {index + 101}. {props.dataSource[index + 100] && props.dataSource[index + 100].content}</h3>


                            <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                                <img alt="preview " src={'image'} style={{ width: 300 }} />
                            </div>
                            <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                                <input
                                    type="radio"
                                    id={`A-${index}`}
                                    name={`Question-${index}`}
                                    value="A"
                                    checked={props.selectedAnswers[index + 100] === "A"}
                                    onChange={() => handleRadioChangePart5(index, "A")} />
                                <label htmlFor={`D-${index}`}>
                                    .A {props.dataSource[index + 100] && props.dataSource[index + 100].answers && props.dataSource[index + 100].answers[0] && props.dataSource[index + 100].answers[0].content_answer}
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
                                    .B {props.dataSource[index + 100] && props.dataSource[index + 100].answers && props.dataSource[index + 100].answers[1] && props.dataSource[index + 100].answers[1].content_answer}
                                </label><br />                                <input
                                    type="radio"
                                    id={`C-${index}`}
                                    name={`Question-${index}`}
                                    value="C"
                                    checked={props.selectedAnswers[index + 100] === "C"}
                                    onChange={() => handleRadioChangePart5(index, "C")} />
                                <label htmlFor={`D-${index}`}>
                                    .C {props.dataSource[index + 100] && props.dataSource[index + 100].answers && props.dataSource[index + 100].answers[2] && props.dataSource[index + 100].answers[2].content_answer}
                                </label><br />                                <input
                                    type="radio"
                                    id={`D-${index}`}
                                    name={`Question-${index}`}
                                    value="D"
                                    checked={props.selectedAnswers[index + 100] === "D"}
                                    onChange={() => handleRadioChangePart5(index, "D")} />
                                <label htmlFor={`D-${index}`}>
                                    .D {props.dataSource[index + 100] && props.dataSource[index + 100].answers && props.dataSource[index + 100].answers[3] && props.dataSource[index + 100].answers[3].content_answer}
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
    const handleClick = () => {
        // Call changePage function to change the page
        props.changePage('part 7');
    };
    const handlePreviousClick = () => {
        props.changePage('part 5');
    };

    const handleRadioChangePart6 = (index, value) => {
        const updatedSelectedAnswers = [...props.selectedAnswers];
        updatedSelectedAnswers[index + 156] = value; // Adjust index to match Part 4's data
        props.onRadioChange(index + 156, value); // Call the parent component's handler
    };

    const slicedDataSource = props.dataSource.length >= 16 ? props.dataSource.slice(156, 145) : Array.from({ length: 16 });
    const renderItemsInGroupsOfFour = () => {
        const groups = [];
        for (let i = 0; i < slicedDataSource.length; i += 4) {
            groups.push(
                <div key={i / 4} style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', border: '1px solid black', borderRadius: '20px', padding: '10px' }}>

                    <div style={{ display: 'grid' }}>
                        {slicedDataSource.slice(i, i + 4).map((item, index) => (
                            <div key={index} style={{ marginRight: '20px' }}>
                                <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu {index + i + 131}. {props.dataSource[index + i + 156] && props.dataSource[index + i + 156].content}</h3>
                                <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                                    <input
                                        type="radio"
                                        id={`A-${index}`}
                                        name={`Question-${index}`}
                                        value="A"
                                        checked={props.selectedAnswers[i + index + 156] === "A"}
                                        onChange={() => handleRadioChangePart6(i + index + 156, "A")} />
                                    <label htmlFor={`D-${index}`}>
                                        .A {props.dataSource[index + i + 156] && props.dataSource[index + i + 156].answers && props.dataSource[index + i + 156].answers[0] && props.dataSource[index + i + 156].answers[0].content_answer}
                                    </label><br />
                                    <input
                                        type="radio"
                                        id={`B-${index}`}
                                        name={`Question-${index}`}
                                        value="B"
                                        checked={props.selectedAnswers[i + index + 156] === "B"}
                                        onChange={() => handleRadioChangePart6(i + index + 156, "B")}
                                    />
                                    <label htmlFor={`D-${index}`}>
                                        .B {props.dataSource[index + i + 156] && props.dataSource[index + i + 156].answers && props.dataSource[index + i + 156].answers[1] && props.dataSource[index + i + 156].answers[1].content_answer}
                                    </label><br />
                                    <input
                                        type="radio"
                                        id={`C-${index}`}
                                        name={`Question-${index}`}
                                        value="C"
                                        checked={props.selectedAnswers[i + index + 156] === "C"}
                                        onChange={() => handleRadioChangePart6(i + index + 156, "C")} />
                                    <label htmlFor={`D-${index}`}>
                                        .C {props.dataSource[index + i + 156] && props.dataSource[index + i + 156].answers && props.dataSource[index + i + 156].answers[2] && props.dataSource[index + i + 156].answers[2].content_answer}
                                    </label><br />
                                    <input
                                        type="radio"
                                        id={`D-${index}`}
                                        name={`Question-${index}`}
                                        value="D"
                                        checked={props.selectedAnswers[i + index + 156] === "D"}
                                        onChange={() => handleRadioChangePart6(i + index + 156, "D")} />
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
            <h1>Part 6</h1>
            {renderItemsInGroupsOfFour()}
            <Button onClick={handlePreviousClick}>Previous Part</Button>
            <Button onClick={handleClick}>Next Part</Button>
        </Container>
    );

}



function Part7(props) {
    const handlePreviousClick = () => {
        props.changePage('part 6');
    };
    const handleClick = () => {

    }
    const handleRadioChangePart7 = (index, value) => {
        const updatedSelectedAnswers = [...props.selectedAnswers];
        updatedSelectedAnswers[index + 146] = value;
        props.onRadioChange(index + 146, value);
    };
    const slicedDataSourceTwo = props.dataSource.length >= 10 ? props.dataSource.slice(146, 155) : Array.from({ length: 10 });
    const slicedDataSourceFour = props.dataSource.length >= 40 ? props.dataSource.slice(156, 199) : Array.from({ length: 44 });

    const renderItemsInGroupsOfTwo = () => {
        const groups = [];
        for (let i = 0; i < slicedDataSourceTwo.length; i += 2) {
            groups.push(
                <div key={i / 2} style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', border: '1px solid black', borderRadius: '20px', padding: '10px' }}>

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
                                        checked={props.selectedAnswers[i + index + 146] === "A"}
                                        onChange={() => handleRadioChangePart7(i + index + 146, "A")} />
                                    <label htmlFor={`D-${index}`}>
                                        .A {props.dataSource[index + i + 146] && props.dataSource[index + i + 146].answers && props.dataSource[index + i + 146].answers[0] && props.dataSource[index + i + 146].answers[0].content_answer}
                                    </label><br />
                                    <input
                                        type="radio"
                                        id={`B-${index}`}
                                        name={`Question-${index}`}
                                        value="B"
                                        checked={props.selectedAnswers[i + index + 146] === "B"}
                                        onChange={() => handleRadioChangePart7(i + index + 146, "B")}
                                    />
                                    <label htmlFor={`D-${index}`}>
                                        .B {props.dataSource[index + i + 146] && props.dataSource[index + i + 146].answers && props.dataSource[index + i + 146].answers[1] && props.dataSource[index + i + 146].answers[1].content_answer}
                                    </label><br />
                                    <input
                                        type="radio"
                                        id={`C-${index}`}
                                        name={`Question-${index}`}
                                        value="C"
                                        checked={props.selectedAnswers[i + index + 146] === "C"}
                                        onChange={() => handleRadioChangePart7(i + index + 146, "C")} />
                                    <label htmlFor={`D-${index}`}>
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
                                    <label htmlFor={`D-${index}`}>
                                        .A {props.dataSource[index + i + 156] && props.dataSource[index + i + 156].answers && props.dataSource[index + i + 156].answers[0] && props.dataSource[index + i + 156].answers[0].content_answer}
                                    </label><br />
                                    <input
                                        type="radio"
                                        id={`B-${index}`}
                                        name={`Question-${index}`}
                                        value="B"
                                        checked={props.selectedAnswers[i + index + 156] === "B"}
                                        onChange={() => handleRadioChangePart7(i + index + 156, "B")}
                                    />
                                    <label htmlFor={`D-${index}`}>
                                        .B {props.dataSource[index + i + 156] && props.dataSource[index + i + 156].answers && props.dataSource[index + i + 156].answers[1] && props.dataSource[index + i + 156].answers[1].content_answer}
                                    </label><br />
                                    <input
                                        type="radio"
                                        id={`C-${index}`}
                                        name={`Question-${index}`}
                                        value="C"
                                        checked={props.selectedAnswers[i + index + 156] === "C"}
                                        onChange={() => handleRadioChangePart7(i + index + 156, "C")} />
                                    <label htmlFor={`D-${index}`}>
                                        .C {props.dataSource[index + i + 156] && props.dataSource[index + i + 156].answers && props.dataSource[index + i + 156].answers[2] && props.dataSource[index + i + 156].answers[2].content_answer}
                                    </label><br />
                                    <input
                                        type="radio"
                                        id={`D-${index}`}
                                        name={`Question-${index}`}
                                        value="D"
                                        checked={props.selectedAnswers[i + index + 156] === "D"}
                                        onChange={() => handleRadioChangePart7(i + index + 156, "D")} />
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
function Finish({ totalMarks, totalCorrect }) {
    return (
        <Container fluid>
            <Row style={{ backgroundColor: 'cyan', border: '1px solid ', borderRadius: '10px', width: '70vw', height: '70vh', marginLeft: 'auto', marginRight: 'auto' }}>
                <Col>
                    <h1 style={{}}>Test Submitted Successfully</h1>
                    <p>Thank you for completing the test.</p>
                    <p>Total correct: {totalCorrect}/200</p>
                    <p>Total Marks: {totalMarks}</p>
                </Col>
            </Row>
        </Container>
    );
}
