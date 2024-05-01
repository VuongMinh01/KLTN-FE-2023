import React, { useEffect, useState } from "react";
import SideMenu from "../../component/TestsPage/SideMenu";
import PageContent from "../../component/TestsPage/PageContent";
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

    return (
        <div className="App">
            <Header />

            <div className="sidebar">
                <ul>
                    <li><button onClick={() => changePage('part 1')}>Part 1</button></li>
                    <li><button onClick={() => changePage('part 2')}>Part 2</button></li>
                    <li><button onClick={() => changePage('part 3')}>Part 3</button></li>
                    <li><button onClick={() => changePage('part 4')}>Part 4</button></li>
                </ul>
            </div>
            <div className="main-content">
                {currentPage === 'part 1' && <Part1 />}
                {currentPage === 'part 2' && <Part2 />}
                {currentPage === 'part 3' && <Part3 />}
                {currentPage === 'part 4' && <Part4 />}

            </div>
        </div>
    );
}

function Part1() {
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
            <Button>Next Part</Button>
        </Container>
    );
}

function Part2() {
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
            <Button>Previous Part</Button>

            <Button>Next Part</Button>
        </Container>
    );
}

function Part3() {
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
            <Button>Previous Part</Button>

            <Button>Next Part</Button>
        </Container>
    );

}

function Part4() {
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
            <Button>Previous Part</Button>

            <Button>Submit</Button>
        </Container>
    );

}