import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../css/PageQuanTri.css"
import Header from '../../component/LandingPageComponent/Header';
import '../../css/AddPart1.css';
import { Button, Input } from "antd";
export default function ReadingTesting() {

    const [currentPage, setCurrentPage] = useState('part 1');

    const changePage = (page) => {
        setCurrentPage(page);
    };
    const console = async (e) => {
        console.log(e._id);
    }

    return (
        <div className="App">
            <Header />
            <button onClick={console}>click me</button>
            <div className="sidebar">
                <ul>
                    <li><button onClick={() => changePage('part 1')}>Part 1</button></li>
                    <li><button onClick={() => changePage('part 2')}>Part 2</button></li>
                    <li><button onClick={() => changePage('part 3')}>Part 3</button></li>
                    <li><button onClick={() => changePage('part 4')}>Part 4</button></li>
                </ul>
            </div>
            <div className="main-content">
                {currentPage === 'part 1' && <Part1 changePage={changePage} />}
                {currentPage === 'part 2' && <Part2 changePage={changePage} />}
                {currentPage === 'part 3' && <Part3 changePage={changePage} />}
                {currentPage === 'part 4' && <Part4 changePage={changePage} />}

            </div>

        </div>

    );
}

function Part1(props) {
    const handleClick = () => {
        // Call changePage function to change the page
        props.changePage('part 2');
    };
    return (
        <Container fluid>

            <h1>Part 1</h1>
            <Row>

                <Col xs={12}>
                    <div style={{ border: '1px solid black' }}>
                        <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu 1</h3>

                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>


                            <audio controls="true" src={'audio'} ></audio>
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
    return (
        <Container fluid>
            <h1>Part 2</h1>


            <Row>

                <Col xs={12}>
                    <div style={{ border: '1px solid black' }}>
                        <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu 1</h3>

                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>


                            <audio controls="true" src={'audio'} ></audio>
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

                        </div>
                    </div>
                </Col>
            </Row>
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


                            <audio controls="true" src={'audio'} ></audio>
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

    const handlePreviousClick = () => {
        props.changePage('part 3');
    };
    return (
        <Container>
            <Row>
                <Col xs={4}>
                    <Input>
                    </Input>
                </Col>
                <Col xs={8}>
                    <div style={{ border: '1px solid black' }}>
                        <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu 1</h3>

                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>


                            <audio controls="true" src={'audio'} ></audio>
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