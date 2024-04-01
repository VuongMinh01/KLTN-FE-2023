import { Col, Row, Space } from "antd";
import { Container } from "react-bootstrap";
import React, { useState } from "react";

export default function Part3() {
    return (
        <Container>
            <h1>Part 3</h1>
            <form>

                <Row className="RowQuestion" >

                    <div className="div1" style={{ width: '100%' }}>
                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>

                            <audio controls="true" src={""} ></audio>

                        </div>

                        <div>

                            <h1 onChange={{}} style={{ textAlign: 'center' }}>Question 32</h1>

                            <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                                <input type="radio" id="A" name="Question1" value="A" />
                                <label for="A">A</label>
                                <input value="sáda" disabled="true" ></input><br />
                                <input type="radio" id="B" name="Question1" value="B" />
                                <label for="B">B</label><br />
                                <input type="radio" id="C" name="Question1" value="C" />
                                <label for="C">C</label><br />
                                <input type="radio" id="D" name="Question1" value="D" />
                                <label for="D">D</label><br />
                            </div>
                        </div>
                        <div>
                            <h1 style={{ textAlign: 'center' }}>Question 33</h1>

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
                        <div>
                            <h1 style={{ textAlign: 'center' }}>Question 34</h1>

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

                    </div>

                </Row>








            </form>
        </Container >

    )
}