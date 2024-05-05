import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../css/PageQuanTri.css"
import Header from '../../component/LandingPageComponent/Header';
import '../../css/AddPart1.css';
import { Button, Input } from "antd";
import { getQuestionList } from "../../utils/APIRoutes";
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
    const [selectedAnswersPart, setSelectedAnswersPart] = useState(Array.from({ length: 6 }).fill(null));


    useEffect(() => {
        const test_id = getTestIdFromURL(location.pathname);
        console.log(test_id, '12322') // Extract test ID from URL
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
        console.log("handleRadioChangePart called"); // Add this line
        const updatedSelectedAnswers = [...selectedAnswersPart];
        updatedSelectedAnswers[index] = value;
        setSelectedAnswersPart(updatedSelectedAnswers);
        const selectedAnswer = dataSource[index]?.answers.find(answer => answer.order_answer === value);
        if (selectedAnswer) {
            // Extract content_answer and order_answer from the selected answer object
            const { content_answer, order_answer } = selectedAnswer;
            // Update selected answer information in the dataSource
            const updatedDataSource = [...dataSource];
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
        const host = window.location.origin; // Get the base URL of the current page
        const getQuestionList1 = `${getQuestionList}/${test_id}`;
        axios.get(getQuestionList1, {
            params: {
                limit: 100,
                page: 1,
            }, headers
        }).then((response) => {
            setDataSource(response.data.result.questions);
            console.log(dataSource, 'data lisst');
        }).catch((error) => {
            console.error('Error fetching list of questions:', error);
        });
    }


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
                {currentPage === 'part 3' && <Part3 changePage={changePage} />}
                {currentPage === 'part 4' && <Part4 changePage={changePage} />}
                {currentPage === 'part 5' && <Part5 changePage={changePage} />}
                {currentPage === 'part 6' && <Part6 changePage={changePage} />}
                {currentPage === 'part 7' && <Part7 changePage={changePage} />}
            </div>


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

    const [selectedAnswers, setSelectedAnswers] = useState(props.selectedAnswers);






    return (
        // <Container fluid>
        //     <h1>Part 1</h1>
        //     {props.dataSource?.length > 0 ? (
        //         <Row gutter={24}>
        //             {props.dataSource.map(item => (
        //                 <Col xs={12} key={item._id}>
        //                     <div style={{ border: '1px solid black', borderRadius: '20px', marginBottom: '10px' }}>
        //                         <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu</h3>

        //                         <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
        //                             <audio controls={true} src={'audio'} ></audio>
        //                         </div>
        //                         <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
        //                             <img alt="preview " src={'image'} style={{ width: 300 }} />
        //                         </div>
        //                         <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
        //                             <input type="radio" id="A" name="Question1" value="A" />
        //                             <label htmlFor="A">A</label><br />
        //                             <input type="radio" id="B" name="Question1" value="B" />
        //                             <label htmlFor="B">B</label><br />
        //                             <input type="radio" id="C" name="Question1" value="C" />
        //                             <label htmlFor="C">C</label><br />
        //                         </div>
        //                     </div>
        //                 </Col>
        //             ))}
        //         </Row>
        //     ) : (
        //         <p>No data available</p>
        //     )}
        //     <Button onClick={handleClick}>Next Part</Button>
        // </Container>

        <Container fluid>
            <h1>Part 1</h1>
            {Array.from({ length: 6 }).map((_, index) => (
                <Row gutter={24} key={index}>
                    <Col xs={12}>
                        <div style={{ border: '1px solid black', borderRadius: '20px', marginBottom: '10px' }}>
                            <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu {index + 1}</h3>

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
                                <label htmlFor={`A-${index}`}>A</label><br />
                                <input
                                    type="radio"
                                    id={`B-${index}`}
                                    name={`Question-${index}`}
                                    value="B"
                                    checked={props.selectedAnswers[index] === "B"}
                                    onChange={() => handleRadioChangePart1(index, "B")}
                                />
                                <label htmlFor={`B-${index}`}>B</label><br />
                                <input
                                    type="radio"
                                    id={`C-${index}`}
                                    name={`Question-${index}`}
                                    value="C"
                                    checked={props.selectedAnswers[index] === "C"}
                                    onChange={() => handleRadioChangePart1(index, "C")}
                                />
                                <label htmlFor={`C-${index}`}>C</label><br />
                                <input
                                    type="radio"
                                    id={`D-${index}`}
                                    name={`Question-${index}`}
                                    value="D"
                                    checked={props.selectedAnswers[index] === "D"}
                                    onChange={() => handleRadioChangePart1(index, "D")}
                                />
                                <label htmlFor={`D-${index}`}>D</label><br />
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
    return (
        <Container fluid>
            <h1>Part 2</h1>
            {props.dataSource.slice(6, 31).map((item, index) => (
                <Row gutter={24} key={index}>
                    <Col xs={12}>
                        <div style={{ border: '1px solid black', borderRadius: '20px', marginBottom: '10px' }}>
                            <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu {index + 7}</h3>

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
    return (
        <Container fluid>
            <h1>Part 3</h1>


            <Row>

                <Col xs={12}>
                    <div style={{ border: '1px solid black' }}>
                        <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu 1</h3>

                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>


                            <audio controls={true} src={'audio'} ></audio>
                        </div>


                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                            <img alt="preview " src={'image'} style={{ width: 300 }} />
                        </div>

                        <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                            <input type="radio" id="A" name="Question1" value="A" />
                            <label for="A">A</label><br />
                            <input type="radio" id="B" name="Question1" value="B" />
                            <label for="B">B</label><br />
                            <input type="radio" id="C" name="Question1" value="C" />
                            <label for="C">C</label><br />
                            <input type="radio" id="D" name="Question1" value="D" />
                            <label for="D">D</label><br />
                        </div>
                    </div>
                </Col>
            </Row>
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
    return (
        <Container>
            <h1>Part 4</h1>
            <Row>
                <Col xs={4}>
                    <Input>
                    </Input>
                </Col>
                <Col xs={8}>
                    <div style={{ border: '1px solid black' }}>
                        <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu 1</h3>

                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>


                            <audio controls={true} src={'audio'} ></audio>
                        </div>


                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                            <img alt="preview " src={'image'} style={{ width: 300 }} />
                        </div>

                        <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                            <input type="radio" id="A" name="Question1" value="A" />
                            <label for="A">A</label><br />
                            <input type="radio" id="B" name="Question1" value="B" />
                            <label for="B">B</label><br />
                            <input type="radio" id="C" name="Question1" value="C" />
                            <label for="C">C</label><br />
                            <input type="radio" id="D" name="Question1" value="D" />
                            <label for="D">D</label><br />
                        </div>
                    </div>
                </Col>
            </Row>
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
    return (
        <Container fluid>

            <h1>Part 5</h1>
            <Row>

                <Col xs={12}>
                    <div style={{ border: '1px solid black' }}>
                        <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu 1</h3>

                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>


                            <audio controls={true} src={'audio'} ></audio>
                        </div>


                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                            <img alt="preview " src={'image'} style={{ width: 300 }} />
                        </div>

                        <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                            <input type="radio" id="A" name="Question1" value="A" />
                            <label for="A">A</label><br />
                            <input type="radio" id="B" name="Question1" value="B" />
                            <label for="B">B</label><br />
                            <input type="radio" id="C" name="Question1" value="C" />
                            <label for="C">C</label><br />
                            <input type="radio" id="D" name="Question1" value="D" />
                            <label for="D">D</label><br />
                        </div>
                    </div>
                </Col>
            </Row>
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
    return (
        <Container fluid>
            <h1>Part 6</h1>


            <Row>

                <Col xs={12}>
                    <div style={{ border: '1px solid black' }}>
                        <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu 1</h3>

                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>


                            <audio controls={true} src={'audio'} ></audio>
                        </div>


                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                            <img alt="preview " src={'image'} style={{ width: 300 }} />
                        </div>

                        <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                            <input type="radio" id="A" name="Question1" value="A" />
                            <label for="A">A</label><br />
                            <input type="radio" id="B" name="Question1" value="B" />
                            <label for="B">B</label><br />
                            <input type="radio" id="C" name="Question1" value="C" />
                            <label for="C">C</label><br />
                            <input type="radio" id="D" name="Question1" value="D" />
                            <label for="D">D</label><br />
                        </div>
                    </div>
                </Col>
            </Row>
            <Button onClick={handlePreviousClick}>Previous Part</Button>

            <Button onClick={handleClick}>Next Part</Button>
        </Container>
    );

}



function Part7(props) {
    const handlePreviousClick = () => {
        props.changePage('part 6');
    };
    return (
        <Container fluid>
            <h1>Part 7</h1>


            <Row>

                <Col xs={12}>
                    <div style={{ border: '1px solid black' }}>
                        <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu 1</h3>

                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>


                            <audio controls={true} src={'audio'} ></audio>
                        </div>


                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                            <img alt="preview " src={'image'} style={{ width: 300 }} />
                        </div>

                        <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                            <input type="radio" id="A" name="Question1" value="A" />
                            <label for="A">A</label><br />
                            <input type="radio" id="B" name="Question1" value="B" />
                            <label for="B">B</label><br />
                            <input type="radio" id="C" name="Question1" value="C" />
                            <label for="C">C</label><br />
                            <input type="radio" id="D" name="Question1" value="D" />
                            <label for="D">D</label><br />
                        </div>
                    </div>
                </Col>
            </Row>
            <Button onClick={handlePreviousClick}>Previous Part</Button>

            <Button>Submit</Button>
        </Container>
    );

}

