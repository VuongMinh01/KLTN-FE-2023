import { Col, Row, Space } from "antd";
import { Container } from "react-bootstrap";
import React, { useState } from "react";

export default function Part3Q2() {
    {/* <label className="selection_label">{title}</label>

                        <input value={value} checked={state[value]} type="checkbox" onChange={this.onCheckboxChange(value)} /> */
    }

    const title35 = "35. What was that? ";
    const title36 = "36. What was that? ";
    const title37 = "37. What was that? ";

    const title35A = "35A";
    const title35B = "35B";
    const title35C = "35C";
    const title35D = "35C";

    const title36A = "33A";
    const title36B = "33A";
    const title36C = "33A";
    const title36D = "33C";

    const title37A = "34A";
    const title37B = "34A";
    const title37C = "34A";
    const title37D = "34D";

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
                            <h3 style={{ textAlign: 'center' }}>{title35}</h3>
                            <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                                <input type="radio" id="A" name="Question1" value="A" />
                                <label for="A">A.{title35A}</label>
                                <br />
                                <input type="radio" id="B" name="Question1" value="B" />
                                <label for="B">B.{title35B}</label>
                                <br />
                                <input type="radio" id="C" name="Question1" value="C" />
                                <label for="C">C.{title35C}</label>
                                <br />
                                <input type="radio" id="D" name="Question1" value="D" />
                                <label for="D">D.{title35D}</label>
                                <br />
                            </div>
                        </div>
                        <div>
                            <h3 style={{ textAlign: 'center' }}>{title36}</h3>
                            <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                                <input type="radio" id="A" name="Question1" value="A" />
                                <label for="A">A.{title36A}</label>
                                <br />
                                <input type="radio" id="B" name="Question1" value="B" />
                                <label for="B">B.{title36B}</label>
                                <br />
                                <input type="radio" id="C" name="Question1" value="C" />
                                <label for="C">C.{title36C}</label>
                                <br />
                                <input type="radio" id="D" name="Question1" value="D" />
                                <label for="D">D.{title36D}</label>
                                <br />
                            </div>
                        </div>
                        <div>
                            <h3 style={{ textAlign: 'center' }}>{title37}</h3>
                            <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                                <input type="radio" id="A" name="Question1" value="A" />
                                <label for="A">A.{title37A}</label>
                                <br />
                                <input type="radio" id="B" name="Question1" value="B" />
                                <label for="B">B.{title37B}</label>
                                <br />
                                <input type="radio" id="C" name="Question1" value="C" />
                                <label for="C">C.{title37C}</label>
                                <br />
                                <input type="radio" id="D" name="Question1" value="D" />
                                <label for="D">D.{title37D}</label>
                                <br />
                            </div>
                        </div>

                    </div>

                </Row>








            </form>
        </Container >

    )
}