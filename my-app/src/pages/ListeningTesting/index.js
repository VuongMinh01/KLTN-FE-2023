import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../css/PageQuanTri.css"
import Header from '../../component/LandingPageComponent/Header';
import '../../css/AddPart1.css';
import { Button } from "antd";
export default function ListeningTesting() {

    const [currentPage, setCurrentPage] = useState('part 5');

    const changePage = (page) => {
        setCurrentPage(page);
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
                {currentPage === 'part 5' && <Part5 changePage={changePage} />}
                {currentPage === 'part 6' && <Part6 changePage={changePage} />}
                {currentPage === 'part 7' && <Part7 changePage={changePage} />}
            </div>
        </div>
    );
}

function Part5(props) {
    const handleClick = () => {
        // Call changePage function to change the page
        props.changePage('part 6');
    };
    return (
        <Container fluid>

            <h1>Part 5</h1>
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

