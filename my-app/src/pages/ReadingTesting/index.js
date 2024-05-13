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

export default function ReadingTesting() {

    const [currentPage, setCurrentPage] = useState('part 5');
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

                    <li><button onClick={() => changePage('part 5')}>Part 5</button></li>
                    <li><button onClick={() => changePage('part 6')}>Part 6</button></li>
                    <li><button onClick={() => changePage('part 7')}>Part 7</button></li>
                </ul>
            </div>
            <div className="main-content">

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
                            <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu {index + 1}</h3>
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
                                    onChange={() => handleRadioChangePart5(index, "A")} />
                                <label htmlFor={`A-${index}`}>.A </label><br />
                                <input
                                    type="radio"
                                    id={`B-${index}`}
                                    name={`Question-${index}`}
                                    value="B"
                                    checked={props.selectedAnswers[index] === "B"}
                                    onChange={() => handleRadioChangePart5(index, "B")}
                                />
                                <label htmlFor={`B-${index}`}>.B </label><br />
                                <input
                                    type="radio"
                                    id={`C-${index}`}
                                    name={`Question-${index}`}
                                    value="C"
                                    checked={props.selectedAnswers[index] === "C"}
                                    onChange={() => handleRadioChangePart5(index, "C")} />
                                <label htmlFor={`C-${index}`}>.C </label><br />
                                <input
                                    type="radio"
                                    id={`D-${index}`}
                                    name={`Question-${index}`}
                                    value="D"
                                    checked={props.selectedAnswers[index] === "D"}
                                    onChange={() => handleRadioChangePart5(index, "D")} />
                                <label htmlFor={`D-${index}`}>.D </label><br />
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
    const handleClick = () => {
        // Call changePage function to change the page
        props.changePage('part 7');
    };
    const handlePreviousClick = () => {
        props.changePage('part 5');
    };

    const handleRadioChangePart6 = (index, value) => {
        const updatedSelectedAnswers = [...props.selectedAnswers];
        updatedSelectedAnswers[index + 30] = value; // Adjust index to match Part 4's data
        props.onRadioChange(index + 30, value); // Call the parent component's handler
    };

    // Ensure slicedDataSource has at least 16 items, otherwise, fill it with dummy items
    const slicedDataSource = props.dataSource.length >= 16 ? props.dataSource.slice(30, 45) : Array.from({ length: 16 });

    const renderItemsInGroupsOfFour = () => {
        const groups = [];
        for (let i = 0; i < slicedDataSource.length; i += 4) {
            groups.push(
                <div key={i / 4} style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', border: '1px solid black', borderRadius: '20px', padding: '10px' }}>
                    <div style={{ display: 'grid' }}>
                        {slicedDataSource.slice(i, i + 4).map((item, index) => (
                            <div key={index} style={{ marginRight: '20px' }}>
                                <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu {index + i + 31}. {item && item.content}</h3>
                                <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                                    {item.answers.map((answer, answerIndex) => (
                                        <React.Fragment key={answerIndex}>
                                            <input
                                                type="radio"
                                                id={`${answerIndex}-${index}`}
                                                name={`Question-${index}`}
                                                value={answerIndex}
                                                checked={props.selectedAnswers[i + index + 30] === answerIndex.toString()}
                                                onChange={() => handleRadioChangePart6(i + index + 30, answerIndex.toString())}
                                            />
                                            <label htmlFor={`${answerIndex}-${index}`}>.{String.fromCharCode(65 + answerIndex)} {answer.content_answer}</label><br />
                                        </React.Fragment>
                                    ))}
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
        updatedSelectedAnswers[index + 46] = value; // Adjusted index for part 7
        props.onRadioChange(index + 46, value); // Adjusted index for part 7
    };
    const slicedDataSourceTwo = props.dataSource.length >= 10 ? props.dataSource.slice(46, 55) : Array.from({ length: 10 });
    const slicedDataSourceFour = props.dataSource.length >= 40 ? props.dataSource.slice(56, 99) : Array.from({ length: 44 });

    const renderItemsInGroupsOfTwo = () => {
        const groups = [];
        for (let i = 0; i < slicedDataSourceTwo.length; i += 2) {
            groups.push(
                <div key={i / 2} style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', border: '1px solid black', borderRadius: '20px', padding: '10px' }}>

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
                                    <label htmlFor={`D-${index}`}>
                                        .A {props.dataSource[index + i + 46] && props.dataSource[index + i + 46].answers && props.dataSource[index + i + 46].answers[0] && props.dataSource[index + i + 46].answers[0].content_answer}
                                    </label><br />
                                    <input
                                        type="radio"
                                        id={`B-${index}`}
                                        name={`Question-${index}`}
                                        value="B"
                                        checked={props.selectedAnswers[i + index + 46] === "B"}
                                        onChange={() => handleRadioChangePart7(i + index + 46, "B")}
                                    />
                                    <label htmlFor={`D-${index}`}>
                                        .B {props.dataSource[index + i + 46] && props.dataSource[index + i + 46].answers && props.dataSource[index + i + 46].answers[1] && props.dataSource[index + i + 46].answers[1].content_answer}
                                    </label><br />
                                    <input
                                        type="radio"
                                        id={`C-${index}`}
                                        name={`Question-${index}`}
                                        value="C"
                                        checked={props.selectedAnswers[i + index + 46] === "C"}
                                        onChange={() => handleRadioChangePart7(i + index + 46, "C")} />
                                    <label htmlFor={`D-${index}`}>
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
                                    <label htmlFor={`D-${index}`}>
                                        .A {props.dataSource[index + i + 56] && props.dataSource[index + i + 56].answers && props.dataSource[index + i + 56].answers[0] && props.dataSource[index + i + 56].answers[0].content_answer}
                                    </label><br />
                                    <input
                                        type="radio"
                                        id={`B-${index}`}
                                        name={`Question-${index}`}
                                        value="B"
                                        checked={props.selectedAnswers[i + index + 56] === "B"}
                                        onChange={() => handleRadioChangePart7(i + index + 56, "B")}
                                    />
                                    <label htmlFor={`D-${index}`}>
                                        .B {props.dataSource[index + i + 56] && props.dataSource[index + i + 56].answers && props.dataSource[index + i + 56].answers[1] && props.dataSource[index + i + 56].answers[1].content_answer}
                                    </label><br />
                                    <input
                                        type="radio"
                                        id={`C-${index}`}
                                        name={`Question-${index}`}
                                        value="C"
                                        checked={props.selectedAnswers[i + index + 56] === "C"}
                                        onChange={() => handleRadioChangePart7(i + index + 56, "C")} />
                                    <label htmlFor={`D-${index}`}>
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
            <Row style={{ backgroundColor: 'cyan', border: '1px solid ', borderRadius: '10px', width: '70vw', height: '70vh', marginLeft: 'auto', marginRight: 'auto' }}>
                <Col>
                    <h1 style={{}}>Test Submitted Successfully</h1>
                    <p>Thank you for completing the test.</p>
                    <p>Total correct: {totalCorrect}/100</p>

                    <p>Total Marks: {totalMarks}</p>
                </Col>
            </Row>
        </Container>
    );
}
