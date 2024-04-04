import { Col, Row, Space } from "antd";
import { Container } from "react-bootstrap";
import React, { useState } from "react";

export default function Part3Q2() {
    {/* <label className="selection_label">{title}</label>

                        <input value={value} checked={state[value]} type="checkbox" onChange={this.onCheckboxChange(value)} /> */
    }

    const title32 = "35. What was that? ";
    const title33 = "36. What was that? ";
    const title34 = "37. What was that? ";

    const title32A = "32A";
    const title32B = "32B";
    const title32C = "32C";
    const title32D = "32C";

    const title33A = "33A";
    const title33B = "33A";
    const title33C = "33A";
    const title33D = "33C";

    const title34A = "34A";
    const title34B = "34A";
    const title34C = "34A";
    const title34D = "34D";

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
                            <h3 style={{ textAlign: 'center' }}>{title32}</h3>
                            <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                                <input type="radio" id="A" name="Question1" value="A" />
                                <label for="A">A.{title32A}</label>
                                <br />
                                <input type="radio" id="B" name="Question1" value="B" />
                                <label for="B">B.{title32B}</label>
                                <br />
                                <input type="radio" id="C" name="Question1" value="C" />
                                <label for="C">C.{title32C}</label>
                                <br />
                                <input type="radio" id="D" name="Question1" value="D" />
                                <label for="D">D.{title32D}</label>
                                <br />
                            </div>
                        </div>
                        <div>
                            <h3 style={{ textAlign: 'center' }}>{title33}</h3>
                            <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                                <input type="radio" id="A" name="Question1" value="A" />
                                <label for="A">A.{title33A}</label>
                                <br />
                                <input type="radio" id="B" name="Question1" value="B" />
                                <label for="B">B.{title33B}</label>
                                <br />
                                <input type="radio" id="C" name="Question1" value="C" />
                                <label for="C">C.{title33C}</label>
                                <br />
                                <input type="radio" id="D" name="Question1" value="D" />
                                <label for="D">D.{title33D}</label>
                                <br />
                            </div>
                        </div>
                        <div>
                            <h3 style={{ textAlign: 'center' }}>{title34}</h3>
                            <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                                <input type="radio" id="A" name="Question1" value="A" />
                                <label for="A">A.{title34A}</label>
                                <br />
                                <input type="radio" id="B" name="Question1" value="B" />
                                <label for="B">B.{title34B}</label>
                                <br />
                                <input type="radio" id="C" name="Question1" value="C" />
                                <label for="C">C.{title34C}</label>
                                <br />
                                <input type="radio" id="D" name="Question1" value="D" />
                                <label for="D">D.{title34D}</label>
                                <br />
                            </div>
                        </div>

                    </div>

                </Row>








            </form>
        </Container >

    )
}